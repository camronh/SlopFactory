import { GalleryItem, Category, ModelId } from '../../types';

export const test: GalleryItem = {
  id: 'img-1',
  slug: 'neon-cyberpunk-city',
  title: 'Neon Cyberpunk City',
  prompt: 'A futuristic cyberpunk city with neon lights, rain-slicked streets, and towering skyscrapers, digital art style, high contrast, cinematic lighting.',
  category: Category.IMAGE,
  isImage: true,
  timestamp: 1715421200000,
  variants: [
    {
      modelId: ModelId.GEMINI_FLASH_IMAGE,
      output: 'https://picsum.photos/id/164/800/800'
    },
    {
      modelId: ModelId.GPT_5_PREVIEW,
      output: 'https://picsum.photos/id/188/800/800'
    },
    {
      modelId: ModelId.GPT_4_TURBO,
      output: 'https://picsum.photos/id/203/800/800'
    }
  ]
};
