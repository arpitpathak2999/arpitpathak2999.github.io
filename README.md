# Arpit Pathak — Research Portfolio

Interactive research portfolio for **Arpit Pathak** — AI × Neuroscience × Biomedical Intelligence.

Live: https://arpitpathak2999.github.io (custom domain arpitpathak2999.com planned — see below)

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Routing | React Router (SPA, with a `404.html` fallback for GitHub Pages deep links) |
| Icons | lucide-react |
| Visualisations | hand-written Canvas 2D and SVG — no charting or 3D library |

No animation library is used. Motion is CSS transitions plus two small
`requestAnimationFrame` loops that pause when the tab is hidden, off-screen, or
when the visitor prefers reduced motion.

## Content accuracy

`src/data/` is the single source of truth and is derived strictly from the
résumé:

- `profile.ts` — identity, education, research experience, skills, links
- `publications.ts` — publications, verbatim venues, real links only
- `research.ts` — the four case studies and their detail pages
- `structures.ts` — pipeline, research map, timeline, philosophy, stack

Rules that were applied while writing these files, and that should be kept when
editing them:

- No invented degrees, employers, positions, awards, datasets, DOIs, patents or
  GitHub repositories.
- No accuracy figures other than the **98.41%** the résumé reports for the EMG
  ensemble ML–DL framework.
- Publication links point only to records that exist (IEEE Xplore or Google
  Scholar); publications without a link render without one.
- Every interactive visualisation uses **synthetic** signals generated in the
  browser and says so on screen. Nothing on this site is patient data, and the
  sleep-staging section is labelled as a conceptual demonstration, not a
  diagnostic tool.
- Research-stage work is described as research prototype / experimental /
  ongoing rather than deployed.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
npm run lint
```

## Routes

```
/
/research/sleep-staging
/research/motor-imagery-eeg
/research/emg-prosthetics
/research/biomedical-imaging
/publications
/about
```

## The site URL lives in one place

`.env` holds `VITE_SITE_URL` and `VITE_CUSTOM_DOMAIN`. Those two values drive
the canonical link, Open Graph tags, `sitemap.xml`, `robots.txt` and whether a
`CNAME` file is emitted at all. Nothing else hardcodes the domain.

Current state — no custom domain owned yet:

```
VITE_SITE_URL=https://arpitpathak2999.github.io
VITE_CUSTOM_DOMAIN=
```

`VITE_CUSTOM_DOMAIN` is deliberately empty. An empty value means **no CNAME
file is written**, which matters: a CNAME naming a domain whose DNS does not yet
point at GitHub makes Pages serve the site at that dead domain and the working
`github.io` address stops resolving.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages.

One-time repository setup: **Settings → Pages → Build and deployment →
Source: GitHub Actions.**

Live at <https://arpitpathak2999.github.io> once that is set.

### Later: switching to arpitpathak2999.com

1. Buy the domain.
2. At the registrar, add four A records on `@` → `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a CNAME on
   `www` → `arpitpathak2999.github.io.`
3. Wait for `dig +short arpitpathak2999.com` to return those four addresses.
4. Only then, edit `.env`:

   ```
   VITE_SITE_URL=https://arpitpathak2999.com
   VITE_CUSTOM_DOMAIN=arpitpathak2999.com
   ```

5. Commit and push. The build now emits `CNAME` and every URL updates.
6. **Settings → Pages → Custom domain:** `arpitpathak2999.com`. Tick **Enforce
   HTTPS** once the certificate issues (up to an hour).

Optional IPv6 AAAA records: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153`.

`www` redirects to the apex automatically once the custom domain is set.

## Accessibility & performance notes

- Semantic landmarks, one `h1` per route, skip link, visible focus rings.
- Interactive graphics are keyboard operable; the pipeline is an ARIA tab set
  with arrow-key navigation.
- All body and label colours clear 4.5:1 against the background.
- `prefers-reduced-motion` disables the animation loops, the cursor field and
  the dashed flow animations, and draws static frames instead.
- Heavy interactive sections are route- and viewport-lazy, and split into
  separate chunks.
