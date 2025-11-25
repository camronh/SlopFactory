import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDetailPage = !isHome;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      {/* Minimal floating header - only show on detail pages */}
      {isDetailPage && (
        <header className="sticky top-0 z-50 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center pointer-events-auto">
              <Link
                to="/"
                className="text-sm font-bold tracking-tight text-slate-400 hover:text-slate-900 transition-colors duration-300"
              >
                ← Slop<span className="text-emerald-600">Factory</span>
              </Link>
              <a
                href="https://www.wiseguyai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-400 hover:text-emerald-600 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Blog
              </a>
            </div>
          </div>
        </header>
      )}

      {/* Main Content - no horizontal padding on mobile for detail pages */}
      <main className={`flex-1 w-full max-w-7xl mx-auto py-8 ${isDetailPage ? 'px-0 sm:px-6 lg:px-8' : 'px-4 sm:px-6 lg:px-8'}`}>
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
