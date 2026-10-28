import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  AlertCircle,
  RotateCcw,
  Zap,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import PlatformIcon from '../components/ui/PlatformIcon';
import PriorityIndicator from '../components/ui/PriorityIndicator';
import { useAppData } from '../context/AppDataContext';
import { ROUTES } from '../utils/constants';
import {
  formatDate,
  formatDateTime,
} from '../utils/formatters';

/**
 * Target Details Page (Route: /targets/:id)
 * Modern 2-column workspace layout inspired by Linear and GitHub issues.
 * Main briefing & interactive claim on the left; property inspector on the right.
 */
export function TargetDetailsPage() {
  const { id } = useParams();
  const { getTargetById, completeTarget, undoCompleteTarget, activities } =
    useAppData();
  const target = getTargetById(id);

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  // Copy destination URL to clipboard with user feedback
  async function handleCopyUrl() {
    if (!target?.url) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(target.url);
        setCopied(true);
        setCopyError(false);
        setTimeout(() => setCopied(false), 2500);
      } else {
        setCopyError(true);
      }
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  }

  // Handle Invalid / Non-existent Target ID
  if (!target) {
    return (
      <div className="max-w-xl mx-auto py-12 space-y-6">
        <Link
          to={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Operations Feed</span>
        </Link>

        <div className="rounded-xl border border-border-subtle bg-card-bg p-8 text-center flex flex-col items-center justify-center card-surface">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCF5ED] border border-[#F2DFC7] text-accent-warning mb-3">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary">
            Objective Not Found
          </h1>
          <p className="mt-2 text-sm text-text-secondary max-w-sm leading-relaxed">
            No operation exists matching identifier{' '}
            <code className="font-mono font-medium text-text-primary bg-[#F1F3F5] px-1.5 py-0.5 rounded border border-border-subtle">
              {id || 'unknown'}
            </code>
            . The target may have been decommissioned or removed from active campaigns.
          </p>

          <Link
            to={ROUTES.DASHBOARD}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-text-primary px-4 py-2 text-xs font-medium text-white hover:bg-[#282E37] active:bg-[#121519] transition-all btn-tactile-dark"
          >
            <span>Return to Operations Feed</span>
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = target.status === 'completed';
  const targetActivities = activities.filter((a) => a.targetId === target.id);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-secondary">
        <Link
          to={ROUTES.DASHBOARD}
          className="hover:text-text-primary transition-colors"
        >
          Operations
        </Link>
        <ChevronRight className="h-3 w-3 text-border-subtle" />
        <span className="font-mono text-text-primary">{target.id}</span>
      </nav>

      {/* Main 2-Column Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN: Main Briefing & Interactive Claim Workflow (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Target Title & Description Header */}
          <div className="rounded-xl border border-border-subtle bg-card-bg p-6 card-surface space-y-4">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                  isCompleted
                    ? 'bg-[#F1F3F5] text-text-secondary border-border-subtle'
                    : 'bg-green-subtle text-text-success border-[#D6E5DA]'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isCompleted ? 'bg-text-secondary' : 'bg-text-success'}`} />
                <span>{isCompleted ? 'Completed Objective' : 'Active Objective'}</span>
              </span>

              <span className="text-xs text-text-secondary font-mono">
                {target.id}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary leading-snug">
              {target.title}
            </h1>

            <div className="pt-2 border-t border-border-subtle/70">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                Mission Briefing
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {target.description}
              </p>
            </div>
          </div>

          {/* Interactive Claim / Verification Banner */}
          <div
            className={`rounded-xl border p-5 transition-all card-surface ${
              isCompleted
                ? 'border-[#D6E5DA] bg-[#F7FAF8]'
                : 'border-border-subtle bg-card-bg'
            }`}
          >
            {isCompleted ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-text-success" />
                    <span className="text-sm font-semibold text-text-primary">
                      Verification Confirmed
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-green-subtle text-text-success border border-[#D6E5DA] tabular-nums">
                      +{target.points} pts awarded
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Completed by{' '}
                    <strong className="text-text-primary font-semibold">
                      {target.completedBy || 'Alex Rivers'}
                    </strong>{' '}
                    on {formatDateTime(target.completedAt)}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => undoCompleteTarget(target.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle bg-card-bg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-all cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
                  title="Undo completion and reverse awarded points"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Undo Completion</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-text-success" />
                    <span className="text-sm font-semibold text-text-primary">
                      Ready for Verification
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary max-w-md leading-relaxed">
                    Once you have carried out this directive, mark it completed to credit{' '}
                    <strong className="text-text-success font-semibold tabular-nums">
                      +{target.points} community points
                    </strong>{' '}
                    to the collective scoreboard.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => completeTarget(target.id)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-text-primary text-white text-xs sm:text-sm font-medium hover:bg-[#282E37] active:bg-[#121519] transition-all btn-tactile-dark shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Mark as Completed</span>
                </button>
              </div>
            )}
          </div>

          {/* Target Destination URL Card */}
          <div className="rounded-xl border border-border-subtle bg-card-bg p-5 card-surface space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Official Target Destination
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-border-subtle bg-[#F8F9FA]">
              <a
                href={target.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm text-text-primary hover:text-accent-primary break-all transition-colors underline-offset-2 hover:underline"
              >
                {target.url}
              </a>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-card-bg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                  title="Copy destination URL to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-text-success" />
                      <span className="text-text-success font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={target.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-text-primary text-white text-xs font-medium hover:bg-[#282E37] active:bg-[#121519] transition-colors btn-tactile-dark"
                >
                  <span>Open</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {copyError && (
              <p className="text-xs text-accent-warning">
                Unable to copy to clipboard automatically. Please copy the URL manually.
              </p>
            )}
          </div>

          {/* Activity Audit Trail for this Target */}
          <div className="rounded-xl border border-border-subtle bg-card-bg p-5 card-surface space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Objective Audit Trail
              </h2>
              <span className="text-[11px] text-text-secondary tabular-nums">
                {targetActivities.length} {targetActivities.length === 1 ? 'record' : 'records'}
              </span>
            </div>

            {targetActivities.length > 0 ? (
              <div className="divide-y divide-border-subtle/80">
                {targetActivities.map((act) => {
                  const isUndo = act.type === 'target_completion_undone';
                  return (
                    <div
                      key={act.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-md shrink-0 ${
                            isUndo
                              ? 'bg-[#F1F3F5] text-text-secondary'
                              : 'bg-green-subtle text-text-success border border-[#D6E5DA]'
                          }`}
                        >
                          {isUndo ? <RotateCcw className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                        </div>
                        <div>
                          <span className="font-semibold text-text-primary">
                            {isUndo ? 'Completion Undone' : 'Target Completed'}
                          </span>{' '}
                          <span className="text-text-secondary">by</span>{' '}
                          <span className="font-medium text-text-primary">{act.actor}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 tabular-nums text-text-secondary">
                        <span
                          className={`font-semibold ${
                            isUndo ? 'text-text-secondary' : 'text-text-success'
                          }`}
                        >
                          {isUndo ? `-${act.points} pts` : `+${act.points} pts`}
                        </span>
                        <span>{formatDateTime(act.timestamp)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-text-secondary">
                No completion actions recorded for this objective yet.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Property Inspector Sidebar (1 col) */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border-subtle bg-card-bg p-5 card-surface space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-subtle/80 pb-2">
              Properties
            </h2>

            <div className="space-y-3.5 text-xs">
              {/* Reward Points */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Reward</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-subtle text-text-success border border-[#D6E5DA] font-semibold tabular-nums">
                  <Sparkles className="h-3 w-3" />
                  <span>+{target.points} pts</span>
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Status</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-text-primary">
                  <span className={`h-1.5 w-1.5 rounded-full ${isCompleted ? 'bg-text-secondary' : 'bg-text-success'}`} />
                  <span>{isCompleted ? 'Completed' : 'Active'}</span>
                </span>
              </div>

              {/* Priority */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Priority</span>
                <PriorityIndicator priority={target.priority} showLabel />
              </div>

              {/* Platform */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Platform</span>
                <div className="inline-flex items-center gap-1.5 font-medium text-text-primary">
                  <PlatformIcon platform={target.platform} className="h-3.5 w-3.5 text-text-secondary" />
                  <span>{target.platform}</span>
                </div>
              </div>

              {/* Submission Deadline */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Deadline</span>
                <div className="inline-flex items-center gap-1 text-text-primary tabular-nums">
                  <Clock className="h-3.5 w-3.5 text-text-secondary/80" />
                  <span>{target.deadline ? formatDate(target.deadline) : 'Ongoing'}</span>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Created</span>
                <div className="inline-flex items-center gap-1 text-text-secondary tabular-nums">
                  <Calendar className="h-3.5 w-3.5 text-text-secondary/70" />
                  <span>{formatDate(target.createdAt)}</span>
                </div>
              </div>

              {/* Completer Info */}
              {isCompleted && (
                <div className="flex items-center justify-between pt-2 border-t border-border-subtle/60">
                  <span className="text-text-secondary">Verified By</span>
                  <span className="font-semibold text-text-primary">
                    {target.completedBy || 'Alex Rivers'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Help Cardlet */}
          <div className="rounded-xl border border-border-subtle bg-[#F8F9FA] p-4 text-xs text-text-secondary space-y-1.5">
            <span className="font-semibold text-text-primary block">
              Coordination Policy
            </span>
            <p className="leading-relaxed">
              Target claims are synchronized with guild operations. Double-completion is prevented by rule validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TargetDetailsPage;
