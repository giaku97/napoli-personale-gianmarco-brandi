# Modificare Napoli è personale

Apri **/studio/** sullo stesso sito. Nel piè di pagina trovi anche “Modifica il sito”.

1. **Testi**: scegli una sezione, cerca un testo o cliccalo nell’anteprima. Sono disponibili 198 campi, inclusi scenari, rubriche, fan journey e KPI.
2. **Immagini**: sostituisci fotografie, regola l’inquadratura verticale e completa descrizione, autore, fonte e licenza.
3. **Brand**: scegli una palette, personalizza colori e caratteri, regola il fondo sulle foto e carica una versione originale del tuo logo. Nessun ritocco o ricolorazione automatica del logo.
4. **Lavori**: “Aggiungi un lavoro”, carica l’immagine e inserisci titolo, ruolo, anno, descrizione, crediti e link. Conferma ruolo e crediti per mostrarlo. Senza titolo, ruolo e immagine la scheda non compare. Puoi riordinare e rimuovere i progetti; “Annulla” recupera la modifica precedente.
5. **Contatti**: nome, email pubblica e collegamenti HTTPS a CV e portfolio. I campi vuoti non compaiono.

**Salva bozza** conserva i contenuti e le immagini in questo browser, su questo dispositivo. Non aggiorna il sito online e non sincronizza altri computer. La modalità privata del browser o la cancellazione dei dati può eliminare la bozza: esporta una copia per conservarla.

**Esporta progetto** scarica `napoli-personale-progetto.json`, comprensivo delle immagini caricate. Allegalo alla conversazione con Codex chiedendo di applicarlo e ripubblicare il sito. **Importa progetto** riapre la stessa copia nell’editor. Le modifiche importate diventano permanenti nel browser solo dopo “Salva bozza”.

Le immagini caricate devono essere PNG, JPEG, WebP o GIF, fino a 8 MB ciascuna; il progetto completo è limitato a 40 MB. Gli originali caricati vengono conservati senza ricompressione. Per filmati e PDF locali, consegna i file a Codex per l’integrazione: l’editor corrente gestisce immagini e collegamenti al CV.

## Manutenzione dei sorgenti

`src/content/site.json` è la configurazione pubblicata: testi, identità, lavori, fotografie e tema. Sostituiscila soltanto con un’esportazione convalidata nell’editor. Prima del commit estrai gli upload base64 in file locali tramite `node scripts/materialize-content.mjs`, così non vengono ripetuti nel codice della pagina. Gli originali rimangono invariati e vengono registrati con hash.

`src/content/original-texts.json` conserva il confronto con il copy iniziale: non sovrascriverlo durante un’importazione. Permette di usare la formattazione originale quando il testo non cambia e di rendere il nuovo testo anche nella pagina statica, senza JavaScript. `experience-data.ts` mantiene gli identificatori delle interazioni; i campi editoriali degli scenari sono in `site.json`.

La struttura delle sezioni e la logica delle simulazioni restano componenti Next.js. Il pannello è un editor di contenuti e brand con esportazione, non un CMS con pubblicazione diretta o autenticazione autonoma. Conservare l’accesso Sites esistente.

Dopo un’importazione: `pnpm typecheck`, `pnpm build`, `pnpm qa`, `node scripts/qa-studio.mjs`. Verificare anche immagini, crediti, link e contrasto dei colori scelti. `pnpm check:release` distingue il concept funzionante dalla candidatura completa, che richiede CV, recapito e lavori reali.
