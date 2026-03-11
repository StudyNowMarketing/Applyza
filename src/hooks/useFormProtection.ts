import { useState, useEffect, useCallback } from "react";
import {
  checkRateLimit,
  recordSubmission,
  isDuplicateSubmission,
  recordDedup,
} from "@/lib/sanitize";

interface UseFormProtectionOptions {
  formId: string;
}

/**
 * Hook that wraps rate limiting, duplicate prevention, and cooldown countdown
 * for any form. Returns guard functions and UI state.
 */
export const useFormProtection = ({ formId }: UseFormProtectionOptions) => {
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          setRateLimitMsg(null);
          return 0;
        }
        setRateLimitMsg(`You can submit again in ${prev - 1} second${prev - 1 !== 1 ? "s" : ""}.`);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  /**
   * Call before submitting. Returns `true` if allowed, `false` if blocked
   * (and sets the appropriate message).
   */
  const canSubmit = useCallback(
    (email: string): boolean => {
      // Duplicate check
      if (isDuplicateSubmission(formId, email)) {
        setRateLimitMsg(
          "You've already submitted this form. We'll be in touch soon."
        );
        return false;
      }

      // Rate limit check
      const result = checkRateLimit(formId);
      if (!result.allowed) {
        setRateLimitMsg(result.reason);
        if (result.cooldownRemaining > 0) setCooldown(result.cooldownRemaining);
        return false;
      }

      return true;
    },
    [formId]
  );

  /** Call after a successful submission. */
  const onSuccess = useCallback(
    (email: string) => {
      recordSubmission(formId);
      recordDedup(formId, email);
    },
    [formId]
  );

  return { rateLimitMsg, cooldown, canSubmit, onSuccess, isBlocked: cooldown > 0 || !!rateLimitMsg };
};
