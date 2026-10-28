import React from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  ArrowRight,
  Calendar,
  Sparkles,
  Check,
  CheckCircle2,
  RotateCcw,
  Circle,
} from 'lucide-react';
import PlatformIcon from '../ui/PlatformIcon';
import PriorityIndicator from '../ui/PriorityIndicator';
import { useAppData } from '../../context/AppDataContext';
import { formatDate } from '../../utils/formatters';

/**
 * Modern Linear-inspired Target presentation.
 * Supports both dense horizontal list rows and elevated bento cards.
 */
export function TargetCard({ target, viewMode = 'list' }) {
  const { completeTarget, undoCompleteTarget } = useAppData();
  const isCompleted = target.status === 'completed';

  function handleComplete(e) {
    e.preventDefault();
    e.stopPropagation();
    completeTarget(target.id);
  }

  function handleUndo(e) {
    e.preventDefault();
    e.stopPropagation();
    undoCompleteTarget(target.id);
  }

  // --- 1. DENSE LIST VIEW ROW (Linear-style) ---
  if (viewMode === 'list') {
    return (
      <article className="group flex items-center justify-between gap-3 p-3.5 sm:px-4 sm:py-3 rounded-lg border border-border-subtle bg-card-bg hover:border-[#CBD5E1] hover:bg-[#FAFBFB] transition-all duration-150 card-surface">
        {/* Left: Quick Check Toggle, Platform, Title & Description */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Quick complete / undo circle toggle */}
          <button
            type="button"
            onClick={isCompleted ? handleUndo : handleComplete}
            aria-label={isCompleted ? `Undo completion for ${target.title}` : `Complete target ${target.title}`}
            title={isCompleted ? 'Click to undo completion' : `Click to complete (+${target.points} pts)`}
            className={`p-1 rounded-md transition-colors shrink-0 cursor-pointer ${
              isCompleted
                ? 'text-text-success hover:text-text-primary'
                : 'text-text-secondary/60 hover:text-text-success hover:bg-green-subtle/80'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-4 w-4 text-text-success" />
            ) : (
              <Circle className="h-4 w-4" />
            )}
          </button>

          {/* Platform Icon Container */}
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F8F9FA] border border-border-subtle text-text-secondary shrink-0"
            title={`Platform: ${target.platform}`}
          >
            <PlatformIcon platform={target.platform} className="h-3.5 w-3.5" />
          </div>

          {/* Priority Micro-pip */}
          <PriorityIndicator priority={target.priority} />

          {/* Title and Short Snippet */}
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <Link
                to={`/targets/${target.id}`}
                className={`text-xs sm:text-sm font-semibold truncate block transition-colors hover:text-accent-primary ${
                  isCompleted ? 'text-text-secondary line-through decoration-border-subtle' : 'text-text-primary'
                }`}
              >
                {target.title}
              </Link>
            </div>
            <p className="text-[11px] text-text-secondary/80 truncate hidden sm:block">
              {target.description}
            </p>
          </div>
        </div>

        {/* Right: Deadline, Points & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Deadline indicator */}
          {target.deadline && (
            <span className="text-[11px] text-text-secondary hidden md:inline-flex items-center gap-1 tabular-nums">
              <Calendar className="h-3 w-3 text-text-secondary/70" />
              <span>{formatDate(target.deadline)}</span>
            </span>
          )}

          {/* Points Pill */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold tabular-nums border ${
              isCompleted
                ? 'bg-[#F8F9FA] text-text-secondary border-border-subtle'
                : 'bg-green-subtle text-text-success border-[#D6E5DA]'
            }`}
          >
            <Sparkles className="h-2.5 w-2.5" />
            <span>+{target.points}</span>
          </span>

          {/* Hover Actions */}
          <div className="flex items-center gap-1">
            <a
              href={target.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open target on ${target.platform}`}
              className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] transition-colors"
              title="Open external target"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <Link
              to={`/targets/${target.id}`}
              className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] transition-colors"
              title="View target details"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // --- 2. BENTO GRID CARD VIEW ---
  return (
    <article className="rounded-xl border border-border-subtle bg-card-bg p-5 flex flex-col justify-between hover:border-[#CBD5E1] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-150 card-surface">
      <div>
        {/* Top Header: Platform, Priority, and Points */}
        <div className="flex items-center justify-between gap-2 border-b border-border-subtle/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F8F9FA] border border-border-subtle text-text-secondary">
              <PlatformIcon platform={target.platform} className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-medium text-text-secondary">
              {target.platform}
            </span>
            <PriorityIndicator priority={target.priority} showLabel />
          </div>

          <div
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums border ${
              isCompleted
                ? 'border-border-subtle bg-[#F8F9FA] text-text-secondary'
                : 'border-[#D6E5DA] bg-green-subtle text-text-success'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span>+{target.points} pts</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-3.5 space-y-1.5">
          <Link
            to={`/targets/${target.id}`}
            className={`text-sm font-semibold tracking-tight block hover:text-accent-primary transition-colors line-clamp-2 ${
              isCompleted ? 'text-text-secondary line-through decoration-border-subtle' : 'text-text-primary'
            }`}
          >
            {target.title}
          </Link>
          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
            {target.description}
          </p>
        </div>
      </div>

      {/* Footer: Date and Tactile Button */}
      <div className="mt-5 pt-3.5 border-t border-border-subtle/80 flex items-center justify-between gap-2">
        <div className="text-[11px] text-text-secondary flex items-center gap-1 tabular-nums">
          <Calendar className="h-3 w-3 text-text-secondary/80" />
          <span>{target.deadline ? `Due ${formatDate(target.deadline)}` : 'Ongoing'}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={target.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open target on ${target.platform}`}
            className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {isCompleted ? (
            <button
              type="button"
              onClick={handleUndo}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-text-secondary hover:text-text-primary bg-[#F8F9FA] hover:bg-[#F1F3F5] border border-border-subtle rounded-md transition-all cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Undo</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-green-subtle text-text-success border border-[#D6E5DA] hover:bg-[#E1EDE4] rounded-md transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              <Check className="h-3 w-3" />
              <span>Complete</span>
            </button>
          )}

          <Link
            to={`/targets/${target.id}`}
            className="p-1.5 rounded-md text-text-primary hover:text-accent-primary hover:bg-[#F8F9FA] border border-border-subtle transition-colors"
            title="View Details"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TargetCard;
