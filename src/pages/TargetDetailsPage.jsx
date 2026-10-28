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
  History,
  RotateCcw,
  Zap,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAppData } from '../context/AppDataContext';
import { ROUTES } from '../utils/constants';
import {
  formatDate,
  formatDateTime,
  getPriorityBadgeVariant,
  getStatusBadgeVariant,
} from '../utils/formatters';

/**
 * Target Details Page (Route: /targets/:id)
 * Dynamic page that fetches target specifications by ID from centralized context,
 * displays mission guidelines, security-attributed destination link, clipboard copy,
 * interactive completion / undo workflow, and live activity audit trail.
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
        // Fallback for environments where Clipboard API is restricted
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
          <span>Back to Operations</span>
        </Link>

        <Card className="p-8 text-center flex flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCF5ED] border border-[#F2DFC7] text-accent-warning mb-3">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary">
            Target Not Found
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
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-text-primary px-4 py-2 text-xs font-medium text-white hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs"
          >
            <span>Return to Operations Dashboard</span>
          </Link>
        </Card>
      </div>
    );
  }

  const isCompleted = target.status === 'completed';
  const targetActivities = activities.filter((a) => a.targetId === target.id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Navigation Bar */}
      <div>
        <Link
          to={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Operations</span>
        </Link>
      </div>

      {/* Target Title & Metadata Overview Header */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle/80 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={getStatusBadgeVariant(target.status)}
              dot={!isCompleted}
            >
              {isCompleted ? 'Completed Target' : 'Active Target'}
            </Badge>

            <Badge variant={getPriorityBadgeVariant(target.priority)}>
              {target.priority.charAt(0).toUpperCase() + target.priority.slice(1)} Priority
            </Badge>

            <Badge variant="outline">{target.platform}</Badge>
          </div>

          <div
            className={`inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm font-semibold ${
              isCompleted
                ? 'border-border-subtle bg-[#F8F9FA] text-text-secondary'
                : 'border-[#D6E5DA] bg-green-subtle text-text-success'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>+{target.points} Community Points</span>
          </div>
        </div>

        <div className="mt-5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary leading-tight">
            {target.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            {target.description}
          </p>
        </div>
      </Card>

      {/* Target Status & Actions Card */}
      <Card
        title="Operation Status & Actions"
        subtitle="Manage objective completion and community point verification"
      >
        {isCompleted ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-[#D6E5DA] bg-green-subtle">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-text-success" />
                <span className="text-sm font-semibold text-text-primary">
                  Objective Completed
                </span>
                <Badge variant="success">Verified</Badge>
              </div>
              <p className="text-xs text-text-secondary">
                Completed by{' '}
                <span className="font-medium text-text-primary">
                  {target.completedBy || 'Alex Rivers'}
                </span>{' '}
                on {formatDateTime(target.completedAt)}.{' '}
                <span className="text-text-success font-semibold">
                  +{target.points} points awarded
                </span>
                .
              </p>
            </div>
            <button
              type="button"
              onClick={() => undoCompleteTarget(target.id)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-border-subtle bg-card-bg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-colors shrink-0 shadow-2xs"
              title="Undo completion and reverse awarded points"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Undo Completion</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-[#D6E5DA] bg-green-subtle">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-text-success" />
                <span className="text-sm font-semibold text-text-primary">
                  Target is Active and Open for Claims
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Complete this objective and submit verification. Marking it completed will immediately award{' '}
                <span className="font-semibold text-text-success">
                  +{target.points} community points
                </span>{' '}
                to the collective scoreboard.
              </p>
            </div>
            <button
              type="button"
              onClick={() => completeTarget(target.id)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-text-primary text-white text-xs sm:text-sm font-medium hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs shrink-0"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Mark as Completed</span>
            </button>
          </div>
        )}
      </Card>

      {/* Destination URL & Direct Actions Card */}
      <Card
        title="Target Destination"
        subtitle="Official destination and verification link for this objective"
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-border-subtle bg-[#F8F9FA]">
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary block mb-0.5">
                Target URL
              </span>
              <a
                href={target.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm text-text-primary hover:text-accent-primary break-all transition-colors underline-offset-2 hover:underline"
              >
                {target.url}
              </a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Copy URL Button */}
              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle bg-card-bg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-[#F3F4F6] transition-colors"
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
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              {/* Open Target Button */}
              <a
                href={target.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-text-primary text-white text-xs font-medium hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs"
              >
                <span>Open Target</span>
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
      </Card>

      {/* Target Timestamps & Campaign Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary block">
            Created Date
          </span>
          <div className="flex items-center gap-2 mt-2 text-sm font-medium text-text-primary">
            <Calendar className="h-4 w-4 text-text-secondary shrink-0" />
            <span>{formatDate(target.createdAt)}</span>
          </div>
          <span className="text-[11px] text-text-secondary block mt-1">
            {formatDateTime(target.createdAt)}
          </span>
        </Card>

        <Card className="p-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary block">
            Submission Deadline
          </span>
          <div className="flex items-center gap-2 mt-2 text-sm font-medium text-text-primary">
            <Clock className="h-4 w-4 text-text-secondary shrink-0" />
            <span>{target.deadline ? formatDate(target.deadline) : 'No deadline'}</span>
          </div>
          <span className="text-[11px] text-text-secondary block mt-1">
            {target.deadline ? formatDateTime(target.deadline) : 'Ongoing objective'}
          </span>
        </Card>

        <Card className="p-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary block">
            Completion Status
          </span>
          <div className="flex items-center gap-2 mt-2 text-sm font-medium text-text-primary">
            <Badge variant={getStatusBadgeVariant(target.status)} dot={!isCompleted}>
              {isCompleted ? 'Completed' : 'Open for claims'}
            </Badge>
          </div>
          <span className="text-[11px] text-text-secondary block mt-1">
            {target.completedAt
              ? `Completed on ${formatDate(target.completedAt)}`
              : 'Submissions pending'}
          </span>
        </Card>
      </div>

      {/* Completion History / Audit Trail Section */}
      <Card
        title="Completion History"
        subtitle="Verification audit trail for member completions and reversals"
      >
        {targetActivities.length > 0 ? (
          <div className="divide-y divide-border-subtle/80">
            {targetActivities.map((act) => {
              const isUndo = act.type === 'target_completion_undone';
              return (
                <div
                  key={act.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg mt-0.5 shrink-0 ${
                        isUndo
                          ? 'bg-[#F1F3F5] text-text-secondary'
                          : 'bg-green-subtle border border-[#D6E5DA] text-text-success'
                      }`}
                    >
                      {isUndo ? (
                        <RotateCcw className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-text-primary">
                          {isUndo ? 'Completion Undone' : 'Target Completed'}
                        </span>
                        <Badge variant={isUndo ? 'neutral' : 'success'}>
                          {isUndo ? `-${act.points} pts` : `+${act.points} pts`}
                        </Badge>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Logged by <span className="font-medium text-text-primary">{act.actor}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-text-secondary shrink-0 mt-0.5">
                    {formatDateTime(act.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border-subtle bg-[#F8F9FA] p-8 text-center flex flex-col items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card-bg border border-border-subtle text-text-secondary mb-3 shadow-2xs">
              <History className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-text-primary">
              No completion activity logged yet
            </h3>
            <p className="mt-1 text-xs text-text-secondary max-w-md leading-relaxed">
              When members mark this target as completed or reverse a completion, timestamped verification records will appear here.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default TargetDetailsPage;
