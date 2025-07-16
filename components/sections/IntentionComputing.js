import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const IntentionComputing = () => {
  const [selectedIntention, setSelectedIntention] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customIntention, setCustomIntention] = useState('');
  
  const intentions = [
    {
      id: 'cost-optimize',
      user: 'Data Scientist',
      intention: 'I need to train this model as cheaply as possible',
      icon: '💰',
      color: 'from-green-400 to-emerald-500',
      aiResponse: {
        analysis: 'Analyzing 1,847 available nodes across 47 regions...',
        findings: [
          'Found excess capacity in South America (70% cheaper)',
          'Identified spot instances with 99.2% reliability score',
          'Negotiated bulk pricing across 7 providers'
        ],
        action: 'Deployed across 12 nodes in São Paulo and Santiago',
        result: 'Cost reduced by 73% | Training time: 4.2 hours | Total: $127'
      }
    },
    {
      id: 'privacy-strict',
      user: 'Privacy Advocate',
      intention: 'Keep my data in democratic countries only',
      icon: '🛡️',
      color: 'from-blue-400 to-cyan-500',
      aiResponse: {
        analysis: 'Evaluating jurisdictions and privacy laws...',
        findings: [
          'Identified 23 countries meeting democratic criteria',
          'Verified GDPR compliance across selected nodes',
          'Established encrypted tunnels with privacy guarantees'
        ],
        action: 'Routed through Canada → Germany → Japan',
        result: 'Zero data touched authoritarian jurisdictions | Latency: 47ms'
      }
    },
    {
      id: 'passive-income',
      user: 'Node Operator',
      intention: 'Maximize my mining rewards while I sleep',
      icon: '💎',
      color: 'from-purple-400 to-pink-500',
      aiResponse: {
        analysis: 'Optimizing resource allocation strategies...',
        findings: [
          'Peak demand predicted 2-6 AM your timezone',
          'GPU tasks pay 3.2x more than CPU during this period',
          'Identified premium buyers for your hardware specs'
        ],
        action: 'Auto-switched to high-value AI training tasks',
        result: 'Earnings increased 247% | Overnight revenue: $89.43'
      }
    }
  ];
  
  const processIntention = (intention) => {
    setSelectedIntention(intention);
    setIsProcessing(true);
    
    // Simulate processing steps
    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);
  };
  
  const processCustomIntention = () => {
    if (!customIntention.trim()) return;
    
    const custom = {
      id: 'custom',
      user: 'You',
      intention: customIntention,
      icon: '✨',
      color: 'from-orange-400 to-red-500',
      aiResponse: {
        analysis: 'Processing your unique request...',
        findings: [
          'Interpreting natural language intention',
          'Mapping to available network capabilities',
          'Calculating optimal execution strategy'
        ],
        action: 'Custom workflow deployed across network',
        result: 'Request completed successfully | Confidence: 97.3%'
      }
    };
    
    processIntention(custom);
  };
  
  return (
    <section className="py-20 bg-neutral-800/50">
      <Container>
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Intention Computing
          </motion.h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Express what you want, not how to do it. 
            Watch the AIL interpret, plan, and execute autonomously.
          </p>
        </div>
        
        {/* Intention cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {intentions.map((intention) => (
            <motion.div
              key={intention.id}
              className="bg-neutral-800 rounded-xl p-6 border border-white/10 cursor-pointer hover:border-white/30 transition-all"
              whileHover={{ y: -5 }}
              onClick={() => processIntention(intention)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{intention.icon}</div>
                <div>
                  <p className="text-sm text-neutral-400">{intention.user} says:</p>
                  <p className="text-lg font-medium">"{intention.intention}"</p>
                </div>
              </div>
              <button 
                className={`w-full py-2 rounded-lg bg-gradient-to-r ${intention.color} text-white font-medium hover:shadow-lg transition-all`}
              >
                Process This Intention
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Custom intention input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-neutral-800 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Try Your Own Intention</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={customIntention}
                onChange={(e) => setCustomIntention(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && processCustomIntention()}
                placeholder="e.g., 'Find the greenest servers for my carbon-neutral app'"
                className="flex-1 px-4 py-3 rounded-lg bg-neutral-900 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
              />
              <button
                onClick={processCustomIntention}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all"
              >
                Process
              </button>
            </div>
          </div>
        </div>
        
        {/* Processing visualization */}
        <AnimatePresence>
          {selectedIntention && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => !isProcessing && setSelectedIntention(null)}
            >
              <motion.div
                className="bg-neutral-900 rounded-2xl p-8 max-w-2xl w-full border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{selectedIntention.icon}</div>
                  <div>
                    <p className="text-sm text-neutral-400">{selectedIntention.user}'s Intention:</p>
                    <p className="text-xl font-bold">"{selectedIntention.intention}"</p>
                  </div>
                </div>
                
                {isProcessing ? (
                  <ProcessingAnimation response={selectedIntention.aiResponse} />
                ) : (
                  <ResultDisplay response={selectedIntention.aiResponse} color={selectedIntention.color} />
                )}
                
                {!isProcessing && (
                  <button
                    onClick={() => setSelectedIntention(null)}
                    className="mt-6 w-full py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  >
                    Close
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

// Processing animation component
const ProcessingAnimation = ({ response }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { text: response.analysis, duration: 2000 },
    ...response.findings.map(f => ({ text: f, duration: 1500 })),
    { text: response.action, duration: 2000 }
  ];
  
  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, steps[step].duration);
      return () => clearTimeout(timer);
    }
  }, [step, steps]);
  
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: i <= step ? 1 : 0.3, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            i <= step ? 'bg-cyan-500' : 'bg-neutral-700'
          }`}>
            {i < step ? '✓' : i === step ? (
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            ) : ''}
          </div>
          <p className={i <= step ? 'text-white' : 'text-neutral-500'}>{s.text}</p>
        </motion.div>
      ))}
    </div>
  );
};

// Result display component
const ResultDisplay = ({ response, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className={`p-4 rounded-lg bg-gradient-to-r ${color} bg-opacity-20`}>
        <h4 className="font-bold mb-2">AI Analysis Complete</h4>
        <p className="text-sm text-neutral-300">{response.analysis}</p>
      </div>
      
      <div>
        <h4 className="font-bold mb-2">Findings:</h4>
        <ul className="space-y-1">
          {response.findings.map((finding, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
              <span className="text-cyan-400 mt-1">•</span>
              {finding}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-2">Action Taken:</h4>
        <p className="text-sm text-neutral-300">{response.action}</p>
      </div>
      
      <div className={`p-4 rounded-lg bg-gradient-to-r ${color} bg-opacity-10 border border-white/20`}>
        <h4 className="font-bold mb-1">Result:</h4>
        <p className="text-lg">{response.result}</p>
      </div>
    </motion.div>
  );
};

export default IntentionComputing;
