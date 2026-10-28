import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Zap,
  CheckCircle2,
  Sparkles,
  Plus,
  SearchX,
  RotateCcw,
} from 'lucide-react';
import Card from '../components/ui/Card';
import TargetCard from '../components/targets/TargetCard';
import TargetFilters from '../components/targets/TargetFilters';
import { useAppData } from '../context/AppDataContext';
import { ROUTES } from '../utils/constants';

/**
 * Operations Dashboard Page (Route: /)
 * Primary command center displaying derived campaign stats,
 * status filters, search input, and responsive target cards.
 */
export function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'completed'

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
    <div className="space-y-8">
      {/* A. Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Operations
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Coordinate your community's next move.
          </p>
        </div>

        <Link
          to={ROUTES.TARGET_NEW}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-text-primary px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create Target</span>
        </Link>
      </div>

      {/* B. Summary Statistics Grid (4 compact statistic cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Targets */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">
              Total Targets
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F1F3F5] text-text-secondary">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
              {stats.total}
            </span>
            <span className="text-xs text-text-secondary block mt-1">
              Campaign objectives defined
            </span>
          </div>
        </Card>

        {/* Active Targets */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">
              Active Targets
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-green-subtle text-text-success border border-[#D6E5DA]">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
              {stats.active}
            </span>
            <span className="text-xs text-text-success font-medium block mt-1">
              Open for verification
            </span>
          </div>
        </Card>

        {/* Completed Targets */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">
              Completed Targets
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F1F3F5] text-text-secondary">
              <CheckCircle2 className="h-4 w-4 text-text-success" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
              {stats.completed}
            </span>
            <span className="text-xs text-text-secondary block mt-1">
              Verified community claims
            </span>
          </div>
        </Card>

        {/* Community Points */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">
              Community Points
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-green-subtle text-text-success border border-[#D6E5DA]">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
              {communityScore.formatted}
            </span>
            <span className="text-xs text-text-secondary block mt-1">
              Total points earned to date
            </span>
          </div>
        </Card>
      </div>

      {/* C. Operations Feed Section */}
      <section className="space-y-5" aria-labelledby="operations-feed-heading">
        <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-3">
          <h2
            id="operations-feed-heading"
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            Current Operations
          </h2>
          <span className="text-xs text-text-secondary">
            {stats.active} active targets available
          </span>
        </div>

        {/* Filters and Search Bar */}
        <TargetFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          totalCount={stats.total}
          activeCount={stats.active}
          completedCount={stats.completed}
          matchingCount={filteredTargets.length}
        />

        {/* D. Target Cards List */}
        {filteredTargets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTargets.map((target) => (
              <TargetCard key={target.id} target={target} />
            ))}
          </div>
        ) : (
          /* E. Empty State */
          <div className="rounded-lg border border-border-subtle bg-card-bg p-12 text-center flex flex-col items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F3F5] text-text-secondary mb-3">
              <SearchX className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-text-primary">
              No matching operations found
            </h3>
            <p className="mt-1 text-sm text-text-secondary max-w-sm">
              No targets match your query{' '}
              {searchTerm && <span className="font-medium text-text-primary">"{searchTerm}"</span>}{' '}
              {statusFilter !== 'all' && `with status "${statusFilter}"`}.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-card-bg px-3.5 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
