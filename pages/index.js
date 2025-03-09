import { Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Using absolute imports with the @ alias from jsconfig.json
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Technology from '@/components/sections/Technology';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';

// Dynamically import the background with client-side only rendering
const GuaranteedBackground = dynamic(
  () => import('@/components/ui/GuaranteedBackground'),
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
        
        {/* Font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Add a script to force visibility of all elements after page load */}
        <script dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              document.querySelectorAll('[style*="opacity: 0"]').forEach(function(el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
              });
            }, 300);
          `
        }} />
      </Head>
      
      {/* Background effect that's guaranteed to show */}
      <Suspense fallback={<div className="fixed inset-0 bg-neutral-900"></div>}>
        <GuaranteedBackground />
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
