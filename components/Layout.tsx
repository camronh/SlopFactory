import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      {/* Minimal floating header - only show on detail pages */}
      {!isHome && (
        <header className="sticky top-0 z-50 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/"
              className="pointer-events-auto inline-flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200/50 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 group"
            >
              <span className="text-sm font-bold tracking-tight text-slate-900">
                Slop<span className="text-emerald-600">Factory</span>
              </span>
            </Link>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="py-8 mt-auto border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} SlopFactory</p>
            <p>Comparing AI model outputs</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
