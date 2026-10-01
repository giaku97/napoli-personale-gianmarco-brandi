'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import defaults from '@/content/site.json';
import originalTexts from '@/content/original-texts.json';
import italian from '@/content/locales/it.json';
import english from '@/content/locales/en.json';
import { publicPath } from '@/lib/base-path';

export type PhotoData = { src: string; alt: string; altEn?: string; author: string; license: string; licenseUrl: string; source: string; position: number; visible: boolean };
export type ProjectMedia = { type: 'image' | 'video'; src: string; small?: string; alt: string; altEn?: string; caption: string; captionEn?: string; credits: string; poster: string; width?: number; height?: number; smallWidth?: number };
export type Project = { id: string; title: string; titleEn?: string; category?: 'commissioned' | 'agency' | 'concept' | 'archive'; role: string; roleEn?: string; year: string; description: string; descriptionEn?: string; image: string; alt: string; source: string; credits: string; creditsEn?: string; verified: boolean; media?: ProjectMedia[] };
export type SiteData = Omit<typeof defaults, 'identity' | 'photos' | 'texts' | 'translations'> & { texts: Record<string,string>; translations: Record<string,string>; photos: Record<string,PhotoData>; identity: { name: string; logo: string; email: string; cv: string; portfolioUrl: string; projects: Project[] } };
export const defaultSite = defaults as SiteData;
export function safeLink(value: string) { return /^https:\/\/[^\s]+$/i.test(value) ? value : /^\/assets\/[a-z0-9_./-]+$/i.test(value) ? publicPath(value) : ''; }
export function safeImage(value: string) { return /^\/assets\/[a-z0-9_./-]+$/i.test(value) ? publicPath(value) : /^data:image\/(png|jpeg|webp|gif);base64,[a-z0-9+/=]+$/i.test(value) ? value : ''; }
export function safeVideo(value: string) { return /^\/assets\/[a-z0-9_./-]+\.mp4$/i.test(value) ? publicPath(value) : ''; }
export function validateSite(input: unknown): SiteData {
  if (!input || typeof input !== 'object') throw new Error('Il file non contiene un progetto valido.');
  const s = input as SiteData;
  if (s.version !== 1 || !s.texts || !s.theme || !s.photos || !s.identity || !Array.isArray(s.identity.projects)) throw new Error('Formato del progetto non riconosciuto.');
  const string = (v: unknown, max = 6000) => typeof v === 'string' && v.length <= max;
  if (Object.keys(s.texts).length > 500 || Object.entries(s.texts).some(([k,v]) => !/^[\w.À-ÿ-]+$/.test(k) || !string(v))) throw new Error('Uno dei testi non è valido o è troppo lungo.');
  if (s.translations && (Object.keys(s.translations).length > 500 || Object.entries(s.translations).some(([k,v]) => !/^[\w.À-ÿ-]+$/.test(k) || !string(v)))) throw new Error('Uno dei testi inglesi non è valido.');
  for (const k of ['blue','night','paper','accent'] as const) if (!/^#[0-9a-f]{6}$/i.test(s.theme[k])) throw new Error('Colore non valido.');
  if (!Number.isFinite(s.theme.logoWidth) || s.theme.logoWidth < 80 || s.theme.logoWidth > 220 || !Number.isFinite(s.theme.overlay) || s.theme.overlay < 45 || s.theme.overlay > 90 || !['condensed','sans'].includes(s.theme.display)) throw new Error('Impostazioni visive non valide.');
  if (!string(s.identity.name,120) || !string(s.identity.email,200) || (s.identity.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.identity.email)) || !safeImage(s.identity.logo)) throw new Error('Controlla nome, email e logo.');
  if ([s.identity.cv,s.identity.portfolioUrl].some(v=>typeof v !== 'string' || (v && !safeLink(v)))) throw new Error('Usa un indirizzo HTTPS valido per CV e portfolio.');
  for (const key of Object.keys(defaultSite.photos)) {
    const p=s.photos[key];
    if (!p || !safeImage(p.src) || !string(p.alt,500) || (p.altEn!==undefined && !string(p.altEn,500)) || !string(p.author,200) || !string(p.license,200) || !Number.isFinite(p.position) || p.position < 0 || p.position > 100 || typeof p.visible !== 'boolean' || [p.source,p.licenseUrl].some(v=>typeof v !== 'string'||(v&&!safeLink(v)))) throw new Error('Controlla immagine, crediti e posizione delle fotografie.');
  }
  if (s.identity.projects.length > 30) throw new Error('Puoi inserire fino a 30 progetti.');
  for (const p of s.identity.projects) {
    if (!p || !string(p.id,100) || !string(p.title,200) || !string(p.role,500) || !string(p.year,50) || !string(p.description) || !string(p.alt,500) || !string(p.credits,1000) || typeof p.image !== 'string' || typeof p.source !== 'string' || typeof p.verified !== 'boolean' || (p.image && !safeImage(p.image)) || (p.source && !safeLink(p.source))) throw new Error('Controlla i campi dei lavori personali.');
    if ([p.titleEn,p.roleEn,p.descriptionEn,p.creditsEn].some(v=>v!==undefined && !string(v))) throw new Error('Controlla i testi inglesi dei lavori.');
    if (p.category && !['commissioned','agency','concept','archive'].includes(p.category)) throw new Error('Categoria del lavoro non valida.');
    if (p.media !== undefined) {
      if (!Array.isArray(p.media) || p.media.length > 50) throw new Error('Troppi media in un lavoro.');
      for (const m of p.media) if (!m || !['image','video'].includes(m.type) || !string(m.src,1000) || (m.small!==undefined && (!string(m.small,1000) || (m.small && !safeImage(m.small)))) || [m.width,m.height,m.smallWidth].some(v=>v!==undefined && (!Number.isFinite(v) || v<1 || v>10000)) || !string(m.alt,500) || !string(m.caption,500) || !string(m.credits,1000) || !string(m.poster,1000) || (m.altEn!==undefined && !string(m.altEn,500)) || (m.captionEn!==undefined && !string(m.captionEn,500)) || (m.type==='image' ? !safeImage(m.src) : !safeVideo(m.src)) || (m.poster && !safeImage(m.poster))) throw new Error('Controlla immagini e video del lavoro.');
    }
  }
  return structuredClone({ ...defaultSite, ...s, texts: { ...defaultSite.texts, ...s.texts }, translations: { ...defaultSite.translations, ...s.translations } });
}

