import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { SEO } from '../components/SEO';
import { allTests } from '../data';
import { Category } from '../types';
import { Filter, Terminal } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [isAutoRotationPaused, setIsAutoRotationPaused] = useState(false);

  const filteredItems = filter === 'All'
    ? allTests
    : allTests.filter(i => i.category === filter);

  return (
    <Layout
      isAutoRotationPaused={isAutoRotationPaused}
      onToggleAutoRotation={() => setIsAutoRotationPaused(p => !p)}
    >
      <SEO
        title="AI Model Comparison Gallery"
        description="Compare AI generation outputs across Gemini, GPT-5, and Claude models. A curated collection of AI generation tests."
      />
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Banner / Hero Section for the Catalogue */}
        <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-32 -mb-32 opacity-50 blur-3xl"></div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Slop<span className="text-emerald-600">Factory</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A curated collection of AI generation tests. Compare performance across models including
              <span className="font-semibold text-emerald-600"> Gemini</span>,
              <span className="font-semibold text-blue-600"> GPT-5</span>, and
              <span className="font-semibold text-orange-600"> Claude 3</span>.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-20 z-40 bg-gray-50/95 backdrop-blur py-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Filter className="w-4 h-4" />
            <span>Filter by Category:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', ...Object.values(Category)].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat as Category | 'All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  filter === cat
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {filteredItems.map(item => (
            <Card key={item.id} item={item} isAutoRotationPaused={isAutoRotationPaused} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Terminal className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500">No items found in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
