import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { LayoutDashboard, Target, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Operations Dashboard placeholder page.
 * Route: /
 */
export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-tactical-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="h-6 w-6 text-tactical-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-tactical-text font-mono">
              Operations Dashboard
            </h1>
            <Badge variant="primary">Active Sector</Badge>
          </div>
          <p className="mt-1 text-sm text-tactical-muted">
            Tactical command hub for coordinating campaign objectives, tracking community momentum, and monitoring live progress.
          </p>
        </div>

        <Link
          to="/targets/new"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-tactical-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-tactical-primary/90 font-mono shadow-sm"
        >
          <Target className="h-4 w-4" />
          <span>Deploy New Target</span>
        </Link>
      </div>

      {/* Placeholder Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Active Engagements"
          subtitle="Tactical targets currently deployed"
        >
          <div className="text-3xl font-bold font-mono text-tactical-primary">
            03
          </div>
          <p className="mt-2 text-xs text-tactical-muted">
            Placeholder metric. Live target data will be connected in future phases.
          </p>
        </Card>

        <Card
          title="Operative Roster"
          subtitle="Community contributors participating"
        >
          <div className="text-3xl font-bold font-mono text-tactical-secondary">
            142
          </div>
          <p className="mt-2 text-xs text-tactical-muted">
            Guild and team members synchronized across active campaigns.
          </p>
        </Card>

        <Card
          title="Global Progress"
          subtitle="Campaign milestone completion"
        >
          <div className="text-3xl font-bold font-mono text-tactical-warning">
            68.4%
          </div>
          <p className="mt-2 text-xs text-tactical-muted">
            Collective progress toward total campaign engagement criteria.
          </p>
        </Card>
      </div>

      {/* Phase 1 Status Banner */}
      <Card
        title="Phase 1 Foundation Operational"
        subtitle="Architecture & Environment Status"
      >
        <div className="space-y-3 text-sm text-tactical-muted">
          <p>
            The DevRaid frontend core is established using React, Vite, Tailwind CSS, and React Router.
            All route bindings are wired and ready for Phase 2 component and feature development.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center gap-1 rounded bg-tactical-bg px-2.5 py-1 text-xs font-mono text-tactical-muted border border-tactical-border">
              <Zap className="h-3 w-3 text-tactical-primary" /> React 19 + Vite 8
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-tactical-bg px-2.5 py-1 text-xs font-mono text-tactical-muted border border-tactical-border">
              <Shield className="h-3 w-3 text-tactical-secondary" /> Tailwind CSS v4 Theme
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-tactical-bg px-2.5 py-1 text-xs font-mono text-tactical-muted border border-tactical-border">
              <ArrowRight className="h-3 w-3 text-tactical-warning" /> React Router v7 Ready
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DashboardPage;
