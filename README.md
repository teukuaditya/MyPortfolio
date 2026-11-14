# Teuku Aditya — Portfolio

Portfolio of **Teuku Aditya** — Business Analyst (Intern) with a fullstack developer
background. "Business Analyst who can code."

Built with **Vite + Tailwind CSS v4 + vanilla JavaScript** — no framework, no bloat.
Ships as fully static files deployable to Vercel, Netlify, or GitHub Pages.

## Quick start

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Structure

```
index.html              # semantic shell + SEO head + JSON-LD
src/
  main.js               # entry: renders sections, wires global behavior
  styles/main.css       # design system (Tailwind v4 CSS-first config, tokens)
  data/                 # ALL content lives here — edit these, not components
    profile.js          # identity, contacts, stats, currently-learning
    experience.js       # work + education timeline
    projects.js         # project case studies (BA + fullstack)
    workflow.js         # BA "How I work" steps
    documents.js        # sample artifacts (MOCK data only — NDA)
    skills.js           # grouped skill lists
    certifications.js   # certs + organizations
    i18n.js             # ID/EN dictionary for all UI strings
  lib/                  # i18n runtime, theme, reveals, scroll chrome, icons, toast
  components/           # one module per section (render + bind)
public/                 # favicon, og.png, robots.txt, sitemap.xml, cv/
```

## Features

- Dark-first theming (Electric Indigo accent) + light toggle — persisted in
  `localStorage`, respects `prefers-color-scheme`, no flash on load
- ID / EN language toggle (full dictionary + localized content data)
- Command palette — `⌘K` / `Ctrl+K` / `/` (navigate, theme, language, copy email, CV, print)
- Scroll-reveal animations + stagger, animated counters, typing effect
- Interactive BA workflow stepper, filterable bento project grid with case-study
  modals, expandable experience timeline
- Documents showcase with sanitized/mock artifacts only (no NDA data)
- GitHub repos widget (public API, 1 h localStorage cache, graceful fallback)
- Print-friendly résumé (`window.print()` renders a dedicated print stylesheet)
- Scroll progress bar, hide-on-scroll navbar with active-section highlighting,
  cursor glow (desktop only), copy-email with toast, small easter egg (type `adit`)
- `prefers-reduced-motion` respected everywhere; skip-link, focus states,
  ARIA labels, native `<dialog>` modals, keyboard-navigable palette & stepper

## Before deploying — checklist

1. **CV**: ✅ done — `public/cv/teuku-aditya-cv.pdf` is generated from the site's
   own data. Update it anytime after editing `src/data/*.js` with
   `node scripts/build-cv.mjs` (dev server must be running). If you have a
   designed CV file you prefer, just replace the PDF.
2. **Contact form**: create a free form at [formspree.io](https://formspree.io),
   then set `FORMSPREE_ID` in `src/components/contact.js`. Until then the form
   gracefully falls back to a `mailto:` link.
3. **Domain**: update the canonical URL, `og:url`, and `sitemap.xml` in
   `index.html` / `public/` (search `TODO`).
4. **Assets**: ✅ profile photo is in (`public/img/teuku-aditya.webp`, auto-cropped
   from the original — regenerate anytime with `node scripts/convert-photo.mjs`).
   Project screenshots in `src/components/projects.js` are still placeholders.
5. **OG image**: `public/og.png` is a generated placeholder — swap for a designed 1200×630 banner.
6. **Links**: ✅ real GitHub repos are linked in the case-study modals
   (`e-commerce` → DRIVE VENTURE, `warehouse-management-frontend/backend` → WMS)
   plus a "More builds" strip (SantuyChat, StayEase, TickTrack, Projek-akhir-TBI).
   Repos without descriptions (supply-chain-*, inventory-management-*,
   technomind-*) are intentionally not featured — add them to
   `src/data/projects.js → sideProjects` once they have a description/readme.

> Note: the original photo (`22SA11A175_Teuku Aditya, S.Kom..jpg`, 3.9 MB) sits in
> the repo root only as a source asset — the site uses the 34 KB WebP. Consider
> moving the original out of the repo or adding it to `.gitignore` before committing.

## Deployment

- **Vercel / Netlify**: build command `npm run build`, output directory `dist`.
- **GitHub Pages**: `npm run build` and publish `dist/` (e.g. via the official
  Pages action), with the repo as the base path — set `base: "/<repo>/"` in
  `vite.config.js` if deploying to `username.github.io/<repo>/`.

## Old files

The original 2020 tutorial site (Tailwind v1.2 `output.css`, tutorial images and
content) was removed in this upgrade; history is preserved in git.
