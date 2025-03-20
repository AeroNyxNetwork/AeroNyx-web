import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import SEO component
import SEO from '@/components/ui/SEO';

// Import layout component
import Layout from '@/components/layout/Layout';

// Import optimized background with dynamic loading
const OptimizedGlassBackground = dynamic(
  () => import('@/components/ui/OptimizedGlassBackground'),
  { ssr: false, suspense: true }
);

// Import modern section components
import ModernHero from '@/components/sections/ModernHero';
import ModernFeatures from '@/components/sections/ModernFeatures';
import HowItWorks from '@/components/sections/HowItWorks';
import Technology from '@/components/sections/Technology';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';

// Fallback for simple background
import GuaranteedBackground from '@/components/ui/GuaranteedBackground';

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
      
      {/* Optimized background system with proper fallbacks */}
      <Suspense fallback={<GuaranteedBackground />}>
        <OptimizedGlassBackground className="z-0" />
      </Suspense>
      
      {/* Main layout with performance optimizations */}
      <Layout>
        {/* Use modern sections with math-optimized components */}
        <ModernHero />
        <ModernFeatures />
        <HowItWorks />
        <Technology />
        <Partners />
        <CTA />
      </Layout>
    </>
  );
}
