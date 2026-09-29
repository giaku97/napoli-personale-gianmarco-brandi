'use client';

import { useState } from 'react';
import Image from 'next/image';
import { safeImage, useSite } from '@/components/site-content';

export function Header() {
  const {data:{identity}} = useSite();
  const [open, setOpen] = useState(false);
  return <header className="header"><a className="signature logo-signature" href="#main" aria-label="Gianmarco Brandi, inizio"><Image src={safeImage(identity.logo)} alt="Gianmarco Brandi — Graphic Designer" width={3870} height={1943} unoptimized priority /></a><span className="header-caption">NAPOLI È PERSONALE</span><button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? 'Chiudi' : 'Indice'} <span aria-hidden="true">{open ? '−' : '+'}</span></button><nav id="navigation" aria-label="Navigazione principale" className={open ? 'nav nav-open' : 'nav'}>{[['#idea', 'La visione'], ['#esperienza', 'L’esperienza'], ['#strategia', 'La strategia'], ['#evidenze', 'Le prove']].map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav></header>;
}
