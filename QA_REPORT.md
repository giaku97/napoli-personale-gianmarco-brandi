# QA — revisione fotografica e Studio

Verifica del 23 settembre 2026 sul build statico Next.js, servito localmente con compressione.

## Risultato

Build e TypeScript completati. Nessun errore JavaScript rilevato nei test della pagina e dell’editor. Nessuna violazione automatica axe nelle viste desktop/mobile della pagina e nelle cinque categorie dello Studio. I test automatici non sostituiscono una certificazione di accessibilità.

- Responsive: 1440, 1024, 768, 390 e 320 px senza overflow orizzontale. Test con testo al 200% superato.
- Quattro scenari sincronizzano home, card, recap, cultura e Match Mode; selettori da tastiera, menu mobile, motion ridotto, copia e download verificati.
- Narrativa e fotografie presenti nel rendering statico senza JavaScript; prototipi ed editor richiedono JavaScript.
- Editor: modifica testi con anteprima, salvataggio IndexedDB, recupero dopo ricaricamento, caricamento logo e lavoro, ruolo/crediti, esportazione e importazione verificati.
- Il logo esportato mantiene esattamente i byte del PNG originale. Test con markup nei titoli: testo correttamente escapato. Importazione di link javascript rifiutata.
- La homepage ordinaria resta separata dalla bozza dello Studio. Salva bozza non equivale a pubblicare: il limite è indicato nel pannello e nella guida.
- Studio utilizzabile a 390 px con passaggio tra modifica e anteprima.
- Ispezione visiva: apertura desktop/mobile, scenari fotografici e Studio desktop/mobile. Varianti AVIF con fallback WebP e taglio verticale dedicato all’apertura su telefono.
- Registro SHA-256: logo personale invariato; originali fotografici e derivati documentati in assets.json e manifest. Le immagini dei test non sono nei contenuti pubblicati.

## Lighthouse mobile locale

| Voce | Risultato |
|---|---:|
| Performance | 90/100 |
| Accessibility | 100/100 |
| Best practices | 100/100 |
| SEO | 63/100 |
| First contentful paint | 0,8 s |
| Largest contentful paint | 2,5 s |
| Total blocking time | 20 ms |
| Cumulative layout shift | 0 |

SEO ridotto per noindex intenzionale durante la revisione. Misurazione di laboratorio locale, non prestazione garantita della rete di produzione. Il precedente valore 98/100 apparteneva alla versione senza fotografie ed è sostituito da questa misurazione. Il logo non è ricompresso per rispettare l’originale.

## Limiti e materiali aperti

Lo Studio salva su questo browser e dispositivo, con import/export; non contiene un backend CMS né una funzione di pubblicazione diretta. La ripubblicazione richiede applicare l’esportazione ai sorgenti e ridistribuire. Le preferenze di demo del tifoso restano soltanto in memoria.

Mancano ancora CV, contatto pubblico e lavori personali reali. check:release li segnala con exit code 2; l’integrità del logo è verificata. Nessun progetto sintetico usato nei test viene presentato come lavoro di Gianmarco.

WebMCP: contratto dell’adattatore ricontrollato con registro simulato. La verifica nativa sulla precedente versione è storica e non è stata ripetuta in questa revisione. Non è necessario per usare il sito.

Risultati: qa/qa-results.json, qa/studio-report.json e qa/lighthouse.json nella cartella outputs; immagini QA nella stessa cartella. Test eseguibili con scripts/qa.mjs e scripts/qa-studio.mjs.
