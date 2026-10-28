/**
 * Centralized Mock Data for DevRaid.
 * Includes community scoreboard values, community roster, member profile,
 * and a realistic collection of engagement targets for campaign operations.
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

/**
 * Collection of realistic engagement targets for DevRaid campaigns.
 */
export const MOCK_TARGETS = [
  {
    id: 'target-001',
    title: 'Share the official DevRaid v0.2 platform release on X',
    description: 'Amplify visibility for our milestone release announcement. Repost, like, and share your perspective with our community hashtag.',
    url: 'https://x.com/devraid/status/184910284729105481',
    platform: 'X',
    points: 50,
    priority: 'high',
    status: 'active',
    createdAt: '2026-10-25T10:00:00Z',
    deadline: '2026-10-31T23:59:59Z',
    completedAt: null,
  },
  {
    id: 'target-002',
    title: 'Star and review the DevRaid open-source client repository',
    description: 'Star the main repository, review open community PRs, and help benchmark frontend bundle performance against current guidelines.',
    url: 'https://github.com/devraid/devraid-client',
    platform: 'GitHub',
    points: 75,
    priority: 'medium',
    status: 'active',
    createdAt: '2026-10-24T14:30:00Z',
    deadline: '2026-11-05T18:00:00Z',
    completedAt: null,
  },
  {
    id: 'target-003',
    title: 'Participate in the Weekly Architecture Townhall on Discord',
    description: 'Join the general stage channel to discuss Supabase real-time synchronization requirements and database migration proposals.',
    url: 'https://discord.gg/devraid-community',
    platform: 'Discord',
    points: 100,
    priority: 'critical',
    status: 'active',
    createdAt: '2026-10-26T09:15:00Z',
    deadline: '2026-10-29T20:00:00Z',
    completedAt: null,
  },
  {
    id: 'target-004',
    title: 'Submit feedback on the new minimalist SaaS design system',
    description: 'Review the updated palette tokens, typography scale, and layout responsiveness. Post your constructive review in the governance forum.',
    url: 'https://devraid.io/feedback/design-review',
    platform: 'Website',
    points: 40,
    priority: 'low',
    status: 'completed',
    createdAt: '2026-10-20T11:00:00Z',
    deadline: '2026-10-26T23:59:59Z',
    completedAt: '2026-10-26T19:42:10Z',
  },
  {
    id: 'target-005',
    title: 'Upvote and engage in the Reddit technical discussion thread',
    description: 'Participate in the r/webdev discussion regarding modern React application architecture and frontend-first development workflows.',
    url: 'https://reddit.com/r/webdev/comments/devraid_architecture_review',
    platform: 'Reddit',
    points: 30,
    priority: 'low',
    status: 'active',
    createdAt: '2026-10-27T08:00:00Z',
    deadline: null,
    completedAt: null,
  },
  {
    id: 'target-006',
    title: 'Join the DevRaid Announcements Broadcast Channel on Telegram',
    description: 'Subscribe to high-priority alert dispatches, sprint retrospective digests, and flash engagement opportunities for guild members.',
    url: 'https://t.me/devraid_announcements',
    platform: 'Telegram',
    points: 25,
    priority: 'medium',
    status: 'completed',
    createdAt: '2026-10-18T16:00:00Z',
    deadline: '2026-10-25T23:59:59Z',
    completedAt: '2026-10-24T12:18:00Z',
  },
  {
    id: 'target-007',
    title: 'Write a technical breakdown of our React Router v7 configuration',
    description: 'Author a blog post or developer guide examining route nesting, dynamic parameter resolution, and static-route precedence in DevRaid.',
    url: 'https://dev.to/t/devraid',
    platform: 'Other',
    points: 150,
    priority: 'high',
    status: 'active',
    createdAt: '2026-10-26T12:00:00Z',
    deadline: '2026-11-10T23:59:59Z',
    completedAt: null,
  },
  {
    id: 'target-008',
    title: 'Audit accessibility conformance across topbar and navigation drawers',
    description: 'Verify keyboard focus rings, screen-reader aria attributes, and tap target sizes on touch devices according to WCAG 2.1 AA standards.',
    url: 'https://github.com/devraid/devraid-client/issues/88',
    platform: 'GitHub',
    points: 80,
    priority: 'medium',
    status: 'completed',
    createdAt: '2026-10-19T13:20:00Z',
    deadline: '2026-10-27T18:00:00Z',
    completedAt: '2026-10-27T16:45:00Z',
  },
  {
    id: 'target-009',
    title: 'Coordinate squad onboarding for Guild Alpha recruitment drive',
    description: 'Welcome new contributors, guide them through initial project setup, and assign preliminary targets for community verification.',
    url: 'https://discord.gg/devraid-guild-alpha',
    platform: 'Discord',
    points: 60,
    priority: 'high',
    status: 'active',
    createdAt: '2026-10-27T15:00:00Z',
    deadline: '2026-11-02T23:59:59Z',
    completedAt: null,
  },
];

/**
 * Accessor helper to get all targets.
 */
export function getTargets() {
  return [...MOCK_TARGETS];
}

/**
 * Accessor helper to find a target by ID.
 * @param {string} id
 * @returns {Object|undefined}
 */
export function getTargetById(id) {
  return MOCK_TARGETS.find((target) => target.id === id);
}

/**
 * Derived summary statistics calculated dynamically from mock targets.
 */
export function getTargetStats(targets = MOCK_TARGETS) {
  const total = targets.length;
  const active = targets.filter((t) => t.status === 'active').length;
  const completed = targets.filter((t) => t.status === 'completed').length;
  const totalPointsAwarded = targets
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + (t.points || 0), 0);

  return {
    total,
    active,
    completed,
    totalPointsAwarded,
  };
}
