import { GalleryItem } from '../types';
import { test as neonCyberpunkCity } from './tests/neon-cyberpunk-city';
import { test as watercolorCatPortrait } from './tests/watercolor-cat-portrait';
import { test as abstractGeometricShapes } from './tests/abstract-geometric-shapes';
import { test as aiLaborMarketStory } from './tests/ai-labor-market-story';

// Get the most recent variant timestamp for a test
const getLatestTimestamp = (item: GalleryItem): number =>
  Math.max(...item.variants.map(v => v.timestamp));

// Sorted by most recent variant (newest first)
export const allTests: GalleryItem[] = [
  neonCyberpunkCity,
  watercolorCatPortrait,
  abstractGeometricShapes,
  aiLaborMarketStory,
].sort((a, b) => getLatestTimestamp(b) - getLatestTimestamp(a));

// O(1) lookup by slug
const testsBySlug = new Map<string, GalleryItem>(
  allTests.map(t => [t.slug, t])
);

export const getTestBySlug = (slug: string): GalleryItem | undefined => {
  return testsBySlug.get(slug);
};
