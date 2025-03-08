import { Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';

// Use dynamic imports for performance optimization
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
        {/* Preload key resources */}
        <link rel="preload" href="/fonts/Inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/textures/noise.png" as="image" />
      </Head>
      
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
