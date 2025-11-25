import { GalleryItem, Category, ModelId } from '../../types';

export const test: GalleryItem = {
  id: 'img-2',
  slug: 'watercolor-cat-portrait',
  title: 'Watercolor Cat Portrait',
  description: 'A fluffy calico cat in soft watercolor style with dreamy atmosphere.',
  prompt: 'A fluffy calico cat sitting on a windowsill, watercolor style, soft pastel colors, dreamy atmosphere.',
  category: Category.IMAGE,
  isImage: true,
  variants: [
    {
      modelId: ModelId.GEMINI_FLASH_IMAGE,
      output: 'https://picsum.photos/id/40/800/800',
      timestamp: Date.parse('2025-01-14T12:00:00')
    },
    {
      modelId: ModelId.GPT_4_TURBO,
      output: 'https://picsum.photos/id/64/800/800',
      timestamp: Date.parse('2025-01-14T12:00:00')
    }
  ]
};
