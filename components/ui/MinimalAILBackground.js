/**
 * ============================================
 * File: components/ui/MinimalAILBackground.jsx
 * ============================================
 * Modification Reason: v2.0 — Performance + brand alignment pass.
 *   1. FIX: removed the component-level styled-jsx override that pushed
 *      mobile blur UP to 60px while globals.css pushes it DOWN to 40px
 *      (two rules fighting; heavier blur = dropped frames on mid-range
 *      Android). globals.css is now the single authority.
 *   2. PERF: gradient orbs animate opacity only (scale removed — scaling
 *      a 24rem blurred layer forces expensive repaints), with
 *      will-change + translateZ(0) for compositor promotion.
 *   3. A11y: orb animation disabled under prefers-reduced-motion.
 *   4. Surface color: base changed from pure #000 to var(--surface-0)
 *      to match globals.css v3.0.
 *
 * Main Functionality:
 *   - Fixed full-viewport backdrop stack: base color → constellation
 *     canvas → ambient orbs → vignette.
 *
 * Dependencies:
 *   - ./ConstellationBackground (dynamically imported, ssr:false)
 *   - styles/globals.css v3.0 (.constellation-canvas fixed rule,
 *     mobile blur reduction)
 *   - Consumed by pages/index.js behind <Suspense>
 *
 * Main Logical Flow:
 *   1. Mount gate (avoids SSR/hydration flash for canvas layer)
 *   2. Render layer stack with z-index -2 → 1 (content sits at z 10)
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Z-index contract: base -2, canvas wrapper -1, orbs 0, vignette 1,
 *     main content 10+. Do not raise vignette above 1.
 *   - ConstellationBackground's <canvas> must carry the
 *     `constellation-canvas` class (globals.css v3.0 scopes the fixed
 *     positioning rule to it — verify when touching that file).
 *   - Do not re-add scale animation to the blurred orbs.
 *
 * Last Modified: v2.0 — Perf pass, reduced-motion, blur conflict fix
 * ============================================
 */

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import ConstellationBackground for better performance
const ConstellationBackground = dynamic(() => import('./ConstellationBackground'), {
  ssr: false,
  loading: () => null,
});

const MinimalAILBackground = () => {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const orbStyle = {
    willChange: reduced ? 'auto' : 'opacity',
    transform: 'translateZ(0)',
  };

  return (
    <>
      {/* Base color layer — surface-0, not pure black (v2.0) */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: -2, background: 'var(--surface-0, #08080D)' }}
      />

      {/* Constellation canvas layer */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <ConstellationBackground />
      </div>

      {/* Ambient gradient orbs — opacity-only animation (v2.0 perf) */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          style={orbStyle}
          animate={reduced ? { opacity: 0.35 } : { opacity: [0.3, 0.5, 0.3] }}
          transition={reduced ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
          style={orbStyle}
          animate={reduced ? { opacity: 0.3 } : { opacity: [0.2, 0.4, 0.2] }}
          transition={reduced ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Vignette for focus */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </>
  );
};

export default MinimalAILBackground;
