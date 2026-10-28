import React from 'react';

/**
 * Modern Linear-style Priority indicator.
 * Replaces bulky text badges with clean, scannable micro-signals.
 */
export function PriorityIndicator({ priority = 'low', showLabel = false, className = '' }) {
  const norm = priority.toLowerCase();

  const config = {
    critical: {
      label: 'Critical',
      color: 'text-[#DC2626]',
      dot: 'bg-[#DC2626]',
      bg: 'bg-[#FEF2F2] border-[#FECACA]',
    },
    high: {
      label: 'High',
      color: 'text-accent-warning',
      dot: 'bg-accent-warning',
      bg: 'bg-[#FCF5ED] border-[#F2DFC7]',
    },
    medium: {
      label: 'Medium',
      color: 'text-[#4B5563]',
      dot: 'bg-[#6B7280]',
      bg: 'bg-[#F3F4F6] border-[#E5E7EB]',
    },
    low: {
      label: 'Low',
      color: 'text-[#9CA3AF]',
      dot: 'bg-[#9CA3AF]',
      bg: 'bg-[#F9FAFB] border-[#F3F4F6]',
    },
  }[norm] || {
    label: priority,
    color: 'text-[#9CA3AF]',
    dot: 'bg-[#9CA3AF]',
    bg: 'bg-[#F9FAFB] border-[#F3F4F6]',
  };

  if (!showLabel) {
    return (
      <span
        title={`Priority: ${config.label}`}
        className={`inline-flex items-center justify-center h-4 w-4 rounded shrink-0 ${config.bg} border ${className}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${config.bg} ${config.color} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
}

export default PriorityIndicator;
