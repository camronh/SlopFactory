import React from 'react';
import { Beaker, Pause, Play } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onHomeClick: () => void;
  isAutoRotationPaused: boolean;
  onToggleAutoRotation: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onHomeClick, isAutoRotationPaused, onToggleAutoRotation }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-slate-900 font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={onHomeClick}
            >
              <div className="bg-emerald-50 p-2 rounded-xl group-hover:bg-emerald-100 transition-colors">
                <Beaker className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                  Slop<span className="text-emerald-600">Factory</span>
                </h1>
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Catalogue & Archives</span>
              </div>
            </div>
            
            {/* Auto-rotation toggle */}
            <button
              onClick={onToggleAutoRotation}
              className="relative w-12 h-6 rounded-full transition-colors duration-200"
              style={{ backgroundColor: isAutoRotationPaused ? '#e5e7eb' : '#10b981' }}
              title={isAutoRotationPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 flex items-center justify-center ${
                  isAutoRotationPaused ? 'translate-x-0' : 'translate-x-6'
                }`}
              >
                {isAutoRotationPaused ? (
                  <Play className="w-3 h-3 text-gray-400" />
                ) : (
                  <Pause className="w-3 h-3 text-emerald-600" />
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SlopFactory. Static Catalogue.</p>
          <div className="flex gap-6">
            <span>Powered by Gemini 2.5 & 3.0</span>
            <span>•</span>
            <span>View Only Mode</span>
          </div>
        </div>
      </footer>
    </div>
  );
};