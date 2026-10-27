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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-tactical-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Settings className="h-6 w-6 text-tactical-secondary" />
            <h1 className="text-2xl font-bold tracking-tight text-tactical-text font-mono">
              System Settings
            </h1>
            <Badge variant="secondary">Preferences</Badge>
          </div>
          <p className="mt-1 text-sm text-tactical-muted">
            Tactical interface preferences, notification triggers, theme overrides, and telemetry settings.
          </p>
        </div>
      </div>

      <Card
        title="Tactical Configuration"
        subtitle="Phase 1 Placeholder"
      >
        <div className="space-y-3 text-sm text-tactical-muted">
          <p>
            Local client storage, audio feedback triggers, and integration webhooks will be configured here in future phases.
          </p>
          <div className="rounded border border-dashed border-tactical-border p-6 text-center text-xs font-mono text-tactical-muted">
            DEFAULT PARAMETERS ENGAGED // CONFIGURATION OVERRIDES UNLOCKED IN PHASE 2
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage;
