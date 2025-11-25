import { GalleryItem, Category, ModelId } from '../../../types';

import geminiFlashOutput from './gemini-2.5-flash.md?raw';
import gpt4TurboOutput from './gpt-4-turbo.md?raw';
import claude3OpusOutput from './claude-3-opus.md?raw';

export const test: GalleryItem = {
  id: 'story-1',
  slug: 'micro-story-the-last-robot',
  title: 'Micro-Story: The Last Robot',
  description: 'A 50-word micro-story about the last robot on Earth watering a flower.',
  prompt: 'Write a 50 word story about the last robot on earth watering a flower.',
  category: Category.STORY,
  isImage: false,
  variants: [
    {
      modelId: ModelId.GEMINI_FLASH,
      output: geminiFlashOutput,
      timestamp: Date.parse('2025-01-11T12:00:00')
    },
    {
      modelId: ModelId.GPT_4_TURBO,
      output: gpt4TurboOutput,
      timestamp: Date.parse('2025-01-11T12:00:00')
    },
    {
      modelId: ModelId.CLAUDE_3_OPUS,
      output: claude3OpusOutput,
      timestamp: Date.parse('2025-01-11T12:00:00')
    }
  ]
};
