import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { LayoutDashboard, Plus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Operations Dashboard placeholder page.
 * Route: /
 */
export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="h-5 w-5 text-accent-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Operations Dashboard
            </h1>
            <Badge variant="success" dot>
              Active Campaign
            </Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Coordinate campaign targets, monitor community progress, and review collective milestones.
          </p>
        </div>

        <Link
          to="/targets/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-text-primary px-3.5 py-2 text-xs font-medium text-white hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Target</span>
        </Link>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card
          title="Active Targets"
          subtitle="Campaign objectives currently open"
        >
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-semibold tracking-tight text-text-primary">
              3
            </div>
            <span className="text-xs text-text-success font-medium flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" /> 2 closing soon
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            Targets available for community submissions and verifications.
          </p>
        </Card>

        <Card
          title="Total Contributors"
          subtitle="Members participating across teams"
        >
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-semibold tracking-tight text-text-primary">
              142
            </div>
            <span className="text-xs text-text-secondary font-medium">
              Across 8 guilds
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            Active participants synchronized to current campaign objectives.
          </p>
        </Card>

        <Card
          title="Campaign Progress"
          subtitle="Collective milestone completion"
        >
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-semibold tracking-tight text-text-primary">
              68.4%
            </div>
            <span className="text-xs text-accent-warning font-medium">
              Tier 2 Milestone
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            Cumulative target completions required for overall campaign success.
          </p>
        </Card>
      </div>

      {/* Foundation Architecture Summary */}
      <Card
        title="Architecture & Foundation Ready"
        subtitle="Phase 1 Setup Overview"
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <p className="leading-relaxed">
            DevRaid is built on a clean, modern SaaS foundation using React, Vite, Tailwind CSS, and React Router.
            The visual design has been refined to provide an uncluttered, comfortable workspace for managing community targets.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F1F3F5] px-2.5 py-1 text-xs text-text-primary border border-border-subtle font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-text-success" />
              Minimalist SaaS Palette
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F1F3F5] px-2.5 py-1 text-xs text-text-primary border border-border-subtle font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-text-success" />
              Inter Typography
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F1F3F5] px-2.5 py-1 text-xs text-text-primary border border-border-subtle font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-text-success" />
              Modular Routing & Layouts
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F1F3F5] px-2.5 py-1 text-xs text-text-primary border border-border-subtle font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-text-success" />
              Decoupled Frontend Foundation
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DashboardPage;
