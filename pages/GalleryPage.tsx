import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { allTests } from '../data';
import { Category, ModelId, GalleryItem } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

const modelLogos: Record<string, string> = {
  [ModelId.CLAUDE_OPUS_45]: '/logos/claudelogo.png',
  [ModelId.CLAUDE_3_OPUS]: '/logos/claudelogo.png',
  [ModelId.CLAUDE_3_SONNET]: '/logos/claudelogo.png',
  [ModelId.GPT_51]: '/logos/openailogo.png',
  [ModelId.GPT_5_PREVIEW]: '/logos/openailogo.png',
  [ModelId.GPT_4_TURBO]: '/logos/openailogo.png',
  [ModelId.GEMINI_PRO]: '/logos/geminilogo.png',
  [ModelId.GEMINI_FLASH]: '/logos/geminilogo.png',
  [ModelId.GEMINI_FLASH_IMAGE]: '/logos/geminilogo.png',
  [ModelId.GROK_41]: '/logos/grok.svg',
};

const modelNames: Record<string, string> = {
  [ModelId.CLAUDE_OPUS_45]: 'Claude Opus 4.5',
  [ModelId.CLAUDE_3_OPUS]: 'Claude 3 Opus',
  [ModelId.CLAUDE_3_SONNET]: 'Claude 3 Sonnet',
  [ModelId.GPT_51]: 'GPT-5.1',
  [ModelId.GPT_5_PREVIEW]: 'GPT-5',
  [ModelId.GPT_4_TURBO]: 'GPT-4 Turbo',
  [ModelId.GEMINI_PRO]: 'Gemini Pro',
  [ModelId.GEMINI_FLASH]: 'Gemini Flash',
  [ModelId.GEMINI_FLASH_IMAGE]: 'Gemini Flash',
  [ModelId.GROK_41]: 'Grok 4.1',
};

// Card component built into the page for cohesive design
const GalleryCard: React.FC<{ item: GalleryItem; index: number; featured?: boolean }> = ({ item, index, featured }) => {
  const [activeVariant, setActiveVariant] = useState(0);
  const variant = item.variants[activeVariant];
  const categories = Array.isArray(item.category) ? item.category : [item.category];

  return (
    <Link
      to={`/${item.slug}`}
      className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl ${featured ? 'row-span-2' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Preview Area */}
      <div className={`relative overflow-hidden ${featured ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
        {item.isImage ? (
          <img
            src={variant.output}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <p className="font-mono text-xs text-slate-400 leading-relaxed line-clamp-[12]">
              {variant.output.slice(0, 500)}
            </p>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Categories */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {categories.map(cat => (
            <span
              key={cat}
              className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-wider text-slate-600"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Model indicators */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-10">
          {item.variants.map((v, idx) => (
            <button
              key={v.modelId}
              title={modelNames[v.modelId] || v.modelId}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveVariant(idx);
              }}
              className={`w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                idx === activeVariant ? 'ring-2 ring-emerald-500 ring-offset-2' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={modelLogos[v.modelId]} alt="" className="w-4 h-4 object-contain" />
            </button>
          ))}
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-10">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
            <ArrowRight className="w-4 h-4 text-slate-700" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {item.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={modelLogos[variant.modelId]} alt="" className="w-4 h-4 object-contain opacity-60" />
            <span className="text-xs text-slate-400">{modelNames[variant.modelId] || variant.modelId}</span>
          </div>
          <span className="text-xs text-slate-400">
            {new Date(variant.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const filteredItems = filter === 'All'
    ? allTests
    : allTests.filter(i => {
        const cats = Array.isArray(i.category) ? i.category : [i.category];
        return cats.includes(filter);
      });

  const allCategories = ['All', ...Object.values(Category)] as const;

  return (
    <Layout>
      <SEO
        title="AI Model Comparison Gallery"
        description="Compare AI generation outputs across Gemini, GPT-5, and Claude models. A curated collection of AI generation tests."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative mb-12">
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-sky-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-amber-100/30 to-rose-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                AI Output Archive
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Slop<span className="text-emerald-600">Factory</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-8">
              A curated gallery comparing AI model outputs. See how
              <span className="font-medium text-amber-600"> Claude</span>,
              <span className="font-medium text-emerald-600"> GPT</span>, and
              <span className="font-medium text-blue-600"> Gemini</span> interpret the same prompts.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 text-sm">
              <div>
                <span className="text-2xl font-bold text-slate-900">{allTests.length}</span>
                <span className="text-slate-500 ml-2">experiments</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-2xl font-bold text-slate-900">
                  {allTests.reduce((acc, t) => acc + t.variants.length, 0)}
                </span>
                <span className="text-slate-500 ml-2">total outputs</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-2xl font-bold text-slate-900">3</span>
                <span className="text-slate-500 ml-2">AI providers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="-mx-4 px-4 py-4 mb-8">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider shrink-0">Filter:</span>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat as Category | 'All')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  filter === cat
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - Bento style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              featured={index === 0 && filteredItems.length > 3}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-6">
              <Sparkles className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No experiments found</h3>
            <p className="text-slate-500">Try selecting a different category.</p>
          </div>
        )}

        {/* Footer decoration */}
        <div className="mt-20 pt-12 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>Comparing outputs from leading AI models</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img src="/logos/claudelogo.png" alt="Claude" className="w-5 h-5 object-contain opacity-40" />
                <span>Claude</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/logos/openailogo.png" alt="OpenAI" className="w-5 h-5 object-contain opacity-40" />
                <span>GPT</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/logos/geminilogo.png" alt="Gemini" className="w-5 h-5 object-contain opacity-40" />
                <span>Gemini</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
