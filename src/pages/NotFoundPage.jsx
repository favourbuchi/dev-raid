import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

/**
 * Useful Not Found (404) page for unmatched routes.
 * Route: *
 */
export function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-tactical-warning/40 bg-tactical-warning/10 text-tactical-warning">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-mono text-tactical-text">
              404 // Tactical Sector Not Found
            </h1>
            <Badge variant="warning">Missing Target</Badge>
          </div>
          <p className="text-xs font-mono text-tactical-muted mt-1">
            STATUS CODE: ERR_COORDINATES_UNKNOWN
          </p>
        </div>
      </div>

      <Card
        title="Unresolved Navigation Coordinate"
        subtitle="Route Dispatch Failure"
      >
        <div className="space-y-4 text-sm text-tactical-muted">
          <p>
            The requested tactical sector does not exist or has been relocated:
          </p>
          <div className="rounded-md border border-tactical-border bg-tactical-bg p-3 font-mono text-xs text-tactical-warning">
            {location.pathname}
          </div>
          <p className="text-xs">
            Verify the target URL or return to central operations command to re-align your telemetry.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md bg-tactical-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-tactical-primary/90 font-mono shadow-sm"
            >
              <Home className="h-4 w-4" />
              <span>Operations Dashboard</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-md border border-tactical-border bg-tactical-bg px-4 py-2 text-xs font-mono text-tactical-muted transition-colors hover:text-tactical-text hover:border-tactical-border/80"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Previous Sector</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default NotFoundPage;
