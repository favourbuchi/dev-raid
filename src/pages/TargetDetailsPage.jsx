import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Target, ArrowLeft, Radio } from 'lucide-react';

/**
 * Target Details placeholder page.
 * Route: /targets/:id
 */
export function TargetDetailsPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-tactical-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Target className="h-6 w-6 text-tactical-secondary" />
            <h1 className="text-2xl font-bold tracking-tight text-tactical-text font-mono">
              Target Details
            </h1>
            <Badge variant="secondary">Dynamic Sector</Badge>
          </div>
          <p className="mt-1 text-sm text-tactical-muted">
            Detailed mission brief, verification requirements, and squad completion status for this objective.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-md border border-tactical-border bg-tactical-bg px-3 py-1.5 text-xs font-mono text-tactical-muted transition-colors hover:text-tactical-text hover:border-tactical-border/80"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Operations</span>
        </Link>
      </div>

      {/* Target ID Parameter Inspector */}
      <Card
        title="Target Identifier Resolution"
        subtitle="Route parameter inspection"
      >
        <div className="space-y-4 text-sm text-tactical-muted">
          <div className="flex items-center gap-3 rounded-md border border-tactical-border bg-tactical-bg p-4 font-mono">
            <Radio className="h-5 w-5 text-tactical-secondary shrink-0" />
            <div>
              <span className="text-xs text-tactical-muted uppercase block">
                Extracted Route Parameter (:id)
              </span>
              <span className="text-lg font-bold text-tactical-primary">
                {id || 'UNDEFINED'}
              </span>
            </div>
          </div>

          <p>
            This page dynamically inspects the <code className="text-tactical-secondary">:id</code> URL parameter via React Router's <code className="text-tactical-primary">useParams()</code> hook.
          </p>

          <p className="text-xs text-tactical-muted">
            In future phases, this ID will query the data service to fetch target criteria, progress telemetry, and squad completion audits.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default TargetDetailsPage;
