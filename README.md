> **Content credit:** All content in this repository comes from [openhardware.science](https://openhardware.science) by the **Gathering for Open Science Hardware (GOSH)**. It is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) unless otherwise stated on the original page. This is an independent reference migration: the content is adapted from the source (moved into typed models, with the changes listed below). For the current site, visit [openhardware.science](https://openhardware.science).
>
> **Not affiliated with or endorsed by GOSH.** The GOSH logos and the partner logos on the site's pages are trademarks of their owners; CC BY does not cover them.

# openhardware.science → Astro + Git (a reference migration)

Migrated from [openhardware.science](https://openhardware.science) with [Contentrain Migrate](https://migrate.contentrain.io) (Early Access).

The source is a WordPress site built with the Cornerstone builder, AIOSEO and WPForms. The output is a static [Astro](https://astro.build) site. Its content lives in `.contentrain/` as typed models, so you can edit it as files, through any MCP-capable AI agent, or in Contentrain Studio.

This repository is the run's output with these changes:
- third-party items removed ([REDACTIONS.md](REDACTIONS.md));
- personal email addresses removed;
- the starter's own README moved to `STARTER.md`, and this README plus `LICENSE` added;
- `scripts/check-dist.mjs` and one `knip.json` line updated to the starter's current version, for CI false positives this site surfaced ([Contentrain/ai#752](https://github.com/Contentrain/ai/pull/752), [#753](https://github.com/Contentrain/ai/pull/753));
- `lighthouserc.json`: four pages get a floor equal to their measured score, in the one category the report names for them (item 3 below); every other page and category stays at 1.

Nothing else was edited by hand.

Live source: https://openhardware.science

## At a glance

| | |
|---|---|
| Posts / pages | 179 / 75 |
| Categories / tags | 18 / 14 |
| Media files | 1,410 in the run; 1,326 in this repo: the 23 redactions took out 85 files (each original with its WordPress-generated size variants, plus 14 PDFs) and added 1 placeholder image |
| Old URLs kept or redirected | 613 redirects (572 attachment pages, 41 feed and sitemap addresses) |
| Run time | 86 minutes, of which the gates took 19 |
| Run date | 2026-11-07 |

## The gates

Every run is checked against the live source before delivery. Hard gates block a delivery; soft gates are reported.

| Gate | Tier | Result |
|---|---|---|
| Text matches the source | hard | 285/287 URLs. 2 pages are named in the report (below) |
| SEO (titles, descriptions, canonicals, structured data) | hard | 254/254 URLs |
| Every old URL answers (pages, posts, archives) | hard | 287/287 URLs |
| Redirects | hard | 613/613 kept |
| `astro check` | hard | 0 errors, 0 warnings |
| Content read only through `@contentrain/query`, models editable in Studio | hard | pass |
| Links | soft | 287/287 URLs |
| Structure | soft | 275/275 URLs |
| Interactions (menus, tabs, accordions, sliders, forms, buttons) | soft | work at 390 and 1280 px on 12 pages |
| Lighthouse CI | soft | passes on 5 pages; 4 pages score under 1, each for wording that is on the source (below) |
| Visual similarity to the source | soft | median 0.91 desktop / 0.88 mobile |
| No WordPress runtime, no third-party script | soft | pass |

Because a hard gate ended at 285/287, the run went to a person before delivery, and was approved with these pages named. What the report names:

1. **/gosh-manifesto/**: the language-switcher line and the list of signatory countries differ from the source.
2. **/gosh-2017/logistics/**: a section stops at the hostel rates table (6,435 of 11,046 characters).
3. **Lighthouse**: four pages score under 1 because of the source's own link wording, which the migration keeps word for word and the report states:
   - `/`: SEO 0.92, one link reads "aquí".
   - /2021-gosh-community-council-elections/: SEO 0.92, links read "here".
   - /2022-gosh-community-council-election/: SEO 0.92, links read "here".
   - /2021-research-funding-salons/: SEO 0.92 (a "here" link) and accessibility 0.96 (one link with no name).

   The CI floors in `lighthouserc.json` are lowered for exactly these pages and categories; everything else must score 1.
4. **Visual**: the tag and category archives and the Kathmandu page score low against the source's look. These are the modernised list layouts; their content is checked by the other gates.

## Run it

```bash
pnpm install
pnpm dev     # http://localhost:4321
pnpm gates   # astro check → knip → build + search index → built-site checks
pnpm build   # static output in dist/
```

You need Node 22.12 or later and pnpm. No database or server is required. `dist/` can go to any static host. Redirects ship as `_redirects` for Netlify and Cloudflare Pages. The build makes no request to openhardware.science.

## Where things are

| Path | What |
|---|---|
| `.contentrain/models/` | Content models (posts, pages, authors, menus, redirects, …) |
| `.contentrain/content/` | The migrated content |
| `.contentrain/migrate/` | The hand-off file: what moved, what waits for Studio, and the media manifest |
| `src/` | Astro pages, views and components |
| `STARTER.md` | How the Astro starter works (routes, SEO, gates) |
| `AGENTS.md`, `.mcp.json` | Instructions and the Contentrain MCP server for coding agents |

## What to know

- **The design is modernised, not copied pixel for pixel.** Content, URLs, SEO and interactions are kept. The layout is rebuilt from components.
- **Forms:** the site's forms are kept as form models with their fields. They take submissions once the site is connected to Contentrain Studio; until then each form says so.
- **Comments:** the one approved comment is exported with the delivery, not committed to Git.
- **Very large files:** one PDF over 50 MB was not copied; the site links to it on openhardware.science.
- **Personal email addresses** in posts and pages are replaced with "[email removed]"; see the original page. Organisation addresses are kept.
- **Out of scope:** WooCommerce and other shop features.

## Redactions

23 third-party or private items were removed or replaced: images under a non-commercial licence, texts reposted with permission, uncredited third-party photos, session abstracts by named authors, and GOSH's budget and reimbursement paperwork. Together they took out 85 media files: each removed image goes with the size variants WordPress generated for it (for example `-100x67`, `-300x200`, `-768x512`), plus 14 PDFs; one placeholder image stands in for the removed images, so the repo holds 1,410 − 85 + 1 = 1,326. Each item is listed in [REDACTIONS.md](REDACTIONS.md) with its source page; PDFs that were removed are linked on openhardware.science. The numbers above are from the full run.

## License

- **Content:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), © Gathering for Open Science Hardware (GOSH), openhardware.science, and its authors, unless otherwise stated on the original page. Items that keep a different licence carry their credit line where they appear, as on the source (for example CC BY-SA images and The Conversation's CC BY-ND text, kept verbatim).
- **Logos:** trademarks of their owners, not covered by CC BY.
- **Code:** MIT, © 2026 Contentrain. The Astro starter comes from [Contentrain/ai](https://github.com/Contentrain/ai); see `LICENSE`.
