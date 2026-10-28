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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Users className="h-5 w-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Community Overview
            </h1>
            <Badge variant="accent">Guilds & Squads</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Directory of participating teams, contributor rosters, and collaborative initiatives.
          </p>
        </div>
      </div>

      <Card
        title="Squad Directory"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            Team directories, guild rosters, and member participation metrics will appear here.
          </p>
          <div className="rounded-lg border border-border-subtle bg-[#F8F9FA] p-8 text-center">
            <p className="text-xs text-text-secondary font-medium">
              Community rosters will be available once member management is wired in upcoming phases.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CommunityPage;
