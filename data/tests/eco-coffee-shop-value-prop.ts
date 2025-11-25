import { GalleryItem, Category, ModelId } from '../../types';

export const test: GalleryItem = {
  id: 'lp-2',
  slug: 'eco-coffee-shop-value-prop',
  title: 'Eco-Coffee Shop Value Prop',
  description: 'Value propositions for an eco-friendly coffee subscription service.',
  prompt: 'Write 3 value propositions for an eco-friendly coffee subscription box.',
  category: Category.LANDING_PAGE,
  isImage: false,
  variants: [
    {
      modelId: ModelId.GEMINI_PRO,
      output: '1. **Sip Sustainably:** Every bean is ethically sourced from rainforest-certified farms, ensuring your morning ritual heals the planet.\n2. **Zero-Waste Delivery:** From the mailer to the bag, our packaging is 100% compostable. No plastic, ever.\n3. **Roasted to Order:** We don\'t roast until you order. Experience peak freshness that grocery store coffee can\'t compete with.',
      timestamp: Date.parse('2025-01-16T12:00:00')
    }
  ]
};
