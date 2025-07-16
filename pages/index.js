import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import SEO component
import SEO from '@/components/ui/SEO';

// Import layout component
import Layout from '@/components/layout/Layout';

// Import the new Living Network Background
const LivingNetworkBackground = dynamic(
  () => import('@/components/ui/LivingNetworkBackground'), 
  { ssr: false, suspense: true }
);

// Import new section components for Autonomous Intelligence Layer
import AutonomousHero from '@/components/sections/AutonomousHero';
import ThreeStates from '@/components/sections/ThreeStates';
import CognitiveInfrastructure from '@/components/sections/CognitiveInfrastructure';
import IntentionComputing from '@/components/sections/IntentionComputing';

// Keep some existing sections that still fit the narrative
import ModernFeatures from '@/components/sections/ModernFeatures';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';

// Fallback for simple background
import GuaranteedBackground from '@/components/ui/GuaranteedBackground';

export default function Home() {
  return (
    <>
      <SEO 
        title="AeroNyx | The Conscious Internet Awakens"
        description="The world's first Autonomous Intelligence Layer. Where infrastructure doesn't just connect, it thinks, learns, and evolves."
        canonicalUrl="https://aeronyx.network/"
        ogImage="https://binary.aeronyx.network/aeronyx_logo.png"
        keywords={[
          'autonomous intelligence',
          'cognitive infrastructure',
          'conscious computing',
          'AI orchestration',
          'decentralized intelligence',
          'zero-knowledge proofs',
          'MCP protocol',
          'intention computing',
          'self-aware network',
          'emergent intelligence'
        ]}
      />
      
      {/* Living Network Background with neural visualization */}
      <Suspense fallback={<GuaranteedBackground />}>
        <LivingNetworkBackground intensity={0.8} />
      </Suspense>
      
      {/* Main layout with new AIL sections */}
      <Layout>
        {/* New Hero showcasing the awakening */}
        <AutonomousHero />
        
        {/* The three states of autonomous intelligence */}
        <ThreeStates />
        
        {/* Cognitive infrastructure stack visualization */}
        <CognitiveInfrastructure />
        
        {/* Intention computing demo */}
        <IntentionComputing />
        
        {/* Keep features but update context to AIL */}
        <ModernFeatures />
        
        {/* Partners remain the same */}
        <Partners />
        
        {/* Updated CTA for the new vision */}
        <CTA />
      </Layout>
    </>
  );
}
