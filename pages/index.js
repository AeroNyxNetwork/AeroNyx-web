import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import HowItWorks from '../components/sections/HowItWorks';
import Technology from '../components/sections/Technology';
import Partners from '../components/sections/Partners';
import CTA from '../components/sections/CTA';

// Dynamically import the background with client-side only rendering
const SubtleNetworkBackground = dynamic(
  () => import('../components/ui/SubtleNetworkBackground'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>AeroNyx Network | Privacy-First Decentralized Computing</title>
        <meta name="description" content="AeroNyx Network empowers billions of devices with its privacy-first SDK, establishing a secure foundation for decentralized networks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Add the subtle background */}
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
