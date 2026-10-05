/**
 * ============================================================================
 * File: components/sections/MeetNyxi.js
 * ============================================================================
 * [NYXI-WEB 2026-10-06 by Claude] "Meet Nyxi" — the AeroNyx AI, introduced as
 * the character the app shows, not as a feature list.
 *
 * Left: what she is for — an assistant for life whose memory lives in
 * MemChain and does not vanish when a chat ends (owner, 2026-10-06) — with
 * two doors: talk to her (the app) and how MemChain remembers (/memchain).
 * Right: the official character on a small stage, greeting the visitor in a
 * speech bubble, with a row of her moods underneath. Tap a mood and she plays
 * it — the same eight clips the app's sticker panel uses.
 *
 * Asset rules (see lib/external-links.js for the measurements):
 *   - The files are the app's own, byte for byte: plain <img>, never
 *     next/image, never re-encoded, never redrawn.
 *   - 512 px source, displayed at 256 CSS px: exactly 1:1 on a 2× screen, so
 *     she stays crisp on every laptop. (3× phones upscale ~1.4×; a larger
 *     master would fix that — ask the owner, do not upscale here.)
 *   - The still and frame 0 of every clip are the same picture, so the swap
 *     from still → clip, and from one clip to another, never jumps.
 *
 * Weight: the 89 KB still is the server-rendered image, so the section reads
 * correctly with no JavaScript. The ~680 KB greeting clip is fetched only
 * once the section is about to scroll into view; other moods only when
 * tapped. Clips are swapped back to the still while the section is off
 * screen, so an animated WebP is never decoding where nobody can see it.
 * prefers-reduced-motion: no autoplay; a mood the visitor taps still plays,
 * because they asked for it.
 *
 * Grounding: she is a 3D object, so she stands on something — a contact
 * shadow under her feet, offset slightly right because her render is lit
 * from the upper left. (Owner floor: 3D objects obey their surface and light.)
 * ============================================================================
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import DownloadsModal from '../ui/DownloadsModal';
import useReducedMotion from '../../lib/hooks/useReducedMotion';
import { NYXI_REST, NYXI_POSES, nyxiClip } from '../../lib/external-links';

const GREETING_POSE = 'grin';

export default function MeetNyxi({ copy }) {
  const n = copy.nyxi;
  const reduced = useReducedMotion();
  const stageRef = useRef(null);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pose, setPose] = useState(GREETING_POSE);
  const [userPicked, setUserPicked] = useState(false);
  const [ready, setReady] = useState({}); // pose -> clip has loaded once
  const [loadingPose, setLoadingPose] = useState(null);
  const wanted = useRef(pose);

  // Is the stage on (or about to be on) screen? Not a one-shot: clips are
  // dropped back to the still whenever she scrolls away.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '240px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldPlay = visible && (userPicked || !reduced);

  // Fetch the current pose's clip the first time it is needed. The still
  // stays on screen until the clip is complete, so nothing ever flashes.
  useEffect(() => {
    wanted.current = pose;
    if (!shouldPlay || ready[pose]) {
      // Off screen mid-fetch, or already cached: no pending indicator.
      setLoadingPose(null);
      return undefined;
    }
    let cancelled = false;
    setLoadingPose(pose);
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (cancelled) return;
      setReady((r) => ({ ...r, [pose]: true }));
      if (wanted.current === pose) setLoadingPose(null);
    };
    img.onerror = () => {
      // The CDN is the app's; if it is unreachable the still is still right.
      if (!cancelled && wanted.current === pose) setLoadingPose(null);
    };
    img.src = nyxiClip(pose);
    return () => {
      cancelled = true;
    };
  }, [pose, shouldPlay, ready]);

  const src = shouldPlay && ready[pose] ? nyxiClip(pose) : NYXI_REST;

  const pick = (p) => {
    setUserPicked(true);
    setPose(p);
  };

  return (
    <section id="nyxi" className="ng-section scroll-mt-20 md:scroll-mt-24" style={{ background: 'var(--surface-1)' }}>
      <Container>
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Copy. Second on phones: there she comes first, so the face
              introduces the words rather than the other way round. */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="ng-eyebrow">{n.eyebrow}</p>
            <div className="ng-section-head mt-5">
              <h2 className="text-white">{n.title}</h2>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/62 lg:mx-0">{n.description}</p>

            <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {n.traits.map((trait) => (
                <li key={trait} className="ng-chip">{trait}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-center lg:justify-start sm:justify-center">
              <button type="button" onClick={() => setDownloadsOpen(true)} className="ng-btn ng-btn-primary w-full sm:w-auto">
                {n.cta}
              </button>
              {/* Link keeps the active locale on its own. */}
              <Link href="/memchain" className="ng-link-quiet">
                {n.memchainLink}
                <span className="ng-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Stage. */}
          <div className="order-1 lg:order-2">
            <div ref={stageRef} className="ng-nyxi-stage">
              <div className="ng-nyxi-glow" aria-hidden="true" />
              {/* The greeting belongs to the greeting pose. Other moods use
                  the headroom the bubble sits over — measured: "Yay" jumps to
                  y=14 and "LOL" to y=27 of 512, i.e. straight through a bubble
                  pulled down to her head — so the bubble fades out while she
                  plays them. It keeps its space, so nothing below it moves. */}
              <p className="ng-nyxi-bubble" data-away={pose === GREETING_POSE ? undefined : 'true'} aria-hidden={pose !== GREETING_POSE}>
                {n.greeting}
              </p>
              <div className="ng-nyxi-figure">
                <span className="ng-nyxi-floor" aria-hidden="true" />
                {/* eslint-disable-next-line @next/next/no-img-element -- the
                    official asset must be served byte for byte; next/image
                    would re-encode it. */}
                <img
                  className="ng-nyxi-portrait"
                  src={src}
                  width={256}
                  height={256}
                  alt={n.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[11px] uppercase tracking-eyebrow text-white/40">{n.moodsLabel}</p>
              <div role="group" aria-label={n.moodsLabel} className="mt-3 flex flex-wrap justify-center gap-2">
                {NYXI_POSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className="ng-mood"
                    aria-pressed={pose === p}
                    data-loading={loadingPose === p ? 'true' : undefined}
                    onClick={() => pick(p)}
                  >
                    {n.moods[p]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <DownloadsModal isOpen={downloadsOpen} onClose={() => setDownloadsOpen(false)} />
    </section>
  );
}
