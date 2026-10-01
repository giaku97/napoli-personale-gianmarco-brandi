'use client';
/* eslint-disable @next/next/no-img-element -- GitHub Pages serves prepared WebP files without a Next image optimizer. */

import { safeImage, safeLink, safeVideo, useSite, type Project } from './site-content';
import './portfolio-evidence.css';

const labels = {
  commissioned: { it: 'Lavoro commissionato', en: 'Commissioned work' },
  agency: { it: 'Tramite agenzia', en: 'Through an agency' },
  concept: { it: 'Concept personale', en: 'Personal concept' },
  archive: { it: 'Selezione di lavori', en: 'Selected work' },
};

export function PortfolioEvidence({ projects }: { projects: Project[] }) {
  const { locale } = useSite();
  if (!projects.length) return null;
  return <section className="portfolio-evidence" aria-labelledby="portfolio-title">
    <div className="portfolio-evidence-intro">
      <p className="np-kicker">{locale === 'it' ? 'IL LAVORO, DIETRO L’IDEA' : 'THE WORK BEHIND THE IDEA'}</p>
      <h3 id="portfolio-title">{locale === 'it' ? <>Le idee prendono <em>forma.</em></> : <>Ideas take <em>shape.</em></>}</h3>
      <p>{locale === 'it' ? 'Dalla strategia alle immagini: lavori reali e concept che mostrano come penso, progetto e racconto.' : 'From strategy to imagery: real work and concepts showing how I think, design and tell stories.'}</p>
    </div>
    <div className="portfolio-evidence-list">{projects.map((p, index) => {
      const media = p.media?.length ? p.media : p.image ? [{ type: 'image' as const, src: p.image, small: '', alt: p.alt, caption: '', credits: '', poster: '' }] : [];
      const title = locale === 'en' ? p.titleEn || p.title : p.title;
      const role = locale === 'en' ? p.roleEn || p.role : p.role;
      const description = locale === 'en' ? p.descriptionEn || p.description : p.description;
      const credits = locale === 'en' ? p.creditsEn || p.credits : p.credits;
      const category = labels[p.category || 'archive'][locale];
      return <article className={`portfolio-case ${index === 0 ? 'portfolio-case-featured' : ''}`} key={p.id}>
        <div className="portfolio-case-story">
          <div className="portfolio-case-meta"><span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><span>{category}</span></div>
          <h4>{title}</h4><p className="portfolio-case-role">{role}{p.year ? ` · ${p.year}` : ''}</p>
          <p className="portfolio-case-description">{description}</p>
          {credits && <p className="portfolio-case-credits"><strong>{locale === 'it' ? 'Contesto e crediti' : 'Context and credits'}</strong><br />{credits}</p>}
          {p.source && <a href={safeLink(p.source)} target="_blank" rel="noreferrer">{locale === 'it' ? 'Apri la fonte' : 'Open source'} ↗</a>}
          {media.length > 1 && <p className="portfolio-case-swipe">{locale === 'it' ? 'Scorri le immagini →' : 'Scroll through the media →'}</p>}
        </div>
        <div className="portfolio-case-media" role="region" tabIndex={0} aria-label={`${title}: ${locale === 'it' ? 'galleria' : 'gallery'}`}>
          {media.map((m, i) => <figure className={m.type === 'video' ? 'portfolio-media-video' : ''} key={`${m.src}-${i}`}>
            {m.type === 'video' ? <video controls playsInline preload="metadata" poster={safeImage(m.poster)} aria-label={locale === 'en' ? m.altEn || m.alt : m.alt}><source src={safeVideo(m.src)} type="video/mp4" />{locale === 'it' ? 'Il browser non supporta questo video.' : 'Your browser does not support this video.'}</video> : <img src={safeImage(m.src)} srcSet={m.small ? `${safeImage(m.small)} 800w, ${safeImage(m.src)} 1600w` : undefined} sizes="(max-width: 700px) 86vw, 55vw" alt={locale === 'en' ? m.altEn || m.alt : m.alt} loading="lazy" decoding="async" />}
            {(m.caption || m.captionEn || m.credits) && <figcaption><span>{locale === 'en' ? m.captionEn || m.caption : m.caption}</span>{m.credits && <small>{m.credits}</small>}</figcaption>}
          </figure>)}
        </div>
      </article>;
    })}</div>
  </section>;
}
