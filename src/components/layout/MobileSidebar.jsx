import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  X,
  Target,
  LayoutDashboard,
  Users,
  Activity,
  Trophy,
  Settings,
  Plus,
  User,
} from 'lucide-react';
import { SIDEBAR_NAV_ITEMS, ROUTES } from '../../utils/constants';
import CommunityScore from './CommunityScore';
import { MOCK_USER } from '../../data/mockData';

const NAV_ICONS = {
  LayoutDashboard,
  Users,
  Activity,
  Trophy,
  Settings,
};

/**
 * Mobile slide-out navigation drawer for DevRaid.
 * Accessible drawer with backdrop, Escape key listener, and auto-close on navigation.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the mobile drawer is open
 * @param {Function} props.onClose - Callback to close the mobile drawer
 */
export function MobileSidebar({ isOpen, onClose }) {
  // Handle Escape key and body scroll lock
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-card-bg border-r border-border-subtle shadow-xl flex flex-col justify-between p-4 z-50">
        <div>
          {/* Header: Logo and Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
            <Link
              to={ROUTES.DASHBOARD}
              onClick={onClose}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-subtle border border-[#D6E5DA] text-accent-primary shadow-xs">
                <Target className="h-4 w-4" />
              </div>
              <span className="font-semibold text-text-primary text-base tracking-tight">
                DevRaid
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/80 block">
              Navigation
            </span>
            <nav className="space-y-1" aria-label="Mobile Navigation">
              {SIDEBAR_NAV_ITEMS.map((item) => {
                const IconComponent = NAV_ICONS[item.icon];
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === ROUTES.DASHBOARD}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-green-subtle text-text-success border border-[#D6E5DA]'
                          : 'text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] border border-transparent'
                      }`
                    }
                  >
                    {IconComponent && (
                      <IconComponent className="h-4 w-4 shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Create Target Quick Action */}
          <div className="mt-5 pt-4 border-t border-border-subtle">
            <Link
              to={ROUTES.TARGET_NEW}
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full px-3 py-2.5 text-xs font-medium rounded-lg bg-text-primary text-white hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Create Target</span>
            </Link>
          </div>
        </div>

        {/* Drawer Footer: Community Score & Profile */}
        <div className="pt-4 border-t border-border-subtle space-y-3">
          <div className="px-1">
            <CommunityScore className="w-full justify-between" />
          </div>

          <Link
            to={ROUTES.PROFILE}
            onClick={onClose}
            className="flex items-center gap-3 p-2 rounded-lg bg-[#F8F9FA] border border-border-subtle"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-subtle border border-[#D6E5DA] text-text-success text-xs font-semibold shrink-0">
              {MOCK_USER.initials}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-medium text-text-primary truncate">
                {MOCK_USER.name}
              </span>
              <span className="text-[11px] text-text-secondary truncate">
                {MOCK_USER.role}
              </span>
            </div>
            <User className="h-3.5 w-3.5 text-text-secondary shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
