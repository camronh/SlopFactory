import { GalleryItem, Category, ModelId } from '../../../types';

// Note: These are placeholder URLs. Replace with actual PNG imports when images are added:
// import geminiFlashImage from './gemini-2.5-flash-image.png';
// import gpt5PreviewImage from './gpt-5-preview.png';
// import gpt4TurboImage from './gpt-4-turbo.png';

export const test: GalleryItem = {
  id: 'img-1',
  slug: 'neon-cyberpunk-city',
  title: 'Neon Cyberpunk City',
  description: 'A futuristic cityscape with neon lights, rain-slicked streets, and towering skyscrapers.',
  prompt: 'A futuristic cyberpunk city with neon lights, rain-slicked streets, and towering skyscrapers, digital art style, high contrast, cinematic lighting.',
  category: Category.IMAGE,
  isImage: true,
  variants: [
    {
      modelId: ModelId.GEMINI_FLASH_IMAGE,
      output: 'https://picsum.photos/id/164/800/800', // Replace with: geminiFlashImage
      timestamp: Date.parse('2025-01-10T12:00:00')
    },
    {
      modelId: ModelId.GPT_5_PREVIEW,
      output: 'https://picsum.photos/id/188/800/800', // Replace with: gpt5PreviewImage
      timestamp: Date.parse('2025-01-10T12:00:00')
    },
    {
      modelId: ModelId.GPT_4_TURBO,
      output: 'https://picsum.photos/id/203/800/800', // Replace with: gpt4TurboImage
      timestamp: Date.parse('2025-01-10T12:00:00')
    }
  ]
};
