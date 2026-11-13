# THAKUR ART — Interactive Art Showcase & Prank Experience

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Web%20Browser-orange.svg)]()
[![Type](https://img.shields.io/badge/Type-Static%20Client--Side-green.svg)]()
[![Hosting](https://img.shields.io/badge/GitHub%20Pages-Compatible-brightgreen.svg)]()

An interactive web project cleverly disguised as an ultra-clean, modern contemporary artist portfolio (**THAKUR ART**). Behind the curated art collection and minimalist design lies an interactive jumpscare prank experience featuring high-frequency visual glitches, strobe overlays, dynamic audio loops, and history trap routines.

---

## Overview

Visitors are presented with an elegant portfolio for contemporary painter *Ritik Thakur*, showcasing abstract oil paintings, studio exhibition histories, and art commission options. 

When a visitor interacts with call-to-action buttons (such as *Explore Gallery*, *Commission*, or general page gestures), the application transitions into an intense, synchronized prank sequence.

### Key Highlights & Mechanics
- **Authentic Disguise:** Full portfolio aesthetics including gallery layouts, process timelines, artist biographies, and inquiry forms styled with modern Tailwind and Next.js design patterns.
- **Synchronized Audio Assault:** Multi-voice playback using a 10-channel HTML5 `Audio` pool with staggered offsets (`35ms`) to produce an intense acoustic build-up.
- **Visual Glitches & Strobe FX:** Procedural HSL hue rotations, screen slice transformations, fullscreen request, and CSS keyframe camera shakes.
- **History Trapping:** Pre-arms up to 40 `pushState` history states combined with continuous reseed intervals and `popstate` / `beforeunload` listeners to prevent quick back-button escapes.
- **Accessibility Safeguard:** Respects `prefers-reduced-motion` media queries by automatically suppressing intense strobe and shake animations for sensitive users.

---

## Live Deployment (GitHub Pages)

This project is a 100% static, client-side web application. It requires **no backend server, database, or build steps**, making it fully compatible with free static hosting platforms:

- **GitHub Pages** (Supported out of the box via `.nojekyll`)
- **Vercel**
- **Cloudflare Pages**
- **Netlify**

### Deploying to GitHub Pages
1. Push this repository to your GitHub account (`main` branch).
2. Go to **Settings** > **Pages** in your repository.
3. Under **Build and deployment** > **Source**, select `Deploy from a branch`.
4. Choose branch `main` and folder `/ (root)`, then click **Save**.
5. Your site will be published at:
   ```
   https://<username>.github.io/<repository-name>/
   ```

> [!NOTE]
> The repository includes a root `.nojekyll` file. This is crucial for GitHub Pages to serve static asset directories prefixed with an underscore (`_next/`), preventing 404 errors on style and font chunks.

---

## Local Setup & Preview

Because audio autoplay policies and modern browser features require an HTTP origin, open the project through a lightweight local web server rather than `file://`:

### Using Python
```bash
# Python 3
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Using Node.js / npx
```bash
npx serve .
```

### Using PHP
```bash
php -S localhost:8000
```

---

## Project Structure

```plaintext
prank/
├── .gitignore          # Ignores OS metadata, IDE caches, and logs
├── .nojekyll           # Ensures GitHub Pages serves _next directories
├── LICENSE             # MIT License
├── README.md           # Project documentation and deployment guide
├── favicon.ico         # Custom art gallery site icon
├── index.html          # Main portfolio entry point & HTML structure
├── local-fix.css       # Client styling and element visibility overrides
├── prank-fix.js        # Core interaction triggers, audio, and strobe engine
├── robots.txt          # Crawler instructions
├── cdn-cgi/            # Obfuscated email decoder scripts
├── media/              # High-resolution artwork images and audio assets
│   ├── prankaudio.mp3  # Screamer audio loop track
│   └── *.jpg / *.webp  # Gallery portfolio paintings and portraits
└── _next/              # Next.js static chunks, typography, and CSS styles
    └── static/
        ├── chunks/     # Minified component scripts and stylesheets
        └── media/      # WOFF2 font assets
```

---

## Disclaimer

This project is created strictly for harmless entertainment and educational purposes to demonstrate browser event propagation, CSS animations, and client-side audio pooling. Please exercise caution when sharing with individuals sensitive to flashing lights or sudden loud sounds.

---

## License

This project is open-source and licensed under the [MIT License](LICENSE).
