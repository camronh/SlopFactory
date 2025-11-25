import { GalleryItem, Category, ModelId } from '../../../types';

import geminiProOutput from './gemini-3-pro-preview.md?raw';
import claudeSonnetOutput from './claude-3-sonnet.md?raw';

export const test: GalleryItem = {
  id: 'slide-1',
  slug: 'q3-marketing-slideshow-outline',
  title: 'Q3 Marketing Slideshow Outline',
  description: 'A 5-slide outline for a quarterly marketing strategy presentation.',
  prompt: 'Create a 5-slide outline for a Q3 marketing strategy presentation focusing on social media growth.',
  category: Category.SLIDESHOW,
  isImage: false,
  variants: [
    {
      modelId: ModelId.GEMINI_PRO,
      output: geminiProOutput,
      timestamp: Date.parse('2025-01-13T12:00:00')
    },
    {
      modelId: ModelId.CLAUDE_3_SONNET,
      output: claudeSonnetOutput,
      timestamp: Date.parse('2025-01-13T12:00:00')
    }
  ]
};
