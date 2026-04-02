import React from 'react';
import SovereignTerminal from '../components/SovereignTerminal';
import './LandingPage.css';

const BridgePage = () => {
  return (
    <div className="sovereign-landing bridge-mode">
      <div className="sacred-geometry-bg" style={{ opacity: 0.1 }}></div>
      <div className="grid-overlay"></div>
      <div className="vignette-overlay"></div>
      <div className="scanline"></div>

      <div className="hero-section game-hero">
        <h1 className="hero-title">
          <span className="text-gradient">Sovereign Bridge</span>
        </h1>
        <p className="hero-subtitle">
          Infiltrate the TrustChain sectors. Learn behavioral immunity.
        </p>
        
        <SovereignTerminal />
      </div>

      <footer className="sovereign-footer">
        <div className="footer-content">
          <p className="footer-tag">TRUSTCHAIN SOVEREIGN v1.1</p>
        </div>
      </footer>
    </div>
  );
};

export default BridgePage;
