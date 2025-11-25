import { GalleryItem } from '../types';
import { test as neonCyberpunkCity } from './tests/neon-cyberpunk-city';
import { test as watercolorCatPortrait } from './tests/watercolor-cat-portrait';
import { test as abstractGeometricShapes } from './tests/abstract-geometric-shapes';
import { test as aiLaborMarketStory } from './tests/ai-labor-market-story';
import { test as haikuAboutCoding } from './tests/haiku-about-coding';
import { test as microStoryTheLastRobot } from './tests/micro-story-the-last-robot';
import { test as saasLandingPageHeader } from './tests/saas-landing-page-header';
import { test as q3MarketingSlideshowOutline } from './tests/q3-marketing-slideshow-outline';
import { test as ecoCoffeeShopValueProp } from './tests/eco-coffee-shop-value-prop';

// Get the most recent variant timestamp for a test
const getLatestTimestamp = (item: GalleryItem): number =>
  Math.max(...item.variants.map(v => v.timestamp));

// Sorted by most recent variant (newest first)
export const allTests: GalleryItem[] = [
  neonCyberpunkCity,
  watercolorCatPortrait,
  abstractGeometricShapes,
  aiLaborMarketStory,
  haikuAboutCoding,
  microStoryTheLastRobot,
  saasLandingPageHeader,
  q3MarketingSlideshowOutline,
  ecoCoffeeShopValueProp,
].sort((a, b) => getLatestTimestamp(b) - getLatestTimestamp(a));

// O(1) lookup by slug
const testsBySlug = new Map<string, GalleryItem>(
  allTests.map(t => [t.slug, t])
);

export const getTestBySlug = (slug: string): GalleryItem | undefined => {
  return testsBySlug.get(slug);
};
