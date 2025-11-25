import { GalleryItem, Category, ModelId } from '../../../types';

import geminiProOutput from './gemini-3-pro-preview.md?raw';

export const test: GalleryItem = {
  id: 'lp-2',
  slug: 'eco-coffee-shop-value-prop',
  title: 'Eco-Coffee Shop Value Prop',
  description: 'Value propositions for an eco-friendly coffee subscription service.',
  prompt: 'Write 3 value propositions for an eco-friendly coffee subscription box.',
  category: Category.LANDING_PAGE,
  isImage: false,
  variants: [
    {
      modelId: ModelId.GEMINI_PRO,
      output: geminiProOutput,
      timestamp: Date.parse('2025-01-16T12:00:00')
    }
  ]
};
