import { Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Using absolute imports with the @ alias from jsconfig.json
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';

// Dynamically import the background with client-side only rendering
// Use noSSR to prevent hydration issues in Safari/Chrome
const SubtleNetworkBackground = dynamic(
  () => import('@/components/ui/SubtleNetworkBackground'),
  { ssr: false }
);

// Dynamic imports for other sections
const Features = dynamic(() => import('@/components/sections/Features'));
const HowItWorks = dynamic(() => import('@/components/sections/HowItWorks'));
const Technology = dynamic(() => import('@/components/sections/Technology'));
const Partners = dynamic(() => import('@/components/sections/Partners'));
const CTA = dynamic(() => import('@/components/sections/CTA'));

export default function Home() {
  return (
    <>
      <Head>
        <title>AeroNyx Network | Privacy-First Decentralized Computing</title>
        <meta name="description" content="AeroNyx Network empowers billions of devices with its privacy-first SDK, establishing a secure foundation for decentralized networks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* The background effect with special className for additional control */}
      <Suspense fallback={<div className="fixed inset-0 bg-neutral-900"></div>}>
        <SubtleNetworkBackground className="bg-effect" />
      </Suspense>
      
      <Layout>
        <Hero />
        <Features />
        <HowItWorks />
        <Technology />
        <Partners />
        <CTA />
      </Layout>
    </>
  );
}
