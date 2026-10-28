import React, { useReducer, useMemo, useEffect } from 'react';
import { AppDataContext } from './AppDataContext';
import { MOCK_TARGETS, MOCK_USER } from '../data/mockData';
import {
  STORAGE_KEY,
  STORAGE_VERSION,
  BASELINE_COMMUNITY_POINTS,
  loadStoredState,
  saveStoredState,
  validateStoredState,
  isStorageAvailable,
} from '../utils/storage';

/**
 * Initial activity history corresponding to the 3 initially completed targets.
 * Ordered chronologically (newest first).
 */
const INITIAL_ACTIVITIES = [
  {
    id: 'act-init-001',
    type: 'target_completed',
    targetId: 'target-008',
    targetTitle: 'Audit accessibility conformance across topbar and navigation drawers',
    actor: 'Alex Rivers',
    points: 80,
    timestamp: '2026-10-27T16:45:00Z',
  },
  {
    id: 'act-init-002',
    type: 'target_completed',
    targetId: 'target-004',
    targetTitle: 'Submit feedback on the new minimalist SaaS design system',
    actor: 'Alex Rivers',
    points: 40,
    timestamp: '2026-10-26T19:42:10Z',
  },
  {
    id: 'act-init-003',
    type: 'target_completed',
    targetId: 'target-006',
    targetTitle: 'Join the DevRaid Announcements Broadcast Channel on Telegram',
    actor: 'Alex Rivers',
    points: 25,
    timestamp: '2026-10-24T12:18:00Z',
  },
];

/**
 * Lazy state initializer.
 * Checks whether valid versioned data exists in localStorage.
 * If found, initializes from saved data; otherwise falls back to initial mock data
 * and immediately writes the baseline to localStorage.
 */
function getInitialState() {
  const stored = loadStoredState();
  if (stored && stored.targets && stored.activities) {
    return {
      targets: stored.targets,
      activities: stored.activities,
      toasts: [],
      storageError: null,
    };
  }

  const baselineState = {
    targets: MOCK_TARGETS.map((t) => ({
      ...t,
      completedBy: t.status === 'completed' ? (t.completedBy || MOCK_USER.name) : null,
    })),
    activities: INITIAL_ACTIVITIES,
    toasts: [],
    storageError: null,
  };

  // Persist the default baseline state so subsequent visits load it cleanly
  saveStoredState(baselineState);

  return baselineState;
}

// Action Type Constants
const ACTIONS = {
  COMPLETE_TARGET: 'COMPLETE_TARGET',
  UNDO_TARGET_COMPLETION: 'UNDO_TARGET_COMPLETION',
  CREATE_TARGET: 'CREATE_TARGET',
  ADD_TOAST: 'ADD_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  RESET_DEMO_DATA: 'RESET_DEMO_DATA',
  SYNC_STORAGE_STATE: 'SYNC_STORAGE_STATE',
  SET_STORAGE_ERROR: 'SET_STORAGE_ERROR',
};

/**
 * App Data Reducer.
 * Enforces pure state transitions, immutable updates, and prevents duplicate actions.
 */
function appDataReducer(state, action) {
  switch (action.type) {
    case ACTIONS.COMPLETE_TARGET: {
      const { targetId } = action.payload;
      const targetIndex = state.targets.findIndex((t) => t.id === targetId);

      // Guard: Target must exist and currently be active
      if (targetIndex === -1) return state;
      const target = state.targets[targetIndex];
      if (target.status === 'completed') return state;

      const completionTimestamp = new Date().toISOString();
      const updatedTarget = {
        ...target,
        status: 'completed',
        completedAt: completionTimestamp,
        completedBy: MOCK_USER.name,
      };

      const updatedTargets = [...state.targets];
      updatedTargets[targetIndex] = updatedTarget;

      // Create new activity log entry
      const newActivity = {
        id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type: 'target_completed',
        targetId: target.id,
        targetTitle: target.title,
        actor: MOCK_USER.name,
        points: target.points,
        timestamp: completionTimestamp,
      };

      // Toast feedback
      const newToast = {
        id: `toast-${Date.now()}`,
        type: 'success',
        title: 'Target completed',
        message: `"${target.title.slice(0, 42)}${target.title.length > 42 ? '...' : ''}" marked as completed. +${target.points} pts awarded!`,
      };

      return {
        ...state,
        targets: updatedTargets,
        activities: [newActivity, ...state.activities],
        toasts: [...state.toasts, newToast],
      };
    }

    case ACTIONS.UNDO_TARGET_COMPLETION: {
      const { targetId } = action.payload;
      const targetIndex = state.targets.findIndex((t) => t.id === targetId);

      // Guard: Target must exist and currently be completed
      if (targetIndex === -1) return state;
      const target = state.targets[targetIndex];
      if (target.status !== 'completed') return state;

      const undoTimestamp = new Date().toISOString();
      const revertedTarget = {
        ...target,
        status: 'active',
        completedAt: null,
        completedBy: null,
      };

      const updatedTargets = [...state.targets];
      updatedTargets[targetIndex] = revertedTarget;

      // Record chronological undo activity without deleting previous log
      const undoActivity = {
        id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type: 'target_completion_undone',
        targetId: target.id,
        targetTitle: target.title,
        actor: MOCK_USER.name,
        points: target.points,
        timestamp: undoTimestamp,
      };

      const newToast = {
        id: `toast-${Date.now()}`,
        type: 'info',
        title: 'Completion undone',
        message: `"${target.title.slice(0, 42)}${target.title.length > 42 ? '...' : ''}" reverted to active. ${target.points} pts reversed.`,
      };

      return {
        ...state,
        targets: updatedTargets,
        activities: [undoActivity, ...state.activities],
        toasts: [...state.toasts, newToast],
      };
    }

    case ACTIONS.CREATE_TARGET: {
      const newTarget = action.payload;
      return {
        ...state,
        targets: [newTarget, ...state.targets],
        toasts: [
          ...state.toasts,
          {
            id: `toast-${Date.now()}`,
            type: 'success',
            title: 'Target created',
            message: `New target "${newTarget.title.slice(0, 40)}" deployed to active campaigns.`,
          },
        ],
      };
    }

    case ACTIONS.ADD_TOAST: {
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    }

    case ACTIONS.DISMISS_TOAST: {
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };
    }

    case ACTIONS.RESET_DEMO_DATA: {
      const resetTargets = MOCK_TARGETS.map((t) => ({
        ...t,
        completedBy: t.status === 'completed' ? (t.completedBy || MOCK_USER.name) : null,
      }));

      return {
        ...state,
        targets: resetTargets,
        activities: INITIAL_ACTIVITIES,
        toasts: [
          ...state.toasts,
          {
            id: `toast-${Date.now()}`,
            type: 'info',
            title: 'Demo data reset',
            message: 'All targets, completion statuses, and activity history have been restored to default demo values.',
          },
        ],
      };
    }

    case ACTIONS.SYNC_STORAGE_STATE: {
      return {
        ...state,
        targets: action.payload.targets,
        activities: action.payload.activities,
      };
    }

    case ACTIONS.SET_STORAGE_ERROR: {
      return {
        ...state,
        storageError: action.payload,
      };
    }

    default:
      return state;
  }
}

