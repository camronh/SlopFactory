import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { getTestBySlug } from '../data';
import { ArrowLeft, Copy, Check, ChevronDown } from 'lucide-react';
import { ModelId } from '../types';

// Model-specific accent colors
const modelColors: Record<string, { bg: string; border: string; text: string; light: string; dot: string }> = {
  [ModelId.CLAUDE_OPUS_45]: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', light: 'bg-amber-100', dot: 'bg-amber-500' },
  [ModelId.CLAUDE_3_OPUS]: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', light: 'bg-orange-100', dot: 'bg-orange-500' },
  [ModelId.CLAUDE_3_SONNET]: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', light: 'bg-yellow-100', dot: 'bg-yellow-500' },
  [ModelId.GPT_51]: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', light: 'bg-emerald-100', dot: 'bg-emerald-500' },
  [ModelId.GPT_5_PREVIEW]: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', light: 'bg-green-100', dot: 'bg-green-500' },
  [ModelId.GPT_4_TURBO]: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', light: 'bg-teal-100', dot: 'bg-teal-500' },
  [ModelId.GEMINI_PRO]: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', light: 'bg-blue-100', dot: 'bg-blue-500' },
  [ModelId.GEMINI_FLASH]: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', light: 'bg-sky-100', dot: 'bg-sky-500' },
  [ModelId.GEMINI_FLASH_IMAGE]: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', light: 'bg-indigo-100', dot: 'bg-indigo-500' },
};

const modelDisplayNames: Record<string, string> = {
  [ModelId.CLAUDE_OPUS_45]: 'Claude Opus 4.5',
  [ModelId.CLAUDE_3_OPUS]: 'Claude 3 Opus',
  [ModelId.CLAUDE_3_SONNET]: 'Claude 3 Sonnet',
  [ModelId.GPT_51]: 'GPT-5.1',
  [ModelId.GPT_5_PREVIEW]: 'GPT-5 Preview',
  [ModelId.GPT_4_TURBO]: 'GPT-4 Turbo',
  [ModelId.GEMINI_PRO]: 'Gemini 3 Pro',
  [ModelId.GEMINI_FLASH]: 'Gemini 2.5 Flash',
  [ModelId.GEMINI_FLASH_IMAGE]: 'Gemini Flash Image',
};

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
};

export const DetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [promptExpanded, setPromptExpanded] = useState(false);

  const item = slug ? getTestBySlug(slug) : undefined;

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) {
    return <Navigate to="/" replace />;
  }

  const activeVariant = item.variants[activeVariantIndex];
  const ogImage = item.isImage ? activeVariant.output : undefined;
  const colors = modelColors[activeVariant.modelId] || { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', light: 'bg-gray-100', dot: 'bg-gray-500' };

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <SEO
        title={item.title}
        description={item.prompt.slice(0, 160)}
        ogImage={ogImage}
      />

      <div className="max-w-6xl mx-auto">
        {/* Main Content Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Header Section */}
          <div className="px-8 lg:px-12 pt-6 pb-6 border-b border-gray-100">
            {/* Top row: Back + Category */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-emerald-600 transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-xs font-medium">Back</span>
              </button>
              <span className="text-gray-300">/</span>
              {(Array.isArray(item.category) ? item.category : [item.category]).map((cat, idx, arr) => (
                <span key={cat} className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                  {cat}
                  {idx < arr.length - 1 && <span className="text-gray-300 ml-1">·</span>}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mb-5"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {item.title}
            </h1>

            {/* Model Switcher Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">Model:</span>
              {item.variants.map((variant, idx) => {
                const variantColors = modelColors[variant.modelId] || { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-500' };
                const isActive = activeVariantIndex === idx;

                return (
                  <button
                    key={variant.modelId}
                    onClick={() => setActiveVariantIndex(idx)}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      ${isActive
                        ? `${variantColors.bg} ${variantColors.border} ${variantColors.text} border shadow-sm`
                        : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                      }
                    `}
                  >
                    <img
                      src={modelLogos[variant.modelId]}
                      alt=""
                      className={`w-4 h-4 object-contain transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'}`}
                    />
                    {modelDisplayNames[variant.modelId] || variant.modelId}
                  </button>
                );
              })}

              {/* Date for active variant (falls back to item timestamp) */}
              {(activeVariant.timestamp || item.timestamp) && (
                <>
                  <span className="text-gray-300 mx-2">·</span>
                  <span className="text-xs text-gray-400">
                    {new Date(activeVariant.timestamp || item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Prompt Section - Collapsible */}
          <div className="px-8 lg:px-12 py-4 bg-gray-50/50 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <button
                onClick={() => setPromptExpanded(!promptExpanded)}
                className="flex-1 group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-16">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Prompt
                    </span>
                  </div>
                  <p className={`flex-1 text-sm text-gray-600 italic leading-relaxed ${promptExpanded ? '' : 'line-clamp-2'}`}>
                    "{item.prompt}"
                  </p>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all shrink-0 mt-0.5 ${promptExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              <button
                onClick={handleCopy}
                className="shrink-0 p-1.5 text-gray-400 hover:text-emerald-600 transition-colors"
                title="Copy prompt"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="relative">
            {item.isImage ? (
              <div className="flex justify-center bg-gradient-to-b from-gray-50 to-white p-8 lg:p-12">
                <img
                  key={activeVariant.modelId}
                  src={activeVariant.output}
                  alt={item.title}
                  className="max-w-full max-h-[75vh] rounded-xl shadow-lg"
                />
              </div>
            ) : (
              <div className="px-8 lg:px-12 py-10 lg:py-12">
                {/* Colored accent bar based on model */}
                <div className={`w-12 h-1 rounded-full ${colors.dot} mb-8 opacity-60`} />

                <article
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                    prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:mb-5
                    prose-strong:text-slate-900 prose-strong:font-semibold
                    prose-em:text-gray-600
                    prose-hr:border-gray-200 prose-hr:my-10
                    prose-blockquote:border-l-4 prose-blockquote:border-emerald-200 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-emerald-50/50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg
                    prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:text-sm
                    prose-pre:bg-slate-900 prose-pre:text-gray-100
                    prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                    prose-li:text-gray-700 prose-li:marker:text-emerald-500
                  "
                >
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{children}</h3>
                      ),
                    }}
                  >
                    {activeVariant.output}
                  </ReactMarkdown>
                </article>
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
};
