// Motion preference helper shared by animated components.

/**
 * Whether the visitor asked their system for reduced motion.
 * @returns {boolean} True when animations should be skipped or kept minimal.
 */
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
