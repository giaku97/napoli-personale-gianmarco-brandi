# Modificare Napoli è personale

Apri `/studio/` sul sito pubblico. Le schede **Testi**, **Immagini**, **Brand** e **Contatti** modificano i contenuti già presenti. Nella scheda **Lavori** puoi:

1. Aprire un progetto e cambiare categoria, titoli, descrizioni e crediti in italiano e inglese.
2. Aggiungere immagini e video, scrivere testi alternativi e didascalie, impostare il poster di un video e cambiare l'ordine dei media.
3. Cambiare l'ordine dei progetti e scegliere quali sono verificati e visibili.

La bozza si salva **solo nel tuo browser**. Non cambia il sito pubblico. Per pubblicarla, clicca **Esporta progetto** e allega il file `napoli-personale-progetto.json` a Codex chiedendo di aggiornare e pubblicare il sito. **Importa progetto** riapre una copia nell'editor.

## Nuovi file

Il sito pubblico può leggere solo file presenti nella repository. Aggiungi quindi immagini WebP o video MP4 in `public/assets/portfolio/` (puoi chiedere a Codex di farlo). In Studio, inserisci il percorso che comincia con `/assets/portfolio/`, per esempio `/assets/portfolio/nuova-immagine.webp`. Per un video, indica anche il poster WebP. Il prefisso GitHub Pages viene aggiunto automaticamente.

Puoi anche caricare immagini direttamente nell'editor per una bozza. Prima della pubblicazione, le immagini incorporate nel JSON devono essere trasformate in file statici con `node scripts/materialize-content.mjs`; poi vanno eseguiti `pnpm typecheck`, `pnpm lint`, `pnpm build` e i controlli visivi. Il video si aggiunge come file MP4 nella repository, non tramite upload nell'editor.

I file originali sul Desktop restano invariati. Il logo personale pubblicato è identico all'originale. Il manifest `ASSET_MANIFEST.md` registra le copie web. Il logotipo Kalesia non è pubblicato perché il PDF non identifica quale variante sia stata accettata.
