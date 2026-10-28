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
import { useAppData } from '../context/AppDataContext';
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
 * Clean, accessible, and spacious authoring interface for community target deployment.
 * Form sections have generous padding, subtle dividers, and polished typography.
 */
export function CreateTargetPage() {
  const { createTarget } = useAppData();
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
      const newTarget = createTarget({
        ...formData,
        points: Number(formData.points),
      });
      setSubmittedPreview(newTarget);
      // Scroll smoothly to top to review notification banner
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-2">
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
        <div className="rounded-lg border border-[#D6E5DA] bg-green-subtle p-5 text-sm space-y-2 animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-2 font-semibold text-text-success">
            <CheckCircle2 className="h-5 w-5 text-text-success shrink-0" />
            <span>Target Published Successfully</span>
          </div>
          <p className="text-text-primary text-xs sm:text-sm leading-relaxed">
            Your target objective for{' '}
            <span className="font-semibold text-text-primary">
              "{submittedPreview.title}"
            </span>{' '}
            is now active in campaign operations and available for verification claims.
          </p>
          <div className="pt-1 flex items-center gap-3">
            <Link
              to={ROUTES.DASHBOARD}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-success hover:underline"
            >
              <span>View in Operations Dashboard</span>
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            </Link>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="border-b border-border-subtle pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-subtle border border-[#D6E5DA] text-accent-primary">
            <PlusCircle className="h-4 w-4" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">
            Create Target
          </h1>
        </div>
        <p className="mt-1.5 text-sm text-text-secondary">
          Define an engagement objective, set criteria, and assign completion points.
        </p>
      </div>

      {/* Authoring Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Card className="p-6 sm:p-8 space-y-8">
          {/* Section 1: Objective Overview */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary/80 block mb-1">
                Section 1 • Target Details
              </span>
              <p className="text-xs text-text-secondary">
                Provide a clear title and instructions for community participants.
              </p>
            </div>

            {/* Target Title */}
            <div>
              <label
                htmlFor="target-title"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Target Title <span className="text-[#991B1B]">*</span>
              </label>
              <input
                id="target-title"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Share the v0.2 platform release announcement on X"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-card-bg text-text-primary placeholder:text-text-secondary/60 focus:outline-none transition-all ${
                  errors.title
                    ? 'border-[#F8D7DA] focus:ring-2 focus:ring-[#991B1B]/20'
                    : 'border-border-subtle focus:border-[#B5BCC4] focus:ring-2 focus:ring-accent-primary/20'
                }`}
              />
              {errors.title && (
                <p className="mt-1.5 text-xs text-[#991B1B] flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="target-description"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Description & Verification Guidelines <span className="text-[#991B1B]">*</span>
              </label>
              <textarea
                id="target-description"
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Explain the mission objectives, submission criteria, and verification steps for participants..."
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-card-bg text-text-primary placeholder:text-text-secondary/60 focus:outline-none transition-all leading-relaxed ${
                  errors.description
                    ? 'border-[#F8D7DA] focus:ring-2 focus:ring-[#991B1B]/20'
                    : 'border-border-subtle focus:border-[#B5BCC4] focus:ring-2 focus:ring-accent-primary/20'
                }`}
              />
              {errors.description && (
                <p className="mt-1.5 text-xs text-[#991B1B] flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Destination & Reward Parameters */}
          <div className="border-t border-border-subtle pt-8 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary/80 block mb-1">
                Section 2 • Destination & Reward
              </span>
              <p className="text-xs text-text-secondary">
                Specify where the target action takes place and how many points participants earn.
              </p>
            </div>

            {/* Destination URL */}
            <div>
              <label
                htmlFor="target-url"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Destination URL <span className="text-[#991B1B]">*</span>
              </label>
              <input
                id="target-url"
                type="url"
                value={formData.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://x.com/devraid/status/..."
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-card-bg text-text-primary placeholder:text-text-secondary/60 focus:outline-none transition-all font-mono text-xs ${
                  errors.url
                    ? 'border-[#F8D7DA] focus:ring-2 focus:ring-[#991B1B]/20'
                    : 'border-border-subtle focus:border-[#B5BCC4] focus:ring-2 focus:ring-accent-primary/20'
                }`}
              />
              {errors.url ? (
                <p className="mt-1.5 text-xs text-[#991B1B] flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.url}</span>
                </p>
              ) : (
                <p className="mt-2 text-xs text-text-secondary">
                  External URL where participants complete the action. Must begin with http:// or https://.
                </p>
              )}
            </div>

            {/* Grid: Platform & Point Value */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Platform Selection */}
              <div>
                <label
                  htmlFor="target-platform"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Platform <span className="text-[#991B1B]">*</span>
                </label>
                <select
                  id="target-platform"
                  value={formData.platform}
                  onChange={(e) => handleChange('platform', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-subtle bg-card-bg text-text-primary focus:outline-none focus:border-[#B5BCC4] focus:ring-2 focus:ring-accent-primary/20 transition-all cursor-pointer"
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
                  className="block text-sm font-medium text-text-primary mb-2"
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
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-card-bg text-text-primary placeholder:text-text-secondary/60 focus:outline-none transition-all ${
                    errors.points
                      ? 'border-[#F8D7DA] focus:ring-2 focus:ring-[#991B1B]/20'
                      : 'border-border-subtle focus:border-[#B5BCC4] focus:ring-2 focus:ring-accent-primary/20'
                  }`}
                />
                {errors.points && (
                  <p className="mt-1.5 text-xs text-[#991B1B] flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.points}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Priority & Schedule */}
          <div className="border-t border-border-subtle pt-8 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary/80 block mb-1">
                Section 3 • Priority & Schedule
              </span>
              <p className="text-xs text-text-secondary">
                Configure urgency level and an optional target completion cutoff date.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Priority Selection */}
              <div>
                <label
                  htmlFor="target-priority"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Priority Tier <span className="text-[#991B1B]">*</span>
                </label>
                <select
                  id="target-priority"
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-subtle bg-card-bg text-text-primary focus:outline-none focus:border-[#B5BCC4] focus:ring-2 focus:ring-accent-primary/20 transition-all cursor-pointer"
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
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Deadline <span className="text-text-secondary font-normal text-xs">(Optional)</span>
                </label>
                <input
                  id="target-deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange('deadline', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-subtle bg-card-bg text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-[#B5BCC4] focus:ring-2 focus:ring-accent-primary/20 transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg border border-border-subtle bg-card-bg text-text-secondary hover:text-text-primary hover:bg-[#F8F9FA] transition-colors"
          >
            Cancel
          </Link>

          <Button type="submit" variant="primary" size="md" className="px-6 py-2.5 text-sm font-medium">
            Create Target
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTargetPage;
