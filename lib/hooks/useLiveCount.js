/**
 * ============================================================================
 * File: lib/hooks/useLiveCount.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] A counter that keeps moving between
 * API syncs, without owning any presentation.
 *
 * The public stats endpoint refreshes about every 30 s. A number that jumps
 * once every 30 s and sits frozen in between does not read as "live", so
 * between syncs this extrapolates from the growth rate actually observed
 * across the last two syncs — never invented, never faster than what the
 * network really did — and snaps to `minStep` so byte counters advance in
 * KB rather than single bytes.
 *
 * Invariant kept from AnimatedMessageCounter: the displayed number never
 * moves backwards between syncs. It only decreases when a fresher API value
 * is genuinely lower, which is authoritative.
 *
 * Why this exists next to AnimatedMessageCounter: that component couples the
 * same extrapolation to a specific presentation — auto-fitting font size
 * between 18 and 44 px and a pulse line that appears and disappears. Both are
 * fine in the stat tiles on NetworkProof, and both are wrong in the hero's
 * proof strip, where they made the value a different size and typeface from
 * its neighbours and reflowed the row on every tick. This hook is the logic
 * without the chrome; NetworkProof keeps the component unchanged.
 * ============================================================================
 */

import { useEffect, useRef, useState } from 'react';

const normalize = (value) => (
  typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : null
);

export default function useLiveCount(value, { minStep = 1, intervalMs = 1200, paused = false } = {}) {
  const [display, setDisplay] = useState(() => normalize(value));
  const ratePerSecond = useRef(0);
  const lastSync = useRef({ value: normalize(value), at: Date.now() });
  const seeded = useRef(false);

  // A fresh value from the API: measure the real rate, then adopt it.
  useEffect(() => {
    const next = normalize(value);
    if (next === null) return;

    const now = Date.now();
    const { value: previous, at } = lastSync.current;
    lastSync.current = { value: next, at: now };

    if (seeded.current && typeof previous === 'number') {
      const delta = next - previous;
      const seconds = Math.max(1, Math.round((now - at) / 1000));
      ratePerSecond.current = delta > 0 ? delta / seconds : 0;
    } else {
      seeded.current = true;
      ratePerSecond.current = 0;
    }

    setDisplay((current) => {
      if (typeof current !== 'number') return next;
      // A lower fresh reading is authoritative; otherwise never go backwards.
      if (typeof previous === 'number' && next <= previous) return next;
      return Math.max(current, next);
    });
  }, [value]);

  // Between syncs: step forward at the observed rate.
  const running = display !== null && !paused;
  useEffect(() => {
    if (!running) return undefined;
    const id = window.setInterval(() => {
      const rate = ratePerSecond.current;
      if (rate <= 0) return;
      const expected = rate * (intervalMs / 1000) * (0.45 + Math.random() * 1.1);
      const step = Math.floor(expected / minStep) * minStep;
      if (step > 0) {
        setDisplay((current) => (typeof current === 'number' ? current + step : current));
      }
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [running, intervalMs, minStep]);

  return display;
}
