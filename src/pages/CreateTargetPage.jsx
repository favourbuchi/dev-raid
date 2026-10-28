import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ROUTES } from '../utils/constants';

const PLATFORM_OPTIONS = [
  'X',
  'Discord',
  'Telegram',
  'GitHub',
  'Reddit',
  'Website',
  'Other',
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const INITIAL_FORM = {
  title: '',
  description: '',
  url: '',
  platform: 'X',
  points: '50',
  priority: 'medium',
  deadline: '',
};

/**
 * Validates whether a string is a well-formed HTTP/HTTPS URL.
 */
function isValidUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Create Target Page (Route: /targets/new)
 * Clean, accessible authoring interface for community target deployment.
 * Validates inputs, handles edge cases, prevents negative points,
 * and displays an informative non-persistence preview confirmation on submit.
 */
export function CreateTargetPage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submittedPreview, setSubmittedPreview] = useState(null);

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  function validate() {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Target title is required.';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters.';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Target description is required.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
    }

    // URL validation
    if (!formData.url.trim()) {
      newErrors.url = 'Destination URL is required.';
    } else if (!isValidUrl(formData.url.trim())) {
      newErrors.url = 'Please enter a valid URL including http:// or https://';
    }

    // Points validation
    const parsedPoints = Number(formData.points);
    if (!formData.points || isNaN(parsedPoints)) {
      newErrors.points = 'Points value is required.';
    } else if (parsedPoints <= 0) {
      newErrors.points = 'Points must be greater than zero.';
    }

    // Priority validation
    if (!formData.priority) {
      newErrors.priority = 'Priority level is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      // Store preview submission without writing to backend/localStorage
      setSubmittedPreview({
        ...formData,
        points: Number(formData.points),
        submittedAt: new Date().toISOString(),
      });
      // Scroll smoothly to top to review notification banner
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Back to Operations Link */}
      <div>
        <Link
          to={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Operations</span>
        </Link>
      </div>

      {/* Submission Success / Preview Banner */}
      {submittedPreview && (
        <div className="rounded-lg border border-[#D6E5DA] bg-green-subtle p-4 sm:p-5 text-sm space-y-2 animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-2 font-semibold text-text-success">
            <CheckCircle2 className="h-5 w-5 text-text-success shrink-0" />
            <span>Target Preview Validated</span>
          </div>
          <p className="text-text-primary text-xs sm:text-sm leading-relaxed">
            Your target configuration for{' '}
            <span className="font-semibold text-text-primary">
              "{submittedPreview.title}"
            </span>{' '}
            is valid. Persistent target publishing will be activated when application state management is implemented in Phase 4.
          </p>
          <p className="text-[11px] text-text-secondary">
            Your form inputs have been preserved below for review or editing.
          </p>
        </div>
      )}

      {/* Page Header */}
      <div className="border-b border-border-subtle pb-5">
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-accent-primary" />
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">
            Create Target
          </h1>
        </div>
        <p className="mt-1 text-sm text-text-secondary">
          Define an engagement objective, set criteria, and assign completion points.
        </p>
      </div>

      {/* Authoring Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Card className="p-6 space-y-5">
          {/* Target Title */}
          <div>
            <label
              htmlFor="target-title"
              className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5"
            >
              Target Title <span className="text-[#991B1B]">*</span>
            </label>
            <input
              id="target-title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Share the v0.2 platform release announcement on X"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-card-bg text-text-primary placeholder:text-text-secondary/70 focus:outline-none transition-all ${
                errors.title
                  ? 'border-[#F8D7DA] focus:ring-2 focus:ring-[#991B1B]/20'
                  : 'border-border-subtle focus:border-[#D1D5DB] focus:ring-2 focus:ring-accent-primary/20'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-[#991B1B] flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="target-description"
              className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5"
            >
              Description & Verification Guidelines <span className="text-[#991B1B]">*</span>
            </label>
            <textarea
              id="target-description"
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Explain the mission objectives, submission criteria, and verification steps for participants..."
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-card-bg text-text-primary placeholder:text-text-secondary/70 focus:outline-none transition-all leading-relaxed ${
                errors.description
                  ? 'border-[#F8D7DA] focus:ring-2 focus:ring-[#991B1B]/20'
                  : 'border-border-subtle focus:border-[#D1D5DB] focus:ring-2 focus:ring-accent-primary/20'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-[#991B1B] flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Destination URL */}
          <div>
            <label
              htmlFor="target-url"
              className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5"
            >
              Destination URL <span className="text-[#991B1B]">*</span>
            </label>
            <div className="relative">
              <input
                id="target-url"
                type="url"
                value={formData.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://x.com/devraid/status/..."
                className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-card-bg text-text-primary placeholder:text-text-secondary/70 focus:outline-none transition-all font-mono text-xs ${
                  errors.url
                    ? 'border-[#F8D7DA] focus:ring-2 focus:ring-[#991B1B]/20'
                    : 'border-border-subtle focus:border-[#D1D5DB] focus:ring-2 focus:ring-accent-primary/20'
                }`}
              />
            </div>
            {errors.url ? (
              <p className="mt-1 text-xs text-[#991B1B] flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.url}</span>
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-text-secondary">
                Where participants will go to complete the target action. Must begin with http:// or https://.
              </p>
            )}
          </div>

          {/* Grid: Platform & Point Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Platform Selection */}
            <div>
              <label
                htmlFor="target-platform"
                className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5"
              >
                Platform <span className="text-[#991B1B]">*</span>
              </label>
              <select
                id="target-platform"
                value={formData.platform}
                onChange={(e) => handleChange('platform', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-border-subtle bg-card-bg text-text-primary focus:outline-none focus:border-[#D1D5DB] focus:ring-2 focus:ring-accent-primary/20 transition-all cursor-pointer"
              >
                {PLATFORM_OPTIONS.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            {/* Point Value */}
            <div>
              <label
                htmlFor="target-points"
                className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5"
              >
                Reward Points <span className="text-[#991B1B]">*</span>
              </label>
              <input
                id="target-points"
                type="number"
                min="1"
                step="5"
                value={formData.points}
                onChange={(e) => handleChange('points', e.target.value)}
                placeholder="50"
                className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-card-bg text-text-primary placeholder:text-text-secondary/70 focus:outline-none transition-all ${
                  errors.points
                    ? 'border-[#F8D7DA] focus:ring-2 focus:ring-[#991B1B]/20'
                    : 'border-border-subtle focus:border-[#D1D5DB] focus:ring-2 focus:ring-accent-primary/20'
                }`}
              />
              {errors.points && (
                <p className="mt-1 text-xs text-[#991B1B] flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.points}</span>
                </p>
              )}
            </div>
          </div>

          {/* Grid: Priority & Optional Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority Selection */}
            <div>
              <label
                htmlFor="target-priority"
                className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5"
              >
                Priority Tier <span className="text-[#991B1B]">*</span>
              </label>
              <select
                id="target-priority"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-border-subtle bg-card-bg text-text-primary focus:outline-none focus:border-[#D1D5DB] focus:ring-2 focus:ring-accent-primary/20 transition-all cursor-pointer"
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} Priority
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Deadline */}
            <div>
              <label
                htmlFor="target-deadline"
                className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5"
              >
                Deadline <span className="text-text-secondary font-normal text-[11px]">(Optional)</span>
              </label>
              <input
                id="target-deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-border-subtle bg-card-bg text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-[#D1D5DB] focus:ring-2 focus:ring-accent-primary/20 transition-all cursor-pointer"
              />
            </div>
          </div>
        </Card>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-border-subtle bg-card-bg text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-colors"
          >
            Cancel
          </Link>

          <Button type="submit" variant="primary" size="md">
            Create Target
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTargetPage;