/**
 * AppDataProvider component.
 * Provides application-wide state for targets, activities, community points, toasts,
 * and automatic localStorage persistence with multi-tab synchronization.
 */
export function AppDataProvider({ children }) {
  const [state, dispatch] = useReducer(appDataReducer, undefined, getInitialState);

  // Derived community points & score object
  const communityScore = useMemo(() => {
    const completedPoints = state.targets
      .filter((t) => t.status === 'completed')
      .reduce((sum, t) => sum + (t.points || 0), 0);

    const totalPoints = BASELINE_COMMUNITY_POINTS + completedPoints;

    return {
      points: totalPoints,
      formatted: totalPoints.toLocaleString('en-US'),
      unit: 'points',
      label: 'Community Score',
    };
  }, [state.targets]);

  // Derived summary statistics
  const stats = useMemo(() => {
    const total = state.targets.length;
    const active = state.targets.filter((t) => t.status === 'active').length;
    const completed = state.targets.filter((t) => t.status === 'completed').length;
    const totalPointsAwarded = state.targets
      .filter((t) => t.status === 'completed')
      .reduce((sum, t) => sum + (t.points || 0), 0);

    return {
      total,
      active,
      completed,
      totalPointsAwarded,
    };
  }, [state.targets]);

  // Synchronize state changes to localStorage
  useEffect(() => {
    const result = saveStoredState({
      targets: state.targets,
      activities: state.activities,
    });
    if (!result.success) {
      console.warn('[DevRaid Storage] State persistence warning:', result.error);
      dispatch({ type: ACTIONS.SET_STORAGE_ERROR, payload: result.error });
    }
  }, [state.targets, state.activities]);

  // Multi-tab synchronization via window 'storage' event
  useEffect(() => {
    function handleStorageEvent(event) {
      if (event.key !== STORAGE_KEY || !event.newValue) return;

      try {
        const parsed = JSON.parse(event.newValue);
        if (validateStoredState(parsed)) {
          dispatch({
            type: ACTIONS.SYNC_STORAGE_STATE,
            payload: {
              targets: parsed.targets,
              activities: parsed.activities,
            },
          });
        }
      } catch (error) {
        console.warn('[DevRaid Storage] Multi-tab state parse error:', error);
      }
    }

    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  const contextValue = useMemo(() => {
    function completeTarget(targetId) {
      dispatch({ type: ACTIONS.COMPLETE_TARGET, payload: { targetId } });
    }

    function undoCompleteTarget(targetId) {
      dispatch({ type: ACTIONS.UNDO_TARGET_COMPLETION, payload: { targetId } });
    }

    function createTarget(targetData) {
      const newTarget = {
        id: `target-${Date.now().toString().slice(-4)}`,
        status: 'active',
        createdAt: new Date().toISOString(),
        completedAt: null,
        completedBy: null,
        ...targetData,
      };
      dispatch({ type: ACTIONS.CREATE_TARGET, payload: newTarget });
      return newTarget;
    }

    function addToast(toast) {
      dispatch({
        type: ACTIONS.ADD_TOAST,
        payload: { id: `toast-${Date.now()}`, ...toast },
      });
    }

    function dismissToast(id) {
      dispatch({ type: ACTIONS.DISMISS_TOAST, payload: id });
    }

    function resetDemoData() {
      dispatch({ type: ACTIONS.RESET_DEMO_DATA });
    }

    function getTargetById(id) {
      return state.targets.find((t) => t.id === id);
    }

    return {
      targets: state.targets,
      activities: state.activities,
      communityScore,
      stats,
      toasts: state.toasts,
      storageKey: STORAGE_KEY,
      storageVersion: STORAGE_VERSION,
      isStorageAvailable: isStorageAvailable(),
      storageError: state.storageError,
      completeTarget,
      undoCompleteTarget,
      createTarget,
      addToast,
      dismissToast,
      resetDemoData,
      getTargetById,
    };
  }, [state.targets, state.activities, state.toasts, state.storageError, communityScore, stats]);

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
}

export default AppDataProvider;
