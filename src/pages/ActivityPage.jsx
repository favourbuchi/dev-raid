import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Inbox,
  User,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAppData } from '../context/AppDataContext';
import { ROUTES } from '../utils/constants';
import { formatDateTime } from '../utils/formatters';

/**
 * Activity Log Page (Route: /activity)
 * Chronological feed of member submissions, verified completions,
 * and point reversals across community campaign operations.
 */
export function ActivityPage() {
  const { activities, targets } = useAppData();

  // Helper to verify if target still exists in active state collection
  function doesTargetExist(targetId) {
    return targets.some((t) => t.id === targetId);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-subtle border border-[#D6E5DA] text-accent-primary">
              <Activity className="h-4 w-4" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Activity Log
            </h1>
            <Badge variant="neutral">
              {activities.length} {activities.length === 1 ? 'event' : 'events'}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Chronological audit trail of verified completions, point distributions, and community actions.
          </p>
        </div>

        <Link
          to={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors self-start sm:self-auto"
        >
          <span>View Operations</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Activity Timeline List */}
      {activities.length > 0 ? (
        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-border-subtle/80">
            {activities.map((activity) => {
              const isCompletion = activity.type === 'target_completed';
              const targetExists = doesTargetExist(activity.targetId);

              return (
                <article
                  key={activity.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAFBFB] transition-colors"
                >
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    {/* Status Icon */}
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 mt-0.5 ${
                        isCompletion
                          ? 'bg-green-subtle border border-[#D6E5DA] text-text-success'
                          : 'bg-[#F1F3F5] border border-border-subtle text-text-secondary'
                      }`}
                    >
                      {isCompletion ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <RotateCcw className="h-4 w-4" />
                      )}
                    </div>

                    {/* Event Description */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Actor badge */}
                        <div className="inline-flex items-center gap-1 text-xs font-medium text-text-primary">
                          <User className="h-3 w-3 text-text-secondary" />
                          <span>{activity.actor}</span>
                        </div>

                        <span className="text-xs text-text-secondary">
                          {isCompletion
                            ? 'completed target'
                            : 'undid completion for'}
                        </span>

                        {/* Points badge */}
                        <Badge
                          variant={isCompletion ? 'success' : 'neutral'}
                        >
                          <span className="flex items-center gap-1">
                            {isCompletion && <Sparkles className="h-3 w-3" />}
                            {isCompletion
                              ? `+${activity.points} pts`
                              : `-${activity.points} pts`}
                          </span>
                        </Badge>
                      </div>

                      {/* Target Link / Title */}
                      <div className="text-sm font-medium text-text-primary">
                        {targetExists ? (
                          <Link
                            to={`/targets/${activity.targetId}`}
                            className="hover:text-accent-primary transition-colors underline-offset-2 hover:underline line-clamp-1"
                            title={`View details for ${activity.targetTitle}`}
                          >
                            {activity.targetTitle}
                          </Link>
                        ) : (
                          <span className="text-text-secondary line-clamp-1">
                            {activity.targetTitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timestamp and Details Link */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle/60 text-xs text-text-secondary">
                    <time dateTime={activity.timestamp}>
                      {formatDateTime(activity.timestamp)}
                    </time>

                    {targetExists && (
                      <Link
                        to={`/targets/${activity.targetId}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border-subtle bg-card-bg text-text-primary hover:text-accent-primary hover:bg-[#F8F9FA] transition-colors"
                      >
                        <span>Target</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Card>
      ) : (
        /* Empty State */
        <Card className="p-12 text-center flex flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F3F5] text-text-secondary mb-3">
            <Inbox className="h-6 w-6" />
          </div>
          <h2 className="text-base font-semibold text-text-primary">
            No activity recorded yet
          </h2>
          <p className="mt-1 text-sm text-text-secondary max-w-sm leading-relaxed">
            When members complete campaign targets or reverse actions, chronological verification logs will appear here.
          </p>
          <Link
            to={ROUTES.DASHBOARD}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-text-primary px-4 py-2 text-xs font-medium text-white hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs"
          >
            <span>Go to Operations Dashboard</span>
          </Link>
        </Card>
      )}
    </div>
  );
}

export default ActivityPage;
