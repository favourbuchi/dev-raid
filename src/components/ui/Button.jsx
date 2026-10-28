import React from 'react';

/**
 * Reusable Button component for modern SaaS interface.
 * Implements tactile micro-elevations, smooth active scale transitions,
 * and high-craft typography.
 */
const VARIANTS = {
  primary:
    'bg-text-primary text-white hover:bg-[#282E37] active:bg-[#121519] border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)] active:scale-[0.985]',
  secondary:
    'bg-card-bg text-text-primary border border-border-subtle hover:bg-[#F8F9FA] hover:border-[#D1D5DB] active:bg-[#F1F3F5] shadow-[0_1px_2px_rgba(0,0,0,0.03)] active:scale-[0.985]',
  accent:
    'bg-green-subtle text-text-success border border-[#D6E5DA] hover:bg-[#E1EDE4] active:bg-[#D5E4D9] shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:scale-[0.985]',
  danger:
    'bg-[#FDF2F2] text-[#991B1B] border border-[#F8D7DA] hover:bg-[#FEE2E2] active:bg-[#FECACA] active:scale-[0.985]',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] border border-transparent active:scale-[0.985]',
};

const SIZES = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3.5 py-2 text-xs sm:text-sm',
  lg: 'px-4.5 py-2.5 text-sm sm:text-base',
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
      className={`inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
      {children}
    </button>
  );
}

export default Button;
