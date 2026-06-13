/**
 * ============================================
 * index.js - Homepage with MemChain Integration
 * ============================================
 * 
 * Modification Reason: v4.0 - Added MemChainShowcase section between
 * ProductsEcosystem and VPNDownloadSection. Narrative flow now includes
 * the AI memory story as a killer app demonstration.
 * 
 * Section Order (v4.0):
 * 1. NarrativeHero      — "Infrastructure AI Agents Can Use"
 * 2. ProblemStatement    — AI paradox (accounts, payments, memory lock-in)
 * 3. X402Showcase        — x402 protocol solution
 * 4. HowAILWorks         — Technical deep-dive
 * 5. JoinNetwork         — Node operator CTA
 * 6. ProductsEcosystem   — 5 products (VPN, Compute, CDN, Network, MemChain)
 * 7. MemChainShowcase    — 🌟 NEW: Deep dive into AI Memory Chain
 * 8. VPNDownloadSection  — Download CTA
 * 9. FutureVision        — Roadmap
 * 10. SophisticatedCTA   — Final conversion
 * 
 * Last Modified: v4.0 - Added MemChainShowcase
 * ============================================
 */

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// Import SEO component
import SEO from '../components/ui/SEO';
import Container from '../components/ui/Container';
import AnimatedMessageCounter from '../components/ui/AnimatedMessageCounter';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';
import useNetworkStats from '../lib/hooks/useNetworkStats';

// Import custom header
import AILHeader from '../components/layout/AILHeader';

// Import the enhanced background with constellations
const MinimalAILBackground = dynamic(
  () => import('../components/ui/MinimalAILBackground'), 
  { 
    ssr: false, 
    suspense: true,
    loading: () => <div className="fixed inset-0 bg-black" />
  }
);

// Import sections
import NarrativeHero from '../components/sections/NarrativeHero';
import ProblemStatement from '../components/sections/ProblemStatement';
import X402Showcase from '../components/sections/X402Showcase';
import HowAILWorks from '../components/sections/HowAILWorks';
import JoinNetwork from '../components/sections/JoinNetwork';
import ProductsEcosystem from '../components/sections/ProductsEcosystem';
import MemChainShowcase from '../components/sections/MemChainShowcase';
import VPNDownloadSection from '../components/sections/VPNDownloadSection';
import FutureVision from '../components/sections/FutureVision';
import SophisticatedCTA from '../components/sections/SophisticatedCTA';
import Footer from '../components/layout/Footer';

export default function Home() {
  const { locale } = useRouter();
  const activeLocale = locale || DEFAULT_LOCALE;
  const copy = getMessages(activeLocale);
  const canonicalPath = activeLocale === DEFAULT_LOCALE ? '' : `/${activeLocale}`;
  const { stats, isLoading } = useNetworkStats({
    period: '30d',
    autoRefresh: true,
    refreshInterval: 30000
  });

  return (
    <>
      <SEO 
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalUrl={`https://aeronyx.network${canonicalPath}/`}
        ogImage="https://binary.aeronyx.network/aeronyx_logo.png"
        keywords={copy.seo.keywords}
      />
      
      {/* Enhanced background with constellations */}
      <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
        <MinimalAILBackground />
      </Suspense>
      
      {/* Custom header */}
      <AILHeader />
      
      {/* Main content */}
      <main className="relative z-10">
        {/* 1. Opening narrative */}
        <NarrativeHero />

        <HomeNetworkStats stats={stats} isLoading={isLoading} copy={copy} />
        
        {/* 2. Problem Statement — AI infrastructure paradox */}
        <ProblemStatement />
        
        {/* 3. X402 Showcase — the payment solution */}
        <X402Showcase />
        
        {/* 4. How it works — technical deep-dive */}
        <HowAILWorks />
        
        {/* 5. Join the network */}
        <JoinNetwork />
        
        {/* 6. Products ecosystem (now includes MemChain as 5th product) */}
        <ProductsEcosystem />
        
        {/* 7. 🌟 NEW: MemChain deep-dive — the killer app */}
        <MemChainShowcase />
        
        {/* 8. VPN download section */}
        <VPNDownloadSection />
        
        {/* 9. Vision for the future */}
        <FutureVision />
        
        {/* 10. Call to action */}
        <SophisticatedCTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

const HomeNetworkStats = ({ stats, isLoading, copy }) => {
  // Live homepage counters are sourced from:
  //   GET /api/privacy_network/vpn/public/network-stats/
  // Backend:
  //   /root/aeronyx/privacy_network/api/vpn_observability.py
  // Rust packet/traffic sources:
  //   /root/open/AeroNyx/crates/aeronyx-server/src/api/vpn_health.rs
  //   /root/open/AeroNyx/crates/aeronyx-server/src/handlers/packet.rs
  const items = [
    {
      label: copy.join.stats.encryptedTraffic,
      description: copy.join.stats.encryptedTrafficDescription,
      value: stats.encryptedTraffic,
      liveValue: stats.encryptedTrafficBytes,
      isLiveCounter: true,
      suffix: copy.join.stats.bytesUnit,
      defaultStep: 1024,
    },
    {
      label: copy.join.stats.encryptedMessages,
      description: copy.join.stats.encryptedMessagesDescription,
      value: stats.encryptedMessages,
      liveValue: stats.encryptedMessagesRaw,
      isLiveCounter: true,
      suffix: copy.join.stats.packetsUnit,
      defaultStep: 1,
    },
  ];

  return (
    <section aria-label={copy.homeStats.ariaLabel} className="relative z-20 -mt-6 md:-mt-10 pb-10 md:pb-16">
      <Container>
        <div className="mx-auto max-w-6xl border border-white/10 bg-black/70 backdrop-blur-md">
          <div className="grid gap-0 xl:grid-cols-[0.8fr_2.2fr]">
            <div className="border-b border-white/10 p-5 md:p-6 xl:border-b-0 xl:border-r">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-green-300">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_16px_rgba(74,222,128,0.75)]" />
                {copy.homeStats.eyebrow}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {copy.homeStats.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {items.map((item) => (
                <div key={item.label} className="min-w-0 border-t border-white/10 p-5 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0 md:p-6">
                  <div className="min-h-[2.65rem] min-w-0 font-light text-white">
                    {isLoading ? (
                      <span className="block h-8 w-28 animate-pulse bg-white/10" />
                    ) : item.isLiveCounter ? (
                      <AnimatedMessageCounter
                        value={item.liveValue}
                        fallback={item.value || copy.homeStats.syncing}
                        suffix={item.suffix}
                        pulseLabel={copy.homeStats.lastSync}
                        defaultStep={item.defaultStep}
                      />
                    ) : (
                      item.value || copy.homeStats.syncing
                    )}
                  </div>
                  <div className="mt-2 min-h-[2.5rem] text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/40 md:text-xs">
                    {item.label}
                  </div>
                  <p className="mt-2 max-w-[34rem] text-xs leading-relaxed text-white/45 md:text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
