// @ts-check
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readFileSync } from 'node:fs'
import { defineConfig, fontProviders } from 'astro/config'

// The site's public address. Canonical URLs, the sitemap, RSS and JSON-LD all
// hang off it, so a migration writes the source site's own address here.
const site = 'https://openhardware.science'

// The Contentrain Studio project this site is bound to, from studio.json
// (`{ "baseUrl": "https://studio.contentrain.io", "projectId": "…" }`, plus
// `mediaBaseUrl` when Studio serves media from its own CDN host; Studio
// writes it when it moves the site's media (Migration → Media), or write it
// by hand; CONTENTRAIN_STUDIO_URL and CONTENTRAIN_STUDIO_PROJECT override it). It turns on Studio forms and
// comments, and lets astro:assets optimize the project's media
// (`<studio>/api/cdn/v1/<project>/media/…`) like the files in public/.
// Without it the site builds as usual: no forms, and Studio images are shown
// as they are.
const bound = existsSync('studio.json') ? JSON.parse(readFileSync('studio.json', 'utf8')) : {}
const studioUrl = process.env.CONTENTRAIN_STUDIO_URL ?? bound.baseUrl
const studioProject = process.env.CONTENTRAIN_STUDIO_PROJECT ?? bound.projectId
const studio = studioUrl && studioProject ? { baseUrl: String(studioUrl).replace(/\/+$/, ''), projectId: String(studioProject) } : null
// Media may be served from a CDN host of its own: `mediaBaseUrl` is the project's delivery base
// (`https://cdn.example/api/cdn/v1/<project>`); without it, Studio's own origin serves it. The file's
// base belongs to the file's project, so an environment override of either value leaves it out.
const overridden = process.env.CONTENTRAIN_STUDIO_URL !== undefined || process.env.CONTENTRAIN_STUDIO_PROJECT !== undefined
const mediaBaseUrl = overridden ? undefined : bound.mediaBaseUrl
const mediaBase = studio ? new URL(String(mediaBaseUrl ?? `${studio.baseUrl}/api/cdn/v1/${studio.projectId}`).replace(/\/+$/, '')) : undefined

const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
const LATIN_EXT = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'
// Inter's other scripts (fontsource-variable 5.3.0, the same build as the latin files). Without them Cyrillic and Greek
// text took the metric-matched Arial fallback, and only where Arial is installed. Arabic and Hebrew still do; Indic,
// Thai and CJK, which Arial lacks, reach system-ui, the face the browser picks for <html lang>.
const CYRILLIC = 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116'
const CYRILLIC_EXT = 'U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F'
const GREEK = 'U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF'
const GREEK_EXT = 'U+1F00-1FFF'
const VIETNAMESE = 'U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB'
// The local provider names no subset, so <Font preload> could only preload every file or none. This one tags the
// latin faces, BaseLayout preloads those, and a Latin page pays nothing for the rest. Only they are tagged: Astro
// writes a metric fallback face per subset, and the untagged scripts share one.
const SUBSETS = new Map([[LATIN, 'latin'], [LATIN_EXT, 'latin-ext']])
const local = fontProviders.local()
/** @type {typeof local} */
const localSubsets = {
  name: 'local-subsets',
  init: context => local.init?.(context),
  async resolveFont(options) {
    const resolved = await local.resolveFont(options)
    for (const font of resolved?.fonts ?? []) {
      const subset = SUBSETS.get(font.unicodeRange?.[0] ?? '')
      if (subset) font.meta = { ...font.meta, subset }
    }
    return resolved
  },
}

