# Content map

`src/content/site.json` is the publishable editorial source. Its `texts` are Italian and `translations` are English. `src/content/locales/it.json` and `en.json` hold the checked default copy. Keys are parallel; `src/content/text-groups.json` assigns each key to an editor section. The editor can change both languages and preview them, then export a validated project JSON.

| Key prefix | Public location | Editorial purpose |
|---|---|---|
| nav, hero | navigation and first screen | identity, independent status, entry choice |
| idea | big idea | frame the proposition without claiming knowledge of Club data |
| now | NOW | timing and three match phases |
| card | My Napoli | declared preferences and card demonstration |
| together | TOGETHER | voluntary moment, consent concept, community format |
| yours, loop | YOURS | deterministic personal story and repeat cycle |
| strategy | strategic layer | go-to-market, assumptions, metrics, CRM and operations |
| days | 90-day approach | sequence based on discovery before implementation |
| person | author reveal | user-supplied identity, optional verified work and contacts |
| legal | footer and credits | independence, source and photo provenance |

Other editable content: `theme` colors/display/overlay/logo width; `photos` source, alt text, position and licensing; `identity` name, unmodified original logo path, verified projects, optional public contact; `portfolioEnabled` gate. `src/content/hypotheses.json` contains illustrative initial funnel assumptions. The six rate controls and exposure input can be changed in the public demo without persisting or implying real performance.

No match results, supporter counts, player content, commercial results, candidate employment history, email or CV are inferred. The legacy copy is archived in `src/content/legacy-site-content.json` for traceability and does not drive the current page.