type Locale = 'it' | 'en';
type SiteContextValue = { data: SiteData; locale: Locale; setLocale: (locale: Locale) => void; text: (key: string, fallback: string) => string; t: (key: string) => string };
const SiteContext = createContext<SiteContextValue>({data:defaultSite,locale:'it',setLocale:()=>{},text:(key,fallback)=>defaultSite.texts[key] ?? fallback,t:key=>defaultSite.texts[key]??key});
export function SiteProvider({children}: {children: ReactNode}) {
  const [data,setData]=useState(defaultSite);
  const [locale,updateLocale]=useState<Locale>('it');
  function setLocale(next:Locale) { updateLocale(next); }
  useEffect(()=>{ document.documentElement.lang=locale; },[locale]);
  useEffect(()=>{
    if (new URLSearchParams(location.search).get('studio') !== '1' || window.parent === window) return;
    const onMessage=(event: MessageEvent)=>{
      if (event.origin !== location.origin || event.source !== window.parent || event.data?.type !== 'napoli:preview') return;
      try { setData(validateSite(event.data.content)); } catch { /* Invalid parent payloads cannot change the preview. */ }
    };
    const select=(event: MouseEvent)=>{
      const node=(event.target as Element).closest('[data-copy]');
      if (node) { event.preventDefault(); window.parent.postMessage({type:'napoli:select',id:node.getAttribute('data-copy')},location.origin); }
    };
    window.addEventListener('message',onMessage); document.addEventListener('click',select);
    document.documentElement.dataset.studio='preview';
    window.parent.postMessage({type:'napoli:ready'},location.origin);
    return ()=>{window.removeEventListener('message',onMessage);document.removeEventListener('click',select);};
  },[]);
  useEffect(()=>{
    const root=document.documentElement;
    root.style.setProperty('--blue',data.theme.blue);root.style.setProperty('--night',data.theme.night);root.style.setProperty('--paper',data.theme.paper);root.style.setProperty('--accent',data.theme.accent);
    root.style.setProperty('--photo-shade',String(data.theme.overlay/100));root.style.setProperty('--logo-width',data.theme.logoWidth+'px');
    root.style.setProperty('--heading-font',data.theme.display==='sans'?'var(--font-manrope)':'var(--font-barlow)');
  },[data.theme]);
  return <SiteContext.Provider value={{data,locale,setLocale,text:(k,f)=>data.texts[k]??f,t:key=>locale==='it'?(data.texts[key]??(italian as Record<string,string>)[key]??key):(data.translations?.[key]??(english as Record<string,string>)[key]??key)}}>{children}</SiteContext.Provider>;
}
export const useSite=()=>useContext(SiteContext);
export function Copy({id,children}:{id:string;children:ReactNode}) {
  const {data}=useSite();const value=data.texts[id];
  if (value === 'Gianmarco Brandi') return <>{data.identity.name}</>;
  return <span className="editable-copy" data-copy={id}>{value !== undefined && value !== (originalTexts as Record<string,string>)[id] ? value : children}</span>;
}
const newPhotoSizes: Record<string,{width:number;height:number}> = { 'hero-napoli':{width:892,height:670}, 'hero-italia':{width:1024,height:683}, 'hero-mondo':{width:900,height:600} };
export function Photo({slot,className='',priority=false}:{slot:string;className?:string;priority?:boolean}) {
  const {data,locale}=useSite();const photo=data.photos[slot];
  if (!photo?.visible) return null;
  const src=safeImage(photo.src);
  const legacy=/\/assets\/photos\/.+-1920.webp$/.test(src);
  const newName=/\/assets\/photos\/(hero-(?:napoli|italia|mondo))-full\.webp$/.exec(src)?.[1];
  const newBase=newName?src.replace('-full.webp',''):'';
  const dimensions=newName?newPhotoSizes[newName]:undefined;
  const avifSet=legacy?src.replace('1920.webp','640.avif')+' 640w, '+src.replace('1920.webp','1280.avif')+' 1280w, '+src.replace('.webp','.avif')+' 1920w':dimensions?newBase+'-640.avif 640w, '+newBase+'-full.avif '+dimensions.width+'w':undefined;
  const webpSet=legacy?src.replace('1920','640')+' 640w, '+src.replace('1920','1280')+' 1280w, '+src+' 1920w':dimensions?newBase+'-640.webp 640w, '+src+' '+dimensions.width+'w':undefined;
  const portrait=legacy&&priority?src.replace('-1920.webp','-portrait.avif'):dimensions?newBase+'-portrait.avif':'';
  return <figure className={'editorial-photo '+className} data-photo={slot}>
    <picture>{portrait&&<source media="(max-width: 700px)" type="image/avif" srcSet={portrait}/>} {avifSet&&<source type="image/avif" srcSet={avifSet} sizes={priority?'100vw':'(max-width: 700px) 100vw, 60vw'}/>}
    <img src={src} srcSet={webpSet} sizes={priority?'100vw':'(max-width: 700px) 100vw, 60vw'} alt={locale==='en'?photo.altEn||photo.alt:photo.alt} width={dimensions?.width||1920} height={dimensions?.height||1080} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async" style={{objectPosition:'50% '+photo.position+'%'}} /></picture>
    {photo.alt&&<figcaption><span>{locale==='en'?photo.altEn||photo.alt:photo.alt}</span><a href="#crediti-immagini">{locale==='it'?'Crediti':'Credits'} ↗</a></figcaption>}
  </figure>;
}
export function PhotoCredits() {
  const {data,locale,t}=useSite();const photos=Object.values(data.photos).filter((p,i,a)=>p.visible&&a.findIndex(q=>q.src===p.src)===i);
  return <section id="crediti-immagini" className="photo-credits" aria-label={t('legal.photos')}><details><summary>{t('legal.photos')} <span aria-hidden="true">+</span></summary><p>{t('legal.photos.note')}</p><ul>{photos.map(p=><li key={p.src}><strong>{locale==='en'?p.altEn||p.alt:p.alt}</strong> — {p.author || (locale==='it'?'Autore da indicare':'Author to be credited')}. {p.source && <a href={safeLink(p.source)} target="_blank" rel="noreferrer">{locale==='it'?'Fonte':'Source'}</a>} · {p.licenseUrl ? <a href={safeLink(p.licenseUrl)} target="_blank" rel="noreferrer">{p.license}</a>:p.license}. {locale==='it'?'I derivati WebP e AVIF delle fotografie incluse mantengono la licenza indicata.':'Included WebP and AVIF derivatives retain the stated license.'}</li>)}</ul></details></section>;
}
