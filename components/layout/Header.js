import React from 'react';
import GlassNavbar from './GlassNavbar';

const Header = () => {
  // Custom navigation links if needed
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#technology", label: "Technology" },
    { href: "https://docs.aeronyx.network/", label: "Docs" },
    { href: "https://soon.aeronyx.network/", label: "Dashboard" },
    { href: "https://github.com/AeroNyxNetwork", label: "Github" }
  ];

  return (
    <GlassNavbar 
      transparent={true}
      buttonText="Get Started"
      buttonLink="https://app.aeronyx.network/"
      navLinks={navLinks}
    />
  );
};

export default Header;
