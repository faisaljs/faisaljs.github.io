# Shah Faisal — Portfolio

A minimal, fast, dependency-free developer portfolio. Plain HTML/CSS/JS —
no build step, no framework, deploy anywhere.

**Design:** a "box-grid" system — every section is a bordered box with
corner brackets (like a selection tool), monospace section tags (`// 01 —
ABOUT`), and a light blueprint-style grid background. Light + dark theme,
fully responsive, keyboard accessible, respects reduced-motion.

## Structure

```
.
├── index.html          # all page content
├── css/style.css        # design system + layout + responsive rules
├── js/script.js         # theme toggle, mobile menu, scroll reveal, GitHub API calls
└── assets/
    ├── favicon.svg
    └── og-cover.svg     # social share preview image
```

## Live GitHub data

The Projects section and the repo/follower counts in the hero card are
fetched **live** from the public GitHub API (`api.github.com`) for the
username `faisaljs` — no backend, no API key needed. It shows your 6
most-starred (then most-recently-updated) non-fork repos. Unauthenticated
GitHub API calls are rate-limited (~60/hour per IP); if the limit is hit,
the section falls back to a "view on GitHub" link instead of erroring.

To point it at a different account, change `GITHUB_USERNAME` at the top of
`js/script.js`.

## Run locally

No build tools required. Either:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`.

## Deploy

**GitHub Pages (recommended, matches your username)**
1. Create a repo named `faisaljs.github.io`.
2. Push these files to the `main` branch.
3. Enable Pages in repo Settings → Pages → Source: `main` / root.
4. Live at `https://faisaljs.github.io`.

**Vercel / Netlify**
Drag-and-drop this folder in the dashboard, or connect the repo — no
build command needed (static site).

## Accessibility & performance notes

- Semantic landmarks (`header`, `main`, `nav`, `footer`), skip-to-content link.
- Visible focus rings (`:focus-visible`) on every interactive element.
- `prefers-reduced-motion` disables scroll-reveal and transition animation.
- `prefers-color-scheme` sets the initial theme; the toggle overrides and
  persists via `localStorage` (falls back gracefully if storage is blocked).
- No external JS dependencies — only Google Fonts (`JetBrains Mono`, `Inter`)
  and the public GitHub REST API.
