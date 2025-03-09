import React from 'react';
import Container from '../ui/Container';

const TechnologySection = () => {
  return (
    <section id="technology" style={{ position: 'relative', zIndex: 10, padding: '80px 0' }}>
      <Container>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 2,
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
        }}>
          Cutting-Edge Technology
        </h2>
        
        <p style={{ 
          fontSize: '1.125rem',
          lineHeight: 1.6, 
          color: 'white',
          maxWidth: '800px',
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          Our platform combines advanced cryptography, blockchain technology, and distributed 
          systems to create a secure, scalable infrastructure for the decentralized web.
        </p>
        
        {/* Technical cards can be added here */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Privacy Infrastructure */}
          <div style={{
            backgroundColor: 'rgba(31, 31, 50, 0.7)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(119, 98, 243, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Privacy Infrastructure
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
              Our core privacy layer creates the foundation for secure, private computing across 
              untrusted networks and devices.
            </p>
            <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>End-to-end encryption for all data</li>
              <li style={{ marginBottom: '0.5rem' }}>Zero-knowledge proofs for verification</li>
              <li style={{ marginBottom: '0.5rem' }}>Multi-party computation for AI training</li>
              <li>Homomorphic encryption for secure computation</li>
            </ul>
          </div>
          
          {/* Decentralized Marketplace */}
          <div style={{
            backgroundColor: 'rgba(31, 31, 50, 0.7)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(119, 98, 243, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Decentralized Marketplace
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
              Our marketplace technology creates efficient allocation of global computing resources 
              with minimal overhead.
            </p>
            <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Smart contract-based resource allocation</li>
              <li style={{ marginBottom: '0.5rem' }}>Reputation systems for quality assurance</li>
              <li style={{ marginBottom: '0.5rem' }}>Dynamic pricing based on supply and demand</li>
              <li>Cross-chain compatibility for maximum liquidity</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TechnologySection;
