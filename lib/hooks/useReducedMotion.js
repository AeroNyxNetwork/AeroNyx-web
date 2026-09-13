/**
 * ============================================================================
 * File: lib/hooks/useReducedMotion.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] SSR-safe prefers-reduced-motion.
 * Starts false (the server cannot know), updates on mount and on change.
 * Shared by the homepage sections so every animation answers the same
 * setting the same way.
 * ============================================================================
 */

import { useEffect, useState } from 'react';

export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else if (mq.removeListener) mq.removeListener(onChange);
    };
  }, []);
  return reduced;
}
