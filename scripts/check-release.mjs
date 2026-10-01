import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const { identity } = JSON.parse(await readFile('src/content/site.json', 'utf8'));
const manifest = JSON.parse(await readFile('src/content/assets.json', 'utf8'));
let failures = [];
for (const asset of manifest.originals) {
  const bytes = await readFile(asset.path);
  const actual = createHash('sha256').update(bytes).digest('hex').toUpperCase();
  if (actual !== asset.sha256) failures.push(`Original asset changed: ${asset.id}`);
}
if (!identity.logo) failures.push('Original logo missing');
if (!identity.email) failures.push('Verified public contact missing');
if (!identity.cv) failures.push('Approved CV missing');
if (!identity.projects.length) failures.push('Verified personal project evidence missing');
for (const project of identity.projects) {
  const media = project.media?.length ? project.media : project.image ? [{type:'image',src:project.image,alt:project.alt}] : [];
  if (!project.verified || !project.role || !project.alt || !media.length) failures.push(`Incomplete project: ${project.title}`);
  for (const item of media) {
    if (!item.alt) failures.push(`Missing alternative text: ${project.title}`);
    for (const file of [item.src,item.small,item.poster].filter(Boolean)) {
      if (file.startsWith('/assets/')) await access(`public${file}`).catch(() => failures.push(`Missing project media: ${file}`));
    }
  }
}
if (identity.cv?.startsWith('/')) await access(`public${identity.cv}`).catch(() => failures.push('CV file missing'));
console.log(JSON.stringify({ originalAssetIntegrity: 'checked', applicationReady: failures.length === 0, missing: failures }, null, 2));
process.exitCode = failures.length ? 2 : 0;
