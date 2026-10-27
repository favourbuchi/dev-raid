import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Trophy } from 'lucide-react';

/**
 * Leaderboard placeholder page.
 * Route: /leaderboard
 */
export function LeaderboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-tactical-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Trophy className="h-6 w-6 text-tactical-warning" />
            <h1 className="text-2xl font-bold tracking-tight text-tactical-text font-mono">
              Leaderboard
            </h1>
            <Badge variant="warning">Rankings</Badge>
          </div>
          <p className="mt-1 text-sm text-tactical-muted">
            Global scoreboard ranking individual operatives, squads, and guilds by verified contribution points.
          </p>
        </div>
      </div>

      <Card
        title="Tactical Standings"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-3 text-sm text-tactical-muted">
          <p>
            Competitive rankings, point calculations, and tier badges will be connected during frontend feature development.
          </p>
          <div className="rounded border border-dashed border-tactical-border p-6 text-center text-xs font-mono text-tactical-muted">
            SCOREBOARD STANDINGS LOCKED // CALIBRATION IN PROGRESS
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LeaderboardPage;
