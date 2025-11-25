# CLAUDE.md

## Project Overview

SlopFactory is a React gallery application for comparing AI model outputs side-by-side. It displays a curated catalogue of AI-generated content (images, stories, landing pages, etc.) with multiple "variants" showing outputs from different AI models (Gemini, GPT, Claude).

## Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Architecture

**Directory structure:**
```
├── App.tsx              # Router setup (BrowserRouter, Routes)
├── index.tsx            # React entry point
├── types.ts             # TypeScript enums and interfaces
├── components/          # Reusable UI (Layout, Card, ModelBadge, SEO)
├── pages/               # Route pages
│   ├── GalleryPage.tsx  # Home page (/)
│   └── DetailPage.tsx   # Test detail page (/:slug)
└── data/
    ├── index.ts         # Aggregates all tests, exports allTests and getTestBySlug()
    └── tests/           # One file per test
        ├── neon-cyberpunk-city.ts
        ├── haiku-about-coding.ts
        └── ...
```

**Routing:** Uses react-router-dom with `/:slug` paths. Each test has a unique URL (e.g., `/neon-cyberpunk-city`).

**SEO:** Uses react-helmet-async for dynamic meta tags (title, description, Open Graph).

**Key data types:**
- `GalleryItem` - A single test with `slug`, `title`, `prompt`, `category`, and `variants[]`
- `Variant` - One model's output (contains `modelId` and `output` string)

**Adding a new test:**
1. Create `data/tests/my-new-test.ts` exporting a `GalleryItem` with unique `slug`
2. Import and add to `allTests` array in `data/index.ts`

**Styling:** Tailwind CSS via CDN (loaded in index.html). Uses Inter font.

**Path alias:** `@/*` maps to project root.
