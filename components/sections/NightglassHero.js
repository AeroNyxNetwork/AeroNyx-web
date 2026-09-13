/**
 * ============================================================================
 * File: components/sections/NightglassHero.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] First viewport, product-led.
 *
 * Left: the claim ("Private by construction."), one paragraph that names the
 * three things the app holds (messages, AI, money) and the one invariant
 * (the network can carry it, not read it), two CTAs (download / how it
 * works), and a proof strip with the live number the network is carrying
 * right now. Right: the Product Lens — the real chat screen behind a lens
 * that reveals what a node on the way holds.
 *
 * 2026-09-13 compatibility pass: the entrance is a CSS keyframe (.ng-rise)
 * instead of framer-motion variants. The framer version rendered the whole
 * hero at opacity 0 in the server HTML and only faded it in once the JS
 * bundle had hydrated — on a slow connection, or when a script failed, the
 * first viewport stayed blank. CSS runs from the first paint, needs no JS,
 * and still honours prefers-reduced-motion.
 *
 * Dependencies: ../ui/ProductLens, ../ui/AnimatedMessageCounter,
 * ../ui/DownloadsModal, ../../lib/hooks/useNetworkStats (multi-consumer
 * safe), ../../lib/hooks/useReducedMotion, lib/i18n-nightglass copy passed
 * in by pages/index.js.
 * ============================================================================
 */

import { useState } from 'react';
import Container from '../ui/Container';
import ProductLens from '../ui/ProductLens';
import AnimatedMessageCounter from '../ui/AnimatedMessageCounter';
import DownloadsModal from '../ui/DownloadsModal';
import useNetworkStats from '../../lib/hooks/useNetworkStats';
import useReducedMotion from '../../lib/hooks/useReducedMotion';
import { WEB_APP } from '../../lib/external-links';

const rise = (i) => ({ animationDelay: `${0.08 + i * 0.07}s` });

export default function NightglassHero({ copy, messages }) {
  const h = copy.hero;
  const b = copy.browser;
  const syncing = messages?.homeStats?.syncing || 'Syncing';
  const reduced = useReducedMotion();
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const { stats, isLoading } = useNetworkStats({ period: '30d', autoRefresh: true, refreshInterval: 30000 });

  const nodes = Number(stats.protocolReportedNodes || 0);

  return (
    <section data-hero-section className="ng-hero relative overflow-hidden">
      <div className="ng-hero-field" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="grid items-center gap-12 pb-16 pt-28 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
          <div className="text-center lg:text-left">
            <p className="ng-eyebrow ng-rise" style={rise(0)}>{h.eyebrow}</p>
            <h1 className="ng-title ng-rise mt-6" style={rise(1)}>{h.title}</h1>
            <p className="ng-lede ng-rise mx-auto mt-6 lg:mx-0" style={rise(2)}>{h.description}</p>

            <div
              className="ng-rise mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={rise(3)}
            >
              <button type="button" onClick={() => setDownloadsOpen(true)} className="ng-btn ng-btn-primary w-full sm:w-auto">
                {h.primaryCta}
              </button>
              <a href="#how-it-works" className="ng-btn ng-btn-ghost w-full sm:w-auto">
                {h.secondaryCta}
              </a>
            </div>

            {/* The second door: app.aeronyx.network. Phrased so it never reads
                as "no install needed" — browser chat signs in by scanning
                with the app. */}
            <p className="ng-rise mt-4 text-[13px]" style={rise(4)}>
              <a
                href={WEB_APP}
                target="_blank"
                rel="noopener noreferrer"
                className="ng-link font-normal"
                style={{ color: 'rgba(255,255,255,0.52)' }}
              >
                {b.heroLink} →
              </a>
            </p>

            <dl className="ng-proofstrip ng-rise mt-10" style={rise(5)}>
              <div>
                <dt>
                  <span className="ng-live-dot" aria-hidden="true" />
                  {h.liveLabel}
                </dt>
                <dd className="ng-counter">
                  {isLoading ? (
                    <span className="ng-num text-white/45">{syncing}</span>
                  ) : (
                    <AnimatedMessageCounter
                      value={stats.encryptedTrafficBytes}
                      fallback={stats.encryptedTraffic || syncing}
                      suffix={h.liveUnit}
                      pulseLabel="live"
                      defaultStep={1024}
                    />
                  )}
                </dd>
              </div>
              <div>
                <dt>{h.nodesLabel}</dt>
                <dd className="ng-display ng-num">{nodes > 0 ? nodes : '—'}</dd>
              </div>
              <div>
                <dt>{h.plaintextLabel}</dt>
                <dd className="ng-display ng-num" style={{ color: '#A594FF' }}>{h.plaintextValue}</dd>
              </div>
            </dl>
          </div>

          <div className="ng-rise" style={rise(2)}>
            <ProductLens copy={copy} reduced={reduced} />
            <p className="mx-auto mt-5 max-w-sm text-center text-xs leading-relaxed text-white/45">
              <span className="text-white/75">{h.lensHint}</span> — {h.lensCaption}
            </p>
          </div>
        </div>
      </Container>

      <DownloadsModal isOpen={downloadsOpen} onClose={() => setDownloadsOpen(false)} />
    </section>
  );
}
