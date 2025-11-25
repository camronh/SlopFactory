import { GalleryItem, Category, ModelId } from '../../types';

export const test: GalleryItem = {
  id: 'cw-1',
  slug: 'haiku-about-coding',
  title: 'Haiku about Coding',
  prompt: 'Write a haiku about debugging code at 2 AM.',
  category: Category.CREATIVE,
  isImage: false,
  timestamp: 1715850000000,
  variants: [
    {
      modelId: ModelId.GEMINI_FLASH,
      output: 'Screen light burns my eyes,\nOne missing semicolon,\nSunlight breaks the dawn.'
    },
    {
      modelId: ModelId.GPT_4_TURBO,
      output: 'Coffee cup is dry,\nLogic fails in midnight glow,\nBug remains unsolved.'
    },
    {
      modelId: ModelId.CLAUDE_3_OPUS,
      output: 'Moonlight hits the keys\nError log flows like a stream\nSleep is but a dream'
    }
  ]
};
