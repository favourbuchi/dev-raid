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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Activity className="h-5 w-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Activity Log
            </h1>
            <Badge variant="neutral">Feed</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Chronological log of member submissions, verification reviews, and campaign milestones.
          </p>
        </div>
      </div>

      <Card
        title="Recent Activity"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            Real-time activity logs, filters by squad or objective, and event details will be available here.
          </p>
          <div className="rounded-lg border border-border-subtle bg-[#F8F9FA] p-8 text-center">
            <p className="text-xs text-text-secondary font-medium">
              No recent activity recorded. Member events will stream here during Phase 2.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ActivityPage;
