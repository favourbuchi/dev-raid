import React, { useContext } from 'react';
import { Sparkles } from 'lucide-react';
import { AppDataContext } from '../../context/AppDataContext';
import { MOCK_COMMUNITY_SCORE } from '../../data/mockData';

/**
 * Reusable CommunityScore component.
 * Displays collective community points in the topbar or mobile drawer.
 * Pulls from centralized AppDataContext dynamically to reflect live target completions,
 * with graceful fallback to mock data when rendered outside provider.
 */
export function CommunityScore({
  scoreData,
  compact = false,
  className = '',
}) {
  const context = useContext(AppDataContext);
  const liveScore = scoreData || context?.communityScore || MOCK_COMMUNITY_SCORE;
  const { formatted, unit, label } = liveScore;

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border border-[#D6E5DA] bg-green-subtle px-2.5 py-1 text-xs text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${className}`}
        title={`${label}: ${formatted} ${unit}`}
      >
        <Sparkles className="h-3.5 w-3.5 text-text-success shrink-0" />
        <span className="font-semibold text-text-primary tabular-nums">{formatted}</span>
        <span className="text-[10px] text-text-secondary uppercase">pts</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-lg border border-[#D6E5DA] bg-green-subtle/80 px-3 py-1.5 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${className}`}
      title={`${label}: ${formatted} ${unit}`}
    >
      <div className="flex h-5 w-5 items-center justify-center rounded bg-white border border-[#D6E5DA] text-text-success shrink-0 shadow-2xs">
        <Sparkles className="h-3 w-3" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-text-secondary leading-none">
          {label}
        </span>
        <div className="flex items-baseline gap-1 leading-tight mt-0.5">
          <span className="text-xs sm:text-sm font-bold text-text-primary tabular-nums">
            {formatted}
          </span>
          <span className="text-[11px] font-medium text-text-secondary">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommunityScore;
