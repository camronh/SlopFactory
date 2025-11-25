import { GalleryItem, Category, ModelId } from '../../types';

export const test: GalleryItem = {
  id: 'cw-1',
  slug: 'haiku-about-coding',
  title: 'Haiku about Coding',
  description: 'A haiku capturing the late-night debugging experience.',
  prompt: 'Write a haiku about debugging code at 2 AM.',
  category: Category.CREATIVE,
  isImage: false,
  variants: [
    {
      modelId: ModelId.GEMINI_FLASH,
      output: 'Screen light burns my eyes,\nOne missing semicolon,\nSunlight breaks the dawn.',
      timestamp: Date.parse('2025-01-15T12:00:00')
    },
    {
      modelId: ModelId.GPT_4_TURBO,
      output: 'Coffee cup is dry,\nLogic fails in midnight glow,\nBug remains unsolved.',
      timestamp: Date.parse('2025-01-15T12:00:00')
    },
    {
      modelId: ModelId.CLAUDE_3_OPUS,
      output: 'Moonlight hits the keys\nError log flows like a stream\nSleep is but a dream',
      timestamp: Date.parse('2025-01-15T12:00:00')
    }
  ]
};
