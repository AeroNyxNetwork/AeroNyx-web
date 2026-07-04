/**
 * ============================================
 * File: components/sections/PrivacyAccessSection.js
 * ============================================
 * Modification Reason: v2.6 - Localized phone mock title.
 *   The in-phone product title now reads from the existing Privacy Network
 *   copy contract so localized pages do not show an English-only app mockup.
 *
 * Modification Reason: v2.5 - Mobile conversion polish.
 *   Reordered the mobile section so the product promise and download action
 *   appear before the device mockup and before secondary feature cards,
 *   converted feature bullets into compact assurance cards, and reduced the
 *   phone frame height on small screens so the access section feels like a
 *   polished product CTA instead of a heavy engineering demo. Existing modal
 *   and localization contracts are preserved.
 *
 * Historical Notes:
 * v2.4 - Product-grade protection mockup.
 *   Replaced the generic tab-bar phone mockup with a daily protection view:
 *   encrypted traffic, encrypted packets, protocol health, hidden IP, and
 *   regional route status. This aligns the app preview with the public
 *   Privacy Network page and avoids presenting the product as a simple switch.
 *   The phone shell now owns overflow and condenses route/IP assurance into
 *   the header area so no hidden status rows are clipped below the frame.
 *   The outer visual clips connection ripples so the connected state cannot
 *   create horizontal page scroll on mobile.
 *   The primary connection control uses localized accessible text so the mock
 *   remains testable and usable with assistive technologies.
 *   Protection microcopy is read from the existing i18n contract with fallbacks
 *   so language pages do not ship an English-only phone preview.
 *
 * Historical Notes:
 * v2.3 - Privacy Network product wording.
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
 * Last Modified: v2.4 - Product-grade protection mockup
 * Last Modified: v2.5 - Mobile conversion polish
 * Last Modified: v2.6 - Localized phone mock title
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
          <div className="grid gap-8 md:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            {/* Content */}
            <div className="order-1">
              <div className="mb-4 inline-flex border border-brand-line bg-brand-faint px-3 py-1.5 text-[10px] uppercase tracking-eyebrow text-brand-light">
                {copy.privacyNetwork}
              </div>
              <h2 className="text-display-md font-light mb-4 md:mb-6">
                {copy.title}
                <span className="block text-lg md:text-xl text-white/40 mt-2">
                  {copy.subtitle}
                </span>
              </h2>

              <p className="text-sm md:text-lg text-white/60 mb-6 md:mb-8 leading-relaxed">
                {copy.description}
              </p>

              <button
                onClick={() => setShowDownloads(true)}
                className="mb-6 inline-flex min-h-[48px] w-full items-center justify-center rounded bg-white px-6 py-3 text-center text-sm font-medium text-black transition-colors duration-fast hover:bg-white/90 sm:w-auto md:mb-8 md:px-8 md:py-4 md:text-base"
              >
                {copy.download}
              </button>

              <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
                {features.map((feature, i) => (
                  <div key={i} className="border border-white/10 bg-white/[0.025] p-3 md:p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 shrink-0 rounded-pill bg-brand-light/70" />
                      <div className="text-[10px] uppercase tracking-eyebrow text-white/34">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="font-medium text-white/80 text-sm md:text-base">{feature.title}</div>
                    <div className="mt-2 text-xs leading-relaxed text-white/56 md:text-sm">{feature.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="order-2">
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
  const protectionMetrics = [
    { label: copy.encryptedTraffic || 'Encrypted traffic', value: isConnected ? '29.4 GB' : '0 B' },
    { label: copy.encryptedPackets || 'Encrypted packets', value: isConnected ? '1.8M' : '0' },
    { label: copy.protocolHealth || 'Protocol health', value: isConnected ? (copy.ready || 'Ready') : (copy.standby || 'Standby') },
  ];

  return (
    <div className="relative flex items-center justify-center overflow-hidden py-1 md:py-2">
      {/* Phone mockup */}
      <div className="h-[520px] w-64 max-w-full overflow-hidden rounded-[2rem] border-2 border-white/10 p-3 md:h-[600px] md:w-72 md:rounded-[3rem] md:p-4" style={{ background: 'var(--surface-0, #08080D)' }}>
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.55rem] p-4 md:rounded-[2.5rem] md:p-6" style={{ background: 'var(--surface-2, #111118)' }}>
          {/* Status bar */}
          <div className="flex justify-between items-center mb-5 md:mb-8 text-xs text-white/40">
            <span>9:41 AM</span>
            <div className="flex gap-1">
              <div className="w-4 h-3 border border-white/40 rounded-sm" />
              <div className="w-1 h-3 bg-white/40 rounded-sm" />
            </div>
          </div>

          {/* App content */}
          <div className="flex-1 flex flex-col">
            <div className="mb-4 md:mb-6">
              <div className="break-words text-xl font-light leading-tight md:text-2xl">{copy.title}</div>
              <div className="mt-2 inline-flex border border-brand-line bg-brand-faint px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-brand-light">
                {isConnected ? copy.protected : copy.unprotected}
              </div>
              <div className="mt-3 grid gap-1 text-xs text-white/42">
                <div className="flex justify-between gap-3">
                  <span>{copy.location}</span>
                  <span className="text-white/60">{isConnected ? (copy.activeRoute || 'Asia route') : (copy.standby || 'Standby')}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>{copy.ipAddress}</span>
                  <span className="font-mono text-white/60">{isConnected ? '***.***.***' : '192.168.1.1'}</span>
                </div>
              </div>
            </div>

            {/* Connection button — connected = brand purple (v2.0) */}
            <div className="mb-4 flex items-center justify-center md:mb-6">
              <button
                onClick={() => setIsConnected(!isConnected)}
                aria-pressed={isConnected}
                aria-label={isConnected ? copy.connected : copy.connect}
                className={`h-20 w-20 rounded-pill border-2 transition-all duration-slow ease-out-brand md:h-28 md:w-28 ${
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

            <div className="mb-3 grid gap-2 md:mb-5">
              {protectionMetrics.map((metric) => (
                <div key={metric.label} className="border border-white/10 bg-white/[0.025] p-3">
                  <div className="text-[10px] uppercase tracking-eyebrow text-white/34">{metric.label}</div>
                  <div className="mt-1 font-mono text-lg text-white">{metric.value}</div>
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
