/**
 * ============================================================================
 * File: components/sections/NightglassHero.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] First viewport, product-led.
 *
 * Left: the claim ("Private by construction."), one paragraph that names the
 * three things the app holds (messages, AI, money) and the one invariant
 * (the network only sees ciphertext), two CTAs (download / how it works),
 * and a proof strip with the live number the network is carrying right now.
 * Right: the Product Lens — the real chat screen behind a lens that reveals
 * what a relay node holds.
 *
 * Replaces NarrativeHero (protocol-first headline, "watchers" eye canvas,
 * mock agent conversation). The live counter, reduced-motion handling and
 * the DownloadsModal contract are kept.
 *
 * Dependencies: ../ui/ProductLens, ../ui/AnimatedMessageCounter,
 * ../ui/DownloadsModal, ../../lib/hooks/useNetworkStats (multi-consumer
 * safe), lib/i18n-nightglass copy passed in by pages/index.js.
 * ============================================================================
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import ProductLens from '../ui/ProductLens';
import AnimatedMessageCounter from '../ui/AnimatedMessageCounter';
import DownloadsModal from '../ui/DownloadsModal';
import useNetworkStats from '../../lib/hooks/useNetworkStats';

const SPRING = { type: 'spring', stiffness: 320, damping: 30, mass: 1 };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const rise = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: SPRING } };

export default function NightglassHero({ copy, messages }) {
  const h = copy.hero;
  const syncing = messages?.homeStats?.syncing || 'Syncing';
  const [reduced, setReduced] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const { stats, isLoading } = useNetworkStats({ period: '30d', autoRefresh: true, refreshInterval: 30000 });

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

  const nodes = Number(stats.protocolReportedNodes || 0);

  return (
    <section data-hero-section className="ng-hero relative overflow-hidden">
      <div className="ng-hero-field" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="grid items-center gap-12 pb-16 pt-28 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
          <motion.div
            className="text-center lg:text-left"
            variants={stagger}
            initial={reduced ? false : 'hidden'}
            animate="show"
          >
            <motion.p variants={rise} className="ng-eyebrow">{h.eyebrow}</motion.p>
            <motion.h1 variants={rise} className="ng-title mt-6">{h.title}</motion.h1>
            <motion.p variants={rise} className="ng-lede mx-auto mt-6 lg:mx-0">{h.description}</motion.p>

            <motion.div
              variants={rise}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <button type="button" onClick={() => setDownloadsOpen(true)} className="ng-btn ng-btn-primary w-full sm:w-auto">
                {h.primaryCta}
              </button>
              <a href="#how-it-works" className="ng-btn ng-btn-ghost w-full sm:w-auto">
                {h.secondaryCta}
              </a>
            </motion.div>

            <motion.dl variants={rise} className="ng-proofstrip mt-10">
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
            </motion.dl>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.25 }}
          >
            <ProductLens copy={copy} reduced={reduced} />
            <p className="mx-auto mt-5 max-w-sm text-center text-xs leading-relaxed text-white/45">
              <span className="text-white/75">{h.lensHint}</span> — {h.lensCaption}
            </p>
          </motion.div>
        </div>
      </Container>

      <DownloadsModal isOpen={downloadsOpen} onClose={() => setDownloadsOpen(false)} />
    </section>
  );
}
