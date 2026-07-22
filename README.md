# Buna Origin — Cinematic Anime.js Coffee Website

A cinematic coffee-company prototype built with React, Vite, TypeScript and Anime.js.

The main experience follows the coffee journey through custom-generated visual scenes:

1. Ethiopian highland farm and ripe coffee cherry
2. Harvest and seed reveal
3. Green coffee processing and drying
4. Professional roasting environment
5. Roasted coffee development
6. Ethiopian coffee service

After the scroll-led journey, the page becomes a practical coffee-company website with origin cards, process information and an export enquiry section.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

The repository includes `.github/workflows/deploy.yml` and Vite is configured for:

```text
/anime-webstie-real/
```

Before the first deployment, open **Settings → Pages → Source** and select **GitHub Actions**.

Expected URL:

```text
https://yohannesmulugeta.github.io/anime-webstie-real/
```

## Generated visual assets

The website no longer depends on remote stock photography. The approved generated scenes are stored inside:

```text
public/assets/
├── farm.webp.b64
├── selection.webp.b64
├── processing.webp.b64
├── roasting.webp.b64.part1
├── roasting.webp.b64.part2
├── roasting.webp.b64.part3
├── roasting.webp.b64.part4
├── roasting.webp.b64.part5
└── cup.webp.b64
```

The browser joins and normalizes these text-safe base64 assets, then displays them as local WebP images. This approach was used because the repository connector accepts text files rather than direct binary uploads.

For a final production website, these files can later be replaced with standard high-resolution `.webp` or `.avif` files without changing the visual design.

## Content status

Buna Origin is a fictional test brand. The origin cards, enquiry email and company statements are placeholders. Replace them with verified company information before public business use.

## Performance notes

The integrated images are compressed for the working prototype. Before the final company launch:

- Export dedicated desktop and mobile crops.
- Use higher-resolution WebP or AVIF files.
- Keep the first scene below approximately 500 KB.
- Preload only the opening scene.
- Lazy-load later scenes.
- Add a short video or image sequence only after the static scroll version is stable.
