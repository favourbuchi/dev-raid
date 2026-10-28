import React from 'react';
import { Sparkles } from 'lucide-react';
import { MOCK_COMMUNITY_SCORE } from '../../data/mockData';

/**
 * Reusable CommunityScore component.
 * Displays collective community points in the topbar or mobile drawer.
 * Data source is isolated in mockData to ensure straightforward Supabase
 * synchronization in later phases.
 *
 * @param {Object} props
 * @param {Object} [props.scoreData] - Optional score object ({ formatted, unit, label })
 * @param {boolean} [props.compact] - Condensed presentation for smaller screens
 * @param {string} [props.className] - Additional CSS classes
 */
export function CommunityScore({
  scoreData = MOCK_COMMUNITY_SCORE,
  compact = false,
  className = '',
}) {
  const { formatted, unit, label } = scoreData;

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-md border border-[#D6E5DA] bg-green-subtle px-2.5 py-1 text-xs text-text-primary ${className}`}
        title={`${label}: ${formatted} ${unit}`}
      >
        <Sparkles className="h-3.5 w-3.5 text-text-success shrink-0" />
        <span className="font-semibold text-text-primary">{formatted}</span>
        <span className="text-[11px] text-text-secondary">pts</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-lg border border-[#D6E5DA] bg-green-subtle px-3 py-1.5 transition-colors ${className}`}
      title={`${label}: ${formatted} ${unit}`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white border border-[#D6E5DA] text-text-success shrink-0 shadow-xs">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-medium uppercase tracking-wider text-text-secondary leading-none">
          {label}
        </span>
        <div className="flex items-baseline gap-1 leading-tight mt-0.5">
          <span className="text-sm font-semibold text-text-primary">
            {formatted}
          </span>
          <span className="text-xs font-normal text-text-secondary">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommunityScore;
