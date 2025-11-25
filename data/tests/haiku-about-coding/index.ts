import { GalleryItem, Category, ModelId } from '../../../types';

import geminiFlashOutput from './gemini-2.5-flash.md?raw';
import gpt4TurboOutput from './gpt-4-turbo.md?raw';
import claude3OpusOutput from './claude-3-opus.md?raw';

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
      output: geminiFlashOutput,
      timestamp: Date.parse('2025-01-15T12:00:00')
    },
    {
      modelId: ModelId.GPT_4_TURBO,
      output: gpt4TurboOutput,
      timestamp: Date.parse('2025-01-15T12:00:00')
    },
    {
      modelId: ModelId.CLAUDE_3_OPUS,
      output: claude3OpusOutput,
      timestamp: Date.parse('2025-01-15T12:00:00')
    }
  ]
};
