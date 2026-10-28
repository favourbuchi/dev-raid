/**
 * DevRaid Local Storage Persistence Utility.
 *
 * Provides robust, versioned persistence for targets, completion metadata,
 * activity history, and community baseline scoring.
 * Implements defensive validation against corrupted or malformed data and
 * handles quota/security exceptions gracefully.
 */

export const STORAGE_KEY = 'devraid_app_state_v1';
export const STORAGE_VERSION = 1;
export const BASELINE_COMMUNITY_POINTS = 2305;

const VALID_TARGET_STATUSES = new Set(['active', 'completed']);
const VALID_TARGET_PRIORITIES = new Set(['low', 'medium', 'high', 'critical']);
const VALID_ACTIVITY_TYPES = new Set(['target_completed', 'target_completion_undone']);

/**
 * Checks whether localStorage is available and writable in the current environment.
 * @returns {boolean}
 */
export function isStorageAvailable() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  try {
    const testKey = '__devraid_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a single target object.
 * @param {any} target
 * @returns {boolean}
 */
function isValidTarget(target) {
  if (!target || typeof target !== 'object') return false;
  if (typeof target.id !== 'string' || target.id.trim() === '') return false;
  if (typeof target.title !== 'string' || target.title.trim() === '') return false;
  if (typeof target.points !== 'number' || isNaN(target.points) || target.points < 0) return false;
  if (!VALID_TARGET_STATUSES.has(target.status)) return false;
  if (target.priority && !VALID_TARGET_PRIORITIES.has(target.priority)) return false;
  return true;
}

/**
 * Validates a single activity log object.
 * @param {any} activity
 * @returns {boolean}
 */
function isValidActivity(activity) {
  if (!activity || typeof activity !== 'object') return false;
  if (typeof activity.id !== 'string' || activity.id.trim() === '') return false;
  if (typeof activity.type !== 'string' || !VALID_ACTIVITY_TYPES.has(activity.type)) return false;
  if (typeof activity.targetId !== 'string' || activity.targetId.trim() === '') return false;
  if (typeof activity.timestamp !== 'string') return false;
  return true;
}

/**
 * Validates the entire stored state structure against the schema.
 * @param {any} data - Parsed JSON object from localStorage
 * @returns {boolean} True if data adheres to the versioned schema
 */
export function validateStoredState(data) {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Schema version check
  if (data.version !== STORAGE_VERSION) {
    return false;
  }

  // Targets array check
  if (!Array.isArray(data.targets) || data.targets.length === 0) {
    return false;
  }

  // Ensure unique target IDs and valid schema
  const targetIds = new Set();
  for (const target of data.targets) {
    if (!isValidTarget(target)) {
      return false;
    }
    if (targetIds.has(target.id)) {
      return false; // Duplicate target ID detected
    }
    targetIds.add(target.id);
  }

  // Activities array check
  if (!Array.isArray(data.activities)) {
    return false;
  }

  for (const activity of data.activities) {
    if (!isValidActivity(activity)) {
      return false;
    }
  }

  // Community baseline check
  if (data.community && typeof data.community.baselinePoints !== 'number') {
    return false;
  }

  return true;
}

/**
 * Loads and validates persistent state from localStorage.
 * If storage is unavailable, empty, or corrupted, returns null.
 *
 * @returns {{ targets: Array, activities: Array, community: Object } | null}
 */
export function loadStoredState() {
  if (!isStorageAvailable()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!validateStoredState(parsed)) {
      console.warn(
        `[DevRaid Storage] Stored state at "${STORAGE_KEY}" failed validation. Reverting to baseline.`
      );
      return null;
    }

    return {
      targets: parsed.targets,
      activities: parsed.activities,
      community: parsed.community || { baselinePoints: BASELINE_COMMUNITY_POINTS },
      savedAt: parsed.savedAt || null,
    };
  } catch (error) {
    console.warn('[DevRaid Storage] Error reading localStorage:', error);
    return null;
  }
}

/**
 * Persists application state to localStorage with version metadata.
 *
 * @param {Object} state - State containing targets and activities
 * @returns {{ success: boolean, error?: string }}
 */
export function saveStoredState(state) {
  if (!isStorageAvailable()) {
    return { success: false, error: 'Storage unavailable or disabled in browser.' };
  }

  try {
    const payload = {
      version: STORAGE_VERSION,
      targets: state.targets,
      activities: state.activities,
      community: {
        baselinePoints: BASELINE_COMMUNITY_POINTS,
      },
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return { success: true };
  } catch (error) {
    console.error('[DevRaid Storage] Failed to write to localStorage:', error);
    return {
      success: false,
      error: error?.name === 'QuotaExceededError'
        ? 'Browser storage quota exceeded.'
        : error?.message || 'Storage write failed.',
    };
  }
}

/**
 * Clears DevRaid's namespaced localStorage entry without touching other browser data.
 * @returns {boolean}
 */
export function clearStoredState() {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn('[DevRaid Storage] Failed to clear storage:', error);
    return false;
  }
}
