import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Users } from 'lucide-react';

/**
 * Community Overview placeholder page.
 * Route: /community
 */
export function CommunityPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-tactical-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Users className="h-6 w-6 text-tactical-secondary" />
            <h1 className="text-2xl font-bold tracking-tight text-tactical-text font-mono">
              Community Overview
            </h1>
            <Badge variant="secondary">Guilds & Squads</Badge>
          </div>
          <p className="mt-1 text-sm text-tactical-muted">
            Directory of participating squads, community guidelines, and collaborative coalition progress.
          </p>
        </div>
      </div>

      <Card
        title="Squad Directory"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-3 text-sm text-tactical-muted">
          <p>
            Community squad rosters, team alignments, and collective milestones will be displayed here.
          </p>
          <div className="rounded border border-dashed border-tactical-border p-6 text-center text-xs font-mono text-tactical-muted">
            SQUAD ROSTERS OFFLINE // RECRUITMENT AND REGISTRATION PENDING
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CommunityPage;
