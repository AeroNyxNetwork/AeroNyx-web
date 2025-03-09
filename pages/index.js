import { Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Import directly from the correct relative paths
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';

// Dynamically import the background with client-side only rendering
const SubtleNetworkBackground = dynamic(
  () => import('../components/ui/SubtleNetworkBackground'),
  { ssr: false }
);

// Other dynamic imports with correct relative paths
const Features = dynamic(() => import('../components/sections/Features'));
const HowItWorks = dynamic(() => import('../components/sections/HowItWorks'));
const Technology = dynamic(() => import('../components/sections/Technology'));
const Partners = dynamic(() => import('../components/sections/Partners'));
const CTA = dynamic(() => import('../components/sections/CTA'));

export default function Home() {
  return (
    <>
      <Head>
        <title>AeroNyx Network | Privacy-First Decentralized Computing</title>
        <meta name="description" content="AeroNyx Network empowers billions of devices with its privacy-first SDK, establishing a secure foundation for decentralized networks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* The background is now subtle and non-intrusive */}
      <SubtleNetworkBackground />
      
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
