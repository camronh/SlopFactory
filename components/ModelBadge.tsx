
import React from 'react';
import { ModelId } from '../types';
import { getModelDisplayName, getModelBadgeColor } from '../modelConfig';

interface ModelBadgeProps {
  modelId: ModelId;
  className?: string;
}

export const ModelBadge: React.FC<ModelBadgeProps> = ({ modelId, className = '' }) => {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border ${getModelBadgeColor(modelId)} ${className}`}>
      {getModelDisplayName(modelId)}
    </span>
  );
};
