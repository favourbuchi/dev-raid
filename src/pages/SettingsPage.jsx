import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Settings } from 'lucide-react';

/**
 * Settings placeholder page.
 * Route: /settings
 */
export function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Settings className="h-5 w-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Settings
            </h1>
            <Badge variant="neutral">Preferences</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Workspace preferences, notification rules, and platform configuration.
          </p>
        </div>
      </div>

      <Card
        title="Workspace Configuration"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            Client preferences, notification channels, and webhook integrations will be configurable here in subsequent phases.
          </p>
          <div className="rounded-lg border border-border-subtle bg-[#F8F9FA] p-8 text-center">
            <p className="text-xs text-text-secondary font-medium">
              Default system preferences engaged. Configuration panels will unlock in upcoming phases.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage;
