import { GalleryItem, Category, ModelId } from '../../types';

export const test: GalleryItem = {
  id: 'lp-1',
  slug: 'saas-landing-page-header',
  title: 'SaaS Landing Page Header',
  description: 'Hero section copy for a design collaboration SaaS platform.',
  prompt: 'Generate a hero section copy for a SaaS platform that helps designers collaborate. Tone: Professional but energetic.',
  category: Category.LANDING_PAGE,
  isImage: false,
  variants: [
    {
      modelId: ModelId.GEMINI_PRO,
      output: '# Design Together, Build Faster.\n\nStop the feedback loop from hell. Sync is the real-time collaboration workspace where designers, developers, and product managers speak the same language.\n\n[Start Collaborating for Free]  [View Demo]\n\n"The missing link in our product stack." — Creative Director @ TechFlow',
      timestamp: Date.parse('2025-01-12T12:00:00')
    },
    {
      modelId: ModelId.GPT_5_PREVIEW,
      output: '# Unleash Your Creative Velocity\n\nDesign is a team sport. Don\'t let silos slow you down. Meet Sync: The unified platform transforming how modern teams dream, design, and deploy.\n\n[Get Started - Free] [Watch Video]\n\nTrusted by 10,000+ teams who ship faster.',
      timestamp: Date.parse('2025-01-12T12:00:00')
    }
  ]
};
