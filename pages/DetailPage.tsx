import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { ModelBadge } from '../components/ModelBadge';
import { getTestBySlug } from '../data';
import { ArrowLeft, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export const DetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const item = slug ? getTestBySlug(slug) : undefined;

  // 404 handling - redirect to home
  if (!item) {
    return <Navigate to="/" replace />;
  }

  const activeVariant = item.variants[activeVariantIndex];
  const ogImage = item.isImage ? activeVariant.output : undefined;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeVariant.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrev = () => {
    setActiveVariantIndex((prev) => (prev - 1 + item.variants.length) % item.variants.length);
  };

  const handleNext = () => {
    setActiveVariantIndex((prev) => (prev + 1) % item.variants.length);
  };

  return (
    <Layout>
      <SEO
        title={item.title}
        description={item.prompt.slice(0, 160)}
        ogImage={ogImage}
      />
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 pb-20">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-4 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Catalogue
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Output Display */}
          <div className="lg:col-span-2 space-y-4">

            {/* Switcher Controls */}
            <div className="flex items-center justify-between bg-white rounded-xl p-2 border border-gray-100 shadow-sm">
              <button onClick={handlePrev} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-emerald-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Model Tabs (Centered) */}
              <div className="flex space-x-2 overflow-x-auto py-1 px-2 no-scrollbar">
                {item.variants.map((variant, idx) => (
                  <button
                    key={variant.modelId}
                    onClick={() => setActiveVariantIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 text-xs font-medium whitespace-nowrap ${
                      activeVariantIndex === idx
                        ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 text-emerald-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600'
                    }`}
                  >
                    {activeVariantIndex === idx && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                    <ModelBadge modelId={variant.modelId} className="border-0 bg-transparent p-0 text-inherit" />
                  </button>
                ))}
              </div>

              <button onClick={handleNext} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-emerald-600 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px] flex flex-col">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  Result Output
                </h3>
                {!item.isImage && (
                  <button
                    onClick={handleCopy}
                    className="text-gray-500 hover:text-emerald-600 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide transition-colors bg-white px-3 py-1.5 rounded-md border border-gray-200 hover:border-emerald-200"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Text'}
                  </button>
                )}
              </div>

              <div className="p-0 bg-white flex-1 relative">
                {item.isImage ? (
                  <div className="flex justify-center bg-gray-100 p-8 h-full items-center">
                    <img
                      key={activeVariant.modelId}
                      src={activeVariant.output}
                      alt={item.title}
                      className="max-w-full max-h-[600px] rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-300"
                    />
                  </div>
                ) : (
                  <div className="p-8 prose prose-emerald max-w-none animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed text-base">
                      {activeVariant.output}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Metadata */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="mb-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 mb-3 border border-emerald-100">
                  {item.category}
                </span>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">{item.title}</h1>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Prompt</span>
                  <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 italic border border-slate-100 leading-relaxed relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
                    "{item.prompt}"
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Active Model</span>
                    <div className="text-base text-slate-800">
                      <ModelBadge modelId={activeVariant.modelId} />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Generated On</span>
                    <p className="text-sm text-gray-600 font-medium">
                      {new Date(item.timestamp).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
