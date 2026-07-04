/**
 * ============================================
 * File: components/ui/MinimalAILBackground.jsx
 * ============================================
 * Modification Reason: v2.1 - A16z/Apple-grade background restraint.
 *   Removed the large blurred purple/blue orbs from the global backdrop.
 *   They read as generic Web3 decoration and competed with the product
 *   evidence modules on mobile. The replacement is a quiet protocol-field
 *   layer: low-alpha directional light, hairline grid traces, constellation
 *   canvas, and vignette. This keeps depth without decorative bokeh.
 *
 * Historical Notes:
 * v2.0 — Performance + brand alignment pass.
 *   1. FIX: removed the component-level styled-jsx override that pushed
 *      mobile blur UP to 60px while globals.css pushes it DOWN to 40px
 *      (two rules fighting; heavier blur = dropped frames on mid-range
 *      Android). globals.css is now the single authority.
 *   2. PERF: gradient orbs animated opacity only (scale removed — scaling
 *      a 24rem blurred layer forces expensive repaints), with compositor
 *      promotion.
 *   3. A11y: orb animation disabled under prefers-reduced-motion.
 *   4. Surface color: base changed from pure #000 to var(--surface-0)
 *      to match globals.css v3.0.
 *
 * Main Functionality:
 *   - Fixed full-viewport backdrop stack: base color → constellation
 *     canvas → protocol-field light → vignette.
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
 *   - Z-index contract: base -2, canvas wrapper -1, field 0, vignette 1,
 *     main content 10+. Do not raise vignette above 1.
 *   - ConstellationBackground's <canvas> must carry the
 *     `constellation-canvas` class (globals.css v3.0 scopes the fixed
 *     positioning rule to it — verify when touching that file).
 *   - Do not re-add decorative blurred orbs/bokeh to this global layer.
 *
 * Last Modified: v2.0 — Perf pass, reduced-motion, blur conflict fix
 * Last Modified: v2.1 - Removed global decorative orbs
 * ============================================
 */

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ConstellationBackground for better performance
const ConstellationBackground = dynamic(() => import('./ConstellationBackground'), {
  ssr: false,
  loading: () => null,
});

const MinimalAILBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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

      {/* Protocol field — restrained light, no decorative orbs/bokeh. */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(118deg, transparent 0%, rgba(119,98,243,0.045) 28%, transparent 47%), linear-gradient(244deg, transparent 8%, rgba(95,187,247,0.032) 38%, transparent 61%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px opacity-50"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(151,136,247,0.45), transparent)',
          }}
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
