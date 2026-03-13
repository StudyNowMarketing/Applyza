import { useEffect } from "react";

/**
 * Global scroll-animation system.
 * Observes the DOM (including dynamically-added nodes) and applies
 * CSS-driven reveal animations to headings, paragraphs, images,
 * cards, and grid children across every page.
 *
 * CSS classes used:
 *   [data-scroll]           — element waiting to animate (hidden)
 *   [data-scroll="visible"] — element has entered viewport (visible)
 *
 * Stagger: grid/flex children get --stagger-index custom property.
 */

const SELECTORS = [
  "h1",
  "h2",
  "h3",
  "p",
  "img:not([data-no-scroll])",
  ".hover-lift",
  "[class*='card']",
  "[class*='Card']",
  "section > .container > div > div", // grid children
];

const GRID_PARENT_SELECTORS = [
  ".grid",
  "[class*='grid']",
];

function isAdminRoute() {
  return window.location.pathname.startsWith("/admin");
}

function shouldAnimate(el: Element): boolean {
  // Skip elements inside admin pages, the navbar, or cookie consent
  if (
    el.closest("[data-no-scroll-parent]") ||
    el.closest("nav") ||
    el.closest("[role='dialog']") ||
    el.closest("[data-radix-popper-content-wrapper]")
  ) {
    return false;
  }
  // Skip very small elements (icons etc.)
  const rect = el.getBoundingClientRect();
  if (rect.width < 20 && rect.height < 20) return false;
  return true;
}

function getAnimationType(el: Element): string {
  const tag = el.tagName.toLowerCase();
  if (tag === "img") return "img";
  if (tag === "h1" || tag === "h2" || tag === "h3") return "heading";
  if (tag === "p") return "paragraph";
  return "card";
}

function applyScrollAttributes(root: Element | Document = document) {
  if (isAdminRoute()) return;

  const selector = SELECTORS.join(", ");
  const elements = root.querySelectorAll(selector);

  elements.forEach((el) => {
    if (el.hasAttribute("data-scroll")) return;
    if (!shouldAnimate(el)) return;

    const type = getAnimationType(el);
    el.setAttribute("data-scroll", type);
  });

  // Assign stagger indices to grid children
  GRID_PARENT_SELECTORS.forEach((sel) => {
    const grids = root.querySelectorAll(sel);
    grids.forEach((grid) => {
      const children = Array.from(grid.children);
      children.forEach((child, i) => {
        if (child.hasAttribute("data-scroll")) {
          (child as HTMLElement).style.setProperty("--stagger-index", String(i));
        }
      });
    });
  });
}

const ScrollAnimator = () => {
  useEffect(() => {
    if (isAdminRoute()) return;

    // Initial pass
    applyScrollAttributes();

    // Intersection observer for reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-scroll", "visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    function observeAll() {
      document.querySelectorAll("[data-scroll]:not([data-scroll='visible'])").forEach((el) => {
        observer.observe(el);
      });
    }

    observeAll();

    // Watch for dynamically added elements (route changes, lazy loads)
    const mutationObserver = new MutationObserver((mutations) => {
      let hasNew = false;
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            applyScrollAttributes(node);
            hasNew = true;
          }
        });
      });
      if (hasNew) observeAll();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};

export default ScrollAnimator;
