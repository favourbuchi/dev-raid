import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Activity,
  Trophy,
  Users,
  User,
  Settings,
  Target,
  Plus,
} from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import Badge from '../ui/Badge';

const NAV_ICONS = {
  LayoutDashboard,
  PlusCircle,
  Activity,
  Trophy,
  Users,
  User,
  Settings,
};

const NAV_LINKS = [
  { label: 'Operations', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Create Target', path: ROUTES.TARGET_NEW, icon: 'PlusCircle' },
  { label: 'Activity', path: ROUTES.ACTIVITY, icon: 'Activity' },
  { label: 'Leaderboard', path: ROUTES.LEADERBOARD, icon: 'Trophy' },
  { label: 'Community', path: ROUTES.COMMUNITY, icon: 'Users' },
  { label: 'Profile', path: ROUTES.PROFILE, icon: 'User' },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: 'Settings' },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-app-bg text-text-primary flex flex-col font-sans">
      {/* SaaS Top Navigation Bar */}
      <header className="border-b border-border-subtle bg-card-bg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-6">
              <Link
                to={ROUTES.DASHBOARD}
                className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 rounded-md p-1"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-subtle border border-[#D6E5DA] text-accent-primary group-hover:bg-[#E2EDE5] transition-colors">
                  <Target className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary text-base tracking-tight">
                    DevRaid
                  </span>
                  <span className="text-[11px] text-text-secondary bg-[#F1F3F5] px-1.5 py-0.5 rounded font-medium border border-border-subtle">
                    Platform
                  </span>
                </div>
              </Link>
            </div>

            {/* Top Right Controls & Quick Route Verifiers */}
            <div className="flex items-center gap-3">
              <Badge variant="success" dot className="hidden md:inline-flex">
                Campaign Live
              </Badge>

              {/* Discreet test pills to verify route resolution */}
              <div className="hidden sm:flex items-center gap-1.5 border-l border-border-subtle pl-3 text-xs">
                <Link
                  to="/targets/tgt-alpha-01"
                  className="px-2 py-1 rounded text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] transition-colors"
                  title="Verify Dynamic /targets/:id route"
                >
                  Test :id
                </Link>
                <Link
                  to="/non-existent-sector"
                  className="px-2 py-1 rounded text-text-secondary hover:text-accent-warning hover:bg-[#FCF5ED] transition-colors"
                  title="Verify 404 handler"
                >
                  Test 404
                </Link>
              </div>

              {/* Primary Action Button */}
              <Link
                to={ROUTES.TARGET_NEW}
                className="inline-flex items-center gap-1.5 rounded-lg bg-text-primary px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Target</span>
              </Link>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="flex space-x-1 overflow-x-auto py-1 scrollbar-none border-t border-border-subtle/60">
            {NAV_LINKS.map((item) => {
              const IconComponent = NAV_ICONS[item.icon];
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ROUTES.DASHBOARD}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-green-subtle text-text-success border border-[#D6E5DA]'
                        : 'text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] border border-transparent'
                    }`
                  }
                >
                  {IconComponent && <IconComponent className="h-3.5 w-3.5 shrink-0" />}
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Minimalist SaaS Footer */}
      <footer className="border-t border-border-subtle bg-card-bg mt-auto py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <span>DevRaid — Community Campaign Coordination Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Phase 1 Foundation</span>
            <span className="text-border-subtle">•</span>
            <span className="text-text-success font-medium">Clean SaaS Design</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
