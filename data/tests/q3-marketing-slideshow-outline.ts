import { GalleryItem, Category, ModelId } from '../../types';

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
      output: 'Slide 1: Title Slide\n- "Q3 Social Media Expansion Strategy"\n- Presenter Name\n\nSlide 2: Current Landscape Analysis\n- Review of Q2 metrics (Growth flatlined at 5%)\n- Competitor analysis snapshot\n\nSlide 3: The Video-First Initiative\n- Pivot to short-form video content (Reels/Shorts)\n- Resource allocation: 40% of budget to video production\n\nSlide 4: Influencer Partnerships\n- Micro-influencer campaign details\n- Projected reach: 500k impressions\n\nSlide 5: Key OKRs & Timeline\n- Goal: 20% follower increase by Oct 1st\n- Weekly sprint schedule breakdown',
      timestamp: Date.parse('2025-01-13T12:00:00')
    },
    {
      modelId: ModelId.CLAUDE_3_SONNET,
      output: '1. Executive Summary\n   - Goal: 25% Growth YoY\n   - Focus: TikTok & LinkedIn\n\n2. Q2 Performance Review\n   - Wins: High engagement on Twitter\n   - Misses: Low conversion on Instagram\n\n3. Strategic Pivot: Authenticity\n   - Shift from polished ads to UGC\n   - Employee advocacy program launch\n\n4. Budget Allocation\n   - 50% Content Creation\n   - 30% Paid Boosts\n   - 20% Tools/Analytics\n\n5. Next Steps\n   - Hiring content lead\n   - Launch date: July 15th',
      timestamp: Date.parse('2025-01-13T12:00:00')
    }
  ]
};
