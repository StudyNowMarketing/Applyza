/**
 * All static (non-dynamic) public routes for Applyza.
 * These are pre-rendered at build time.
 * Dynamic routes (/blog/:slug, /find-a-course/:slug, /study-destinations/:slug)
 * are handled separately by scripts/fetch-dynamic-routes.mjs
 */

export const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/university-applications",
  "/services/visa-immigration",
  "/services/student-counselling",
  "/services/accommodation",
  "/find-a-course",
  "/eligibility-check",
  "/book-a-consultation",
  "/scholarships",
  "/events",
  "/blog",
  "/study-destinations",
  "/for-institutions",
  "/for-partners",
  "/contact",
  "/faq",
  "/how-to-choose-a-study-abroad-consultancy",
  "/free-vs-paid-study-abroad-consultancies",
  "/aqf-certified-education-agent",
  "/privacy-policy",
  "/terms-and-conditions",
  "/anti-slavery-policy",
  "/cookie-policy",
  "/accessibility",
];

/** Routes that fetch data from Supabase — wait longer for them */
export const DATA_HEAVY_ROUTES = new Set([
  "/find-a-course",
  "/blog",
  "/events",
  "/scholarships",
  "/study-destinations",
]);
