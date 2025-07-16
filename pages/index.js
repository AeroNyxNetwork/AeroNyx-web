import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import SEO component
import SEO from '../components/ui/SEO';

// Import layout component
import Layout from '../components/layout/Layout';

// Import the sophisticated minimal background
const MinimalAILBackground = dynamic(
  () => import('../components/ui/MinimalAILBackground'), 
  { ssr: false, suspense: true }
);

// Import sophisticated section components
import SophisticatedAILHero from '../components/sections/SophisticatedAILHero';
import NetworkTopology from '../components/sections/NetworkTopology';
import IntelligenceArchitecture from '../components/sections/IntelligenceArchitecture';

// Keep refined versions of existing sections
import Partners from '../components/sections/Partners';
import CTA from '../components/sections/CTA';

export default function Home() {
  return (
    <>
      <SEO 
        title="AeroNyx | Autonomous Intelligence Layer"
        description="Infrastructure that thinks for itself. The first network where intelligence isn't added—it's inherent."
        canonicalUrl="https://aeronyx.network/"
        ogImage="https://binary.aeronyx.network/aeronyx_logo.png"
        keywords={[
          'autonomous infrastructure',
          'intelligent networks',
          'self-optimizing systems',
          'distributed intelligence',
          'zero-knowledge infrastructure',
          'MCP protocol',
          'cognitive computing',
          'Web3 infrastructure'
        ]}
      />
      
      {/* Minimal sophisticated background */}
      <Suspense fallback={<div className="bg-black" />}>
        <MinimalAILBackground />
      </Suspense>
      
      {/* Main layout with sophisticated sections */}
      <Layout>
        {/* Sophisticated hero with geometric patterns */}
        <SophisticatedAILHero />
        
        {/* Real-time network topology visualization */}
        <NetworkTopology />
        
        {/* Clean architecture breakdown */}
        <IntelligenceArchitecture />
        
        {/* Partners with refined styling */}
        <Partners />
        
        {/* Sophisticated CTA */}
        <CTA />
      </Layout>
    </>
  );
}
