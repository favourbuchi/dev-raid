import React from 'react';

/**
 * Reusable tactical status badge adhering to design tokens:
 * - primary: #A3FF12
 * - secondary: #00D9A6
 * - warning: #FFB547
 * - muted: #8B9891
 */
const VARIANTS = {
  primary:
    'bg-tactical-primary/10 text-tactical-primary border-tactical-primary/30',
  secondary:
    'bg-tactical-secondary/10 text-tactical-secondary border-tactical-secondary/30',
  warning:
    'bg-tactical-warning/10 text-tactical-warning border-tactical-warning/30',
  muted:
    'bg-tactical-border/50 text-tactical-muted border-tactical-border',
};

export function Badge({ children, variant = 'primary', className = '' }) {
  const variantClass = VARIANTS[variant] || VARIANTS.primary;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase ${variantClass} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}

export default Badge;
