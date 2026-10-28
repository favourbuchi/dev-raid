import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Inbox,
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { ROUTES } from '../utils/constants';
import { formatDateTime } from '../utils/formatters';

/**
 * Activity Log Page (Route: /activity)
 * Modern connected vertical timeline stream inspired by Linear and GitHub audit logs.
 */
export function ActivityPage() {
  const { activities, targets } = useAppData();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'target_completed' | 'target_completion_undone'

  // Filter activities based on selected segmented tab
  const filteredActivities = useMemo(() => {
    if (filterType === 'all') return activities;
    return activities.filter((act) => act.type === filterType);
  }, [activities, filterType]);

  // Helper to verify if target still exists in active state collection
  function doesTargetExist(targetId) {
    return targets.some((t) => t.id === targetId);
  }

  const completionCount = activities.filter((a) => a.type === 'target_completed').length;
  const undoCount = activities.filter((a) => a.type === 'target_completion_undone').length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Activity Stream
            </h1>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F1F3F5] text-text-secondary tabular-nums border border-border-subtle">
              {activities.length} events
            </span>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Verifiable chronological record of mission claims, point distribution, and member actions.
          </p>
        </div>

        <Link
          to={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors self-start sm:self-auto"
        >
          <span>Operations Feed</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Segmented Filter Pills */}
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center p-1 rounded-lg border border-border-subtle bg-[#F8F9FA]">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-card-bg text-text-primary font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-border-subtle/80'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            All Events ({activities.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('target_completed')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              filterType === 'target_completed'
                ? 'bg-card-bg text-text-primary font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-border-subtle/80'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Completions ({completionCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('target_completion_undone')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              filterType === 'target_completion_undone'
                ? 'bg-card-bg text-text-primary font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-border-subtle/80'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Reversals ({undoCount})
          </button>
        </div>
      </div>

      {/* Connected Vertical Timeline Stream */}
      {filteredActivities.length > 0 ? (
        <div className="relative pl-6 sm:pl-8 ml-3 sm:ml-4 border-l-2 border-border-subtle space-y-6 pt-2 pb-4">
          {filteredActivities.map((activity) => {
            const isCompletion = activity.type === 'target_completed';
            const targetExists = doesTargetExist(activity.targetId);

            return (
              <div key={activity.id} className="relative group">
                {/* Connected Timeline Node Dot */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-app-bg transition-transform group-hover:scale-110 ${
                    isCompletion
                      ? 'bg-green-subtle text-text-success border-[#D6E5DA]'
                      : 'bg-[#F1F3F5] text-text-secondary border-border-subtle'
                  }`}
                >
                  {isCompletion ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <RotateCcw className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Event Card Content */}
                <div className="rounded-xl border border-border-subtle bg-card-bg p-4 card-surface transition-all group-hover:border-[#CBD5E1]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#191D23] text-white text-[10px] font-bold">
                        {activity.actor.slice(0, 2).toUpperCase()}
                      </span>
                      <strong className="text-xs font-semibold text-text-primary">
                        {activity.actor}
                      </strong>
                      <span className="text-xs text-text-secondary">
                        {isCompletion ? 'completed campaign objective' : 'reversed completion for'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold tabular-nums border ${
                          isCompletion
                            ? 'bg-green-subtle text-text-success border-[#D6E5DA]'
                            : 'bg-[#F1F3F5] text-text-secondary border-border-subtle'
                        }`}
                      >
                        <Sparkles className="h-2.5 w-2.5" />
                        <span>{isCompletion ? `+${activity.points}` : `-${activity.points}`} pts</span>
                      </span>

                      <time
                        dateTime={activity.timestamp}
                        className="text-[11px] text-text-secondary tabular-nums"
                      >
                        {formatDateTime(activity.timestamp)}
                      </time>
                    </div>
                  </div>

                  {/* Target Title & Navigation Link */}
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      {targetExists ? (
                        <Link
                          to={`/targets/${activity.targetId}`}
                          className="text-xs sm:text-sm font-semibold text-text-primary hover:text-accent-primary transition-colors truncate block"
                        >
                          "{activity.targetTitle}"
                        </Link>
                      ) : (
                        <span className="text-xs sm:text-sm font-semibold text-text-secondary truncate block">
                          "{activity.targetTitle}"
                        </span>
                      )}
                    </div>

                    {targetExists && (
                      <Link
                        to={`/targets/${activity.targetId}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-text-secondary hover:text-text-primary transition-colors shrink-0"
                      >
                        <span>View Directive</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-xl border border-dashed border-border-subtle bg-card-bg p-12 text-center flex flex-col items-center justify-center card-surface">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F3F5] text-text-secondary mb-3">
            <Inbox className="h-6 w-6" />
          </div>
          <h2 className="text-sm font-semibold text-text-primary">
            No activity matches filter
          </h2>
          <p className="mt-1 text-xs text-text-secondary max-w-sm leading-relaxed">
            There are no recorded events matching this filter category. Complete targets from the operations dashboard to stream live updates here.
          </p>
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle text-xs font-medium text-text-primary hover:bg-[#F8F9FA] transition-colors cursor-pointer"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Show all events</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ActivityPage;
