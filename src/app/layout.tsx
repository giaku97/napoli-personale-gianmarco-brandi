import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './experience.css';
import './photography.css';
import { SiteProvider } from '@/components/site-content';
import site from '@/content/site.json';
import type { CSSProperties } from 'react';

const display = localFont({ src: [
  { path: '../fonts/barlow-700.woff2', weight: '700' },
  { path: '../fonts/barlow-800.woff2', weight: '800' },
], variable: '--font-barlow', display: 'swap', adjustFontFallback: 'Arial' });
const body = localFont({ src: [
  { path: '../fonts/manrope-400.woff2', weight: '400' },
  { path: '../fonts/manrope-500.woff2', weight: '500' },
  { path: '../fonts/manrope-600.woff2', weight: '600' },
  { path: '../fonts/manrope-700.woff2', weight: '700' },
], variable: '--font-manrope', display: 'swap', adjustFontFallback: 'Arial' });

export const metadata: Metadata = {
  title: `Napoli è personale — ${site.identity.name}`,
  description: 'One Club. Millions of Ways to Live It. Una proposta indipendente di digital marketing e fan experience per SSC Napoli, di Gianmarco Brandi.',
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg' },
};
export const viewport: Viewport = { themeColor: '#0879f9', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = { '--blue': site.theme.blue, '--night': site.theme.night, '--paper': site.theme.paper, '--accent': site.theme.accent, '--photo-shade': site.theme.overlay / 100, '--logo-width': `${site.theme.logoWidth}px`, '--heading-font': site.theme.display === 'sans' ? 'var(--font-manrope)' : 'var(--font-barlow)' } as CSSProperties;
  return <html lang="it" className={`${display.variable} ${body.variable}`} style={theme}><body><SiteProvider>{children}</SiteProvider></body></html>;
}
