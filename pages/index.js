import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import HowItWorks from '../components/sections/HowItWorks';
import TechnologySection from '../components/sections/TechnologySection';
import Partners from '../components/sections/Partners';
import CTA from '../components/sections/CTA';
import GuaranteedBackground from '../components/ui/GuaranteedBackground';

export default function Home() {
  return (
    <>
      <Head>
        <title>AeroNyx Network | Privacy-First Decentralized Computing</title>
        <meta name="description" content="AeroNyx Network empowers billions of devices with its privacy-first SDK, establishing a secure foundation for decentralized networks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Background effect that's guaranteed to show */}
      <GuaranteedBackground />
      
      <Layout>
        <Hero />
        <Features />
        <HowItWorks />
        <TechnologySection /> {/* Using our guaranteed visible section */}
        <Partners />
        <CTA />
      </Layout>
    </>
  );
}
