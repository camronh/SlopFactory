import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { allTests } from '../data';
import { Category, GalleryItem } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getModelDisplayName, getModelLogo } from '../modelConfig';

// Card component built into the page for cohesive design
const GalleryCard: React.FC<{ item: GalleryItem; index: number; featured?: boolean }> = ({ item, index, featured }) => {
  const [activeVariant, setActiveVariant] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevVariantRef = useRef(0);
  const variant = item.variants[activeVariant];
  const categories = Array.isArray(item.category) ? item.category : [item.category];

  const handleVariantChange = (newIndex: number) => {
    if (newIndex === activeVariant || isAnimating) return;

    setSlideDirection(newIndex > prevVariantRef.current ? 'left' : 'right');
    setIsAnimating(true);
    prevVariantRef.current = newIndex;
    setActiveVariant(newIndex);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getSlideClass = () => {
    if (!slideDirection) return '';
    if (slideDirection === 'left') {
      return 'animate-slide-in-right';
    }
    return 'animate-slide-in-left';
  };

  return (
    <Link
      to={`/${item.slug}`}
      className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl ${featured ? 'row-span-2' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Preview Area */}
      <div className={`relative overflow-hidden ${featured ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
        <div className={`w-full h-full ${getSlideClass()}`}>
          {item.isImage ? (
            <img
              src={variant.output}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 p-6 pt-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 from-0% via-slate-50/80 via-8% to-transparent to-20% z-10 pointer-events-none" />
              <div className="prose prose-xs prose-slate max-w-none text-slate-400 leading-relaxed whitespace-pre-line [&>*]:text-xs [&>*]:my-1 [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-xs [&_p]:text-xs [&_p]:whitespace-pre-line [&_li]:text-xs [&_code]:text-[10px] [&_pre]:text-[10px] [&_pre]:bg-slate-200/50 [&_pre]:p-2 [&_pre]:rounded [&_pre]:whitespace-pre-wrap">
                <ReactMarkdown>
                  {variant.output}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

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
              title={getModelDisplayName(v.modelId)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleVariantChange(idx);
              }}
              className={`w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                idx === activeVariant ? 'ring-2 ring-emerald-500 ring-offset-2' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={getModelLogo(v.modelId)} alt="" className="w-4 h-4 object-contain" />
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
            <img src={getModelLogo(variant.modelId)} alt="" className="w-4 h-4 object-contain opacity-60" />
            <span className="text-xs text-slate-400">{getModelDisplayName(variant.modelId)}</span>
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
        path="/"
        type="website"
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative mb-12">
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-sky-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-amber-100/30 to-rose-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Eyebrow row with Blog link */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-emerald-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  AI Output Archive
                </span>
              </div>
              <a
                href="https://www.wiseguyai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 hover:text-emerald-600 transition-colors duration-300"
              >
                Blog →
              </a>
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
                <span className="text-2xl font-bold text-slate-900">4</span>
                <span className="text-slate-500 ml-2">AI providers</span>
              </div>
            </div>
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
          <div className="text-center text-sm text-slate-400">
            <p>Comparing outputs from leading AI models</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
