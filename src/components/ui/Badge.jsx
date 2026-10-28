import React from 'react';

/**
 * Reusable Badge component for modern SaaS interface:
 * Understated, soft background colors with high-contrast readable text.
 */
const VARIANTS = {
  success:
    'bg-green-subtle text-text-success border border-[#D6E5DA]',
  warning:
    'bg-[#FCF5ED] text-accent-warning border border-[#F2DFC7]',
  danger:
    'bg-[#FDF2F2] text-[#991B1B] border border-[#F8D7DA]',
  neutral:
    'bg-[#F1F3F5] text-text-secondary border border-border-subtle',
  accent:
    'bg-green-subtle text-accent-primary border border-[#D6E5DA]',
  outline:
    'bg-transparent text-text-secondary border border-border-subtle',
};

export function Badge({
  children,
  variant = 'neutral',
  className = '',
  dot = false,
}) {
  const variantClass = VARIANTS[variant] || VARIANTS.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium tracking-normal ${variantClass} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />}
      {children}
    </span>
  );
}

export default Badge;
