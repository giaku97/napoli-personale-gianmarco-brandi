// Run after replacing site.json with an export validated by the Studio importer.
// Convert embedded uploads into static original files without changing their bytes.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const file=path.join(root,'src/content/site.json');
const bytes=await readFile(file);
if(bytes.length>40*1024*1024)throw new Error('Project exceeds 40 MB');
const site=JSON.parse(bytes.toString('utf8'));
if(site.version!==1||!site.identity||!Array.isArray(site.identity.projects)||!site.photos)throw new Error('Invalid site configuration');
const manifestPath=path.join(root,'src/content/assets.json');
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
const dir=path.join(root,'public/assets/uploads');
let count=0;
async function image(value) {
 if(typeof value!=='string'||!value.startsWith('data:'))return value;
 const match=/^data:image\/(png|jpeg|webp|gif);base64,([a-z0-9+/=]+)$/i.exec(value);
 if(!match)throw new Error('Unsupported embedded image');
 const content=Buffer.from(match[2],'base64');
 if(content.length>8*1024*1024)throw new Error('Image exceeds 8 MB');
 const ext=match[1].toLowerCase()==='jpeg'?'jpg':match[1].toLowerCase();
 const signatures={png:content.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),jpg:content[0]===255&&content[1]===216&&content[2]===255,webp:content.toString('ascii',0,4)==='RIFF'&&content.toString('ascii',8,12)==='WEBP',gif:['GIF87a','GIF89a'].includes(content.toString('ascii',0,6))};
 if(!signatures[ext])throw new Error('Image signature does not match type');
 const hash=createHash('sha256').update(content).digest('hex');const name=`upload-${hash}.${ext}`;
 await mkdir(dir,{recursive:true});const target=path.join(dir,name);
 try {await writeFile(target,content,{flag:'wx'});}catch(error){if(error.code!=='EEXIST')throw error;const existing=await readFile(target);if(!existing.equals(content))throw new Error('Existing upload content mismatch');}
 if(!manifest.originals.some(a=>a.id===hash))manifest.originals.push({id:hash,path:`public/assets/uploads/${name}`,sha256:hash.toUpperCase(),source:'User upload from Studio export',transformation:'none; original bytes preserved'});
 count++;return `/assets/uploads/${name}`;
}
site.identity.logo=await image(site.identity.logo);
for(const photo of Object.values(site.photos))photo.src=await image(photo.src);
for(const project of site.identity.projects){
 project.image=await image(project.image);
 for(const media of project.media||[]){
  if(media.type==='image')media.src=await image(media.src);
  if(media.small)media.small=await image(media.small);
  if(media.poster)media.poster=await image(media.poster);
 }
}
if(count){await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');await writeFile(file,JSON.stringify(site,null,2)+'\n');}
console.log(`Materialized ${count} image references; original bytes preserved.`);
