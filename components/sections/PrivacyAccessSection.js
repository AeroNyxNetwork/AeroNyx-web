/**
 * ============================================================================
 * File: components/sections/PrivacyAccessSection.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] The closing section of
 * /privacy-network: what the Privacy Network does, said plainly, next to a
 * phone you can actually operate. Keeps the `#privacy-access` anchor the
 * page hero's primary CTA points at, and the DownloadsModal contract.
 *
 * Rebuilt because the previous version failed in four ways that all showed
 * up in one screenshot:
 *
 *   1. CLIPPED. The chassis was a fixed `h-[600px]` with `overflow-hidden`
 *      and the content inside was taller than that, so the last metric card
 *      was sliced through the middle of its own label. The chassis now takes
 *      its height from .ng-phone's 9:19 padding box and the content is an
 *      absolutely positioned column with the metrics pinned to the bottom,
 *      so there is nothing to overflow.
 *   2. DEAD ON ARRIVAL. It defaulted to disconnected: the first thing a
 *      visitor saw was UNPROTECTED, Standby, 0 B, 0 — a product that looks
 *      broken. It now starts connected, and the switch is there to show what
 *      turning it off costs you.
 *   3. AN INVISIBLE CONTROL. The circle was a real <button> that toggled
 *      state, but nothing said so — buttons get no pointer cursor by
 *      default, and there was no hint, no hover, no focus treatment. It is
 *      now unmistakably a control, and the section says "try the switch".
 *   4. FICTION PRESENTED AS FACT. It showed `192.168.1.1` as "your IP" (a
 *      LAN address — nonsense as a public address) and flipped to an
 *      invented "29.4 GB" when connected. The IP row now answers the
 *      question the product actually answers — visible to every site, or
 *      hidden — and the off state shows em-dashes rather than zeros,
 *      because nothing is being measured then.
 *
 * Copy moved from lib/i18n `vpn` (which read "auditable decentralized node
 * boundary", "user-level telemetry") to lib/i18n-nightglass
 * `privacyNetwork`, so this page speaks the same plain register as the
 * homepage. lib/i18n's `vpn` block is untouched — DownloadsModal and other
 * surfaces still read it.
 * ============================================================================
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import Container from '../ui/Container';
import DownloadsModal from '../ui/DownloadsModal';
import { DEFAULT_LOCALE } from '../../lib/i18n';
import { getNightglassCopy } from '../../lib/i18n-nightglass';
import useReducedMotion from '../../lib/hooks/useReducedMotion';

const NYX_LT = '#A594FF';
const MONO = { fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace' };
const OFF = '—';

function PowerGlyph({ on }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M12 3v9" />
      <path d="M18.4 6.6a9 9 0 1 1-12.8 0" />
      {on && <circle cx="12" cy="12" r="10.5" stroke="none" fill="none" />}
    </svg>
  );
}

/** The phone. `on` is owned by the section so the caption can follow it. */
function PrivacyPhone({ copy, on, onToggle, reduced }) {
  const p = copy.phone;
  const rows = [
    { label: p.routeLabel, value: on ? p.routeOn : p.routeOff },
    { label: p.ipLabel, value: on ? p.ipOn : p.ipOff, accent: on },
  ];
  const metrics = [
    { label: p.carriedLabel, value: on ? p.carriedValue : OFF },
    { label: p.readableLabel, value: on ? p.readableValue : OFF, accent: on },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      {/* Soft field behind the phone — the only thing that moves when the
          switch flips, and it stays still under prefers-reduced-motion. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-[999px]"
        style={{
          background: 'radial-gradient(50% 42% at 50% 45%, rgba(116,98,247,0.28), transparent 70%)',
          opacity: on ? 1 : 0,
          transition: reduced ? 'none' : 'opacity 600ms cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      <div className="ng-phone relative select-none overflow-hidden">
        <div className="absolute inset-0 flex flex-col px-5 pb-5" style={{ paddingTop: 44 }}>
          {/* Status bar */}
          <div className="flex items-center justify-between text-[10px] text-white/40" style={MONO}>
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-[10px] w-[18px] rounded-[3px] border border-white/35" />
              <span className="inline-block h-[10px] w-[3px] rounded-[1px] bg-white/35" />
            </span>
          </div>

          <div className="mt-5">
            <div className="text-[17px] font-semibold leading-tight text-white">{p.appName}</div>
            <div
              className="mt-2 inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[10px] font-semibold uppercase tracking-eyebrow"
              style={on
                ? { background: 'rgba(116,98,247,0.18)', border: '1px solid rgba(165,148,255,0.45)', color: NYX_LT }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
            >
              {on ? p.on : p.off}
            </div>

            <dl className="mt-4 grid gap-1.5 text-[11px]">
              {rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-3">
                  <dt className="shrink-0 text-white/40">{row.label}</dt>
                  <dd
                    className="min-w-0 truncate text-right"
                    style={{ color: row.accent ? NYX_LT : 'rgba(255,255,255,0.68)' }}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The switch. An actual control, and it looks like one. */}
          <div className="mt-6 flex flex-col items-center">
            <button
              type="button"
              onClick={onToggle}
              aria-pressed={on}
              aria-label={on ? p.disconnect : p.connect}
              className="ng-power flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-pill"
              data-on={on ? 'true' : 'false'}
            >
              <PowerGlyph on={on} />
              <span className="text-[11px] font-semibold">{on ? p.disconnect : p.connect}</span>
            </button>
            <span className="mt-2.5 text-[10px] text-white/35">{on ? p.hintOn : p.hintOff}</span>
          </div>

          {/* Pinned to the bottom, so the column absorbs any slack instead of
              pushing content past the chassis. */}
          <dl className="mt-auto grid gap-2">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[12px] px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <dt className="text-[9px] uppercase tracking-eyebrow text-white/38">{metric.label}</dt>
                <dd
                  className="ng-display mt-1 text-[17px] leading-none"
                  style={{ color: metric.accent ? NYX_LT : '#fff' }}
                >
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] text-white/35">{p.note}</p>
    </div>
  );
}

export default function PrivacyAccessSection() {
  const { locale } = useRouter();
  const copy = getNightglassCopy(locale || DEFAULT_LOCALE).privacyNetwork;
  const reduced = useReducedMotion();
  const [showDownloads, setShowDownloads] = useState(false);
  // Starts protected: the product should be doing its job when you arrive.
  const [on, setOn] = useState(true);

  return (
    <section id="privacy-access" className="ng-section scroll-mt-20 md:scroll-mt-24" style={{ background: 'var(--surface-1)' }}>
      <Container>
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="ng-section-head">
            <p className="ng-eyebrow">{copy.eyebrow}</p>
            <h2 className="mt-5 text-white">{copy.title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/58">{copy.description}</p>

            <div className="mt-8">
              <button type="button" onClick={() => setShowDownloads(true)} className="ng-btn ng-btn-primary w-full sm:w-auto">
                {copy.cta}
              </button>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {copy.points.map((point) => (
                <li key={point.title} className="rounded-[14px] border border-white/[0.08] p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-sm font-semibold text-white">{point.title}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/55">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <PrivacyPhone copy={copy} on={on} onToggle={() => setOn((v) => !v)} reduced={reduced} />
        </div>
      </Container>

      <DownloadsModal isOpen={showDownloads} onClose={() => setShowDownloads(false)} />
    </section>
  );
}
