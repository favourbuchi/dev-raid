import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Target, ArrowLeft, Info } from 'lucide-react';

/**
 * Target Details placeholder page.
 * Route: /targets/:id
 */
export function TargetDetailsPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Target className="h-5 w-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Target Details
            </h1>
            <Badge variant="neutral">Dynamic Route</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Inspect target criteria, verification guidelines, and member submission status.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-card-bg px-3.5 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Operations</span>
        </Link>
      </div>

      {/* Target Identifier Resolution */}
      <Card
        title="Target Resolution"
        subtitle="Dynamic route parameter inspection"
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <div className="flex items-center gap-3 rounded-lg border border-border-subtle bg-[#F8F9FA] p-4">
            <div className="h-8 w-8 rounded-md bg-card-bg border border-border-subtle flex items-center justify-center text-text-secondary shrink-0">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs text-text-secondary block font-medium">
                Resolved Target ID (:id)
              </span>
              <span className="text-base font-semibold text-text-primary font-mono">
                {id || 'UNDEFINED'}
              </span>
            </div>
          </div>

          <p className="leading-relaxed">
            This route retrieves the target identifier dynamically from the URL using React Router's <code className="font-medium text-text-primary bg-[#F1F3F5] px-1.5 py-0.5 rounded border border-border-subtle">useParams()</code> hook.
          </p>

          <p className="text-xs text-text-secondary">
            In future phases, this view will load full target specifications, submission proof requirements, and community completion telemetry.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default TargetDetailsPage;
