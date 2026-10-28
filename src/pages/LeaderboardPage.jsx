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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Trophy className="h-5 w-5 text-accent-warning" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Leaderboard
            </h1>
            <Badge variant="warning">Standings</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Community scoreboard recognizing top-performing members, squads, and teams.
          </p>
        </div>
      </div>

      <Card
        title="Scoreboard Standings"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            Rankings, point aggregations, and contributor tiers will be calculated and displayed once score calculation services are connected.
          </p>
          <div className="rounded-lg border border-border-subtle bg-[#F8F9FA] p-8 text-center">
            <p className="text-xs text-text-secondary font-medium">
              Leaderboard standings will populate once campaign completions are logged.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LeaderboardPage;
