import React, { useState, useEffect } from 'react';
import {
  Settings,
  Database,
  RotateCcw,
  AlertTriangle,
  HardDrive,
  X,
  Sliders,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useAppData } from '../context/AppDataContext';

/**
 * Settings Page (Route: /settings)
 * Workspace configuration, storage diagnostics, and controlled demo data reset.
 */
export function SettingsPage() {
  const {
    stats,
    activities,
    communityScore,
    storageKey,
    storageVersion,
    isStorageAvailable,
    storageError,
    resetDemoData,
  } = useAppData();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Accessible Escape key listener for reset confirmation dialog
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isConfirmOpen) {
        setIsConfirmOpen(false);
      }
    }
    if (isConfirmOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConfirmOpen]);

  function handleConfirmReset() {
    resetDemoData();
    setIsConfirmOpen(false);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-subtle border border-[#D6E5DA] text-accent-primary">
              <Settings className="h-4 w-4" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Settings
            </h1>
            <Badge variant="neutral">System</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Workspace preferences, local storage diagnostics, and demo campaign state management.
          </p>
        </div>
      </div>

      {/* 1. Local Storage Diagnostics Card */}
      <Card
        title="Local Storage & Persistence"
        subtitle="Current status of browser persistence for targets and activity records"
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-border-subtle bg-[#F8F9FA]">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-border-subtle text-text-secondary shrink-0 mt-0.5">
                <HardDrive className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-primary">
                    Browser Persistence Status
                  </span>
                  <Badge variant={isStorageAvailable ? 'success' : 'danger'}>
                    {isStorageAvailable ? 'Active (localStorage)' : 'Storage Unavailable'}
                  </Badge>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  All target completion states, created objectives, and activity logs survive browser refreshes and tab restarts.
                </p>
              </div>
            </div>
          </div>

          {storageError && (
            <div className="p-3 rounded-lg border border-[#F8D7DA] bg-[#FDF2F2] text-xs text-[#991B1B]">
              <strong>Storage Warning:</strong> {storageError}
            </div>
          )}

          {/* Diagnostic Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-lg border border-border-subtle bg-white">
              <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary block">
                Storage Key
              </span>
              <span className="font-mono text-xs font-medium text-text-primary block mt-1 truncate">
                {storageKey}
              </span>
            </div>

            <div className="p-3 rounded-lg border border-border-subtle bg-white">
              <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary block">
                Schema Version
              </span>
              <span className="font-mono text-xs font-medium text-text-primary block mt-1">
                v{storageVersion}
              </span>
            </div>

            <div className="p-3 rounded-lg border border-border-subtle bg-white">
              <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary block">
                Stored Targets
              </span>
              <span className="text-xs font-medium text-text-primary block mt-1">
                {stats.total} total ({stats.active} active)
              </span>
            </div>

            <div className="p-3 rounded-lg border border-border-subtle bg-white">
              <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary block">
                Activity & Points
              </span>
              <span className="text-xs font-medium text-text-primary block mt-1">
                {activities.length} logs • {communityScore.formatted} pts
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. Demo Data Management Card */}
      <Card
        title="Demo Data Management"
        subtitle="Revert local campaign modifications and restore original sample targets"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border-subtle bg-[#F8F9FA]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-text-secondary" />
              <span className="text-sm font-semibold text-text-primary">
                Reset Demo Data Baseline
              </span>
            </div>
            <p className="text-xs text-text-secondary max-w-lg leading-relaxed">
              Restore the initial 9 sample targets, 3 completed objectives, initial 2,450 points community baseline, and default activity records. Only DevRaid data is reset.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsConfirmOpen(true)}
            icon={RotateCcw}
            className="shrink-0 text-text-primary hover:text-accent-warning"
          >
            Reset Demo Data
          </Button>
        </div>
      </Card>

      {/* 3. Workspace Preferences Placeholder */}
      <Card
        title="Workspace Configuration"
        subtitle="Global interface and notification settings"
      >
        <div className="space-y-3 text-xs text-text-secondary">
          <div className="flex items-center gap-2 text-text-primary font-medium">
            <Sliders className="h-4 w-4 text-accent-primary" />
            <span>Theme & Performance Mode</span>
          </div>
          <p className="leading-relaxed">
            Minimalist SaaS visual mode is active. Team webhooks, alert dispatches, and Discord bot hooks will connect to Supabase database events in Phase 6.
          </p>
        </div>
      </Card>

      {/* Confirmation Modal Dialog */}
      {isConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-2xs transition-opacity"
            onClick={() => setIsConfirmOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <div className="relative w-full max-w-md rounded-xl border border-border-subtle bg-card-bg p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150 z-50">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FCF5ED] border border-[#F2DFC7] text-accent-warning shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2
                    id="reset-dialog-title"
                    className="text-base font-semibold text-text-primary"
                  >
                    Reset Demo Data?
                  </h2>
                  <span className="text-xs text-text-secondary">
                    Confirm state baseline restoration
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                aria-label="Close dialog"
                className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-text-secondary leading-relaxed bg-[#F8F9FA] p-3 rounded-lg border border-border-subtle">
              <p>
                Are you sure you want to reset all demo data?
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>All target completions and point awards will revert to defaults.</li>
                <li>Custom created targets will be removed.</li>
                <li>Activity logs will reset to initial demo history.</li>
                <li>Community points will return to 2,450 baseline.</li>
              </ul>
              <p className="text-[11px] text-text-secondary pt-1">
                This operation affects only this browser's <code className="font-mono text-text-primary">{storageKey}</code> storage.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmReset}
                icon={RotateCcw}
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
