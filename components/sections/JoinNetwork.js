/**
 * ============================================
 * File: components/sections/JoinNetwork.jsx
 * ============================================
 * Modification Reason: v2.9 - Localized protocol visual microcopy.
 *   The AI coordination and Nodeboard proof mock visuals now read from
 *   `join.visualCopy` so non-English pages do not expose English-only
 *   protocol dashboard captions inside the operator journey.
 *
 * Modification Reason: v2.8 - Public node summary wording.
 *   Public protocol-health copy now says node summary instead of exposing
 *   implementation-language reporting details in the user-facing stat source.
 *
 * Historical Notes:
 * v2.7 - Developer CTA route alignment.
 *   Updated the final build step to the canonical developer documentation
 *   path so the operator journey resolves into the maintained docs surface.
 *
 * Historical Notes:
 * v2.6 - Mobile operator journey density polish.
 *   Operator stats now use calmer loading typography and tighter mobile card
 *   spacing so the node journey keeps product-grade rhythm without turning
 *   into a tall engineering dashboard on iPhone-class screens.
 *
 * Historical Notes:
 * v2.1 — SSR fix + protocol-node credibility pass.
 *   1. FIX (hydration): NetworkBackground generated line coordinates
 *      with Math.random() during render — server and client produced
 *      different values (React hydration mismatch + first-paint flicker).
 *      Lines are now generated once on mount.
 *   2. Credibility: old resource-reward demo visuals were replaced with
 *      protocol-node states: peer store, blind relay, restart recovery,
 *      Memory Chain, and aggregate relay evidence.
 *   3. Brand: old green status text / green pulse → brand tokens; step
 *      content transition → 8px rise + fade; radii → 2/4/6px; external
 *      CTAs get target=_blank rel=noopener.
 *
 * Main Functionality:
 *   - Four-step node operator journey with live aggregate stats strip,
 *     progress indicator, per-step visual, and prev/next navigation.
 *
 * Dependencies:
 *   - useNetworkStats (public aggregate endpoint — see inline note),
 *     AnimatedMessageCounter v2.0, lib/i18n, Container
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Live counters source ONLY privacy-safe aggregates. Never surface
 *     node IDs/endpoints here.
 *   - Visuals must describe protocol-node capabilities, never speculative
 *     reward or performance claims.
 *   - Brand rule: no green, no emojis.
 *
 * Last Modified: v2.3 — Apple-grade operator journey control polish
 * Last Modified: v2.4 - iPhone-safe journey order and control sizing
 * Last Modified: v2.6 - Mobile operator journey density polish
 * Last Modified: v2.7 - Developer CTA route alignment
 * Last Modified: v2.8 - Public node summary wording
 * Last Modified: v2.9 - Localized protocol visual microcopy
 * ============================================
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import AnimatedMessageCounter from '../ui/AnimatedMessageCounter';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';
import useNetworkStats from '../../lib/hooks/useNetworkStats';

const EASE = [0.16, 1, 0.3, 1];

const humanizeStatus = (value) => (
  String(value || 'syncing')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
);

const formatTemplate = (template, values) => (
  String(template || '').replace(/\{(\w+)\}/g, (match, key) => (
    values[key] ?? match
  ))
);

const JoinNetwork = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { locale } = useRouter();
  const messages = getMessages(locale || DEFAULT_LOCALE);
  const copy = messages.join;
  const visualCopy = copy.visualCopy || {};
  const protocolCopy = messages.homeStats?.protocol || {};
  const { stats, isLoading } = useNetworkStats({
    period: '30d',
    autoRefresh: true,
    refreshInterval: 30000,
  });

  const protocolHealthStatus = stats.protocolFoundationStatus || stats.protocolStatus || 'syncing';
  const protocolHealthStage = stats.protocolFoundationStage || 'bootstrap';
  const protocolHealthValue = (
    protocolCopy.foundationStatusLabels?.[protocolHealthStatus]
    || protocolCopy.statusLabels?.[protocolHealthStatus]
    || humanizeStatus(protocolHealthStatus)
  );
  const protocolHealthStageLabel = (
    protocolCopy.foundationStageLabels?.[protocolHealthStage]
    || humanizeStatus(protocolHealthStage)
  );
  const protocolHealthEvidence = formatTemplate(
    copy.stats.protocolHealthEvidence || '{ready}/{reported} proof nodes · {percent}% accepted',
    {
      ready: stats.protocolFoundationTwoHopProofReadyNodes || 0,
      reported: stats.protocolFoundationTwoHopProofReportedNodes || 0,
      percent: stats.protocolFoundationTwoHopProofSuccessPercent || 0,
    }
  );
  const protocolHealthSource = formatTemplate(
    copy.stats.protocolHealthSource || 'Node summary {summary} · {stage}',
    {
      summary: stats.protocolDiscoverySummaryReportedNodes || 0,
      stage: protocolHealthStageLabel,
    }
  );
  const syncingLabel = messages.homeStats?.syncing || 'Syncing';

  // Live counters source: GET /api/privacy_network/vpn/public/network-stats/
  // Backend: /root/aeronyx/privacy_network/api/vpn_observability.py
  // Rust:    /root/open/AeroNyx/crates/aeronyx-server/src/api/vpn_health.rs
  //          /root/open/AeroNyx/crates/aeronyx-server/src/handlers/packet.rs

  const steps = [
    {
      number: '01',
      title: copy.steps[0].title,
      subtitle: copy.steps[0].subtitle,
      description: copy.steps[0].description,
      features: copy.steps[0].features,
      cta: { text: copy.steps[0].cta, link: 'https://docs.aeronyx.network/node-operators/rust-node-operations-and-health-checks' },
      visual: <NodeVisual />,
    },
    {
      number: '02',
      title: copy.steps[1].title,
      subtitle: copy.steps[1].subtitle,
      description: copy.steps[1].description,
      features: copy.steps[1].features,
      cta: { text: copy.steps[1].cta, link: 'https://docs.aeronyx.network/' },
      visual: <AIVisual copy={visualCopy.ai} />,
    },
    {
      number: '03',
      title: copy.steps[2].title,
      subtitle: copy.steps[2].subtitle,
      description: copy.steps[2].description,
      features: copy.steps[2].features,
      cta: { text: copy.steps[2].cta, link: 'https://app.aeronyx.network' },
      visual: <ResourceVisual copy={visualCopy.resource} />,
    },
    {
      number: '04',
      title: copy.steps[3].title,
      subtitle: copy.steps[3].subtitle,
      description: copy.steps[3].description,
      features: copy.steps[3].features,
      cta: { text: copy.steps[3].cta, link: 'https://docs.aeronyx.network/developer-documentation/overview' },
      visual: <BuildVisual liveLabel={copy.live} activeNodesLabel={copy.activeNodesWorldwide} />,
    },
  ];

  return (
    <section id="join-network" className="relative scroll-mt-20 overflow-hidden py-12 md:scroll-mt-24 md:py-20" style={{ background: 'var(--surface-0, #08080D)' }}>
      <div className="absolute inset-0 opacity-20">
        <NetworkBackground />
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            className="mb-10 text-center md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className="text-display-lg font-light mb-4 md:mb-6">
              {copy.title}
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-copy mx-auto">
              {copy.description}
            </p>
          </motion.div>

          {/* Live stats strip */}
          <motion.div
            className="mb-9 grid grid-cols-1 gap-3 md:mb-12 md:grid-cols-3 md:gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {[
              {
                label: copy.stats.encryptedTraffic,
                description: copy.stats.encryptedTrafficDescription,
                value: stats.encryptedTraffic,
                liveValue: stats.encryptedTrafficBytes,
                isLiveCounter: true,
                suffix: copy.stats.bytesUnit,
                defaultStep: 1024,
              },
              {
                label: copy.stats.encryptedMessages,
                description: copy.stats.encryptedMessagesDescription,
                value: stats.encryptedMessages,
                liveValue: stats.encryptedMessagesRaw,
                isLiveCounter: true,
                suffix: copy.stats.packetsUnit,
                defaultStep: 1,
              },
              {
                label: copy.stats.protocolHealth || 'Protocol Health',
                description: copy.stats.protocolHealthDescription || 'Two-hop path proof readiness across live AeroNyx Privacy Protocol nodes.',
                value: protocolHealthValue,
                detail: protocolHealthEvidence,
                source: protocolHealthSource,
                isLiveCounter: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="page-card min-w-0 rounded border p-3.5 backdrop-blur-sm md:min-h-[12rem] md:p-5"
              >
                <div className="min-h-[2.35rem] min-w-0 font-light leading-none text-white md:min-h-[2.65rem]">
                  {isLoading ? (
                    <span className="inline-flex min-h-[2.1rem] items-end text-[clamp(1.55rem,8vw,2.35rem)] tracking-normal text-white/55">
                      {syncingLabel}
                    </span>
                  ) : item.isLiveCounter ? (
                    <AnimatedMessageCounter
                      value={item.liveValue}
                      fallback={item.value}
                      suffix={item.suffix}
                      pulseLabel={copy.live}
                      defaultStep={item.defaultStep}
                    />
                  ) : (
                    <span className="block truncate text-[clamp(2rem,6vw,3.6rem)] tracking-normal">
                      {item.value}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[10px] md:text-xs uppercase tracking-eyebrow text-white/40">
                  {item.label}
                </div>
                <p className="mt-1.5 max-w-[34rem] text-xs leading-relaxed text-white/45 md:mt-2">
                  {item.description}
                </p>
                {item.detail && (
                  <p className="mt-2 text-[11px] uppercase tracking-eyebrow text-brand-light/70">
                    {item.detail}
                  </p>
                )}
                {item.source && (
                  <p className="mt-1 text-[11px] uppercase tracking-eyebrow text-white/35">
                    {item.source}
                  </p>
                )}
              </div>
            ))}
          </motion.div>

          {/* Progress indicator */}
          <div className="mb-8 flex items-center justify-center md:mb-12">
            <div className="flex max-w-full items-center overflow-x-auto px-1 scrollbar-hide md:space-x-4">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <button
                    onClick={() => setActiveStep(index)}
                    aria-label={`Step ${index + 1}: ${step.title}`}
                    className={`flex min-h-[44px] min-w-[44px] flex-shrink-0 items-center justify-center rounded-sm transition-all duration-base ease-out-brand ${
                      index === activeStep
                        ? 'scale-110'
                        : index < activeStep
                          ? 'opacity-60'
                          : 'opacity-30'
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded border font-mono md:h-12 md:w-12 ${
                      index === activeStep
                        ? 'border-brand-light bg-brand-faint text-brand-light'
                        : index < activeStep
                          ? 'border-white/40 bg-white/10'
                          : 'border-white/20'
                    }`}>
                      <span className="text-xs md:text-sm">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`mx-1 h-px w-8 flex-shrink-0 transition-all duration-base sm:mx-2 sm:w-10 md:mx-0 md:w-24 ${
                      index < activeStep ? 'bg-brand-light/50' : 'bg-white/15'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step content — rise + fade (v2.0) */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
          >
            <div className="order-1">
              <div className="mb-6">
                <div className="text-5xl md:text-6xl font-extralight text-white/15 mb-2 font-mono">
                  {steps[activeStep].number}
                </div>
                <h3 className="text-2xl md:text-3xl font-light mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-base text-white/60 md:text-lg">
                  {steps[activeStep].subtitle}
                </p>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-white/78 md:text-base">
                {steps[activeStep].description}
              </p>

              <div className="space-y-2 mb-8">
                {steps[activeStep].features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1 h-1 rounded-pill bg-brand-light/60 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm leading-relaxed text-white/60 md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {steps[activeStep].cta && (
                <a
                  href={steps[activeStep].cta.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded border border-white/20 px-6 py-3 text-center transition-colors duration-fast hover:border-brand-line hover:bg-brand-faint sm:w-auto"
                >
                  <span className="text-sm uppercase tracking-eyebrow">
                    {steps[activeStep].cta.text}
                  </span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-fast"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>

            <div className="order-2">
              <div className="page-card aspect-[4/3] rounded border p-5 backdrop-blur-sm sm:aspect-square md:p-8">
                {steps[activeStep].visual}
              </div>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between md:mt-12">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              className={`min-h-[44px] rounded px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-fast ${
                activeStep === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              disabled={activeStep === 0}
            >
              ← {copy.previous}
            </button>

            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              className={`min-h-[44px] rounded px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-fast ${
                activeStep === steps.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              disabled={activeStep === steps.length - 1}
            >
              {copy.next} →
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ---- Step visuals ---- */

const NodeVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      className="relative"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-pill border border-brand-line bg-brand-faint flex items-center justify-center">
        <div className="text-brand-light">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
          </svg>
        </div>
      </div>

      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 bg-white/40 rounded-pill"
          style={{ top: '50%', left: '50%' }}
          animate={{
            x: [0, Math.cos((i * Math.PI) / 2) * 80, 0],
            y: [0, Math.sin((i * Math.PI) / 2) * 80, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: 'linear' }}
        />
      ))}
    </motion.div>
  </div>
);

const AIVisual = ({ copy = {} }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="w-full max-w-sm">
      <div className="flex justify-end mb-3">
        <span className="text-[9px] uppercase tracking-eyebrow text-white/30 border border-white/10 rounded-sm px-2 py-0.5">
          {copy.badge || 'Protocol view'}
        </span>
      </div>
      <div className="space-y-4">
        <motion.div
          className="bg-white/5 rounded p-3 text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: EASE }}
        >
          <div className="text-brand-light mb-1">{copy.appLabel || 'App:'}</div>
          <div className="text-white/80">{copy.appMessage || 'Route this agent request through a blind relay path.'}</div>
        </motion.div>

        <motion.div
          className="bg-brand-faint rounded p-3 text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, ease: EASE }}
        >
          <div className="text-brand-light mb-1">{copy.aeronyxLabel || 'AeroNyx:'}</div>
          <div className="text-white/80">{copy.aeronyxMessage || 'Peer view verified. Relay candidate selected. Payload remains ciphertext.'}</div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 text-white/40 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-2 h-2 bg-brand-light rounded-pill animate-pulse" />
          {copy.readyLabel || 'blind coordination path ready'}
        </motion.div>
      </div>
    </div>
  </div>
);

const ResourceVisual = ({ copy = {} }) => {
  const resources = copy.resources || [
    { name: 'Peer Store', usage: 82, state: 'synced' },
    { name: 'Blind Relay', usage: 64, state: 'ready' },
    { name: 'Restart Recovery', usage: 76, state: 'proved' },
    { name: 'Memory Chain', usage: 38, state: 'local' },
  ];

  return (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="w-full">
      <div className="flex justify-end mb-3">
        <span className="text-[9px] uppercase tracking-eyebrow text-white/30 border border-white/10 rounded-sm px-2 py-0.5">
          {copy.badge || 'Nodeboard'}
        </span>
      </div>
      <div className="space-y-4">
        {resources.map((resource, i) => (
          <motion.div
            key={resource.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, ease: EASE }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-white/60">{resource.name}</span>
              <span className="text-xs text-brand-light font-mono">{resource.state}</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-pill overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand to-cipher"
                initial={{ width: 0 }}
                animate={{ width: `${resource.usage}%` }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: EASE }}
              />
            </div>
          </motion.div>
        ))}

        <motion.div
          className="pt-4 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-xs text-white/40">{copy.evidenceLabel || 'Protocol evidence'}</div>
          <div className="text-2xl font-light text-brand-light font-mono">{copy.evidenceValue || 'observed'}</div>
        </motion.div>
      </div>
    </div>
  </div>
  );
};

const BuildVisual = ({ liveLabel = 'Live', activeNodesLabel = 'Active Nodes Worldwide' }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="text-center">
      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 border border-white/20 rounded-pill" />

        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 50 + Math.cos(angle) * 35;
          const y = 50 + Math.sin(angle) * 35;

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-light rounded-pill"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
            />
          );
        })}
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-3xl font-light text-white/80">{liveLabel}</div>
        <div className="text-sm text-white/40">{activeNodesLabel}</div>
      </motion.div>
    </div>
  </div>
);

/** Background grid + lines — generated on mount (v2.0 hydration fix). */
const NetworkBackground = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    setLines(
      Array.from({ length: 5 }, () => ({
        x1: `${Math.random() * 100}%`,
        y1: `${Math.random() * 100}%`,
        x2: `${Math.random() * 100}%`,
        y2: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  return (
    <svg className="w-full h-full">
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(119, 98, 243, 0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, repeatType: 'reverse' }}
        />
      ))}
    </svg>
  );
};

export default JoinNetwork;
