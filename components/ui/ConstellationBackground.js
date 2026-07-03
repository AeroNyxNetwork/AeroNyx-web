/**
 * ============================================
 * File: components/ui/ConstellationBackground.jsx
 * ============================================
 * Modification Reason: v2.0 — Rendering-quality + platform pass.
 *   1. FIX (macOS/iOS/Android hi-DPI): canvas now renders at
 *      devicePixelRatio (capped at 2). Previously drew at CSS pixels —
 *      blurry stars/lines on every Retina display.
 *   2. FIX (120Hz devices): animation was frame-rate dependent
 *      (fade/twinkle advanced per frame). iPhone ProMotion / 120Hz
 *      Android ran 2x speed. Now delta-time based.
 *   3. FIX: twinklePhase was incremented inside stars.forEach — advanced
 *      N times per frame (N = star count), so larger constellations
 *      twinkled faster. Now advanced once per frame.
 *   4. prefers-reduced-motion: renders one static frame, no rAF loop.
 *   5. Canvas carries the `constellation-canvas` class — the contract
 *      required by styles/globals.css v3.0 (scoped fixed positioning).
 *   6. Removed unused framer-motion import (bundle size).
 *
 * Main Functionality:
 *   - Full-viewport ambient zodiac constellation canvas: constellations
 *     fade in/out at random positions/rotations with twinkling stars,
 *     plus a deterministic ambient star field.
 *
 * Dependencies:
 *   - Mounted by components/ui/MinimalAILBackground (fixed wrapper, z -1)
 *   - styles/globals.css v3.0 (.constellation-canvas rule)
 *
 * Main Logical Flow:
 *   1. Mount → size canvas to viewport × DPR → init constellation states
 *   2. rAF loop: dt-scaled fade/twinkle updates → draw links, stars, field
 *   3. Resize → re-size backing store, keep states
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Keep the DPR transform (ctx.setTransform) — all drawing code is in
 *     CSS-pixel coordinates on purpose.
 *   - All time-based values are per-second now; tune speeds via the
 *     constants, never by re-introducing per-frame increments.
 *
 * Last Modified: v2.0 — DPR, delta-time, reduced-motion, class contract
 * ============================================
 */

import React, { useEffect, useRef } from 'react';

// Per-second speeds (v2.0: frame-rate independent)
const FADE_SPEED_MIN = 0.12;   // opacity units / second
const FADE_SPEED_RAND = 0.18;
const TWINKLE_SPEED = 1.2;     // radians / second

const ZODIAC = [
  { name: 'Aries', stars: [[0.2, 0.3], [0.25, 0.25], [0.3, 0.3], [0.35, 0.35], [0.25, 0.35]], connections: [[0, 1], [1, 2], [2, 3], [1, 4]] },
  { name: 'Taurus', stars: [[0.7, 0.2], [0.75, 0.15], [0.8, 0.2], [0.75, 0.25], [0.85, 0.15], [0.9, 0.1]], connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5]] },
  { name: 'Gemini', stars: [[0.1, 0.7], [0.15, 0.65], [0.1, 0.75], [0.15, 0.8], [0.2, 0.7], [0.2, 0.75]], connections: [[0, 1], [2, 3], [1, 4], [3, 5], [4, 5]] },
  { name: 'Cancer', stars: [[0.8, 0.8], [0.85, 0.75], [0.9, 0.8], [0.85, 0.85], [0.95, 0.75]], connections: [[0, 1], [1, 2], [0, 3], [2, 4]] },
  { name: 'Leo', stars: [[0.3, 0.6], [0.35, 0.55], [0.4, 0.6], [0.35, 0.65], [0.45, 0.55], [0.5, 0.6]], connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5]] },
  { name: 'Virgo', stars: [[0.6, 0.4], [0.65, 0.35], [0.7, 0.4], [0.65, 0.45], [0.75, 0.35], [0.8, 0.4]], connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5], [3, 5]] },
  { name: 'Libra', stars: [[0.15, 0.4], [0.2, 0.35], [0.25, 0.4], [0.2, 0.45], [0.3, 0.35]], connections: [[0, 1], [1, 2], [0, 3], [2, 4], [3, 4]] },
  { name: 'Scorpio', stars: [[0.5, 0.7], [0.55, 0.65], [0.6, 0.7], [0.65, 0.75], [0.7, 0.7], [0.75, 0.65], [0.8, 0.7]], connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]] },
  { name: 'Sagittarius', stars: [[0.4, 0.2], [0.45, 0.15], [0.5, 0.2], [0.45, 0.25], [0.55, 0.15], [0.6, 0.2]], connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5]] },
  { name: 'Capricorn', stars: [[0.1, 0.1], [0.15, 0.05], [0.2, 0.1], [0.15, 0.15], [0.25, 0.05], [0.3, 0.1]], connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5], [3, 5]] },
  { name: 'Aquarius', stars: [[0.7, 0.5], [0.75, 0.45], [0.8, 0.5], [0.75, 0.55], [0.85, 0.45], [0.9, 0.5]], connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5]] },
  { name: 'Pisces', stars: [[0.3, 0.8], [0.35, 0.75], [0.4, 0.8], [0.35, 0.85], [0.45, 0.75], [0.5, 0.8], [0.45, 0.85]], connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [3, 6], [5, 6]] },
];

const ConstellationBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const reduced = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let raf = null;
    let last = performance.now();

    const constellations = ZODIAC.map((c) => ({
      ...c,
      opacity: 0,
      targetOpacity: 0,
      fadeSpeed: FADE_SPEED_MIN + Math.random() * FADE_SPEED_RAND,
      nextAppearTime: Date.now() + Math.random() * 10000,
      disappearTime: 0,
      displayDuration: 8000 + Math.random() * 4000,
      scale: 0.8 + Math.random() * 0.4,
      rotation: Math.random() * Math.PI * 2,
      offsetX: Math.random() * 0.2 - 0.1,
      offsetY: Math.random() * 0.2 - 0.1,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // v2.0: hi-DPI backing store; drawing stays in CSS-pixel coordinates.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawConstellation = (c, now) => {
      ctx.save();
      const centerX = W / 2;
      const centerY = H / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate(c.rotation);
      ctx.scale(c.scale, c.scale);
      ctx.translate(-centerX, -centerY);

      // Connections
      ctx.strokeStyle = `rgba(119, 98, 243, ${c.opacity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      c.connections.forEach(([start, end]) => {
        const s1 = c.stars[start];
        const s2 = c.stars[end];
        ctx.moveTo((s1[0] + c.offsetX) * W, (s1[1] + c.offsetY) * H);
        ctx.lineTo((s2[0] + c.offsetX) * W, (s2[1] + c.offsetY) * H);
      });
      ctx.stroke();

      // Stars (twinklePhase advanced once per frame in the loop — v2.0)
      c.stars.forEach((star, starIndex) => {
        const x = (star[0] + c.offsetX) * W;
        const y = (star[1] + c.offsetY) * H;
        const twinkle = 0.7 + Math.sin(c.twinklePhase + starIndex) * 0.3;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${c.opacity * twinkle})`);
        gradient.addColorStop(0.2, `rgba(119, 98, 243, ${c.opacity * 0.8 * twinkle})`);
        gradient.addColorStop(1, 'rgba(119, 98, 243, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${c.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawAmbientStars = (now) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      for (let i = 0; i < 100; i++) {
        const x = (Math.sin(i * 1.2) * 0.5 + 0.5) * W;
        const y = (Math.cos(i * 0.8) * 0.5 + 0.5) * H;
        const size = Math.sin(now * 0.001 + i) * 0.5 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (nowHr) => {
      const dt = Math.min((nowHr - last) / 1000, 0.05); // seconds, clamped
      last = nowHr;
      const now = Date.now();

      ctx.clearRect(0, 0, W, H);

      constellations.forEach((c) => {
        // Appearance scheduling
        if (c.opacity === 0 && now >= c.nextAppearTime) {
          c.targetOpacity = 0.6 + Math.random() * 0.4;
          c.disappearTime = now + c.displayDuration;
        } else if (c.opacity > 0 && now >= c.disappearTime && c.targetOpacity > 0) {
          c.targetOpacity = 0;
          c.nextAppearTime = now + 5000 + Math.random() * 15000;
          c.displayDuration = 8000 + Math.random() * 4000;
          c.offsetX = Math.random() * 0.2 - 0.1;
          c.offsetY = Math.random() * 0.2 - 0.1;
          c.rotation = Math.random() * Math.PI * 2;
        }

        // dt-scaled fade (v2.0)
        if (c.opacity < c.targetOpacity) {
          c.opacity = Math.min(c.opacity + c.fadeSpeed * dt, c.targetOpacity);
        } else if (c.opacity > c.targetOpacity) {
          c.opacity = Math.max(c.opacity - c.fadeSpeed * dt, c.targetOpacity);
        }

        // dt-scaled twinkle, ONCE per frame (v2.0 fix)
        c.twinklePhase += TWINKLE_SPEED * dt;

        if (c.opacity > 0) drawConstellation(c, now);
      });

      drawAmbientStars(now);
      raf = requestAnimationFrame(frame);
    };

    // Static single frame for reduced motion: a calm, fixed sky.
    const renderStatic = () => {
      ctx.clearRect(0, 0, W, H);
      constellations.forEach((c, i) => {
        if (i % 3 !== 0) return; // show a sparse subset
        c.opacity = 0.5;
        drawConstellation(c, Date.now());
      });
      drawAmbientStars(0);
    };

    const onResize = () => {
      resize();
      if (reduced) renderStatic();
    };

    resize();
    window.addEventListener('resize', onResize);

    if (reduced) {
      renderStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="constellation-canvas w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 1,
      }}
    />
  );
};

export default ConstellationBackground;
