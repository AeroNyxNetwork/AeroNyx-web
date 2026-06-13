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
  const items = [
    { label: copy.join.stats.encryptedTraffic, value: stats.encryptedTraffic },
    {
      label: copy.join.stats.encryptedMessages,
      value: stats.encryptedMessages,
      liveValue: stats.encryptedMessagesRaw,
      isLiveCounter: true,
    },
  ];

  return (
    <section aria-label={copy.homeStats.ariaLabel} className="relative z-20 -mt-6 md:-mt-10 pb-10 md:pb-16">
      <Container>
        <div className="max-w-6xl mx-auto border border-white/10 bg-black/70 backdrop-blur-md">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_2fr]">
            <div className="border-b border-white/10 p-5 md:p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-green-300">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_16px_rgba(74,222,128,0.75)]" />
                {copy.homeStats.eyebrow}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {copy.homeStats.description}
              </p>
            </div>

            <div className="grid grid-cols-2">
              {items.map((item) => (
                <div key={item.label} className="border-white/10 p-4 md:p-5 md:border-l first:md:border-l-0">
                  <div className="min-h-[2rem] text-2xl font-light text-white md:text-3xl">
                    {isLoading ? (
                      <span className="block h-7 w-16 animate-pulse bg-white/10" />
                    ) : item.isLiveCounter ? (
                      <AnimatedMessageCounter
                        value={item.liveValue}
                        fallback={item.value || copy.homeStats.syncing}
                      />
                    ) : (
                      item.value || copy.homeStats.syncing
                    )}
                  </div>
                  <div className="mt-2 min-h-[2.5rem] text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/40 md:text-xs">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
