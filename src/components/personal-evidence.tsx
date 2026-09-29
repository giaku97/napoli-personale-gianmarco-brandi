'use client';
/* eslint-disable @next/next/no-img-element -- Archived component renders user-provided media in a static export. */
import { useSite, safeImage, safeLink } from './site-content';

export function PersonalEvidence() {
  const {data:{identity}}=useSite();
  const projects=identity.projects.filter(p=>p.verified&&p.title.trim()&&p.role.trim()&&p.image);
  if (!projects.length) return null;
  return <div className="personal-projects">{projects.map(p=><article key={p.id}><img src={safeImage(p.image)} alt={p.alt} width={1200} height={800} loading="lazy" style={{objectFit:'contain',height:'auto',width:'100%'}}/><h3>{p.title}</h3><p>{[p.year,p.role].filter(Boolean).join(' / ')}</p><p>{p.description}</p>{p.credits&&<p className="project-credits">Crediti: {p.credits}</p>}{p.source&&<a href={safeLink(p.source)} target="_blank" rel="noreferrer">Apri il progetto ↗</a>}</article>)}</div>;
}
export function ContactLinks() {
  const {data:{identity}}=useSite();
  if(!identity.email&&!identity.cv&&!identity.portfolioUrl)return null;
  return <div className="contact-links">{identity.email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity.email)&&<a href={`mailto:${identity.email}`}>Parliamone ↗</a>}{identity.cv&&<a href={safeLink(identity.cv)} target="_blank" rel="noreferrer">Apri il CV ↗</a>}{identity.portfolioUrl&&<a href={safeLink(identity.portfolioUrl)} target="_blank" rel="noreferrer">Portfolio originale ↗</a>}</div>;
}
export function IdentityName() { const {data}=useSite();return <>{data.identity.name}</>; }
