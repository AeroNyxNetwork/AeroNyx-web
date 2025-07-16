import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const SophisticatedCTA = () => {
  return (
    <section className="py-16 md:py-32 bg-black border-t border-white/10">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Main message */}
          <motion.div
            className="mb-8 md:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-extralight mb-4 md:mb-6 px-4">
              The future of infrastructure
              <span className="block font-normal">is autonomous</span>
            </h2>
            
            <p className="text-base md:text-xl text-white/40 font-light max-w-2xl mx-auto px-4">
              Join the first wave of builders creating systems that manage themselves
            </p>
          </motion.div>
          
          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Primary action */}
            <a
              href="https://docs.aeronyx.network/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto"
            >
              <div className="px-8 sm:px-12 py-4 sm:py-5 border border-white/20 hover:border-white/40 transition-all duration-300 text-center">
                <span className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                  Read Whitepaper
                </span>
              </div>
            </a>
            
            {/* Secondary action */}
            <a
              href="mailto:partnerships@aeronyx.network"
              className="text-white/40 hover:text-white transition-colors px-4 py-2"
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                Partnership Inquiries
              </span>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default SophisticatedCTA;
