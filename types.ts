
export enum ModelId {
  GEMINI_FLASH = 'gemini-2.5-flash',
  GEMINI_PRO = 'gemini-3-pro-preview',
  GEMINI_FLASH_IMAGE = 'gemini-2.5-flash-image',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_5_PREVIEW = 'gpt-5-preview',
  GPT_51 = 'gpt-5.1',
  CLAUDE_3_OPUS = 'claude-3-opus',
  CLAUDE_3_SONNET = 'claude-3-sonnet',
  CLAUDE_OPUS_45 = 'claude-opus-4.5',
  GROK_41 = 'grok-4.1'
}

export enum Category {
  STORY = 'Story',
  LANDING_PAGE = 'Landing Page',
  SLIDESHOW = 'Slideshow',
  IMAGE = 'Image Generation',
  CREATIVE = 'Creative Writing',
  OTHER = 'Other'
}

export interface Variant {
  modelId: ModelId;
  output: string; // Text content or base64 image string / URL
  timestamp: number; // Timestamp for when this variant was generated
}

export interface GalleryItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  prompt: string;
  category: Category | Category[];
  isImage: boolean;
  variants: Variant[];
}
