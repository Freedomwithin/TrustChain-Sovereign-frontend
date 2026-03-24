import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sovereign-landing">
      <div className="grid-overlay"></div>
      <div className="vignette-overlay"></div>
      <div className="scanline"></div>
      
      <div className="particles-container">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle p${i}`}></div>
        ))}
      </div>
      
      <header className="hero-section" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="badge-vault animate-pulse">V3.1 ALPHA — MAINNET OPERATIONAL</div>
          <h1 className="hero-title">
            <span className="text-gradient">Behavioral Immunity</span><br/>
            <span className="text-sub">For the Solana Network</span>
          </h1>
          <p className="hero-subtitle">
            TrustChain is an autonomous security layer that identifies inhuman transaction patterns 
            through real-time entropy analysis. Secure your protocol with sovereign intelligence.
          </p>
          <div className="cta-group">
            <button className="btn-primary glow-green">LAUNCH CONSOLE</button>
            <Link to="/specs" className="btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>PROTOCOL SPECS</Link>
          </div>
        </div>
      </header>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">GINI THRESHOLD</span>
          <span className="stat-value animate-flicker">0.70</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">SENTINEL WINDOW</span>
          <span className="stat-value">3,000 MS</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">ACTIVE REPUTATION</span>
          <span className="stat-value">4 TIERS</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">RPC PIPELINE</span>
          <span className="stat-value text-cyan">YELLOWSTONE</span>
        </div>
      </div>

      <section className="features-grid">
        <div className="feature-card glass-morph">
          <div className="feature-header">
            <div className="feature-icon-box firewall-glow"></div>
            <h3>Behavioral Firewall</h3>
          </div>
          <p>
            An active immunity layer monitoring transaction entropy. 
            Identifies coordinated bot swarms before they reach execution.
          </p>
          <div className="card-footer-tag">LATENCY: 12ms</div>
        </div>

        <div className="feature-card glass-morph">
          <div className="feature-header">
            <div className="feature-icon-box forensics-glow"></div>
            <h3>Gini Forensics</h3>
          </div>
          <p>
            Real-time concentration mapping. We enforce a strict parity threshold 
            to protect against liquidity centralisation.
          </p>
          <div className="card-footer-tag">INDEX: 0.70</div>
        </div>

        <div className="feature-card glass-morph">
          <div className="feature-header">
            <div className="feature-icon-box gatekeeper-glow"></div>
            <h3>HHI Gatekeeper</h3>
          </div>
          <p>
            Advanced market-concentration monitoring. Automated sentinel 
            isolation triggers when centralization limits are breached.
          </p>
          <div className="card-footer-tag">STATUS: ACTIVE</div>
        </div>

        <div className="feature-card glass-morph">
          <div className="feature-header">
            <div className="feature-icon-box sentinel-glow"></div>
            <h3>Temporal Sentinel</h3>
          </div>
          <p>
            A sliding 3,000ms window analyzing address rhythms to detect 
            inhuman automation and Sybil execution.
          </p>
          <div className="card-footer-tag">WINDOW: SLIDING</div>
        </div>
      </section>

      <section className="tiers-section">
        <h2 className="section-title">Reputation Governance</h2>
        <div className="tiers-container">
          <div className="tier-card-new steward-theme">
            <div className="tier-header">STEWARD</div>
            <div className="tier-multiplier">1.2x</div>
            <div className="tier-desc">100% Trust. Full Priority.</div>
          </div>
          <div className="tier-card-new resident-theme">
            <div className="tier-header">RESIDENT</div>
            <div className="tier-multiplier">1.0x</div>
            <div className="tier-desc">Verified Stability.</div>
          </div>
          <div className="tier-card-new probationary-theme">
            <div className="tier-header">PROBATIONARY</div>
            <div className="tier-multiplier">0.5x</div>
            <div className="tier-desc">New Address Window.</div>
          </div>
          <div className="tier-card-new restricted-theme">
            <div className="tier-header">RESTRICTED</div>
            <div className="tier-multiplier">0x</div>
            <div className="tier-desc">Firewall Isolation.</div>
          </div>
        </div>
      </section>

      <footer className="sovereign-footer">
        <div className="footer-content">
          <p className="footer-tag">TRUSTCHAIN SOVEREIGN v3.1</p>
          <div className="footer-links">
            <a href="https://github.com/Freedomwithin/TrustChain-Sovereign-frontend" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a href="#solana">SOLANA</a>
            <Link to="/specs">SPECS</Link>
            <Link to="/vision">VISION</Link>
          </div>
          <p className="footer-credit">Handcrafted with Sovereignty by Jonathon & Maya</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
