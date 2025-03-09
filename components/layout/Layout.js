import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: 5 }}>
      {/* Ensure the content is above the background but allows it to show through */}
      <Header style={{ position: 'relative', zIndex: 20 }} />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </main>
      
      <Footer style={{ position: 'relative', zIndex: 20 }} />
    </div>
  );
};

export default Layout;
