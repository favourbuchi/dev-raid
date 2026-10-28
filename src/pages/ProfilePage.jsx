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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <User className="h-5 w-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              User Profile
            </h1>
            <Badge variant="neutral">Member Account</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Personal profile details, completed targets, earned points, and team affiliations.
          </p>
        </div>
      </div>

      <Card
        title="Member Dossier"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            Member credentials, avatar customizations, and personal contribution statistics will be populated when authentication and user state are introduced.
          </p>
          <div className="rounded-lg border border-border-subtle bg-[#F8F9FA] p-8 text-center">
            <p className="text-xs text-text-secondary font-medium">
              Guest preview mode. Full user profile views will unlock with user authentication.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;
