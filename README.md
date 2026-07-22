# Buna Origin — Real Photographic Anime.js Website

A cinematic coffee-company prototype built with React, Vite, TypeScript and Anime.js.

The main experience keeps one photographic coffee object in the middle of the viewport while scrolling changes the environment and the bean state:

1. Coffee farm and ripe cherry
2. Harvest and seed reveal
3. Green coffee
4. Developing roast
5. Roasted bean
6. Ethiopian coffee service

After the cinematic journey, the page becomes a practical coffee-company website with origin cards, process information and an export enquiry section.

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

## Replacing the demonstration photography

All image URLs are grouped in the `MEDIA` object at the top of `src/App.tsx`.

For a real company version, replace them with company-owned files using this structure:

```text
public/assets/
├── backgrounds/
│   ├── farm-desktop.webp
│   ├── processing-desktop.webp
│   ├── roasting-desktop.webp
│   └── cup-desktop.webp
└── coffee-object/
    ├── cherry.webp
    └── bean.webp
```

Use the same transparent bean image for the green, yellow and roasted states. The website applies controlled colour grading to the same shape, which keeps every transformation perfectly aligned.

## Demonstration content

Buna Origin is a fictional test brand. The origin cards, enquiry email and company statements are placeholders. Replace them with verified company information before public business use.

## Photography credits

The demonstration uses remotely hosted Wikimedia Commons images. Review each source page and its licence before adapting this prototype for production.

- **Coffee cherries on white background** — Filo gèn', CC BY-SA 4.0 and other listed licences: https://commons.wikimedia.org/wiki/File:Coffee_cherries_on_white_background.png
- **Coffee bean transparent** — Chiccodoro, CC BY-SA 2.0: https://commons.wikimedia.org/wiki/File:Coffee_bean_transparent.png
- **Coffee farm with surrounding mountains** — Matthias Kirsch, CC BY-SA 2.0: https://commons.wikimedia.org/wiki/File:Coffee_farm_with_the_surrounding_mountains.jpg
- **Coffee beans drying near Konso, Ethiopia** — David Stanley, CC BY 2.0: https://commons.wikimedia.org/wiki/File:Coffee_Beans_Drying_(11586771164).jpg
- **Coffee Roaster, Harar, Ethiopia** — source and licence on Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Coffee_Roaster,_Harar,_Ethiopia_(14257683379).jpg
- **Coffee ceremony of Ethiopia and Eritrea 4** — ProtoplasmaKid, CC BY-SA 4.0: https://commons.wikimedia.org/wiki/File:Coffee_ceremony_of_Ethiopia_and_Eritrea_4.jpg

## Performance notes

The current demonstration loads remote original files so the visual system can be tested immediately. Before production:

- Download approved company images.
- Create desktop and mobile crops.
- Convert images to WebP or AVIF.
- Keep the first scene under approximately 500 KB.
- Lazy-load later scenes.
- Replace remote image URLs with local files.