export default defineConfig({
  site,
  // WordPress addresses end in a slash; building directories keeps every old
  // URL at the same place without a redirect.
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: {
    // Hosts whose images astro:assets may download and optimize at build time.
    // The source site is never one of them: its media is copied into public/.
    domains: [],
    remotePatterns: mediaBase
      ? [{ protocol: mediaBase.protocol.slice(0, -1), hostname: mediaBase.hostname, ...(mediaBase.port ? { port: mediaBase.port } : {}), pathname: `${mediaBase.pathname}/media/**` }]
      : [],
    responsiveStyles: true,
  },
  // The source site's own fonts, self-hosted.
  fonts: [
    {
      provider: localSubsets,
      name: 'Lato',
      cssVariable: '--font-site-lato',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/site/lato-700-normal.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'] },
          { src: ['./src/assets/fonts/site/lato-700-normal-d19d49.woff2'], weight: '700', style: 'normal', unicodeRange: [LATIN] },
          { src: ['./src/assets/fonts/site/lato-900-normal.woff2'], weight: '900', style: 'normal', unicodeRange: ['U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'] },
          { src: ['./src/assets/fonts/site/lato-900-normal-9069d6.woff2'], weight: '900', style: 'normal', unicodeRange: [LATIN] },
        ],
      },
    },
    {
      provider: localSubsets,
      name: 'Open Sans',
      cssVariable: '--font-site-open-sans',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/site/open-sans-700-italic-4d6522.woff2'], weight: '700', style: 'italic', unicodeRange: ['U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F'] },
          { src: ['./src/assets/fonts/site/open-sans-700-italic-793287.woff2'], weight: '700', style: 'italic', unicodeRange: ['U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'] },
          { src: ['./src/assets/fonts/site/open-sans-700-italic-5cc4b9.woff2'], weight: '700', style: 'italic', unicodeRange: ['U+1F00-1FFF'] },
          { src: ['./src/assets/fonts/site/open-sans-700-italic-97391f.woff2'], weight: '700', style: 'italic', unicodeRange: ['U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF'] },
          { src: ['./src/assets/fonts/site/open-sans-700-italic-8bd026.woff2'], weight: '700', style: 'italic', unicodeRange: ['U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F'] },
          { src: ['./src/assets/fonts/site/open-sans-700-italic.woff2'], weight: '700', style: 'italic', unicodeRange: ['U+0302-0303, U+0305, U+0307-0308, U+0310, U+0312, U+0315, U+031A, U+0326-0327, U+032C, U+032F-0330, U+0332-0333, U+0338, U+033A, U+0346, U+034D, U+0391-03A1, U+03A3-03A9, U+03B1-03C9, U+03D1, U+03D5-03D6, U+03F0-03F1, U+03F4-03F5, U+2016-2017, U+2034-2038, U+203C, U+2040, U+2043, U+2047, U+2050, U+2057, U+205F, U+2070-2071, U+2074-209F, U+20D0-20DC, U+20E1, U+20E5-20EF, U+2100-2112, U+2114-2115, U+2117-2121, U+2123-214F, U+2190, U+2192, U+2194-21AE, U+21B0-21E5, U+21F1-21F2, U+21F4-2211, U+2213-2214, U+2216-22FF, U+2308-230B, U+2310, U+2319, U+231C-2321, U+2336-237A, U+237C, U+2395, U+239B-23B7, U+23D0, U+23DC-23E1, U+2474-2475, U+25AF, U+25B3, U+25B7, U+25BD, U+25C1, U+25CA, U+25CC, U+25FB, U+266D-266F, U+27C0-27FF, U+2900-2AFF, U+2B0E-2B11, U+2B30-2B4C, U+2BFE, U+3030, U+FF5B, U+FF5D, U+1D400-1D7FF, U+1EE00-1EEFF'] },
          { src: ['./src/assets/fonts/site/open-sans-700-italic-3785df.woff2'], weight: '700', style: 'italic', unicodeRange: ['U+0001-000C, U+000E-001F, U+007F-009F, U+20DD-20E0, U+20E2-20E4, U+2150-218F, U+2190, U+2192, U+2194-2199, U+21AF, U+21E6-21F0, U+21F3, U+2218-2219, U+2299, U+22C4-22C6, U+2300-243F, U+2440-244A, U+2460-24FF, U+25A0-27BF, U+2800-28FF, U+2921-2922, U+2981, U+29BF, U+29EB, U+2B00-2BFF, U+4DC0-4DFF, U+FFF9-FFFB, U+10140-1018E, U+10190-1019C, U+101A0, U+101D0-101FD, U+102E0-102FB, U+10E60-10E7E, U+1D2C0-1D2D3, U+1D2E0-1D37F, U+1F000-1F0FF, U+1F100-1F1AE, U+1F1E6-1F1FF, U+1F30D-1F30F, U+1F315, U+1F31C, U+1F31E, U+1F320-1F32C, U+1F336, U+1F378, U+1F37D, U+1F382, U+1F393-1F39F, U+1F3A7-1F3A8, U+1F3AC-1F3AF, U+1F3C2, U+1F3C4-1F3C6, U+1F3CA-1F3CE, U+1F3D4-1F3E0, U+1F3ED, U+1F3F1-1F3F3, U+1F3F5-1F3F7, U+1F408, U+1F415, U+1F41F, U+1F426, U+1F43F, U+1F441-1F442, U+1F444, U+1F446-1F449, U+1F44C-1F44E, U+1F453, U+1F46A, U+1F47D, U+1F4A3, U+1F4B0, U+1F4B3, U+1F4B9, U+1F4BB, U+1F4BF, U+1F4C8-1F4CB, U+1F4D6, U+1F4DA, U+1F4DF, U+1F4E3-1F4E6, U+1F4EA-1F4ED, U+1F4F7, U+1F4F9-1F4FB, U+1F4FD-1F4FE, U+1F503, U+1F507-1F50B, U+1F50D, U+1F512-1F513, U+1F53E-1F54A, U+1F54F-1F5FA, U+1F610, U+1F650-1F67F, U+1F687, U+1F68D, U+1F691, U+1F694, U+1F698, U+1F6AD, U+1F6B2, U+1F6B9-1F6BA, U+1F6BC, U+1F6C6-1F6CF, U+1F6D3-1F6D7, U+1F6E0-1F6EA, U+1F6F0-1F6F3, U+1F6F7-1F6FC, U+1F700-1F80B, U+1F810-1F847, U+1F850-1F859, U+1F860-1F887, U+1F890-1F8AD, U+1F8B0-1F8BB, U+1F8C0-1F8C1, U+1F8D0-1F8D8, U+1F900-1F90B, U+1F93B, U+1F946, U+1F984, U+1F996, U+1F9E9, U+1FA00-1FA6F, U+1FA70-1FA7C, U+1FA80-1FAC6, U+1FAC8, U+1FACC-1FADD, U+1FADF-1FAEB, U+1FAEF-1FAFA, U+1FB00-1FBFF'] },
          { src: ['./src/assets/fonts/site/open-sans-700-italic-8419eb.woff2'], weight: '700', style: 'italic', unicodeRange: ['U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'] },
          { src: ['./src/assets/fonts/site/open-sans-700-italic-ca5fa1.woff2'], weight: '700', style: 'italic', unicodeRange: ['U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'] },
          { src: ['./src/assets/fonts/site/open-sans-700-italic-0bd230.woff2'], weight: '700', style: 'italic', unicodeRange: [LATIN] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-54dc43.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-378793.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-d2c376.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+1F00-1FFF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-a5de85.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-187f7f.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-5788f6.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0302-0303, U+0305, U+0307-0308, U+0310, U+0312, U+0315, U+031A, U+0326-0327, U+032C, U+032F-0330, U+0332-0333, U+0338, U+033A, U+0346, U+034D, U+0391-03A1, U+03A3-03A9, U+03B1-03C9, U+03D1, U+03D5-03D6, U+03F0-03F1, U+03F4-03F5, U+2016-2017, U+2034-2038, U+203C, U+2040, U+2043, U+2047, U+2050, U+2057, U+205F, U+2070-2071, U+2074-209F, U+20D0-20DC, U+20E1, U+20E5-20EF, U+2100-2112, U+2114-2115, U+2117-2121, U+2123-214F, U+2190, U+2192, U+2194-21AE, U+21B0-21E5, U+21F1-21F2, U+21F4-2211, U+2213-2214, U+2216-22FF, U+2308-230B, U+2310, U+2319, U+231C-2321, U+2336-237A, U+237C, U+2395, U+239B-23B7, U+23D0, U+23DC-23E1, U+2474-2475, U+25AF, U+25B3, U+25B7, U+25BD, U+25C1, U+25CA, U+25CC, U+25FB, U+266D-266F, U+27C0-27FF, U+2900-2AFF, U+2B0E-2B11, U+2B30-2B4C, U+2BFE, U+3030, U+FF5B, U+FF5D, U+1D400-1D7FF, U+1EE00-1EEFF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-c9cd65.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0001-000C, U+000E-001F, U+007F-009F, U+20DD-20E0, U+20E2-20E4, U+2150-218F, U+2190, U+2192, U+2194-2199, U+21AF, U+21E6-21F0, U+21F3, U+2218-2219, U+2299, U+22C4-22C6, U+2300-243F, U+2440-244A, U+2460-24FF, U+25A0-27BF, U+2800-28FF, U+2921-2922, U+2981, U+29BF, U+29EB, U+2B00-2BFF, U+4DC0-4DFF, U+FFF9-FFFB, U+10140-1018E, U+10190-1019C, U+101A0, U+101D0-101FD, U+102E0-102FB, U+10E60-10E7E, U+1D2C0-1D2D3, U+1D2E0-1D37F, U+1F000-1F0FF, U+1F100-1F1AE, U+1F1E6-1F1FF, U+1F30D-1F30F, U+1F315, U+1F31C, U+1F31E, U+1F320-1F32C, U+1F336, U+1F378, U+1F37D, U+1F382, U+1F393-1F39F, U+1F3A7-1F3A8, U+1F3AC-1F3AF, U+1F3C2, U+1F3C4-1F3C6, U+1F3CA-1F3CE, U+1F3D4-1F3E0, U+1F3ED, U+1F3F1-1F3F3, U+1F3F5-1F3F7, U+1F408, U+1F415, U+1F41F, U+1F426, U+1F43F, U+1F441-1F442, U+1F444, U+1F446-1F449, U+1F44C-1F44E, U+1F453, U+1F46A, U+1F47D, U+1F4A3, U+1F4B0, U+1F4B3, U+1F4B9, U+1F4BB, U+1F4BF, U+1F4C8-1F4CB, U+1F4D6, U+1F4DA, U+1F4DF, U+1F4E3-1F4E6, U+1F4EA-1F4ED, U+1F4F7, U+1F4F9-1F4FB, U+1F4FD-1F4FE, U+1F503, U+1F507-1F50B, U+1F50D, U+1F512-1F513, U+1F53E-1F54A, U+1F54F-1F5FA, U+1F610, U+1F650-1F67F, U+1F687, U+1F68D, U+1F691, U+1F694, U+1F698, U+1F6AD, U+1F6B2, U+1F6B9-1F6BA, U+1F6BC, U+1F6C6-1F6CF, U+1F6D3-1F6D7, U+1F6E0-1F6EA, U+1F6F0-1F6F3, U+1F6F7-1F6FC, U+1F700-1F80B, U+1F810-1F847, U+1F850-1F859, U+1F860-1F887, U+1F890-1F8AD, U+1F8B0-1F8BB, U+1F8C0-1F8C1, U+1F8D0-1F8D8, U+1F900-1F90B, U+1F93B, U+1F946, U+1F984, U+1F996, U+1F9E9, U+1FA00-1FA6F, U+1FA70-1FA7C, U+1FA80-1FAC6, U+1FAC8, U+1FACC-1FADD, U+1FADF-1FAEB, U+1FAEF-1FAFA, U+1FB00-1FBFF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-fa05f5.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-15e4e1.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal.woff2'], weight: '400', style: 'normal', unicodeRange: [LATIN] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-54dc43.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-378793.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-d2c376.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+1F00-1FFF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-a5de85.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-187f7f.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-5788f6.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0302-0303, U+0305, U+0307-0308, U+0310, U+0312, U+0315, U+031A, U+0326-0327, U+032C, U+032F-0330, U+0332-0333, U+0338, U+033A, U+0346, U+034D, U+0391-03A1, U+03A3-03A9, U+03B1-03C9, U+03D1, U+03D5-03D6, U+03F0-03F1, U+03F4-03F5, U+2016-2017, U+2034-2038, U+203C, U+2040, U+2043, U+2047, U+2050, U+2057, U+205F, U+2070-2071, U+2074-209F, U+20D0-20DC, U+20E1, U+20E5-20EF, U+2100-2112, U+2114-2115, U+2117-2121, U+2123-214F, U+2190, U+2192, U+2194-21AE, U+21B0-21E5, U+21F1-21F2, U+21F4-2211, U+2213-2214, U+2216-22FF, U+2308-230B, U+2310, U+2319, U+231C-2321, U+2336-237A, U+237C, U+2395, U+239B-23B7, U+23D0, U+23DC-23E1, U+2474-2475, U+25AF, U+25B3, U+25B7, U+25BD, U+25C1, U+25CA, U+25CC, U+25FB, U+266D-266F, U+27C0-27FF, U+2900-2AFF, U+2B0E-2B11, U+2B30-2B4C, U+2BFE, U+3030, U+FF5B, U+FF5D, U+1D400-1D7FF, U+1EE00-1EEFF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-c9cd65.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0001-000C, U+000E-001F, U+007F-009F, U+20DD-20E0, U+20E2-20E4, U+2150-218F, U+2190, U+2192, U+2194-2199, U+21AF, U+21E6-21F0, U+21F3, U+2218-2219, U+2299, U+22C4-22C6, U+2300-243F, U+2440-244A, U+2460-24FF, U+25A0-27BF, U+2800-28FF, U+2921-2922, U+2981, U+29BF, U+29EB, U+2B00-2BFF, U+4DC0-4DFF, U+FFF9-FFFB, U+10140-1018E, U+10190-1019C, U+101A0, U+101D0-101FD, U+102E0-102FB, U+10E60-10E7E, U+1D2C0-1D2D3, U+1D2E0-1D37F, U+1F000-1F0FF, U+1F100-1F1AE, U+1F1E6-1F1FF, U+1F30D-1F30F, U+1F315, U+1F31C, U+1F31E, U+1F320-1F32C, U+1F336, U+1F378, U+1F37D, U+1F382, U+1F393-1F39F, U+1F3A7-1F3A8, U+1F3AC-1F3AF, U+1F3C2, U+1F3C4-1F3C6, U+1F3CA-1F3CE, U+1F3D4-1F3E0, U+1F3ED, U+1F3F1-1F3F3, U+1F3F5-1F3F7, U+1F408, U+1F415, U+1F41F, U+1F426, U+1F43F, U+1F441-1F442, U+1F444, U+1F446-1F449, U+1F44C-1F44E, U+1F453, U+1F46A, U+1F47D, U+1F4A3, U+1F4B0, U+1F4B3, U+1F4B9, U+1F4BB, U+1F4BF, U+1F4C8-1F4CB, U+1F4D6, U+1F4DA, U+1F4DF, U+1F4E3-1F4E6, U+1F4EA-1F4ED, U+1F4F7, U+1F4F9-1F4FB, U+1F4FD-1F4FE, U+1F503, U+1F507-1F50B, U+1F50D, U+1F512-1F513, U+1F53E-1F54A, U+1F54F-1F5FA, U+1F610, U+1F650-1F67F, U+1F687, U+1F68D, U+1F691, U+1F694, U+1F698, U+1F6AD, U+1F6B2, U+1F6B9-1F6BA, U+1F6BC, U+1F6C6-1F6CF, U+1F6D3-1F6D7, U+1F6E0-1F6EA, U+1F6F0-1F6F3, U+1F6F7-1F6FC, U+1F700-1F80B, U+1F810-1F847, U+1F850-1F859, U+1F860-1F887, U+1F890-1F8AD, U+1F8B0-1F8BB, U+1F8C0-1F8C1, U+1F8D0-1F8D8, U+1F900-1F90B, U+1F93B, U+1F946, U+1F984, U+1F996, U+1F9E9, U+1FA00-1FA6F, U+1FA70-1FA7C, U+1FA80-1FAC6, U+1FAC8, U+1FACC-1FADD, U+1FADF-1FAEB, U+1FAEF-1FAFA, U+1FB00-1FBFF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-fa05f5.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal-15e4e1.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'] },
          { src: ['./src/assets/fonts/site/open-sans-400-700-normal.woff2'], weight: '700', style: 'normal', unicodeRange: [LATIN] },
        ],
      },
    },
    {
      provider: localSubsets,
      name: 'Montserrat',
      cssVariable: '--font-site-montserrat',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-146f30.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-17446c.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-e4fe21.woff2'], weight: '400', style: 'normal', unicodeRange: ['U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-3dac51.woff2'], weight: '400', style: 'normal', unicodeRange: [LATIN] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-146f30.woff2'], weight: '600', style: 'normal', unicodeRange: ['U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal.woff2'], weight: '600', style: 'normal', unicodeRange: ['U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-17446c.woff2'], weight: '600', style: 'normal', unicodeRange: ['U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-e4fe21.woff2'], weight: '600', style: 'normal', unicodeRange: ['U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-3dac51.woff2'], weight: '600', style: 'normal', unicodeRange: [LATIN] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-146f30.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-17446c.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-e4fe21.woff2'], weight: '700', style: 'normal', unicodeRange: ['U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'] },
          { src: ['./src/assets/fonts/site/montserrat-400-700-normal-3dac51.woff2'], weight: '700', style: 'normal', unicodeRange: [LATIN] },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'FontAwesome',
      cssVariable: '--font-site-fontawesome',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/site/fontawesomepro-900-normal.woff2'], weight: '900', style: 'normal' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'FontAwesomeBrands',
      cssVariable: '--font-site-fontawesomebrands',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/site/fontawesomebrands-normal-normal.woff2'], weight: 'normal', style: 'normal' },
        ],
      },
    },
    {
      provider: localSubsets,
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        // One file per script subset: a page downloads only the ranges its
        // text uses. latin-ext covers Turkish, Polish, Czech and the like.
        variants: [
          { src: ['./src/assets/fonts/inter-latin-wght-normal.woff2'], weight: '100 900', style: 'normal', unicodeRange: [LATIN] },
          { src: ['./src/assets/fonts/inter-latin-wght-italic.woff2'], weight: '100 900', style: 'italic', unicodeRange: [LATIN] },
          { src: ['./src/assets/fonts/inter-latin-ext-wght-normal.woff2'], weight: '100 900', style: 'normal', unicodeRange: [LATIN_EXT] },
          { src: ['./src/assets/fonts/inter-latin-ext-wght-italic.woff2'], weight: '100 900', style: 'italic', unicodeRange: [LATIN_EXT] },
          { src: ['./src/assets/fonts/inter-cyrillic-wght-normal.woff2'], weight: '100 900', style: 'normal', unicodeRange: [CYRILLIC] },
          { src: ['./src/assets/fonts/inter-cyrillic-wght-italic.woff2'], weight: '100 900', style: 'italic', unicodeRange: [CYRILLIC] },
          { src: ['./src/assets/fonts/inter-cyrillic-ext-wght-normal.woff2'], weight: '100 900', style: 'normal', unicodeRange: [CYRILLIC_EXT] },
          { src: ['./src/assets/fonts/inter-cyrillic-ext-wght-italic.woff2'], weight: '100 900', style: 'italic', unicodeRange: [CYRILLIC_EXT] },
          { src: ['./src/assets/fonts/inter-greek-wght-normal.woff2'], weight: '100 900', style: 'normal', unicodeRange: [GREEK] },
          { src: ['./src/assets/fonts/inter-greek-wght-italic.woff2'], weight: '100 900', style: 'italic', unicodeRange: [GREEK] },
          { src: ['./src/assets/fonts/inter-greek-ext-wght-normal.woff2'], weight: '100 900', style: 'normal', unicodeRange: [GREEK_EXT] },
          { src: ['./src/assets/fonts/inter-greek-ext-wght-italic.woff2'], weight: '100 900', style: 'italic', unicodeRange: [GREEK_EXT] },
          { src: ['./src/assets/fonts/inter-vietnamese-wght-normal.woff2'], weight: '100 900', style: 'normal', unicodeRange: [VIETNAMESE] },
          { src: ['./src/assets/fonts/inter-vietnamese-wght-italic.woff2'], weight: '100 900', style: 'italic', unicodeRange: [VIETNAMESE] },
        ],
      },
    },
  ],
  // The binding reaches the site's code as __CONTENTRAIN_STUDIO__ (see src/site.config.ts).
  vite: { plugins: [tailwindcss()], define: { __CONTENTRAIN_STUDIO__: JSON.stringify(studio) } },
})
