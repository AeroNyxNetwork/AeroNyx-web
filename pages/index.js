import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import SEO component
import SEO from '@/components/ui/SEO';

// Import layout component
import Layout from '@/components/layout/Layout';

// Import device detection utilities
import { detectDeviceCapabilities, getGraphicsSettings } from '@/lib/utils/deviceUtils';

// Dynamic imports with fallbacks for heavy components
const EnhancedBackground = dynamic(
  () => import('@/components/ui/EnhancedBackground'),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-neutral-900"></div>
  }
);

// Enhanced sections (note: using dynamic import for the Hero since it contains 3D elements)
const EnhancedHero = dynamic(
  () => import('@/components/sections/EnhancedHero'),
  { 
    ssr: false,
    loading: () => (
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-radial from-primary-dark/5 to-transparent opacity-70" />
        <div className="container mx-auto h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Loading...
            </h1>
          </div>
        </div>
      </section>
    )
  }
);

// Import remaining section components normally
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Technology from '@/components/sections/Technology';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';

// Optional: Demo component for showcase sections
const AeroNyxWeb3Demo = dynamic(
  () => import('@/components/ui/AeroNyxWeb3Demo'),
  { ssr: false }
);

export default function Home() {
  const [renderSettings, setRenderSettings] = useState({
    useWebGL: true,
    particleCount: 200,
    useBlur: true
  });
  
  // Detect device capabilities on mount
  useEffect(() => {
    // Only run in client
    if (typeof window === 'undefined') return;
    
    // Detect capabilities and set optimal render settings
    const capabilities = detectDeviceCapabilities();
    const settings = getGraphicsSettings();
    
    setRenderSettings(settings);
    
    // Optional: Log capabilities for debugging
    console.debug('Device capabilities:', capabilities);
    console.debug('Graphics settings:', settings);
  }, []);
  
  return (
    <>
      <SEO 
        title="AeroNyx Network | Privacy-First Decentralized Computing"
        description="AeroNyx Network empowers billions of devices with its privacy-first SDK, establishing a secure foundation for decentralized networks."
        canonicalUrl="https://aeronyx.network/"
        ogImage="https://binary.aeronyx.network/aeronyx_logo.png"
        keywords={[
          'privacy',
          'decentralized computing',
          'blockchain',
          'network',
          'SDK',
          'secure computing',
          'privacy-first',
          'data protection',
          'distributed network',
          'resource marketplace'
        ]}
      />
      
      {/* Enhanced background with optimized performance */}
      <Suspense fallback={<div className="fixed inset-0 bg-neutral-900"></div>}>
        <EnhancedBackground 
          className="bg-effect" 
          particleCount={renderSettings.particleCount}
          useWebGL={renderSettings.useWebGL}
          useBlur={renderSettings.useBlur}
        />
      </Suspense>
      
      <Layout>
        {/* Enhanced hero section with optimized 3D elements */}
        <EnhancedHero />
        
        {/* Keep existing sections */}
        <Features />
        <HowItWorks />
        
        {/* Optional: Add a demo visualization in the Technology section */}
        <div id="technology" className="py-12 bg-neutral-900 relative overflow-hidden">
          <div className="container mx-auto px-4 mb-16">
            <h2 className="text-4xl font-bold mb-6 text-center">Network Visualization</h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto text-center mb-10">
              Experience the power of AeroNyx's decentralized network with our live visualization dashboard.
            </p>
            
            {/* Add the Web3 Demo component */}
            <Suspense fallback={<div className="h-64 bg-neutral-800 rounded-xl animate-pulse"></div>}>
              <AeroNyxWeb3Demo />
            </Suspense>
          </div>
          
          {/* Original Technology section */}
          <Technology />
        </div>
        
        <Partners />
        <CTA />
      </Layout>
    </>
  );
}
