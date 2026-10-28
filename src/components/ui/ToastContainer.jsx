import React, { useEffect } from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

/**
 * Single Toast Item. Auto-dismisses after 4 seconds.
 */
function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const isSuccess = toast.type === 'success';
  const isWarning = toast.type === 'warning';

  return (
    <div
      role="status"
      className="pointer-events-auto flex items-start gap-3 rounded-lg border border-border-subtle bg-card-bg p-3.5 shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{
        borderColor: isSuccess ? '#D6E5DA' : undefined,
      }}
    >
      <div className="shrink-0 mt-0.5">
        {isSuccess ? (
          <CheckCircle2 className="h-4 w-4 text-text-success" />
        ) : isWarning ? (
          <AlertCircle className="h-4 w-4 text-accent-warning" />
        ) : (
          <Info className="h-4 w-4 text-accent-primary" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-xs font-semibold text-text-primary leading-tight">
            {toast.title}
          </p>
        )}
        <p className="text-xs text-text-secondary mt-0.5 leading-snug break-words">
          {toast.message}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 p-1 rounded text-text-secondary hover:text-text-primary hover:bg-[#F1F3F5] transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/**
 * ToastContainer.
 * Displays floating notification toasts in the bottom-right corner of the viewport.
 */
export function ToastContainer() {
  const { toasts, dismissToast } = useAppData();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-[calc(100vw-2rem)] pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}

export default ToastContainer;
