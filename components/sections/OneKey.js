/**
 * ============================================================================
 * File: components/sections/OneKey.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] The product, in three panels:
 * encrypted messaging, Nyx confidential AI (with MemChain memory), and the
 * multi-chain wallet whose keys live in a Rust keystore on the device. One
 * identity signs a message, asks the model and moves money; the network
 * carries all three and reads none.
 *
 * Each panel opens with a small CSS-built fragment of the real UI (bubbles,
 * the three AI modes, a wallet balance with the chain row) instead of an
 * icon: the site shows the product, it does not describe it. Panels link to
 * the deep-dive pages (/privacy-network, /memchain) or open the downloads
 * modal (wallet → the app).
 *
 * Replaces CorePrimitives + ProductsEcosystem on the homepage; both pages
 * they pointed at remain.
 * ============================================================================
 */

import { useState } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import DownloadsModal from '../ui/DownloadsModal';

const NYX = '#7462F7';
const NYX_LT = '#A594FF';
const SIGNAL = '#14F195';
const MONO = { fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace' };

function ChatFragment({ phone }) {
  return (
    <div className="flex h-full flex-col justify-end gap-2 p-5">
      <div className="max-w-[82%] self-end rounded-[14px] px-3.5 py-2 text-[12px] leading-snug text-white" style={{ background: NYX }}>
        {phone.m1}
      </div>
      <div className="max-w-[86%] self-start rounded-[14px] px-3.5 py-2 text-[12px] leading-snug text-white/88" style={{ background: 'var(--ng-slate2)' }}>
        {phone.m2}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/45">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        {phone.status}
      </div>
    </div>
  );
}

function NyxFragment({ chips }) {
  const modes = ['Fast', 'Deep', 'Confidential'];
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-[10px]" style={{ background: 'rgba(116,98,247,0.18)' }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={NYX_LT} strokeWidth="1.75" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
          </svg>
        </span>
        <span className="text-[13px] font-semibold text-white">Nyx</span>
      </div>
      <div className="flex gap-1.5">
        {modes.map((mode, i) => (
          <span
            key={mode}
            className="rounded-pill px-2.5 py-1 text-[10px] font-medium"
            style={i === 2
              ? { background: 'rgba(116,98,247,0.22)', color: '#fff', border: '1px solid rgba(165,148,255,0.4)' }
              : { color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {mode}
          </span>
        ))}
      </div>
      <div className="rounded-[12px] px-3 py-2 text-[10px]" style={{ ...MONO, background: 'var(--ng-slate2)', color: 'rgba(255,255,255,0.55)' }}>
        <span style={{ color: SIGNAL }}>●</span> {chips[1]} · {chips[2]}
      </div>
    </div>
  );
}

function WalletFragment({ chips }) {
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="text-[10px] font-medium uppercase tracking-eyebrow text-white/45">Total</div>
      <div className="ng-display text-[28px] leading-none text-white">12.48 SOL</div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((chain) => (
          <span key={chain} className="rounded-pill px-2 py-0.5 text-[10px] font-semibold" style={{ ...MONO, background: 'var(--ng-slate2)', color: 'rgba(255,255,255,0.72)' }}>
            {chain}
          </span>
        ))}
      </div>
      <div className="truncate text-[10px]" style={{ ...MONO, color: 'rgba(255,255,255,0.35)' }}>
        rust keystore · 7xKX…AsU · sign only what you read
      </div>
    </div>
  );
}

export default function OneKey({ copy, locale }) {
  const k = copy.oneKey;
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const fragments = [
    <ChatFragment key="chat" phone={copy.phone} />,
    <NyxFragment key="nyx" chips={k.panels[1].chips} />,
    <WalletFragment key="wallet" chips={k.panels[2].chips} />,
  ];

  return (
    <section id="products" className="ng-section scroll-mt-20 md:scroll-mt-24" style={{ background: 'var(--surface-1)' }}>
      <Container>
        <div className="ng-section-head mx-auto max-w-2xl text-center">
          <p className="ng-eyebrow">{k.eyebrow}</p>
          <h2 className="mt-5 text-white">{k.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/58">{k.description}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3">
          {k.panels.map((panel, i) => (
            <article key={panel.name} className="ng-card flex flex-col overflow-hidden">
              <div className="h-44 border-b border-white/[0.06]" style={{ background: 'var(--ng-ink)' }}>
                {fragments[i]}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="text-[11px] font-medium uppercase tracking-eyebrow text-[#A594FF]">{panel.name}</div>
                <h3 className="mt-2 text-[1.2rem] font-semibold leading-snug text-white" style={{ letterSpacing: '-0.01em' }}>{panel.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/58">{panel.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {panel.chips.map((chip) => <span key={chip} className="ng-chip">{chip}</span>)}
                </div>
                <div className="mt-auto pt-6">
                  {panel.href === 'download' ? (
                    <button type="button" onClick={() => setDownloadsOpen(true)} className="ng-link">
                      {panel.cta} →
                    </button>
                  ) : (
                    <Link href={panel.href} locale={locale} className="ng-link">
                      {panel.cta} →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
      <DownloadsModal isOpen={downloadsOpen} onClose={() => setDownloadsOpen(false)} />
    </section>
  );
}
