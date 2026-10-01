# Napoli è personale

Proposta indipendente di digital marketing e fan experience di Gianmarco Brandi per SSC Napoli. Il sito è bilingue, include una selezione di lavori reali e concept personali, e non usa dati o sistemi del Club.

## Aprire il sito

- Sito pubblico: https://giaku97.github.io/napoli-personale-gianmarco-brandi/
- Editor: https://giaku97.github.io/napoli-personale-gianmarco-brandi/studio/
- Repository: https://github.com/giaku97/napoli-personale-gianmarco-brandi

## Avvio locale

Servono Node.js 20.9+ e pnpm. Nella cartella del progetto:

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Per verificare la versione da pubblicare:

```powershell
pnpm typecheck
pnpm lint
$env:NEXT_PUBLIC_BASE_PATH='/napoli-personale-gianmarco-brandi'
pnpm build
```

Il workflow `.github/workflows/pages.yml` pubblica su GitHub Pages ogni push su `main`. Il sito è un'esportazione statica di Next.js 16, con TypeScript, Tailwind CSS e Framer Motion.

## Modificare contenuti e media

Apri `/studio/`. Nella scheda **Lavori** puoi cambiare titoli, categorie, descrizioni e crediti in italiano e inglese, aggiungere immagini o video e spostarli nell'ordine voluto. **Salva bozza** conserva le modifiche solo nel browser. **Esporta progetto** scarica un JSON: allegalo a Codex per applicarlo a `src/content/site.json`, verificare il sito e pubblicarlo.

Per aggiungere un nuovo file alla versione pubblica, copialo nella repository in `public/assets/portfolio/`, fai commit e push, poi inserisci in Studio il suo percorso, per esempio `/assets/portfolio/nuova-immagine.webp` o `/assets/portfolio/nuovo-video.mp4`. Un video può usare un poster WebP nella stessa cartella. Per pubblicare la modifica fatta in Studio, esporta il JSON e chiedi a Codex di applicarlo. Per le immagini caricate direttamente nella bozza, `node scripts/materialize-content.mjs` crea file statici prima del commit.

Il file `CONTENT_GUIDE.md` descrive il flusso in dettaglio. `ASSET_MANIFEST.md` collega ogni materiale del portfolio al suo originale. I PDF completi non sono pubblicati; il logotipo Kalesia resta escluso finché non si identifica la variante accettata. Il logo personale originale non è stato modificato.
