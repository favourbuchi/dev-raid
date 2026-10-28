import React from 'react';
import { Search, X, LayoutGrid, List } from 'lucide-react';

/**
 * Modern Segmented TargetFilters component.
 * Inspired by Linear and Raycast:
 * - Tactile segmented status pill switcher
 * - Search input with integrated clear and keyboard shortcut badge
 * - Instant view mode toggle (Dense List vs Grid Bento)
 */
export function TargetFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
  activeCount,
  completedCount,
  matchingCount,
  viewMode = 'list',
  onViewModeChange,
}) {
  const filterTabs = [
    { id: 'all', label: 'All Operations', count: totalCount },
    { id: 'active', label: 'Active', count: activeCount },
    { id: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Raycast-style Segmented Control */}
        <div className="inline-flex items-center p-1 rounded-lg border border-border-subtle bg-[#F8F9FA] self-start">
          {filterTabs.map((tab) => {
            const isSelected = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onStatusFilterChange(tab.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-card-bg text-text-primary border border-border-subtle/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)] font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-card-bg/50 border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                    isSelected
                      ? 'bg-green-subtle text-text-success font-semibold'
                      : 'bg-[#EAECEF] text-text-secondary'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode & Count Counter */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="text-xs text-text-secondary">
            Showing <strong className="text-text-primary tabular-nums">{matchingCount}</strong> of{' '}
            <strong className="text-text-primary tabular-nums">{totalCount}</strong>
          </span>

          {onViewModeChange && (
            <div className="inline-flex items-center p-0.5 rounded-lg border border-border-subtle bg-[#F8F9FA]">
              <button
                type="button"
                onClick={() => onViewModeChange('list')}
                aria-label="List view"
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-card-bg text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-border-subtle/80'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title="Dense List View"
              >
                <List className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                aria-label="Grid view"
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-card-bg text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-border-subtle/80'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title="Bento Grid View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Integrated Search Field */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter targets by title, platform, keyword, or guild mission..."
          className="w-full pl-10 pr-10 py-2 text-xs sm:text-sm rounded-lg border border-border-subtle bg-card-bg text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-[#D1D5DB] focus:ring-2 focus:ring-accent-primary/20 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search query"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TargetFilters;
