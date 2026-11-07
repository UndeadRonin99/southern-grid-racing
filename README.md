# Southern Grid Racing

Community website for Southern Grid Racing: a South African Le Mans Ultimate endurance-racing community.

**Website:** https://undeadronin99.github.io/southern-grid-racing/

## Run locally

Node.js 22 or later is required. The website has no runtime or build dependencies.

```sh
npm run dev
```

Open http://127.0.0.1:4173/southern-grid-racing/. The local server serves the GitHub Pages project subpath as well as the root. Reload after editing files.

```sh
npm run check
npm run build
```

`dist/` contains only the public website, images, fonts and font licences. Generated image masters and internal brand notes stay in the ignored `brand-assets/` directory.

## GitHub Pages

The `Deploy community website` workflow validates and builds the website, then deploys `dist/` to GitHub Pages whenever `main` changes. No npm installation, secret or third-party hosting account is needed.

In the repository, choose **Settings → Pages → Build and deployment → Source → GitHub Actions**. Then push to `main` or run the workflow manually from Actions.

The workflow follows the [GitHub Pages custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Update the website

- **Content and links:** edit `index.html`.
- **Colours, typography and responsive layouts:** edit `styles.css`.
- **Mobile navigation:** edit `script.js`.
- **Imagery and wordmark:** replace files in `assets/images/`, preserving their names or updating the corresponding HTML references.
- **Season launch:** update the season brief and FAQ together when dates, classes, format and registration are confirmed. There is intentionally no countdown or live registration form until those details exist.
- **Discord invite:** search `index.html` for `https://discord.gg/2nPNrDMbh` and replace every occurrence together. This initial invite was created on 7 November 2026 with a 30-day expiry; replace it with a permanent invite before 7 December 2026.
- **Changing the repository name or domain:** update the canonical and Open Graph URLs in `index.html` and the project paths in `404.html` and `scripts/serve.mjs`.

## Design and accessibility

The site uses the SGR monogram, charcoal, warm white, racing red and muted gold. Barlow and Barlow Condensed are self-hosted under their included SIL Open Font Licences. Racing imagery is fictional, created for SGR using built-in image generation. Brand artwork and community copy are not offered under an open-source licence.

Content, links and native FAQ disclosures work without JavaScript. The enhanced mobile navigation supports Escape, focus return and a keyboard focus loop. Motion follows the visitor’s reduced-motion preference.

Verified in Chrome at 375, 414, 768, 1024 and 1440 CSS pixels, including horizontal overflow, headline fit, mobile navigation and image loading. The site makes no requests to analytics, external font services or third-party scripts.
