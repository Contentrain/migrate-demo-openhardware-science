# AGENTS.md

A static Astro site whose content lives in [Contentrain](https://contentrain.io). Models and entries are in
`.contentrain/`, and the site reads them only through `@contentrain/query`. This file is for coding agents (Claude Code,
Codex, Cursor and others) that open the repository. People start from `README.md`.

## Commands

```bash
pnpm install
pnpm dev     # http://localhost:4321
pnpm gates   # astro check → knip → build + search index → built-site checks; must stay green after every change
```

## Where the truth lives

Read these files, not a list in this file: they are what the site builds from.

- Models (fields, kinds, i18n): `.contentrain/models/*.json`. Locales and the store's settings: `.contentrain/config.json`.
- Entries: `.contentrain/content/` and `.contentrain/meta/`. Edit them through Contentrain (below), not by hand.
- Routes: `src/site.config.ts` and `src/lib/site-routes.ts` (the route table); the views under `src/views/`, a composed
  page's sections in `src/views/composed/index.ts`.
- Components: `src/components/` (the starter's), `src/components/site/` (this site's own, when it has any), and the kit
  components from `@contentrain/astro-kit`.
- Interface text: the `ui-strings` model, one dictionary per locale; no label is written in a component.
- How code is written here: `STARTER.md` § Conventions (content only through the loader, tokens first, no JavaScript by
  default, interface text is content). Follow it; `pnpm gates` checks most of it.

## Editing content with Contentrain

`.mcp.json` registers the Contentrain MCP server (`npx contentrain serve --stdio`; the first use downloads the
`contentrain` CLI). Use `contentrain_status` and `contentrain_describe` for the live view of models and entries, and
its tools to add or change content and models. This project's workflow is `review` (`.contentrain/config.json`): each
write is committed on its own `cr/…` review branch and, when the repository has a remote, **pushed to it**;
`contentrain_merge` (or Studio, when connected) merges it into the `contentrain` branch. To keep writes local, set
`"git": { "push": false }` in `.contentrain/config.json`, or `CONTENTRAIN_NO_PUSH=1` for one run. The Contentrain agent
rules and skills are not installed in this repository;
`npx skills add Contentrain/ai/packages/skills` adds them.

## This site

The block below is written once, when the site is generated. It is a snapshot: the files above are the truth, and
Studio does not update this block.

<!-- contentrain-migrate:begin -->
Snapshot at migration 2026-11-07, starter `6bd346d8`. The files above are the truth; this block is not updated by Studio.

### Models

- `authors`: collection
- `categories`: collection
- `contact-gosh-manifesto`: collection
- `contact`: collection
- `home-extras`: singleton, one entry set per language
- `media`: collection
- `menu-items`: collection
- `menus`: collection
- `page-2016participants`: singleton, one entry set per language
- `page-2018-program`: singleton, one entry set per language
- `page-2019-gl-gosh-faq`: singleton, one entry set per language
- `page-2019-gl-gosh-hackathon`: singleton, one entry set per language
- `page-2019-gl-gosh-program`: singleton, one entry set per language
- `page-2021-gosh-community-council-elections`: singleton, one entry set per language
- `page-2021-research-funding-salons`: singleton, one entry set per language
- `page-2022-gosh-community-council-election`: singleton, one entry set per language
- `page-2023-gosh-community-council-election`: singleton, one entry set per language
- `page-2024-gosh-community-council-election`: singleton, one entry set per language
- `page-2025-gosh-community-council-election`: singleton, one entry set per language
- `page-5152-2`: singleton, one entry set per language
- `page-5752-2`: singleton, one entry set per language
- `page-about`: singleton, one entry set per language
- `page-ambassador-program`: singleton, one entry set per language
- `page-apply`: singleton, one entry set per language
- `page-bangla`: singleton, one entry set per language
- `page-budget`: singleton, one entry set per language
- `page-cern-logistics`: singleton, one entry set per language
- `page-chinese`: singleton, one entry set per language
- `page-collaborative-development-programme`: singleton, one entry set per language
- `page-communities`: singleton, one entry set per language
- `page-community-calls`: singleton, one entry set per language
- `page-contact-us`: singleton, one entry set per language
- `page-deutsch`: singleton, one entry set per language
- `page-forum`: singleton, one entry set per language
- `page-french`: singleton, one entry set per language
- `page-gatherings`: singleton, one entry set per language
- `page-global-open-science-hardware-roadmap`: singleton, one entry set per language
- `page-gosh-2016-day-1-grand-challenges`: singleton, one entry set per language
- `page-gosh-2016-day-2-enabling-solutions`: singleton, one entry set per language
- `page-gosh-2016-day-3-sharing-what-we-know`: singleton, one entry set per language
- `page-gosh-2016-day-4-crowdfunding-science`: singleton, one entry set per language
- `page-gosh-2016`: singleton, one entry set per language
- `page-gosh-2017-report`: singleton, one entry set per language
- `page-gosh-2017`: singleton, one entry set per language
- `page-gosh-2018-2`: singleton, one entry set per language
- `page-gosh-2018-faqs`: singleton, one entry set per language
- `page-gosh-2018-participants`: singleton, one entry set per language
- `page-gosh-2022-research-and-policy-writing-workshops`: singleton, one entry set per language
- `page-gosh-2026-kathmandu-nepal`: singleton, one entry set per language
- `page-gosh-ambassador-program`: singleton, one entry set per language
- `page-gosh-code-of-conduct`: singleton, one entry set per language
- `page-gosh-community-ambassador-handbook`: singleton, one entry set per language
- `page-gosh-community-call-open-science-hardware-for-marine-applications-interest-form`: singleton, one entry set per language
- `page-gosh-community-events-framework`: singleton, one entry set per language
- `page-gosh-history`: singleton, one entry set per language
- `page-gosh-manifesto`: singleton, one entry set per language
- `page-gosh-social-media-information-form`: singleton, one entry set per language
- `page-gosh-writing-sprints-2021-2022`: singleton, one entry set per language
- `page-gosh2019`: singleton, one entry set per language
- `page-governance-structure`: singleton, one entry set per language
- `page-governance`: singleton, one entry set per language
- `page-great-lakes-gosh-2019`: singleton, one entry set per language
- `page-home`: singleton, one entry set per language
- `page-japan`: singleton, one entry set per language
- `page-logistics`: singleton, one entry set per language
- `page-media`: singleton, one entry set per language
- `page-newsletter`: singleton, one entry set per language
- `page-oh-lit-review`: singleton, one entry set per language
- `page-participants`: singleton, one entry set per language
- `page-policy-briefs`: singleton, one entry set per language
- `page-portuguese`: singleton, one entry set per language
- `page-programs`: singleton, one entry set per language
- `page-public-policy-workshop-2020`: singleton, one entry set per language
- `page-public-policy-workshop`: singleton, one entry set per language
- `page-regional-events-programme`: singleton, one entry set per language
- `page-schedule-2`: singleton, one entry set per language
- `page-schedule`: singleton, one entry set per language
- `page-science-events`: singleton, one entry set per language
- `page-sign-manifesto-entries`: singleton, one entry set per language
- `page-spanish`: singleton, one entry set per language
- `page-stem-workshops`: singleton, one entry set per language
- `page-welcome-calls`: singleton, one entry set per language
- `page-why-gosh`: singleton, one entry set per language
- `pages`: collection
- `posts`: collection
- `redirects`: collection
- `site`: singleton
- `tags`: collection
- `ui-strings`: dictionary, one entry set per language

### Routes

- `home` `/`: `src/views/composed/PageHome.astro`, model `page-home`
- `blog` `/blog/`: `src/views/ListView.astro`, model `pages`
- `post` `/:year/:month/:day/:slug/`: `src/views/PostView.astro`, model `posts`
- `page-gosh-2017` `/:path/`: `src/views/composed/PageGosh2017.astro`, model `page-gosh-2017`
- `page-forum` `/:path/`: `src/views/composed/PageForum.astro`, model `page-forum`
- `page-gosh-2016-day-4-crowdfunding-science` `/:path/`: `src/views/composed/PageGosh2016Day4CrowdfundingScience.astro`, model `page-gosh-2016-day-4-crowdfunding-science`
- `page-schedule-2` `/:path/`: `src/views/composed/PageSchedule2.astro`, model `page-schedule-2`
- `page-gosh-2016-day-1-grand-challenges` `/:path/`: `src/views/composed/PageGosh2016Day1GrandChallenges.astro`, model `page-gosh-2016-day-1-grand-challenges`
- `page-gosh-2016-day-2-enabling-solutions` `/:path/`: `src/views/composed/PageGosh2016Day2EnablingSolutions.astro`, model `page-gosh-2016-day-2-enabling-solutions`
- `page-gosh-2016-day-3-sharing-what-we-know` `/:path/`: `src/views/composed/PageGosh2016Day3SharingWhatWeKnow.astro`, model `page-gosh-2016-day-3-sharing-what-we-know`
- `page-2016participants` `/:path/`: `src/views/composed/Page2016participants.astro`, model `page-2016participants`
- `page-why-gosh` `/:path/`: `src/views/composed/PageWhyGosh.astro`, model `page-why-gosh`
- `page-about` `/:path/`: `src/views/composed/PageAbout.astro`, model `page-about`
- `page-contact-us` `/:path/`: `src/views/composed/PageContactUs.astro`, model `page-contact-us`
- `page-gosh-manifesto` `/:path/`: `src/views/composed/PageGoshManifesto.astro`, model `page-gosh-manifesto`
- `page-spanish` `/:path/`: `src/views/composed/PageSpanish.astro`, model `page-spanish`
- `page-french` `/:path/`: `src/views/composed/PageFrench.astro`, model `page-french`
- `page-portuguese` `/:path/`: `src/views/composed/PagePortuguese.astro`, model `page-portuguese`
- `page-chinese` `/:path/`: `src/views/composed/PageChinese.astro`, model `page-chinese`
- `page-gosh-code-of-conduct` `/:path/`: `src/views/composed/PageGoshCodeOfConduct.astro`, model `page-gosh-code-of-conduct`
- `page-gosh-2016` `/:path/`: `src/views/composed/PageGosh2016.astro`, model `page-gosh-2016`
- `page-cern-logistics` `/:path/`: `src/views/composed/PageCernLogistics.astro`, model `page-cern-logistics`
- `page-schedule` `/:path/`: `src/views/composed/PageSchedule.astro`, model `page-schedule`
- `page-participants` `/:path/`: `src/views/composed/PageParticipants.astro`, model `page-participants`
- `page-budget` `/:path/`: `src/views/composed/PageBudget.astro`, model `page-budget`
- `page-logistics` `/:path/`: `src/views/composed/PageLogistics.astro`, model `page-logistics`
- `page-japan` `/:path/`: `src/views/composed/PageJapan.astro`, model `page-japan`
- `page-media` `/:path/`: `src/views/composed/PageMedia.astro`, model `page-media`
- `page-bangla` `/:path/`: `src/views/composed/PageBangla.astro`, model `page-bangla`
- `page-gosh-2017-report` `/:path/`: `src/views/composed/PageGosh2017Report.astro`, model `page-gosh-2017-report`
- `page-gosh-2018-2` `/:path/`: `src/views/composed/PageGosh20182.astro`, model `page-gosh-2018-2`
- `page-gatherings` `/:path/`: `src/views/composed/PageGatherings.astro`, model `page-gatherings`
- `page-global-open-science-hardware-roadmap` `/:path/`: `src/views/composed/PageGlobalOpenScienceHardwareRoadmap.astro`, model `page-global-open-science-hardware-roadmap`
- `page-gosh-2018-faqs` `/:path/`: `src/views/composed/PageGosh2018Faqs.astro`, model `page-gosh-2018-faqs`
- `page-gosh-2018-participants` `/:path/`: `src/views/composed/PageGosh2018Participants.astro`, model `page-gosh-2018-participants`
- `page-2018-program` `/:path/`: `src/views/composed/Page2018Program.astro`, model `page-2018-program`
- `page-gosh2019` `/:path/`: `src/views/composed/PageGosh2019.astro`, model `page-gosh2019`
- `page-great-lakes-gosh-2019` `/:path/`: `src/views/composed/PageGreatLakesGosh2019.astro`, model `page-great-lakes-gosh-2019`
- `page-2019-gl-gosh-program` `/:path/`: `src/views/composed/Page2019GlGoshProgram.astro`, model `page-2019-gl-gosh-program`
- `page-2019-gl-gosh-hackathon` `/:path/`: `src/views/composed/Page2019GlGoshHackathon.astro`, model `page-2019-gl-gosh-hackathon`
- `page-2019-gl-gosh-faq` `/:path/`: `src/views/composed/Page2019GlGoshFaq.astro`, model `page-2019-gl-gosh-faq`
- `page-gosh-history` `/:path/`: `src/views/composed/PageGoshHistory.astro`, model `page-gosh-history`
- `page-public-policy-workshop` `/:path/`: `src/views/composed/PagePublicPolicyWorkshop.astro`, model `page-public-policy-workshop`
- `page-gosh-writing-sprints-2021-2022` `/:path/`: `src/views/composed/PageGoshWritingSprints20212022.astro`, model `page-gosh-writing-sprints-2021-2022`
- `page-2021-gosh-community-council-elections` `/:path/`: `src/views/composed/Page2021GoshCommunityCouncilElections.astro`, model `page-2021-gosh-community-council-elections`
- `page-2021-research-funding-salons` `/:path/`: `src/views/composed/Page2021ResearchFundingSalons.astro`, model `page-2021-research-funding-salons`
- `page-community-calls` `/:path/`: `src/views/composed/PageCommunityCalls.astro`, model `page-community-calls`
- `page-gosh-community-events-framework` `/:path/`: `src/views/composed/PageGoshCommunityEventsFramework.astro`, model `page-gosh-community-events-framework`
- `page-policy-briefs` `/:path/`: `src/views/composed/PagePolicyBriefs.astro`, model `page-policy-briefs`
- `page-governance-structure` `/:path/`: `src/views/composed/PageGovernanceStructure.astro`, model `page-governance-structure`
- `page-newsletter` `/:path/`: `src/views/composed/PageNewsletter.astro`, model `page-newsletter`
- `page-communities` `/:path/`: `src/views/composed/PageCommunities.astro`, model `page-communities`
- `page-5152-2` `/:path/`: `src/views/composed/Page51522.astro`, model `page-5152-2`
- `page-gosh-2022-research-and-policy-writing-workshops` `/:path/`: `src/views/composed/PageGosh2022ResearchAndPolicyWritingWorkshops.astro`, model `page-gosh-2022-research-and-policy-writing-workshops`
- `page-deutsch` `/:path/`: `src/views/composed/PageDeutsch.astro`, model `page-deutsch`
- `page-2022-gosh-community-council-election` `/:path/`: `src/views/composed/Page2022GoshCommunityCouncilElection.astro`, model `page-2022-gosh-community-council-election`
- `page-welcome-calls` `/:path/`: `src/views/composed/PageWelcomeCalls.astro`, model `page-welcome-calls`
- `page-gosh-social-media-information-form` `/:path/`: `src/views/composed/PageGoshSocialMediaInformationForm.astro`, model `page-gosh-social-media-information-form`
- `page-public-policy-workshop-2020` `/:path/`: `src/views/composed/PagePublicPolicyWorkshop2020.astro`, model `page-public-policy-workshop-2020`
- `page-5752-2` `/:path/`: `src/views/composed/Page57522.astro`, model `page-5752-2`
- `page-oh-lit-review` `/:path/`: `src/views/composed/PageOhLitReview.astro`, model `page-oh-lit-review`
- `page-programs` `/:path/`: `src/views/composed/PagePrograms.astro`, model `page-programs`
- `page-regional-events-programme` `/:path/`: `src/views/composed/PageRegionalEventsProgramme.astro`, model `page-regional-events-programme`
- `page-governance` `/:path/`: `src/views/composed/PageGovernance.astro`, model `page-governance`
- `page-2023-gosh-community-council-election` `/:path/`: `src/views/composed/Page2023GoshCommunityCouncilElection.astro`, model `page-2023-gosh-community-council-election`
- `page-gosh-community-call-open-science-hardware-for-marine-applications-interest-form` `/:path/`: `src/views/composed/PageGoshCommunityCallOpenScienceHardwareForMarineApplicationsInterestForm.astro`, model `page-gosh-community-call-open-science-hardware-for-marine-applications-interest-form`
- `page-gosh-ambassador-program` `/:path/`: `src/views/composed/PageGoshAmbassadorProgram.astro`, model `page-gosh-ambassador-program`
- `page-2024-gosh-community-council-election` `/:path/`: `src/views/composed/Page2024GoshCommunityCouncilElection.astro`, model `page-2024-gosh-community-council-election`
- `page-gosh-community-ambassador-handbook` `/:path/`: `src/views/composed/PageGoshCommunityAmbassadorHandbook.astro`, model `page-gosh-community-ambassador-handbook`
- `page-science-events` `/:path/`: `src/views/composed/PageScienceEvents.astro`, model `page-science-events`
- `page-stem-workshops` `/:path/`: `src/views/composed/PageStemWorkshops.astro`, model `page-stem-workshops`
- `page-collaborative-development-programme` `/:path/`: `src/views/composed/PageCollaborativeDevelopmentProgramme.astro`, model `page-collaborative-development-programme`
- `page-apply` `/:path/`: `src/views/composed/PageApply.astro`, model `page-apply`
- `page-2025-gosh-community-council-election` `/:path/`: `src/views/composed/Page2025GoshCommunityCouncilElection.astro`, model `page-2025-gosh-community-council-election`
- `page-gosh-2026-kathmandu-nepal` `/:path/`: `src/views/composed/PageGosh2026KathmanduNepal.astro`, model `page-gosh-2026-kathmandu-nepal`
- `page-ambassador-program` `/:path/`: `src/views/composed/PageAmbassadorProgram.astro`, model `page-ambassador-program`
- `page-sign-manifesto-entries` `/:path/`: `src/views/composed/PageSignManifestoEntries.astro`, model `page-sign-manifesto-entries`
- `page` `/:path/`: `src/views/PageView.astro`, model `pages`
- `category` `/category/:path/`: `src/views/ListView.astro`, model `categories`
- `tag` `/tag/:slug/`: `src/views/ListView.astro`, model `tags`

### Site components

- `src/components/site/ToolsetViewsViewEditor.astro`

### Interface strings

- `.contentrain/content/site/ui-strings/<locale>.json`, locales: `en`
<!-- contentrain-migrate:end -->
