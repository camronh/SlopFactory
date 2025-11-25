import { GalleryItem, Category, ModelId } from '../../types';

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
      output: 'Unit 734 creaked, its joints rusty. It tilted the watering can, a single drop falling onto the parched earth where a sprout dared to exist. "Grow," it whirred, a command and a prayer. The wind howled through the empty city, but 734 stood guard. Hope was a heavy protocol.',
      timestamp: Date.parse('2025-01-11T12:00:00')
    },
    {
      modelId: ModelId.GPT_4_TURBO,
      output: 'Rust coated Unit-9\'s fingers as it tipped the can. One drop. The petal shivered. "Function executed," it beeped to the silence. No birds sang. No children played. Just the hum of its battery dying and the green defiance rising from the dust. It powered down, content.',
      timestamp: Date.parse('2025-01-11T12:00:00')
    },
    {
      modelId: ModelId.CLAUDE_3_OPUS,
      output: 'The gears ground slowly as X-99 administered the final ration of water. A solitary purple bloom stood amidst the rubble. "You are the legacy," the machine intoned softly. As its power cell flickered and died, the robot froze in eternal vigil, a metal guardian for the world\'s last breath of life.',
      timestamp: Date.parse('2025-01-11T12:00:00')
    }
  ]
};
