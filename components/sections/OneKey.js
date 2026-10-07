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
 *
 * [NYXI-WEB 2026-10-06 by Claude] The AI panel is Nyxi (小霓) — the official
 * character standing on the panel's floor line, saying one line, instead of
 * an abstract row of mode chips. It links to her own section (#nyxi), where
 * she moves; here she stays still so the three panels read calmly together.
 * ============================================================================
 */

import { useState } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import DownloadsModal from '../ui/DownloadsModal';
import { WEB_CHAT, NYXI_REST } from '../../lib/external-links';

const NYX = '#7462F7';
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

/*
 * Nyxi in a 176 px tile. The 512 px still is shown at 176 px (crisp on any
 * screen up to 2.9×). Geometry from the asset: feet at 441/512 → 152 px, so
 * the figure is sunk 16 px below the tile's bottom edge and she stands 8 px
 * above the panel's floor line with a contact shadow under her. She is
 * right-aligned so her line (top-left, corner pointing at her) never covers
 * her face at any panel width.
 */
function NyxiFragment({ bubble, alt }) {
  return (
    <div className="relative flex h-full items-end justify-end overflow-hidden pr-4">
      <p
        className="absolute left-4 top-4 max-w-[46%] rounded-[14px] rounded-br-[4px] px-3 py-2 text-[12px] leading-snug text-white/90"
        style={{ background: 'var(--ng-slate3)', border: '1px solid rgba(165,148,255,0.28)' }}
      >
        {bubble}
      </p>
      <div className="relative -mb-4 h-[176px] w-[176px] shrink-0">
        <span
          aria-hidden="true"
          className="absolute rounded-[50%]"
          style={{
            left: '52%',
            top: 146,
            width: 96,
            height: 12,
            transform: 'translateX(-50%)',
            background: 'radial-gradient(closest-side, rgba(0,0,0,0.6), rgba(0,0,0,0))',
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- the official
            asset must be served byte for byte; next/image would re-encode it. */}
        <img
          src={NYXI_REST}
          width={176}
          height={176}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="relative block select-none"
        />
      </div>
    </div>
  );
}

function WalletFragment({ chips, total, caption }) {
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="text-[10px] font-medium uppercase tracking-eyebrow text-white/45">{total}</div>
      <div className="ng-display text-[28px] leading-none text-white">12.48 SOL</div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((chain) => (
          <span key={chain} className="rounded-pill px-2 py-0.5 text-[10px] font-semibold" style={{ ...MONO, background: 'var(--ng-slate2)', color: 'rgba(255,255,255,0.72)' }}>
            {chain}
          </span>
        ))}
      </div>
      {/* Wraps instead of truncating: it used to be one hard-coded English line
          cut mid-word at every width (…"sign only what yo"), in every locale. */}
      <div className="text-[10px] leading-snug" style={{ ...MONO, color: 'rgba(255,255,255,0.4)' }}>
        {caption}
      </div>
    </div>
  );
}

export default function OneKey({ copy, locale }) {
  const k = copy.oneKey;
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const fragments = [
    <ChatFragment key="chat" phone={copy.phone} />,
    <NyxiFragment key="nyxi" bubble={k.panels[1].bubble} alt={copy.nyxi.alt} />,
    <WalletFragment key="wallet" chips={k.panels[2].chips} total={k.walletTotal} caption={k.walletCaption} />,
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
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
                  {panel.href === 'download' ? (
                    <button type="button" onClick={() => setDownloadsOpen(true)} className="ng-link">
                      {panel.cta} →
                    </button>
                  ) : panel.href.startsWith('#') ? (
                    // Same-page anchor (Nyxi → #nyxi): a plain link, so the
                    // locale-aware <Link> cannot rewrite it into a navigation.
                    <a href={panel.href} className="ng-link">
                      {panel.cta} →
                    </a>
                  ) : (
                    <Link href={panel.href} locale={locale} className="ng-link">
                      {panel.cta} →
                    </Link>
                  )}
                  {/* Messages panel also opens the browser chat at
                      app.aeronyx.network/chat. */}
                  {i === 0 && (
                    <a
                      href={WEB_CHAT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ng-link font-normal"
                      style={{ color: 'rgba(255,255,255,0.52)' }}
                    >
                      {copy.browser.chat} →
                    </a>
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
