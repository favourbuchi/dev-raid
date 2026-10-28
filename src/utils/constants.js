/**
 * Application route definitions and navigation metadata for DevRaid.
 * Centralizing routes avoids hardcoded paths and simplifies future refactoring.
 */
export const ROUTES = {
  DASHBOARD: '/',
  TARGET_NEW: '/targets/new',
  TARGET_DETAILS: '/targets/:id',
  ACTIVITY: '/activity',
  LEADERBOARD: '/leaderboard',
  COMMUNITY: '/community',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const NAV_ITEMS = [
  { label: 'Operations', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Create Target', path: ROUTES.TARGET_NEW, icon: 'PlusCircle' },
  { label: 'Activity Log', path: ROUTES.ACTIVITY, icon: 'Activity' },
  { label: 'Leaderboard', path: ROUTES.LEADERBOARD, icon: 'Trophy' },
  { label: 'Community', path: ROUTES.COMMUNITY, icon: 'Users' },
  { label: 'Profile', path: ROUTES.PROFILE, icon: 'User' },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: 'Settings' },
];
