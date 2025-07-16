import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import SEO component
import SEO from '../components/ui/SEO';

// Import layout component
import Layout from '../components/layout/Layout';

// Import the minimal background
const MinimalAILBackground = dynamic(
  () => import('../components/ui/MinimalAILBackground'), 
  { ssr: false, suspense: true }
);

// Import narrative-focused sections
import NarrativeHero from '../components/sections/NarrativeHero';
import HowAILWorks from '../components/sections/HowAILWorks';
import ImplementationRoadmap from '../components/sections/ImplementationRoadmap';
import FutureVision from '../components/sections/FutureVision';
import SophisticatedCTA from '../components/sections/SophisticatedCTA';

export default function Home() {
  return (
    <>
      <SEO 
        title="AeroNyx | Autonomous Intelligence Layer"
        description="The first infrastructure that manages itself. Where intelligence isn't added—it's inherent."
        canonicalUrl="https://aeronyx.network/"
        ogImage="https://binary.aeronyx.network/aeronyx_logo.png"
        keywords={[
          'autonomous infrastructure',
          'self-managing systems',
          'AI orchestration',
          'zero-knowledge infrastructure',
          'decentralized intelligence',
          'MCP protocol',
          'future of computing',
          'Web3 infrastructure'
        ]}
      />
      
      {/* Minimal sophisticated background */}
      <Suspense fallback={<div className="bg-black" />}>
        <MinimalAILBackground />
      </Suspense>
      
      {/* Main layout with narrative sections */}
      <Layout>
        {/* Opening narrative */}
        <NarrativeHero />
        
        {/* Clear explanation of how it works */}
        <HowAILWorks />
        
        {/* Implementation roadmap */}
        <ImplementationRoadmap />
        
        {/* Vision for the future */}
        <FutureVision />
        
        {/* Call to action */}
        <SophisticatedCTA />
      </Layout>
    </>
  );
}
