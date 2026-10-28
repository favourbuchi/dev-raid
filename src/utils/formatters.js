/**
 * Reusable formatting utilities for dates, platform labels, and status badges.
 */

/**
 * Formats an ISO date string to a clean human-readable date.
 * Example: '2026-10-25T10:00:00Z' -> 'Oct 25, 2026'
 */
export function formatDate(isoString) {
  if (!isoString) return 'None';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return isoString;
  }
}

/**
 * Formats an ISO date string to date with time.
 * Example: '2026-10-25T10:00:00Z' -> 'Oct 25, 2026, 10:00 AM'
 */
export function formatDateTime(isoString) {
  if (!isoString) return 'None';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

/**
 * Maps priority level to a Badge variant.
 * @param {'low'|'medium'|'high'|'critical'} priority
 * @returns {'neutral'|'accent'|'warning'|'danger'}
 */
export function getPriorityBadgeVariant(priority) {
  switch (priority?.toLowerCase()) {
    case 'critical':
      return 'danger';
    case 'high':
      return 'warning';
    case 'medium':
      return 'accent';
    case 'low':
    default:
      return 'neutral';
  }
}

/**
 * Maps status to a Badge variant.
 * @param {'active'|'completed'} status
 * @returns {'success'|'neutral'}
 */
export function getStatusBadgeVariant(status) {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'success';
    case 'completed':
      return 'neutral';
    default:
      return 'neutral';
  }
}
