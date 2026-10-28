import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileSidebar from './MobileSidebar';

/**
 * DevRaid Application Shell Layout (Phase 2).
 * Integrates persistent desktop sidebar, responsive topbar with community selector,
 * mobile navigation drawer, and flexible main content area.
 */
export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-app-bg text-text-primary flex font-sans">
      {/* Desktop Persistent Sidebar (hidden on < lg) */}
      <Sidebar />

      {/* Mobile Slide-out Navigation Drawer (visible on < lg when open) */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Viewport Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Topbar Navigation */}
        <Topbar onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Dynamic Route Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>

        {/* Minimalist SaaS Footer */}
        <footer className="border-t border-border-subtle bg-card-bg py-5 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <span>DevRaid — Community Campaign Coordination Platform</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Phase 2 Foundation</span>
              <span className="text-border-subtle">•</span>
              <span className="text-text-success font-medium">
                SaaS Shell Active
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AppLayout;
