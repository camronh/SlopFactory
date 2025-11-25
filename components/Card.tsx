
import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { ModelBadge } from './ModelBadge';
import { Calendar, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface CardProps {
  item: GalleryItem;
  onClick: (item: GalleryItem) => void;
  isAutoRotationPaused?: boolean;
}

export const Card: React.FC<CardProps> = ({ item, onClick, isAutoRotationPaused = false }) => {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const activeVariant = item.variants[activeVariantIndex];

  const date = new Date(item.timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Auto-rotate effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    // Only auto-rotate if not hovered, not paused, and has multiple variants
    if (!isHovered && !isAutoRotationPaused && item.variants.length > 1) {
      interval = setInterval(() => {
        setActiveVariantIndex((prev) => (prev + 1) % item.variants.length);
      }, 4000); // 4 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isHovered, isAutoRotationPaused, item.variants.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveVariantIndex((prev) => (prev - 1 + item.variants.length) % item.variants.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveVariantIndex((prev) => (prev + 1) % item.variants.length);
  };

  return (
    <div 
      className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail / Preview Area */}
      <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative">
        
        {/* Content */}
        {item.isImage ? (
          <img 
            key={activeVariant.modelId} 
            src={activeVariant.output} 
            alt={item.title} 
            className="w-full h-full object-cover animate-in fade-in duration-500" 
          />
        ) : (
          <div className="w-full h-full p-6 text-xs text-gray-500 overflow-hidden bg-slate-50 relative animate-in fade-in duration-500">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-50/90 z-10"></div>
             <p className="font-mono opacity-60 whitespace-pre-wrap">{activeVariant.output.slice(0, 300)}...</p>
          </div>
        )}
        
        {/* Navigation Arrows (Visible on Hover) */}
        {item.variants.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none">
            <button 
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-emerald-600 shadow-sm transition-all pointer-events-auto transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-emerald-600 shadow-sm transition-all pointer-events-auto transform hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-20">
             <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider text-gray-600 shadow-sm border border-gray-100">
                {item.category}
             </span>
        </div>

        {/* Bottom Badges & Indicators */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end">
             {/* Pagination Dots */}
             <div className="flex gap-1 mb-1">
                {item.variants.length > 1 && item.variants.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1 rounded-full transition-all duration-300 shadow-sm ${idx === activeVariantIndex ? 'w-4 bg-emerald-500' : 'w-1 bg-white/70'}`}
                    />
                ))}
             </div>

             {/* Model Badge */}
             <div className="shadow-sm">
                <ModelBadge modelId={activeVariant.modelId} className="bg-white/95 backdrop-blur border-white/50" />
             </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {item.title || "Untitled Experiment"}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
          {item.prompt}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
             <div className="flex items-center gap-1 text-xs text-gray-400">
                <span className="font-medium text-slate-600">{item.variants.length}</span>
                <span>versions</span>
             </div>
             
             <div className="flex items-center text-xs text-gray-400 gap-1">
                <Calendar className="w-3 h-3" />
                {date}
             </div>
        </div>
      </div>
    </div>
  );
};
