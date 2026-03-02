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

// Import SEO component
import SEO from '../components/ui/SEO';

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
  return (
    <>
      <SEO 
        title="AeroNyx | Infrastructure AI Agents Can Use"
        description="Decentralized compute, storage, and AI memory with x402 instant payments. No accounts, no setup — built for autonomous agents. Featuring MemChain: your AI's permanent, encrypted memory."
        canonicalUrl="https://aeronyx.network/"
        ogImage="https://binary.aeronyx.network/aeronyx_logo.png"
        keywords={[
          'AI infrastructure',
          'x402 payments',
          'autonomous agents',
          'decentralized compute',
          'DePIN',
          'zero-knowledge proofs',
          'instant payments',
          'machine-native infrastructure',
          'AI memory',
          'MemChain',
          'OpenClaw',
          'encrypted memory chain'
        ]}
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
