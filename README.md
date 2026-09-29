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

## GitHub Pages

The workflow in `.github/workflows/pages.yml` builds and deploys `out/` on every push to `main`. In the repository's **Settings → Pages**, select **GitHub Actions** as the build and deployment source. The site URL is `https://giaku97.github.io/napoli-personale-gianmarco-brandi/`. The workflow sets `NEXT_PUBLIC_BASE_PATH` so Next.js routes and public assets work under the repository path. Local builds omit that variable and still run at `/`.

GitHub Pages makes the deployed site publicly accessible. The site currently sets `robots: noindex`, so search engines are asked not to index it. `pnpm check:release` still reports missing personal works, CV and contact details; review those before treating the site as a finished application portfolio.

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

The original Gianmarco logo is unchanged. Personal works, CV and public contact have not been supplied.
