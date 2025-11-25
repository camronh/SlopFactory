# CLAUDE.md

## Project Overview

SlopFactory is a React gallery application for comparing AI model outputs side-by-side. It displays a curated catalogue of AI-generated content (images, stories, landing pages, etc.) with multiple "variants" showing outputs from different AI models (Gemini, GPT, Claude).

## Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Architecture

**Flat structure** - No `src/` directory. Components and files live at the project root:
- `App.tsx` - Main app with static data catalogue (`STATIC_ITEMS`), `GalleryView`, and `DetailView` components
- `index.tsx` - React entry point
- `types.ts` - TypeScript enums (`ModelId`, `Category`) and interfaces (`GalleryItem`, `Variant`)
- `components/` - Reusable UI components (Layout, Card, ModelBadge, Button)
- `services/geminiService.ts` - Google Gemini API wrapper for content generation

**Key data types:**
- `GalleryItem` - A single catalogue entry with prompt, category, and multiple `Variant` outputs
- `Variant` - One model's output for a given prompt (contains `modelId` and `output` string)

**Styling:** Tailwind CSS via CDN (loaded in index.html). Uses Inter font.

**Path alias:** `@/*` maps to project root.
