import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const SophisticatedCTA = () => {
  return (
    <section className="py-32 bg-black border-t border-white/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Main message */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-extralight mb-6">
              The future of infrastructure
              <span className="block font-normal">is autonomous</span>
            </h2>
            
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">
              Join the first wave of builders creating systems that manage themselves
            </p>
          </motion.div>
          
          {/* Action buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Primary action */}
            <a
              href="https://docs.aeronyx.network/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="px-12 py-5 border border-white/20 hover:border-white/40 transition-all duration-300">
                <span className="text-sm uppercase tracking-[0.2em]">
                  Read Whitepaper
                </span>
              </div>
            </a>
            
            {/* Secondary action */}
            <a
              href="mailto:partnerships@aeronyx.network"
              className="text-white/40 hover:text-white transition-colors"
            >
              <span className="text-sm uppercase tracking-[0.2em]">
                Partnership Inquiries
              </span>
            </a>
          </motion.div>
          
          {/* Bottom metrics */}
          <motion.div
            className="mt-24 pt-12 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-light mb-2">$2.1B</div>
                <div className="text-xs uppercase tracking-wider text-white/40">
                  Market Opportunity
                </div>
              </div>
              <div>
                <div className="text-3xl font-light mb-2">147</div>
                <div className="text-xs uppercase tracking-wider text-white/40">
                  Patents Filed
                </div>
              </div>
              <div>
                <div className="text-3xl font-light mb-2">Q2 2025</div>
                <div className="text-xs uppercase tracking-wider text-white/40">
                  Mainnet Launch
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default SophisticatedCTA;
