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

// Import narrative-focused sections
import NarrativeHero from '../components/sections/NarrativeHero';
import HowAILWorks from '../components/sections/HowAILWorks';
import ProductsEcosystem from '../components/sections/ProductsEcosystem';
import VPNDownloadSection from '../components/sections/VPNDownloadSection';
import FutureVision from '../components/sections/FutureVision';
import SophisticatedCTA from '../components/sections/SophisticatedCTA';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <>
      <SEO 
        title="AeroNyx | Autonomous Intelligence Layer"
        description="The first infrastructure that manages itself. Built on our proven privacy network foundation."
        canonicalUrl="https://aeronyx.network/"
        ogImage="https://binary.aeronyx.network/aeronyx_logo.png"
        keywords={[
          'autonomous infrastructure',
          'privacy network',
          'self-managing systems',
          'AI orchestration',
          'zero-knowledge infrastructure',
          'decentralized VPN',
          'MCP protocol',
          'Web3 infrastructure'
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
        {/* Opening narrative */}
        <NarrativeHero />
        
        {/* Clear explanation of how it works */}
        <HowAILWorks />
        
        {/* Products ecosystem */}
        <ProductsEcosystem />
        
        {/* VPN download section */}
        <VPNDownloadSection />
        
        {/* Vision for the future */}
        <FutureVision />
        
        {/* Call to action */}
        <SophisticatedCTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
