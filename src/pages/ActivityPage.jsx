import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Activity } from 'lucide-react';

/**
 * Activity Log placeholder page.
 * Route: /activity
 */
export function ActivityPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-tactical-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Activity className="h-6 w-6 text-tactical-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-tactical-text font-mono">
              Activity Log
            </h1>
            <Badge variant="muted">Audit Stream</Badge>
          </div>
          <p className="mt-1 text-sm text-tactical-muted">
            Chronological audit stream of target completions, verification events, and tactical milestone achievements.
          </p>
        </div>
      </div>

      <Card
        title="Event Audit Feed"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-3 text-sm text-tactical-muted">
          <p>
            Real-time activity telemetry and event filtering will be implemented in subsequent phases.
          </p>
          <div className="rounded border border-dashed border-tactical-border p-6 text-center text-xs font-mono text-tactical-muted">
            NO ACTIVE EVENTS LOGGED // STREAM STANDBY
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ActivityPage;
