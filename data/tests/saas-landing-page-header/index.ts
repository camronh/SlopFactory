import { GalleryItem, Category, ModelId } from '../../../types';

import geminiProOutput from './gemini-3-pro-preview.md?raw';
import gpt5PreviewOutput from './gpt-5-preview.md?raw';

export const test: GalleryItem = {
  id: 'lp-1',
  slug: 'saas-landing-page-header',
  title: 'SaaS Landing Page Header',
  description: 'Hero section copy for a design collaboration SaaS platform.',
  prompt: 'Generate a hero section copy for a SaaS platform that helps designers collaborate. Tone: Professional but energetic.',
  category: Category.LANDING_PAGE,
  isImage: false,
  variants: [
    {
      modelId: ModelId.GEMINI_PRO,
      output: geminiProOutput,
      timestamp: Date.parse('2025-01-12T12:00:00')
    },
    {
      modelId: ModelId.GPT_5_PREVIEW,
      output: gpt5PreviewOutput,
      timestamp: Date.parse('2025-01-12T12:00:00')
    }
  ]
};
