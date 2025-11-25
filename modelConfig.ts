import { ModelId } from './types';

// Provider enum - each AI company
export enum Provider {
  ANTHROPIC = 'anthropic',
  OPENAI = 'openai',
  GOOGLE = 'google',
  XAI = 'xai',
}

// Provider-level styling (shared across all models from that provider)
export const providerConfig: Record<Provider, {
  logo: string;
  colors: { bg: string; border: string; text: string; light: string; dot: string };
  badgeColor: string;
}> = {
  [Provider.ANTHROPIC]: {
    logo: '/logos/claudelogo.png',
    colors: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', light: 'bg-amber-100', dot: 'bg-amber-500' },
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  [Provider.OPENAI]: {
    logo: '/logos/openailogo.png',
    colors: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', light: 'bg-emerald-100', dot: 'bg-emerald-500' },
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  [Provider.GOOGLE]: {
    logo: '/logos/geminilogo.png',
    colors: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', light: 'bg-blue-100', dot: 'bg-blue-500' },
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  [Provider.XAI]: {
    logo: '/logos/grok.svg',
    colors: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', light: 'bg-slate-100', dot: 'bg-slate-500' },
    badgeColor: 'bg-gray-100 text-gray-800 border-gray-200',
  },
};

// Model-specific config (just display name + which provider)
export const modelConfig: Record<ModelId, { displayName: string; provider: Provider }> = {
  // Anthropic
  [ModelId.CLAUDE_OPUS_45]: { displayName: 'Claude Opus 4.5', provider: Provider.ANTHROPIC },
  [ModelId.CLAUDE_OPUS_41]: { displayName: 'Claude Opus 4.1', provider: Provider.ANTHROPIC },
  [ModelId.CLAUDE_3_OPUS]: { displayName: 'Claude 3 Opus', provider: Provider.ANTHROPIC },
  [ModelId.CLAUDE_3_SONNET]: { displayName: 'Claude 3 Sonnet', provider: Provider.ANTHROPIC },
  // OpenAI
  [ModelId.GPT_51]: { displayName: 'GPT-5.1', provider: Provider.OPENAI },
  [ModelId.GPT_5_PREVIEW]: { displayName: 'GPT-5 Preview', provider: Provider.OPENAI },
  [ModelId.GPT_4_TURBO]: { displayName: 'GPT-4 Turbo', provider: Provider.OPENAI },
  // Google
  [ModelId.GEMINI_PRO]: { displayName: 'Gemini 3 Pro', provider: Provider.GOOGLE },
  [ModelId.GEMINI_FLASH]: { displayName: 'Gemini 2.5 Flash', provider: Provider.GOOGLE },
  [ModelId.GEMINI_FLASH_IMAGE]: { displayName: 'Gemini Flash Image', provider: Provider.GOOGLE },
  // xAI
  [ModelId.GROK_41]: { displayName: 'Grok 4.1', provider: Provider.XAI },
};

// Helper functions
export const getModelDisplayName = (modelId: ModelId): string => {
  return modelConfig[modelId]?.displayName || modelId;
};

export const getModelLogo = (modelId: ModelId): string => {
  const provider = modelConfig[modelId]?.provider;
  return provider ? providerConfig[provider].logo : '/logos/default.png';
};

export const getModelColors = (modelId: ModelId) => {
  const provider = modelConfig[modelId]?.provider;
  return provider
    ? providerConfig[provider].colors
    : { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', light: 'bg-gray-100', dot: 'bg-gray-500' };
};

export const getModelBadgeColor = (modelId: ModelId): string => {
  const provider = modelConfig[modelId]?.provider;
  return provider ? providerConfig[provider].badgeColor : 'bg-gray-100 text-gray-800 border-gray-200';
};
