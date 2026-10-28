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

/**
 * Primary sidebar navigation items specified in Phase 2:
 * 1. Operations — route: /
 * 2. Community — route: /community
 * 3. Activity Log — route: /activity
 * 4. Leaderboard — route: /leaderboard
 * 5. Settings — route: /settings
 */
export const SIDEBAR_NAV_ITEMS = [
  { label: 'Operations', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Community', path: ROUTES.COMMUNITY, icon: 'Users' },
  { label: 'Activity Log', path: ROUTES.ACTIVITY, icon: 'Activity' },
  { label: 'Leaderboard', path: ROUTES.LEADERBOARD, icon: 'Trophy' },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: 'Settings' },
];

/**
 * Secondary quick links / actions
 */
export const QUICK_ACTIONS = [
  { label: 'Create Target', path: ROUTES.TARGET_NEW, icon: 'PlusCircle' },
  { label: 'User Profile', path: ROUTES.PROFILE, icon: 'User' },
];
