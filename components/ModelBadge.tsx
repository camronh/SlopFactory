
import React from 'react';
import { ModelId } from '../types';

interface ModelBadgeProps {
  modelId: ModelId;
  className?: string;
}

export const ModelBadge: React.FC<ModelBadgeProps> = ({ modelId, className = '' }) => {
  const labels: Record<ModelId, { text: string; color: string }> = {
    [ModelId.GEMINI_FLASH]: { text: 'Gemini 2.5 Flash', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    [ModelId.GEMINI_PRO]: { text: 'Gemini 3 Pro', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    [ModelId.GEMINI_FLASH_IMAGE]: { text: 'Flash Image', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    [ModelId.GPT_4_TURBO]: { text: 'GPT-4 Turbo', color: 'bg-green-100 text-green-800 border-green-200' },
    [ModelId.GPT_5_PREVIEW]: { text: 'GPT-5 Preview', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    [ModelId.CLAUDE_3_OPUS]: { text: 'Claude 3 Opus', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    [ModelId.CLAUDE_3_SONNET]: { text: 'Claude 3 Sonnet', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  };

  const config = labels[modelId] || { text: modelId, color: 'bg-gray-100 text-gray-800 border-gray-200' };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border ${config.color} ${className}`}>
      {config.text}
    </span>
  );
};
