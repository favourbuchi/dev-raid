/**
 * Mock data for DevRaid Phase 2 application layout and navigation.
 * These mock values provide realistic data for layout components without
 * hardcoding values inside presentation logic. Real data and real-time sync
 * will be connected via Supabase in later phases.
 */

export const MOCK_COMMUNITY_SCORE = {
  points: 2450,
  formatted: '2,450',
  unit: 'points',
  label: 'Community Score',
};

export const MOCK_COMMUNITIES = [
  {
    id: 'devraid-core',
    name: 'DevRaid Community',
    tier: 'Global Hub',
    memberCount: 142,
  },
  {
    id: 'frontend-guild',
    name: 'Frontend Guild',
    tier: 'Squad Alpha',
    memberCount: 58,
  },
  {
    id: 'open-source-lab',
    name: 'Open Source Lab',
    tier: 'Special Operations',
    memberCount: 84,
  },
];

export const MOCK_USER = {
  name: 'Alex Rivers',
  handle: '@arivers',
  email: 'alex.rivers@devraid.io',
  role: 'Guild Lead',
  initials: 'AR',
  status: 'Online',
};
