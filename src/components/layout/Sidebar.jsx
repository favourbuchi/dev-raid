import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Activity,
  Trophy,
  Settings,
  Target,
  Plus,
  User,
} from 'lucide-react';
import { SIDEBAR_NAV_ITEMS, ROUTES } from '../../utils/constants';
import { MOCK_USER } from '../../data/mockData';

const NAV_ICONS = {
  LayoutDashboard,
  Users,
  Activity,
  Trophy,
  Settings,
};

/**
 * Desktop persistent sidebar for DevRaid.
 * Clean, modern SaaS aesthetic with restrained green active states.
 */
export function Sidebar({ className = '' }) {
  return (
    <aside
      className={`hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-card-bg border-r border-border-subtle select-none ${className}`}
    >
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center border-b border-border-subtle">
        <Link
          to={ROUTES.DASHBOARD}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 rounded-md p-0.5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-subtle border border-[#D6E5DA] text-accent-primary group-hover:bg-[#E2EDE5] transition-colors shadow-xs">
            <Target className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary text-base tracking-tight">
              DevRaid
            </span>
            <span className="text-[11px] text-text-secondary bg-[#F1F3F5] px-1.5 py-0.5 rounded font-medium border border-border-subtle">
              Campaigns
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/80 block mb-2">
            Platform
          </span>
          <nav className="space-y-1" aria-label="Main Navigation">
            {SIDEBAR_NAV_ITEMS.map((item) => {
              const IconComponent = NAV_ICONS[item.icon];
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ROUTES.DASHBOARD}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-subtle text-text-success border border-[#D6E5DA] shadow-2xs'
                        : 'text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] border border-transparent'
                    }`
                  }
                >
                  {IconComponent && (
                    <IconComponent className="h-4 w-4 shrink-0" />
                  )}
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Quick Campaign Action */}
        <div className="pt-2 border-t border-border-subtle/70">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/80 block mb-2">
            Campaign Action
          </span>
          <Link
            to={ROUTES.TARGET_NEW}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium rounded-lg bg-text-primary text-white hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Target</span>
          </Link>
        </div>
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-border-subtle bg-[#FAFBFC]">
        <Link
          to={ROUTES.PROFILE}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-card-bg transition-colors border border-transparent hover:border-border-subtle group"
          title="View profile"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-subtle border border-[#D6E5DA] text-text-success text-xs font-semibold shrink-0">
            {MOCK_USER.initials}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-medium text-text-primary truncate group-hover:text-accent-primary transition-colors">
              {MOCK_USER.name}
            </span>
            <span className="text-[11px] text-text-secondary truncate">
              {MOCK_USER.role}
            </span>
          </div>
          <User className="h-3.5 w-3.5 text-text-secondary group-hover:text-text-primary shrink-0 transition-colors" />
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
