import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Filter and search controls for Operations Dashboard.
 * Filters by search query (title/description) and status (all/active/completed).
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
}) {
  const filterTabs = [
    { id: 'all', label: 'All', count: totalCount },
    { id: 'active', label: 'Active', count: activeCount },
    { id: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg border border-border-subtle bg-[#F8F9FA] self-start sm:self-auto">
          {filterTabs.map((tab) => {
            const isSelected = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onStatusFilterChange(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-card-bg text-text-primary border border-border-subtle shadow-2xs'
                    : 'text-text-secondary hover:text-text-primary hover:bg-card-bg/60 border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-green-subtle text-text-success font-semibold'
                      : 'bg-border-subtle/50 text-text-secondary'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Target Count Indicator */}
        <span className="text-xs text-text-secondary">
          Showing <span className="font-medium text-text-primary">{matchingCount}</span> of{' '}
          <span className="font-medium text-text-primary">{totalCount}</span> operations
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search targets by title, platform, or description..."
          className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-lg border border-border-subtle bg-card-bg text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-[#D1D5DB] focus:ring-2 focus:ring-accent-primary/20 transition-all shadow-2xs"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search query"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TargetFilters;
