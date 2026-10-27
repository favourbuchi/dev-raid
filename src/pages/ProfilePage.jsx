import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { User } from 'lucide-react';

/**
 * User Profile placeholder page.
 * Route: /profile
 */
export function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-tactical-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <User className="h-6 w-6 text-tactical-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-tactical-text font-mono">
              Operative Profile
            </h1>
            <Badge variant="primary">Clearance: Level 1</Badge>
          </div>
          <p className="mt-1 text-sm text-tactical-muted">
            Personal operative dossier, completed tactical objectives, accrued points, and active squad assignments.
          </p>
        </div>
      </div>

      <Card
        title="Operative Dossier"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-3 text-sm text-tactical-muted">
          <p>
            User credentials, custom avatar configuration, and historical accomplishment logs will be populated once authentication and user state are established in future phases.
          </p>
          <div className="rounded border border-dashed border-tactical-border p-6 text-center text-xs font-mono text-tactical-muted">
            OPERATIVE IDENTIFIER UNASSIGNED // GUEST ACCESS ACTIVE
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;
