import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Create Target placeholder page.
 * Route: /targets/new
 * Explicitly matched before /targets/:id.
 */
export function CreateTargetPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-tactical-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <PlusCircle className="h-6 w-6 text-tactical-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-tactical-text font-mono">
              Create Target
            </h1>
            <Badge variant="primary">Route: /targets/new</Badge>
          </div>
          <p className="mt-1 text-sm text-tactical-muted">
            Configure new engagement targets, define tactical criteria, and allocate milestone reward points.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md border border-tactical-border bg-tactical-bg px-4 py-2 text-xs font-mono text-tactical-muted transition-colors hover:text-tactical-text hover:border-tactical-border/80"
        >
          Cancel & Return
        </Link>
      </div>

      {/* Placeholder Form Notice */}
      <Card
        title="Target Authoring Workspace"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-4 text-sm text-tactical-muted">
          <p>
            This route serves as the authoring suite for community leaders to initialize new targets, set completion thresholds, and specify proof verification parameters.
          </p>

          <div className="rounded-md border border-tactical-secondary/30 bg-tactical-secondary/5 p-4 text-xs font-mono text-tactical-secondary space-y-2">
            <div className="flex items-center gap-2 font-semibold text-tactical-text">
              <CheckCircle2 className="h-4 w-4 text-tactical-secondary" />
              <span>Route Resolution Verification</span>
            </div>
            <p className="text-tactical-muted">
              Current route path: <code className="text-tactical-primary">/targets/new</code>
            </p>
            <p className="text-tactical-muted">
              Status: Correctly matched to CreateTargetPage rather than being intercepted by the dynamic <code className="text-tactical-secondary">/targets/:id</code> parameter.
            </p>
          </div>

          <div className="pt-2">
            <p className="text-xs text-tactical-muted">
              Form inputs, validation rules, and state management will be implemented in subsequent phases.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CreateTargetPage;
