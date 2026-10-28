import React from 'react';
import { Sparkles, Trophy, CheckCircle2, Zap } from 'lucide-react';

/**
 * CampaignCommandBar component.
 * Replaces generic template cards with a unified, high-craft command center banner
 * showing community milestone progress and tabular operational velocity metrics.
 */
export function CampaignCommandBar({ communityScore, stats }) {
  const currentPoints = communityScore?.points || 0;
  const nextMilestone = 3000;
  const percentComplete = Math.min(100, Math.round((currentPoints / nextMilestone) * 100));
  const pointsRemaining = Math.max(0, nextMilestone - currentPoints);
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="rounded-xl border border-border-subtle bg-card-bg p-5 sm:p-6 card-surface">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Section: Community Score & Milestone Progress Bar */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-subtle text-text-success border border-[#D6E5DA] text-[11px] font-semibold tracking-wide">
              <Sparkles className="h-3 w-3" />
              <span>Collective Campaign Score</span>
            </div>

            <div className="flex items-center gap-1 text-xs font-medium text-text-secondary">
              <Trophy className="h-3.5 w-3.5 text-accent-warning shrink-0" />
              <span>Target: {nextMilestone.toLocaleString()} pts (Tier II Unlock)</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary tabular-nums">
                {communityScore?.formatted || '0'}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                points earned to date
              </span>
            </div>

            {/* High-Precision Progress Bar */}
            <div className="mt-3 space-y-1.5">
              <div className="h-2 w-full rounded-full bg-[#EAECEF] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#557A65] transition-all duration-500 ease-out"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-text-secondary tabular-nums">
                <span className="font-medium text-text-primary">{percentComplete}% of Tier II</span>
                <span>{pointsRemaining > 0 ? `${pointsRemaining} pts needed for squad tier elevation` : 'Milestone achieved!'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider on large screens */}
        <div className="hidden lg:block w-px h-24 bg-border-subtle" />

        {/* Right Section: Compact Operational Velocity Counters */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 shrink-0 lg:w-80">
          {/* Active Objectives */}
          <div className="p-3 sm:p-3.5 rounded-lg border border-border-subtle bg-[#F8F9FA] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-text-success">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-text-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-text-success" />
              </span>
              <span className="text-[11px] font-medium tracking-wide uppercase text-text-secondary">
                Active
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-text-primary tracking-tight tabular-nums block">
                {stats.active}
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                Open for claims
              </span>
            </div>
          </div>

          {/* Completed Objectives */}
          <div className="p-3 sm:p-3.5 rounded-lg border border-border-subtle bg-[#F8F9FA] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-text-primary">
              <CheckCircle2 className="h-3.5 w-3.5 text-text-success" />
              <span className="text-[11px] font-medium tracking-wide uppercase text-text-secondary">
                Verified
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-text-primary tracking-tight tabular-nums block">
                {stats.completed}
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                Completed
              </span>
            </div>
          </div>

          {/* Velocity Rate */}
          <div className="p-3 sm:p-3.5 rounded-lg border border-border-subtle bg-[#F8F9FA] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-text-primary">
              <Zap className="h-3.5 w-3.5 text-accent-warning" />
              <span className="text-[11px] font-medium tracking-wide uppercase text-text-secondary">
                Velocity
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-text-primary tracking-tight tabular-nums block">
                {completionRate}%
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                Campaign rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignCommandBar;
