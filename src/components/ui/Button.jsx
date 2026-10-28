import React from 'react';

/**
 * Reusable Button component for modern SaaS interface.
 * Variants:
 * - primary: Dark neutral / charcoal (#191D23) with white text.
 * - secondary: Clean white surface with subtle neutral border (#E8EAED).
 * - accent: Subtle green (#EDF4EF) with green text (#3D7654).
 * - ghost: Transparent background with secondary text.
 */
const VARIANTS = {
  primary:
    'bg-text-primary text-white hover:bg-[#2D333B] active:bg-[#121519] border border-transparent shadow-xs',
  secondary:
    'bg-card-bg text-text-primary border border-border-subtle hover:bg-[#F3F4F6] hover:border-[#D1D5DB] active:bg-[#E5E7EB]',
  accent:
    'bg-green-subtle text-text-success border border-[#D6E5DA] hover:bg-[#E2EDE5] active:bg-[#D5E4D9]',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] border border-transparent',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  icon: Icon,
  disabled = false,
  onClick,
  ...props
}) {
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {children}
    </button>
  );
}

export default Button;
