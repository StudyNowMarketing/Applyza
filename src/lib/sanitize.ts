/**
 * Input sanitization and rate-limiting utilities for form security.
 */

// ─── Sanitization ───────────────────────────────────────────────

/** Strip all HTML tags from a string */
const stripTags = (str: string): string => str.replace(/<[^>]*>/g, "");

/** Escape dangerous characters */
const escapeChars = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

/** Sanitize a single text input: trim → strip HTML → escape → truncate */
export const sanitize = (value: string, maxLength = 2000): string => {
  if (!value) return "";
  return escapeChars(stripTags(value.trim())).slice(0, maxLength);
};

/** Named length limits for common field types */
export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  message: 2000,
  textarea: 5000,
  short: 200,
} as const;

/** Sanitize a form object – supply per-key max lengths */
export const sanitizeForm = <T extends Record<string, string>>(
  form: T,
  limits: Partial<Record<keyof T, number>> = {}
): T => {
  const result = {} as T;
  for (const key in form) {
    const limit = limits[key] ?? FIELD_LIMITS.message;
    result[key] = sanitize(form[key], limit) as T[typeof key];
  }
  return result;
};

// ─── Rate Limiting ──────────────────────────────────────────────

const RATE_KEY_PREFIX = "form_rate_";
const COOLDOWN_SECONDS = 60;
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

interface RateState {
  timestamps: number[];
}

const getState = (formId: string): RateState => {
  try {
    const raw = sessionStorage.getItem(RATE_KEY_PREFIX + formId);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { timestamps: [] };
};

const setState = (formId: string, state: RateState) => {
  sessionStorage.setItem(RATE_KEY_PREFIX + formId, JSON.stringify(state));
};

/**
 * Check if a form submission is allowed.
 * Returns `{ allowed: true }` or `{ allowed: false, reason, cooldownRemaining }`.
 */
export const checkRateLimit = (
  formId: string
): { allowed: true } | { allowed: false; reason: string; cooldownRemaining: number } => {
  const now = Date.now();
  const state = getState(formId);

  // Clean old timestamps outside the window
  state.timestamps = state.timestamps.filter((t) => now - t < WINDOW_MS);

  // Check cooldown from last submission
  const last = state.timestamps[state.timestamps.length - 1];
  if (last) {
    const elapsed = (now - last) / 1000;
    if (elapsed < COOLDOWN_SECONDS) {
      const remaining = Math.ceil(COOLDOWN_SECONDS - elapsed);
      return {
        allowed: false,
        reason: `You can submit again in ${remaining} second${remaining !== 1 ? "s" : ""}.`,
        cooldownRemaining: remaining,
      };
    }
  }

  // Check max submissions in window
  if (state.timestamps.length >= MAX_SUBMISSIONS) {
    return {
      allowed: false,
      reason:
        "Too many submissions. Please try again later or contact us at info@applyza.com",
      cooldownRemaining: 0,
    };
  }

  return { allowed: true };
};

/** Record a successful submission. */
export const recordSubmission = (formId: string) => {
  const now = Date.now();
  const state = getState(formId);
  state.timestamps = state.timestamps.filter((t) => now - t < WINDOW_MS);
  state.timestamps.push(now);
  setState(formId, state);
};

// ─── Duplicate Prevention ───────────────────────────────────────

const DEDUP_KEY_PREFIX = "form_dedup_";
const DEDUP_WINDOW_MS = 5 * 60 * 1000;

/** Check if this email + form combo was already submitted recently. */
export const isDuplicateSubmission = (formId: string, email: string): boolean => {
  const key = DEDUP_KEY_PREFIX + formId;
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const data = JSON.parse(raw) as { email: string; ts: number };
      if (data.email === email.toLowerCase() && Date.now() - data.ts < DEDUP_WINDOW_MS) {
        return true;
      }
    }
  } catch {
    // ignore
  }
  return false;
};

/** Record a submission for duplicate checking. */
export const recordDedup = (formId: string, email: string) => {
  const key = DEDUP_KEY_PREFIX + formId;
  sessionStorage.setItem(key, JSON.stringify({ email: email.toLowerCase(), ts: Date.now() }));
};
