import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  SearchX,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import CampaignCommandBar from '../components/dashboard/CampaignCommandBar';
import TargetCard from '../components/targets/TargetCard';
import TargetFilters from '../components/targets/TargetFilters';
import { useAppData } from '../context/AppDataContext';
import { ROUTES } from '../utils/constants';

/**
 * Operations Dashboard Page (Route: /)
 * Modern, high-craft command center inspired by Linear and Vercel.
 * Features a unified Campaign Pulse bar, segmented controls, and dense list/grid views.
 */
export function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

  // Centralized state from AppDataContext
  const { targets, stats, communityScore } = useAppData();

  // Filtered target collection based on status and search query
  const filteredTargets = useMemo(() => {
    return targets.filter((target) => {
      // Status filter check
      const matchesStatus =
        statusFilter === 'all' ? true : target.status === statusFilter;

      // Search term check against title, description, and platform
      const normalizedQuery = searchTerm.trim().toLowerCase();
      const matchesSearch =
        normalizedQuery === ''
          ? true
          : target.title.toLowerCase().includes(normalizedQuery) ||
            target.description.toLowerCase().includes(normalizedQuery) ||
            target.platform.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesSearch;
    });
  }, [targets, searchTerm, statusFilter]);

  function handleResetFilters() {
    setSearchTerm('');
    setStatusFilter('all');
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Operations Feed
            </h1>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F1F3F5] text-text-secondary tabular-nums border border-border-subtle">
              {stats.total} total
            </span>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Execute tactical community missions, verify member claims, and elevate collective standing.
          </p>
        </div>

        <Link
          to={ROUTES.TARGET_NEW}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-text-primary px-3.5 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#282E37] active:bg-[#121519] transition-all duration-150 btn-tactile-dark self-start sm:self-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Target</span>
        </Link>
      </div>

      {/* Unified Campaign Command Bar (Replaces generic 4-stat cards) */}
      <CampaignCommandBar communityScore={communityScore} stats={stats} />

      {/* Operations Feed & Interactive Filter Controls */}
      <section className="space-y-4" aria-labelledby="operations-feed-heading">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div className="flex items-center gap-2">
            <h2
              id="operations-feed-heading"
              className="text-base font-semibold tracking-tight text-text-primary"
            >
              Active Directives
            </h2>
            <span className="text-xs text-text-secondary">
              ({stats.active} open for verification)
            </span>
          </div>

          <div className="text-xs text-text-secondary hidden sm:flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-text-success" />
            <span>Click circle icon to instantly claim</span>
          </div>
        </div>

        {/* Filter Bar with Segmented Switcher & Search */}
        <TargetFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          totalCount={stats.total}
          activeCount={stats.active}
          completedCount={stats.completed}
          matchingCount={filteredTargets.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Target Items List / Grid */}
        {filteredTargets.length > 0 ? (
          viewMode === 'list' ? (
            <div className="space-y-2">
              {filteredTargets.map((target) => (
                <TargetCard key={target.id} target={target} viewMode="list" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTargets.map((target) => (
                <TargetCard key={target.id} target={target} viewMode="grid" />
              ))}
            </div>
          )
        ) : (
          /* Empty Search / Filter State */
          <div className="rounded-xl border border-dashed border-border-subtle bg-card-bg p-12 text-center flex flex-col items-center justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F1F3F5] text-text-secondary mb-3">
              <SearchX className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-text-primary">
              No matching operations found
            </h3>
            <p className="mt-1 text-xs text-text-secondary max-w-sm">
              No targets match your filter query{' '}
              {searchTerm && <span className="font-semibold text-text-primary">"{searchTerm}"</span>}{' '}
              {statusFilter !== 'all' && `with status "${statusFilter}"`}.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-card-bg px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
