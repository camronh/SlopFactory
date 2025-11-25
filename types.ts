
export enum ModelId {
  GEMINI_FLASH = 'gemini-2.5-flash',
  GEMINI_PRO = 'gemini-3-pro-preview',
  GEMINI_FLASH_IMAGE = 'gemini-2.5-flash-image',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_5_PREVIEW = 'gpt-5-preview',
  CLAUDE_3_OPUS = 'claude-3-opus',
  CLAUDE_3_SONNET = 'claude-3-sonnet'
}

export enum Category {
  STORY = 'Short Story',
  LANDING_PAGE = 'Landing Page',
  SLIDESHOW = 'Slideshow',
  IMAGE = 'Image Generation',
  CREATIVE = 'Creative Writing',
  OTHER = 'Other'
}

export interface Variant {
  modelId: ModelId;
  output: string; // Text content or base64 image string / URL
}

export interface GalleryItem {
  id: string;
  slug: string;
  title: string;
  prompt: string;
  category: Category;
  isImage: boolean;
  timestamp: number;
  variants: Variant[];
}
