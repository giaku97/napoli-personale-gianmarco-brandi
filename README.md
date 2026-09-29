# Napoli è personale

An independent, bilingual digital-marketing and fan-experience concept by Gianmarco Brandi for an SSC Napoli application. Built with Next.js 16, TypeScript, Tailwind CSS and Framer Motion; exported as a static Site. This is a speculative concept and has no Club systems or live data.

## Run and verify

Requires Node.js 20.9+ and pnpm. From this directory:

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
node scripts/serve.mjs
```

The production preview is `http://127.0.0.1:4173`. In a second terminal run `pnpm qa`; results and four full-page screenshots are written to `../qa`. `pnpm check:release` checks asset integrity and intentionally reports missing personal materials. The static export is `out/`.

## Edit

Open `/studio/` for Italian/English copy, photography, theme, work records and public contacts. The editor saves drafts locally in IndexedDB. Export the project JSON and apply it to `src/content/site.json` before rebuilding and publishing. The public site does not link to Studio. Verified work appears only when `portfolioEnabled` is true and the record has a real image, alt, title, role and description.

The public demo stores name, choices, captions and optional user image only in page memory. Reloading clears them. The optional community checkbox does not send data or publish anything. All funnel values are illustrative editable assumptions.

## Project references

- `SITE_MAP.md`: page and editor architecture
- `CONTENT_MAP.md`: bilingual keys and editable content
- `DESIGN_SYSTEM.md` and `MOTION_SYSTEM.md`: visual and interaction rules
- `ASSET_MANIFEST.md`, `SOURCE_OF_TRUTH.md`, `FACTS_LOCKED.md`: provenance and editorial boundaries
- `ROLE_COVERAGE_MATRIX.md`: internal role coverage, with unproven experience explicitly marked
- `FINAL_CRITIQUE.md` and `FINAL_IMPROVEMENT_PLAN.md`: quality assessment and remaining editorial inputs

The original Gianmarco logo is unchanged. Personal works, CV and public contact have not been supplied, so this deployment remains an owner-private review artifact. Do not turn it into a public application link without completing those inputs and checking access.
