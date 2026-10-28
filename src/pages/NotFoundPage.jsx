import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

/**
 * Useful Not Found (404) page for unmatched routes.
 * Route: *
 */
export function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="max-w-xl mx-auto py-12 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FCF5ED] border border-[#F2DFC7] text-accent-warning shrink-0">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
              Page not found
            </h1>
            <Badge variant="warning">404 Error</Badge>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            The requested URL could not be resolved.
          </p>
        </div>
      </div>

      <Card
        title="Unmatched Route"
        subtitle="Navigation request details"
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            The path you are looking for does not exist or may have been moved:
          </p>

          <div className="rounded-lg border border-border-subtle bg-[#F8F9FA] px-3.5 py-2.5 font-mono text-xs text-text-primary">
            {location.pathname}
          </div>

          <p className="text-xs text-text-secondary">
            Check the URL for typing errors or return to the main dashboard.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg bg-text-primary px-3.5 py-2 text-xs font-medium text-white hover:bg-[#2D333B] active:bg-[#121519] transition-colors shadow-xs"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Operations Dashboard</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-card-bg px-3.5 py-2 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default NotFoundPage;
