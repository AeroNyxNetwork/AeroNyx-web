/**
 * ============================================
 * File: components/sections/PrivacyAccessSection.js
 * ============================================
 * Modification Reason: v2.3 - Privacy Network product wording.
 *   Renamed the active download section and changed the page anchor to
 *   #privacy-access. Phone mockup structure, DownloadsModal contract, and
 *   visible Privacy Network copy are preserved.
 *
 * Dependencies:
 *   - components/ui/DownloadsModal (isOpen/onClose contract preserved)
 *   - lib/i18n privacy network copy
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Keep the copy contract (PrivacyAccessVisual receives `copy`).
 *   - Brand rule: no green, no emojis. Connected = brand purple.
 *
 * Last Modified: v2.3 - Privacy Network product wording
 * ============================================
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import DownloadsModal from '../ui/DownloadsModal';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';

const PrivacyAccessSection = () => {
  const [showDownloads, setShowDownloads] = useState(false);
  const { locale } = useRouter();
  const copy = getMessages(locale || DEFAULT_LOCALE).vpn;
  const features = copy.features;

  return (
    <section id="privacy-access" className="py-12 md:py-24" style={{ background: 'var(--surface-1, #0C0C13)' }}>
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-display-md font-light mb-4 md:mb-6">
                {copy.title}
                <span className="block text-lg md:text-xl text-white/40 mt-2">
                  {copy.subtitle}
                </span>
              </h2>

              <p className="text-sm md:text-lg text-white/60 mb-6 md:mb-8 leading-relaxed">
                {copy.description}
              </p>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1 h-1 rounded-pill bg-brand-light/60 mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-white/80 text-sm md:text-base">{feature.title}</div>
                      <div className="text-xs md:text-sm text-white/60">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowDownloads(true)}
                className="px-6 md:px-8 py-3 md:py-4 rounded bg-white text-black hover:bg-white/90 transition-colors duration-fast text-sm md:text-base font-medium w-full sm:w-auto"
              >
                {copy.download}
              </button>
            </div>

            {/* Visual */}
            <div className="order-1 lg:order-2">
              <PrivacyAccessVisual copy={copy} />
            </div>
          </div>
        </div>
      </Container>

      <DownloadsModal
        isOpen={showDownloads}
        onClose={() => setShowDownloads(false)}
      />
    </section>
  );
};

/* Minimal icons — replace 🛡️/⚡ (v2.0) */
const ShieldIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-light mx-auto">
    <path d="M12 2L4 6v6c0 4.4 3.1 8.5 8 10 4.9-1.5 8-5.6 8-10V6l-8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const PowerIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60 mx-auto">
    <path d="M12 2v10" />
    <path d="M18.4 6.6a9 9 0 11-12.8 0" />
  </svg>
);

// Privacy Network app visual — copy contract preserved from v1.
const PrivacyAccessVisual = ({ copy }) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="relative flex justify-center items-center">
      {/* Phone mockup */}
      <div className="w-60 md:w-72 h-[500px] md:h-[600px] rounded-[2.5rem] md:rounded-[3rem] border-2 border-white/10 p-3 md:p-4" style={{ background: 'var(--surface-0, #08080D)' }}>
        <div className="w-full h-full rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-6 flex flex-col" style={{ background: 'var(--surface-2, #111118)' }}>
          {/* Status bar */}
          <div className="flex justify-between items-center mb-6 md:mb-8 text-xs text-white/40">
            <span>9:41 AM</span>
            <div className="flex gap-1">
              <div className="w-4 h-3 border border-white/40 rounded-sm" />
              <div className="w-1 h-3 bg-white/40 rounded-sm" />
            </div>
          </div>

          {/* App content */}
          <div className="flex-1 flex flex-col">
            <div className="text-center mb-6 md:mb-8">
              <div className="text-xl md:text-2xl font-light mb-1 md:mb-2">AeroNyx Privacy Network</div>
              <div className="text-xs md:text-sm text-white/40">{copy.privacyNetwork}</div>
            </div>

            {/* Connection button — connected = brand purple (v2.0) */}
            <div className="flex-1 flex items-center justify-center">
              <button
                onClick={() => setIsConnected(!isConnected)}
                aria-pressed={isConnected}
                className={`w-28 h-28 md:w-32 md:h-32 rounded-pill border-2 transition-all duration-slow ease-out-brand ${
                  isConnected
                    ? 'border-brand-light bg-brand-faint'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="text-center">
                  <div className="mb-1 md:mb-2">
                    {isConnected ? <ShieldIcon /> : <PowerIcon />}
                  </div>
                  <div className="text-xs md:text-sm">
                    {isConnected ? copy.connected : copy.connect}
                  </div>
                </div>
              </button>
            </div>

            {/* Status */}
            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-white/40">{copy.status}</span>
                <span className={isConnected ? 'text-brand-light' : 'text-white/60'}>
                  {isConnected ? copy.protected : copy.unprotected}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-white/40">{copy.location}</span>
                <span className="text-white/60">
                  {isConnected ? 'Singapore' : '—'}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-white/40">{copy.ipAddress}</span>
                <span className="text-white/60 font-mono">
                  {isConnected ? '***.***.***' : '192.168.1.1'}
                </span>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex justify-around pt-3 md:pt-4 border-t border-white/10">
              {[copy.home, copy.nodes, copy.settings].map((label) => (
                <div key={label} className="text-center">
                  <div className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 border border-white/20 rounded-sm" />
                  <div className="text-xs text-white/40">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connection ripples — brand purple (v2.0) */}
      {isConnected && (
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-48 md:w-64 h-48 md:h-64 border border-brand/20 rounded-pill"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 2, opacity: [0, 0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PrivacyAccessSection;
