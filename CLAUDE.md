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
    └── tests/           # One folder per test
        ├── neon-cyberpunk-city/
        │   ├── index.ts               # Test metadata
        │   ├── gemini-2.5-flash-image.png
        │   └── gpt-4-turbo.png
        ├── haiku-about-coding/
        │   ├── index.ts               # Test metadata
        │   ├── gemini-2.5-flash.md    # Variant output
        │   ├── gpt-4-turbo.md
        │   └── claude-3-opus.md
        └── ...
```

**Routing:** Uses react-router-dom with `/:slug` paths. Each test has a unique URL (e.g., `/neon-cyberpunk-city`).

**SEO:** Uses react-helmet-async for dynamic meta tags (title, description, Open Graph).

**Key data types:**
- `GalleryItem` - A single test with `slug`, `title`, `prompt`, `category`, and `variants[]`
- `Variant` - One model's output (contains `modelId` and `output` string)

**Adding a new test:**
1. Create folder `data/tests/my-new-test/`
2. Create variant output files:
   - For text tests: `{modelId}.md` (e.g., `claude-3-opus.md`, `gpt-4-turbo.md`)
   - For image tests: `{modelId}.png` (e.g., `gemini-2.5-flash-image.png`)
3. Create `data/tests/my-new-test/index.ts` with:
   - Imports for markdown files using `?raw` suffix: `import output from './claude-3-opus.md?raw'`
   - Imports for images: `import image from './image.png'`
   - Export `GalleryItem` with unique `slug`, using imported content for `variant.output`
4. Import and add to `allTests` array in `data/index.ts`
5. If you need to move content around or add it to tests, make sure you copy/rewrite it VERBATIM from what I gave you.

**Styling:** Tailwind CSS via CDN (loaded in index.html). Uses Inter font.

**Path alias:** `@/*` maps to project root.

**Testing:** Use your Playwright Skill to test visual or UI/UX changes. Run in headless mode when you do.