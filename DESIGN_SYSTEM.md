# Design system — Napoli è personale

The visual language is editorial sport: monumental condensed type, sharp grids, licensed photography, bold fields of blue and white, and restrained product surfaces. It avoids generic SaaS cards in the public story. The visual progression is stadium/night → white idea → dark NOW → pale My Napoli → high-energy blue TOGETHER → dark personal Wrapped → paper strategy → bright 90 days → dark author reveal.

## Tokens and type

| Role | Default |
|---|---|
| Primary blue | `#0068b8`, editable through Studio |
| Night | `#061b2c`, editable |
| Paper | `#f4f6f8`, editable |
| Light accent | `#8ed6ff`, editable |
| Display | Barlow Condensed 700/800, local Fontsource |
| Body | Manrope 400–800, local Fontsource |

Display text scales from roughly 58px to 136px in the story, with a larger fluid hero. Body copy is typically 16–22px; metadata is 12–14px. The hero and section headings use controlled line breaks from localized content. Main content has a 1500px width cap and responsive outer margins. Mobile stacks major grids and retains the interactive location choice above the first scroll.

## Components and behavior

- Sticky compact header with native-anchor navigation, mobile menu and IT/EN language controls.
- Full-bleed contextual photography with CSS overlay for contrast; three credited source images and responsive AVIF/WebP derivatives.
- NOW three-state panel, My Napoli card and controls, optional session-only moment composer, downloadable typographic social frame, five-step Wrapped stage and editable funnel.
- Text editing, image/brand settings, work archive, contacts and live preview are in separate `/studio/`. The public page contains no editor affordance.
- Original Gianmarco logo is rendered at its native aspect ratio. It is never filtered, recolored, redrawn or saved as a new derivative.

## Accessibility and media

Semantic sections and headings, associated labels/legends, keyboard-operable buttons, visible focus, skip link, selected states, live feedback, photo alt text and reduced-motion support are required. Contrast-sensitive small text uses white or dark ink rather than saturated blue on white. QA covers 390/768/1440/1920px. The image credits disclose provenance and no Club endorsement.
