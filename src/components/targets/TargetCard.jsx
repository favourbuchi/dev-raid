import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';
import {
  formatDate,
  getPriorityBadgeVariant,
  getStatusBadgeVariant,
} from '../../utils/formatters';

/**
 * Reusable TargetCard component for Operations Feed.
 * Displays target metadata, point value, platform, priority, and links.
 *
 * @param {Object} props
 * @param {Object} props.target - Target object from mock data
 */
export function TargetCard({ target }) {
  const isCompleted = target.status === 'completed';

  return (
    <article className="rounded-lg border border-border-subtle bg-card-bg p-5 flex flex-col justify-between hover:border-[#D1D5DB] hover:shadow-xs transition-all duration-150">
      <div>
        {/* Top Metadata Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Status Badge */}
            <Badge
              variant={getStatusBadgeVariant(target.status)}
              dot={!isCompleted}
            >
              {target.status === 'active' ? 'Active' : 'Completed'}
            </Badge>

            {/* Priority Badge */}
            <Badge variant={getPriorityBadgeVariant(target.priority)}>
              {target.priority.charAt(0).toUpperCase() + target.priority.slice(1)} Priority
            </Badge>

            {/* Platform Badge */}
            <Badge variant="outline">{target.platform}</Badge>
          </div>

          {/* Points Pill */}
          <div className="inline-flex items-center gap-1 rounded-md border border-[#D6E5DA] bg-green-subtle px-2 py-0.5 text-xs font-semibold text-text-success">
            <Sparkles className="h-3 w-3" />
            <span>+{target.points} pts</span>
          </div>
        </div>

        {/* Target Title & Description */}
        <div className="mt-3.5">
          <Link
            to={`/targets/${target.id}`}
            className="text-base font-semibold text-text-primary hover:text-accent-primary transition-colors line-clamp-2 block tracking-tight"
          >
            {target.title}
          </Link>
          <p className="mt-1.5 text-sm text-text-secondary line-clamp-2 leading-relaxed">
            {target.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Timestamps and Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-border-subtle/80 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>{formatDate(target.createdAt)}</span>
          {target.deadline && (
            <>
              <span className="text-border-subtle">•</span>
              <span className="text-accent-warning">
                Due {formatDate(target.deadline)}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* External Link Action */}
          <a
            href={target.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open target on ${target.platform}: ${target.title}`}
            className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] transition-colors"
            title={`Open external link (${target.platform})`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* View Details Action */}
          <Link
            to={`/targets/${target.id}`}
            className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-text-primary hover:text-accent-primary hover:bg-[#F8F9FA] border border-border-subtle transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TargetCard;
