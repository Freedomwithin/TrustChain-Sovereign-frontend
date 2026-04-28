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
              Welcome to the <strong>Sovereign Bridge</strong>—the interactive training ground for the 
              TrustChain ecosystem. This isn't just a terminal; it's a high-fidelity simulator of our 
              backend behavioral engine. Here, you can step into the role of a <strong>Sentinel</strong>, 
              learning to identify and neutralize bot swarms, Sybil attacks, and market manipulation 
              through real-world mathematical forensics.
            </p>

            <div className="mission-briefing glass-morph">
              <h3>🔬 THE TRAINING MODULES</h3>
              <div className="concept-grid">
                <div className="concept-item">
                  <span className="concept-sector">MODULE 01</span>
                  <span className="concept-name">Gini Forensics</span>
                  <p>
                    Learn how we use the Gini Coefficient to measure "clumped" wealth distribution. 
                    Identify the difference between organic community growth and artificial, 
                    bot-driven concentration.
                  </p>
                </div>
                <div className="concept-item">
                  <span className="concept-sector">MODULE 02</span>
                  <span className="concept-name">Sybil Neutralization</span>
                  <p>
                    Discover the signatures of coordinated identity networks. Practice isolating 
                    fake addresses into the Sybil-Trap before they can manipulate governance 
                    or drain liquidity.
                  </p>
                </div>
                <div className="concept-item">
                  <span className="concept-sector">MODULE 03</span>
                  <span className="concept-name">Temporal Rhythms</span>
                  <p>
                    Master the art of temporal analysis. Use the 3,000ms window to detect the 
                    mechanical regularity of algorithmic bursts that are invisible to the human eye.
                  </p>
                </div>
              </div>
            </div>

            <div className="quick-start">
              <h4>🛠️ HOW TO OPERATE:</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                The terminal to your right is a live, emulated environment. Use standard bash 
                commands to navigate the directories and complete your mission.
              </p>
              <ul>
                <li>Type <code>ls</code> to list the available training sectors.</li>
                <li>Type <code>cd [sector_name]</code> to enter a specific module.</li>
                <li>Type <code>cat README.md</code> to receive your operational orders.</li>
                <li>Type <code>help</code> if you need the Sentinel's guidance.</li>
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
