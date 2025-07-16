import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const NarrativeHero = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  
  const questions = [
    {
      q: "What if infrastructure could think?",
      a: "Not just respond to commands, but anticipate needs, optimize itself, and evolve without human intervention."
    },
    {
      q: "What if every node had intelligence?",
      a: "Each device becomes a neuron in a global brain, contributing to collective decision-making."
    },
    {
      q: "What if privacy was guaranteed by math?",
      a: "Zero-knowledge proofs ensure complete privacy while enabling global coordination."
    }
  ];
  
  return (
    <section className="min-h-screen relative px-4 sm:px-6 lg:px-8">
      {/* Container with proper padding for mobile */}
      <div className="min-h-screen flex items-center pt-24 md:pt-0">
        <Container className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto">
            {/* Opening statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-8 md:mb-16"
            >
              <div className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40 mb-4 md:mb-8">
                AeroNyx Network
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight">
                The first infrastructure
                <br />
                <span className="font-light">that manages itself</span>
              </h1>
            </motion.div>
            
            {/* Interactive questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-4 md:space-y-6 mb-8 md:mb-16"
            >
              {questions.map((item, index) => (
                <motion.div
                  key={index}
                  className={`border-l-2 pl-4 md:pl-6 cursor-pointer transition-all duration-300 ${
                    activeQuestion === index 
                      ? 'border-white/60' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onClick={() => setActiveQuestion(index)}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-2 text-white/80">
                    {item.q}
                  </h3>
                  <AnimatePresence>
                    {activeQuestion === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm sm:text-base text-white/60 leading-relaxed"
                      >
                        {item.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
            
            {/* The proposition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="border-t border-white/10 pt-6 md:pt-8"
            >
              <p className="text-sm sm:text-base md:text-lg text-white/60 mb-6 md:mb-8 leading-relaxed">
                Built on our proven privacy network foundation, AeroNyx evolves beyond secure communications 
                to create the world's first <span className="text-white">Autonomous Intelligence Layer</span> — 
                infrastructure that doesn't just protect and execute, but thinks, learns, and evolves.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <a
                  href="#how-it-works"
                  className="group relative overflow-hidden inline-block"
                >
                  <div className="relative z-10 px-6 sm:px-8 py-3 sm:py-4 border border-white/20 group-hover:border-white/40 transition-all text-center sm:text-left">
                    <span className="text-xs sm:text-sm uppercase tracking-wider">
                      Discover How
                    </span>
                  </div>
                </a>
                
                <a
                  href="#vision"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-white/40 hover:text-white transition-colors text-center sm:text-left"
                >
                  <span className="text-xs sm:text-sm uppercase tracking-wider">
                    See the Vision
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default NarrativeHero;
