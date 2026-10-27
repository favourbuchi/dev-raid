import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  Crosshair,
  LayoutDashboard,
  PlusCircle,
  Activity,
  Trophy,
  Users,
  User,
  Settings,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { ROUTES } from '../../utils/constants';

// Icon mapping dictionary for navigation items
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
  { label: 'Activity Log', path: ROUTES.ACTIVITY, icon: 'Activity' },
  { label: 'Leaderboard', path: ROUTES.LEADERBOARD, icon: 'Trophy' },
  { label: 'Community', path: ROUTES.COMMUNITY, icon: 'Users' },
  { label: 'Profile', path: ROUTES.PROFILE, icon: 'User' },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: 'Settings' },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-tactical-bg text-tactical-text flex flex-col font-sans">
      {/* Tactical Top Bar */}
      <header className="border-b border-tactical-border bg-tactical-panel sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Brand Logo & Name */}
            <Link
              to={ROUTES.DASHBOARD}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-tactical-primary rounded p-1"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-tactical-primary/40 bg-tactical-primary/10 text-tactical-primary group-hover:border-tactical-primary transition-colors">
                <Crosshair className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold tracking-wider text-tactical-text text-lg block leading-none font-mono">
                  DEV<span className="text-tactical-primary">RAID</span>
                </span>
                <span className="text-[10px] tracking-widest text-tactical-muted uppercase block leading-tight font-mono">
                  TACTICAL CAMPAIGN OPS
                </span>
              </div>
            </Link>

            {/* System Status Pill */}
            <div className="hidden md:flex items-center gap-2 border border-tactical-border bg-tactical-bg/60 px-3 py-1 rounded-full text-xs font-mono text-tactical-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tactical-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tactical-secondary"></span>
              </span>
              <span className="text-tactical-secondary font-medium tracking-wide">
                SYS.ONLINE
              </span>
              <span className="text-tactical-border">|</span>
              <span>PHASE 1 BUILD</span>
            </div>

            {/* Test Links / Quick Navigation Helper */}
            <div className="flex items-center gap-2">
              <Link
                to="/targets/tgt-alpha-01"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-tactical-border bg-tactical-bg text-tactical-muted hover:text-tactical-primary hover:border-tactical-primary/50 transition-colors font-mono"
                title="Verify Dynamic Target Route"
              >
                <Radio className="h-3.5 w-3.5 text-tactical-secondary" />
                <span>Test :id Route</span>
              </Link>
              <Link
                to="/unknown-tactical-sector"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-tactical-border bg-tactical-bg text-tactical-muted hover:text-tactical-warning hover:border-tactical-warning/50 transition-colors font-mono"
                title="Verify 404 Route"
              >
                <span>Test 404</span>
              </Link>
            </div>
          </div>

          {/* Primary Navigation Strip */}
          <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-tactical-border/40">
            {NAV_LINKS.map((item) => {
              const IconComponent = NAV_ICONS[item.icon];
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ROUTES.DASHBOARD}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-tactical-primary/10 text-tactical-primary border border-tactical-primary/40 font-semibold'
                        : 'text-tactical-muted hover:text-tactical-text hover:bg-tactical-bg/50 border border-transparent'
                    }`
                  }
                >
                  {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
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

      {/* Tactical Footer */}
      <footer className="border-t border-tactical-border bg-tactical-panel mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-tactical-muted font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-tactical-secondary" />
            <span>DEVRAID PROTOCOL // FOUNDATION ARCHITECTURE</span>
          </div>
          <div className="flex items-center gap-4">
            <span>REACT + VITE + TAILWIND CSS</span>
            <span className="text-tactical-border">|</span>
            <span className="text-tactical-secondary">STANDALONE FRONTEND</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
