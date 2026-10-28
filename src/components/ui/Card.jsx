import React from 'react';

/**
 * Reusable Card component for modern SaaS interface:
 * - Clean white background (#FFFFFF)
 * - Fine 1px neutral border (#E8EAED)
 * - Subtle corner rounding (rounded-lg)
 * - Consistent typography hierarchy
 */
export function Card({ children, className = '', title, subtitle, action }) {
  return (
    <div
      className={`rounded-lg border border-border-subtle bg-card-bg p-6 shadow-xs ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-text-primary">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-text-secondary">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export default Card;
