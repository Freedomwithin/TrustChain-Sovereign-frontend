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
        <div className="bridge-layout">
          <div className="bridge-info">
            <h1 className="hero-title">
              <span className="text-gradient">Sovereign Bridge</span>
            </h1>
            <p className="bridge-description">
              You are entering the TrustChain backend simulator. This interactive terminal 
              teaches you how we neutralize bot swarms and market manipulation through 
              mathematical fairness.
            </p>

            <div className="mission-briefing glass-morph">
              <h3>🔬 MISSION BRIEFING</h3>
              <div className="concept-grid">
                <div className="concept-item">
                  <span className="concept-sector">SECTOR 1</span>
                  <span className="concept-name">Gini Coefficient</span>
                  <p>Wealth distribution & fairness analysis.</p>
                </div>
                <div className="concept-item">
                  <span className="concept-sector">SECTOR 2</span>
                  <span className="concept-name">Sybil Detection</span>
                  <p>Identifying fake identity networks.</p>
                </div>
                <div className="concept-item">
                  <span className="concept-sector">SECTOR 3</span>
                  <span className="concept-name">Temporal Analysis</span>
                  <p>Detecting mechanical bot patterns.</p>
                </div>
              </div>
            </div>

            <div className="quick-start">
              <h4>🏁 QUICK START:</h4>
              <ul>
                <li>Type <code>ls</code> to see available sectors.</li>
                <li>Type <code>cd sector_1</code> to begin.</li>
                <li>Type <code>cat README.md</code> for your mission.</li>
              </ul>
            </div>
          </div>

          <div className="bridge-terminal-wrapper">
            <SovereignTerminal />
          </div>
        </div>
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
