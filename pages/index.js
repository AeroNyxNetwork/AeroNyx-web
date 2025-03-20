import { Suspense } from 'react';
import SEO from '@/components/ui/SEO';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
// import Features from '@/components/sections/Features'; // Comment out if this file was deleted
import HowItWorks from '@/components/sections/HowItWorks';
import Technology from '@/components/sections/Technology';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';

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
          'secure computing',
          'privacy-first',
        ]}
      />
      
      <SimpleFallback />
      
      <Layout>
        <Hero />
        {/* {Features && <Features />} */}
        <HowItWorks />
        <Technology />
        <Partners />
        <CTA />
      </Layout>
    </>
  );
}
