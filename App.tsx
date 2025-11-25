
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { GalleryItem, Category, ModelId, Variant } from './types';
import { Card } from './components/Card';
import { ModelBadge } from './components/ModelBadge';
import { ArrowLeft, Terminal, Copy, Check, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Static Data Catalogue ---
const STATIC_ITEMS: GalleryItem[] = [
    {
        id: 'img-1',
        title: 'Neon Cyberpunk City',
        prompt: 'A futuristic cyberpunk city with neon lights, rain-slicked streets, and towering skyscrapers, digital art style, high contrast, cinematic lighting.',
        category: Category.IMAGE,
        isImage: true,
        timestamp: 1715421200000,
        variants: [
            {
                modelId: ModelId.GEMINI_FLASH_IMAGE,
                output: 'https://picsum.photos/id/164/800/800'
            },
            {
                modelId: ModelId.GPT_5_PREVIEW,
                output: 'https://picsum.photos/id/188/800/800'
            },
            {
                modelId: ModelId.GPT_4_TURBO,
                output: 'https://picsum.photos/id/203/800/800'
            }
        ]
    },
    {
        id: 'story-1',
        title: 'Micro-Story: The Last Robot',
        prompt: 'Write a 50 word story about the last robot on earth watering a flower.',
        category: Category.STORY,
        isImage: false,
        timestamp: 1715507600000,
        variants: [
            {
                modelId: ModelId.GEMINI_FLASH,
                output: 'Unit 734 creaked, its joints rusty. It tilted the watering can, a single drop falling onto the parched earth where a sprout dared to exist. "Grow," it whirred, a command and a prayer. The wind howled through the empty city, but 734 stood guard. Hope was a heavy protocol.'
            },
            {
                modelId: ModelId.GPT_4_TURBO,
                output: 'Rust coated Unit-9\'s fingers as it tipped the can. One drop. The petal shivered. "Function executed," it beeped to the silence. No birds sang. No children played. Just the hum of its battery dying and the green defiance rising from the dust. It powered down, content.'
            },
            {
                modelId: ModelId.CLAUDE_3_OPUS,
                output: 'The gears ground slowly as X-99 administered the final ration of water. A solitary purple bloom stood amidst the rubble. "You are the legacy," the machine intoned softly. As its power cell flickered and died, the robot froze in eternal vigil, a metal guardian for the world\'s last breath of life.'
            }
        ]
    },
    {
        id: 'lp-1',
        title: 'SaaS Landing Page Header',
        prompt: 'Generate a hero section copy for a SaaS platform that helps designers collaborate. Tone: Professional but energetic.',
        category: Category.LANDING_PAGE,
        isImage: false,
        timestamp: 1715600000000,
        variants: [
             {
                modelId: ModelId.GEMINI_PRO,
                output: '# Design Together, Build Faster.\n\nStop the feedback loop from hell. Sync is the real-time collaboration workspace where designers, developers, and product managers speak the same language.\n\n[Start Collaborating for Free]  [View Demo]\n\n"The missing link in our product stack." — Creative Director @ TechFlow'
            },
            {
                modelId: ModelId.GPT_5_PREVIEW,
                output: '# Unleash Your Creative Velocity\n\nDesign is a team sport. Don\'t let silos slow you down. Meet Sync: The unified platform transforming how modern teams dream, design, and deploy.\n\n[Get Started - Free] [Watch Video]\n\nTrusted by 10,000+ teams who ship faster.'
            }
        ]
    },
    {
        id: 'slide-1',
        title: 'Q3 Marketing Slideshow Outline',
        prompt: 'Create a 5-slide outline for a Q3 marketing strategy presentation focusing on social media growth.',
        category: Category.SLIDESHOW,
        isImage: false,
        timestamp: 1715700000000,
        variants: [
            {
                modelId: ModelId.GEMINI_PRO,
                output: 'Slide 1: Title Slide\n- "Q3 Social Media Expansion Strategy"\n- Presenter Name\n\nSlide 2: Current Landscape Analysis\n- Review of Q2 metrics (Growth flatlined at 5%)\n- Competitor analysis snapshot\n\nSlide 3: The Video-First Initiative\n- Pivot to short-form video content (Reels/Shorts)\n- Resource allocation: 40% of budget to video production\n\nSlide 4: Influencer Partnerships\n- Micro-influencer campaign details\n- Projected reach: 500k impressions\n\nSlide 5: Key OKRs & Timeline\n- Goal: 20% follower increase by Oct 1st\n- Weekly sprint schedule breakdown'
            },
            {
                modelId: ModelId.CLAUDE_3_SONNET,
                output: '1. Executive Summary\n   - Goal: 25% Growth YoY\n   - Focus: TikTok & LinkedIn\n\n2. Q2 Performance Review\n   - Wins: High engagement on Twitter\n   - Misses: Low conversion on Instagram\n\n3. Strategic Pivot: Authenticity\n   - Shift from polished ads to UGC\n   - Employee advocacy program launch\n\n4. Budget Allocation\n   - 50% Content Creation\n   - 30% Paid Boosts\n   - 20% Tools/Analytics\n\n5. Next Steps\n   - Hiring content lead\n   - Launch date: July 15th'
            }
        ]
    },
    {
        id: 'img-2',
        title: 'Watercolor Cat Portrait',
        prompt: 'A fluffy calico cat sitting on a windowsill, watercolor style, soft pastel colors, dreamy atmosphere.',
        category: Category.IMAGE,
        isImage: true,
        timestamp: 1715800000000,
         variants: [
            {
                modelId: ModelId.GEMINI_FLASH_IMAGE,
                output: 'https://picsum.photos/id/40/800/800'
            },
             {
                modelId: ModelId.GPT_4_TURBO,
                output: 'https://picsum.photos/id/64/800/800'
            }
        ]
    },
    {
        id: 'cw-1',
        title: 'Haiku about Coding',
        prompt: 'Write a haiku about debugging code at 2 AM.',
        category: Category.CREATIVE,
        isImage: false,
        timestamp: 1715850000000,
        variants: [
            {
                modelId: ModelId.GEMINI_FLASH,
                output: 'Screen light burns my eyes,\nOne missing semicolon,\nSunlight breaks the dawn.'
            },
            {
                modelId: ModelId.GPT_4_TURBO,
                output: 'Coffee cup is dry,\nLogic fails in midnight glow,\nBug remains unsolved.'
            },
             {
                modelId: ModelId.CLAUDE_3_OPUS,
                output: 'Moonlight hits the keys\nError log flows like a stream\nSleep is but a dream'
            }
        ]
    },
    {
        id: 'lp-2',
        title: 'Eco-Coffee Shop Value Prop',
        prompt: 'Write 3 value propositions for an eco-friendly coffee subscription box.',
        category: Category.LANDING_PAGE,
        isImage: false,
        timestamp: 1715900000000,
        variants: [
            {
                modelId: ModelId.GEMINI_PRO,
                output: '1. **Sip Sustainably:** Every bean is ethically sourced from rainforest-certified farms, ensuring your morning ritual heals the planet.\n2. **Zero-Waste Delivery:** From the mailer to the bag, our packaging is 100% compostable. No plastic, ever.\n3. **Roasted to Order:** We don\'t roast until you order. Experience peak freshness that grocery store coffee can\'t compete with.'
            }
        ]
    },
    {
        id: 'img-3',
        title: 'Abstract Geometric Shapes',
        prompt: '3D render of abstract geometric shapes, gold and marble textures, floating in a white void, minimalist.',
        category: Category.IMAGE,
        isImage: true,
        timestamp: 1715950000000,
        variants: [
            {
                modelId: ModelId.GEMINI_FLASH_IMAGE,
                output: 'https://picsum.photos/id/20/800/800'
            }
        ]
    }
];

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isAutoRotationPaused, setIsAutoRotationPaused] = useState(false);

  const handleCardClick = (item: GalleryItem) => {
    setSelectedItem(item);
    window.scrollTo(0,0);
  };

  const handleHomeClick = () => {
    setSelectedItem(null);
  }

  const handleToggleAutoRotation = () => {
    setIsAutoRotationPaused(prev => !prev);
  }

  return (
    <Layout
      onHomeClick={handleHomeClick}
      isAutoRotationPaused={isAutoRotationPaused}
      onToggleAutoRotation={handleToggleAutoRotation}
    >
      {!selectedItem ? (
        <GalleryView items={STATIC_ITEMS} onItemClick={handleCardClick} isAutoRotationPaused={isAutoRotationPaused} />
      ) : (
        <DetailView
            item={selectedItem}
            onBack={handleHomeClick}
        />
      )}
    </Layout>
  );
};

// --- Sub-Views ---

const GalleryView: React.FC<{ items: GalleryItem[], onItemClick: (item: GalleryItem) => void, isAutoRotationPaused: boolean }> = ({ items, onItemClick, isAutoRotationPaused }) => {
    const [filter, setFilter] = useState<Category | 'All'>('All');
    const filteredItems = filter === 'All' ? items : items.filter(i => i.category === filter);

    return (
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
                    <Card key={item.id} item={item} onClick={onItemClick} isAutoRotationPaused={isAutoRotationPaused} />
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
    );
};

const DetailView: React.FC<{ item: GalleryItem, onBack: () => void }> = ({ item, onBack }) => {
    const [copied, setCopied] = useState(false);
    const [activeVariantIndex, setActiveVariantIndex] = useState(0);
    
    const activeVariant = item.variants[activeVariantIndex];

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
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 pb-20">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-4 group font-medium">
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
    );
};

export default App;
