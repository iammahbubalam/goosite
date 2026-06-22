/**
 * Shared scroll state, written once per frame by the Lenis loop and read by the
 * milk river shader and parallax tiers. One source of truth so nothing spins up
 * its own scroll listener.
 */
export const scrollState = {
  /** 0..1 progress through the page */
  progress: 0,
  /** instantaneous scroll velocity (px/frame-ish), smoothed by Lenis */
  velocity: 0,
  /** absolute scroll position in px */
  y: 0,
};

export type ScrollState = typeof scrollState;
