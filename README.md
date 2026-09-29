# Shah Faisal, portfolio

Personal portfolio for Shah Faisal, student, developer and founder of [Eleone Hub](https://github.com/eleonehub). Live at **https://faisaljs.github.io**.

It is a neo-brutalist, dependency-free static site: one `index.html` with the markup, CSS and JavaScript inline. There is no framework, no bundler and no build step, and the whole site is about 30 KB.

## Features

**Design and layout**
- Neo-brutalist UI: thick borders, hard offset shadows, flat accent colors, and Bricolage Grotesque as the single typeface.
- Light and dark themes. The theme follows the system setting by default, and the toggle remembers your choice.
- Color shuffle that rotates the four accent colors and remembers your choice.
- Fully responsive, from small phones to wide desktops. Touch targets are at least 44px, and notch devices are handled with safe-area insets.
- Print stylesheet that hides the navigation and controls and removes shadows.

**Navigation and interaction**
- Sticky header with a scrollspy that highlights the current section, a scroll-progress bar, and a back-to-top button.
- Command palette (see [Keyboard shortcuts](#keyboard-shortcuts)) for jumping to sections and running actions.
- Mobile menu that collapses below 980px.

**Live GitHub data** (no backend, no API key)
- Repo, follower and total-star counts, plus a "last push" line in the hero card.
- Project cards for your non-fork repositories, with language filter chips, a language bar, search (name, description and topics), sorting, and a "Show more" button.
- Open source contributions: your latest merged pull requests into other people's projects.

**Contact**
- Copy-email button and a downloadable contact card (`.vcf`, generated in the browser).
- Contact form that opens the visitor's email app with the message filled in. It has no server component.
- Share button, shown only where the browser supports the Web Share API.

**SEO**
- Meta description, Open Graph and Twitter tags, canonical URL, JSON-LD `Person` data, `robots.txt` and `sitemap.xml`.
- Custom `404.html` for GitHub Pages.

## Project structure

```
.
├── index.html        # the whole site: markup, CSS and JS inline
├── 404.html          # custom not-found page
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    └── og-cover.png  # 1200×630 social preview image (you need to add this)
```

The favicon is an inline data URI inside `index.html`, so no separate icon file is needed.

**Social preview image:** `index.html` points `og:image` and `twitter:image` at `https://faisaljs.github.io/assets/og-cover.png`. Export or design a 1200×630 **PNG** and save it at that path. Most social platforms ignore SVG for link previews.

## Run locally

No tools are required beyond a static file server:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open http://localhost:8000. Use a local server rather than opening the file directly, so storage and network behavior match production.

## Deploy

**GitHub Pages (recommended)**
1. Create a repository named `faisaljs.github.io`.
2. Push these files to the `main` branch.
3. In the repository, go to Settings → Pages and set the source to `main` / root.
4. The site goes live at https://faisaljs.github.io.

**Netlify, Vercel or Cloudflare Pages:** drag and drop the folder, or connect the repository. There is no build command and the publish directory is the repository root.

**Custom domain or subpath:** update every absolute URL: `canonical`, `og:url`, `og:image` and `twitter:image` in `index.html`, the JSON-LD `url`, `sitemap.xml`, and the `Sitemap:` line in `robots.txt`. If you serve the site from a subpath such as `username.github.io/repo`, also change the `href="/"` link in `404.html`.

## Customize

| To change | Edit |
| --- | --- |
| GitHub username | `const U` in the script, plus the GitHub links, the avatar `src`, and JSON-LD `sameAs` |
| Email address | `MAIL` in the script, the `mailto:` link, and the visible address in the Email card |
| Copy and bio | The hero, About and Eleone Hub sections in `index.html` |
| Skills | The `<ul class="chips">` list. The scrolling marquee is built from it automatically |
| Theme colors | CSS variables at the top of `<style>` (`--bg`, `--card`, `--y`, `--p`, `--b`, `--g`) |
| Accent palette | The `P` array in the `<head>` script and the `PAL` array in the main script. Keep them identical so the shuffler and the no-flash restore stay in sync |
| Palette commands | The `CMDS` array in the script |
| Instagram | The Instagram contact card and JSON-LD `sameAs` |

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Ctrl` / `⌘` + `K` | Open or close the command palette |
| `/` | Open the command palette (when not typing in a field) |
| `↑` `↓` | Move through commands |
| `Enter` | Run the selected command |
| `Esc` | Close the palette or the mobile menu |

The palette can also be opened with the ⌘ button in the header or the footer link, which is how touch users reach it.

## How the GitHub data works

The page calls the public GitHub REST API from the browser:

- `users/faisaljs` for repo and follower counts.
- `users/faisaljs/repos?per_page=100&sort=updated` for projects, total stars, languages, and the "last push" line. Forks are excluded, and only your 100 most recently updated repositories are considered.
- `search/issues` with `type:pr author:faisaljs is:merged -user:faisaljs` for contributions. This excludes repositories under your own user account. Organization repositories, such as Eleone Hub, are included.

Unauthenticated limits are 60 requests per hour per IP for the core API and 10 per minute for search. Each response is cached in `sessionStorage` for 10 minutes, so reloading or moving around the page does not spend more requests. If a limit is hit or the visitor is offline, each section shows a plain message with a link to GitHub instead of an error.

## Accessibility and performance

- Semantic landmarks, a skip-to-content link, and a visible dashed focus ring on every interactive element.
- Everything is operable by keyboard. The closed mobile menu is removed from the tab order, and toggles use `aria-pressed` and `aria-expanded`.
- Live regions announce loading results and toast messages.
- `prefers-reduced-motion` turns off animations and transitions, and the marquee becomes a static wrapped list.
- The theme and accent colors are applied in `<head>` before the first paint, so there is no flash of the wrong theme.
- Content does not depend on scroll-reveal JavaScript, so the page stays readable if scripts fail.
- External requests are limited to Google Fonts, the GitHub API, and the GitHub avatar image. The site falls back to system fonts if the font request is blocked.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari (Safari 15.4 or newer, for the native `<dialog>` element).

## License

No license file is included yet. Add one, for example MIT, if you want others to reuse the code.