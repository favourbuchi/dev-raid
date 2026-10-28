import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { PlusCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <PlusCircle className="h-5 w-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Create Target
            </h1>
            <Badge variant="accent">/targets/new</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Define a new engagement target, set validation guidelines, and allocate completion reward points.
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

      {/* Target Authoring Notice */}
      <Card
        title="Target Authoring Workspace"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <p className="leading-relaxed">
            This route serves as the authoring workspace where campaign leaders create new targets, set verification requirements, and configure point weights.
          </p>

          <div className="rounded-lg border border-[#D6E5DA] bg-green-subtle/50 p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-medium text-text-success">
              <CheckCircle2 className="h-4 w-4 text-text-success shrink-0" />
              <span>Route Resolution Verification</span>
            </div>
            <p className="text-text-secondary">
              Active route: <code className="font-semibold text-text-primary bg-card-bg px-1.5 py-0.5 rounded border border-border-subtle">/targets/new</code>
            </p>
            <p className="text-text-secondary">
              Resolution status: Correctly matched to <span className="font-medium text-text-primary">CreateTargetPage</span> rather than being caught by the dynamic <code className="text-text-primary">/targets/:id</code> parameter.
            </p>
          </div>

          <p className="text-xs text-text-secondary">
            Target creation forms, criteria builders, and validation rules will be introduced in subsequent phases.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default CreateTargetPage;
