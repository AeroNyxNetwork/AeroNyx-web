import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import SEO component
import SEO from '@/components/ui/SEO';

// Import layout component
import Layout from '@/components/layout/Layout';

// Import optimized background with dynamic loading for better performance
const OptimizedGlassBackground = dynamic(
  () => import('@/components/ui/OptimizedGlassBackground'),
  { ssr: false, suspense: true }
);

// Import original section components as fallbacks
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Technology from '@/components/sections/Technology';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';

// Simple fallback for background during loading
const SimpleFallback = () => (
  <div className="fixed inset-0 bg-neutral-900 z-0"></div>
);

export default function Home() {
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
      
      {/* Optimized background with fallback */}
      <Suspense fallback={<SimpleFallback />}>
        <OptimizedGlassBackground className="z-0" intensity={0.8} />
      </Suspense>
      
      <Layout>
        {/* You can gradually replace these with your optimized versions */}
        <Hero />
        <HowItWorks />
        <Technology />
        <Partners />
        <CTA />
      </Layout>
    </>
  );
}
