import React from 'react';

/**
 * Reusable tactical card container adhering to design tokens:
 * - Panel background: #121917 (bg-tactical-panel)
 * - Border: #26332D (border-tactical-border)
 * - Text: #F3F7F4 (text-tactical-text)
 */
export function Card({ children, className = '', title, subtitle, action }) {
  return (
    <div
      className={`rounded-lg border border-tactical-border bg-tactical-panel p-6 shadow-sm transition-colors ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-tactical-border/60 pb-3">
          <div>
            {title && (
              <h3 className="text-base font-semibold tracking-wide text-tactical-text">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-tactical-muted">
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
