import { GalleryItem, Category, ModelId } from '../../types';

export const test: GalleryItem = {
  id: 'img-3',
  slug: 'abstract-geometric-shapes',
  title: 'Abstract Geometric Shapes',
  description: '3D render of abstract geometric shapes with gold and marble textures.',
  prompt: '3D render of abstract geometric shapes, gold and marble textures, floating in a white void, minimalist.',
  category: Category.IMAGE,
  isImage: true,
  variants: [
    {
      modelId: ModelId.GEMINI_FLASH_IMAGE,
      output: 'https://picsum.photos/id/20/800/800',
      timestamp: Date.parse('2025-01-17T12:00:00')
    }
  ]
};
