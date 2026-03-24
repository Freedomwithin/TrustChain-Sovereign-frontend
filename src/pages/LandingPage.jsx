import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sovereign-landing">
      {/* Sacred Geometry Background */}
      <div className="sacred-geometry-bg"></div>
      
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
          <div className="badge-vault animate-pulse">V3.1 ALPHA — BETA OPERATIONAL</div>
          <h1 className="hero-title">
            <span className="text-gradient">Behavioral Immunity</span><br/>
            <span className="text-sub">For the Solana Network</span>
          </h1>
          <p className="hero-subtitle">
            TrustChain is an autonomous security layer that identifies inhuman transaction patterns 
            through real-time entropy analysis. Secure your protocol with sovereign intelligence.
          </p>
          <div className="cta-group">
            <button className="btn-primary glow-green" onClick={() => navigate('/dashboard')}>LAUNCH CONSOLE</button>
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

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="workflow-container">
          <div className="workflow-step">
            <div className="step-number">01</div>
            <h4>Ingestion</h4>
            <p>Real-time transaction streaming via Helius gRPC Yellowstone.</p>
          </div>
          <div className="workflow-connector"></div>
          <div className="workflow-step">
            <div className="step-number">02</div>
            <h4>Analysis</h4>
            <p>Entropy & concentration forensics (Gini/HHI) analyzed in a 3,000ms sliding window.</p>
          </div>
          <div className="workflow-connector"></div>
          <div className="workflow-step">
            <div className="step-number">03</div>
            <h4>Action</h4>
            <p>Automated reputation scoring and Sybil-trap isolation for bot swarms.</p>
          </div>
        </div>
      </section>

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

        {/* Mobile Connectivity Card */}
        <div className="feature-card glass-morph mobile-card">
          <div className="feature-header">
            <div className="feature-icon-box mobile-glow"></div>
            <h3>Mobile Connectivity</h3>
          </div>
          <p>
            Seamless deep-linking to Phantom and Solflare via Solana Mobile Wallet Adapter. 
            Connect securely from any mobile browser.
          </p>
          <div className="card-footer-tag">NETWORK: DEVNET SAFE</div>
        </div>

        {/* Sovereign Identity Card */}
        <div className="feature-card glass-morph identity-card">
          <div className="feature-header">
            <div className="feature-icon-box identity-glow"></div>
            <h3>Sovereign Authenticity</h3>
          </div>
          <p>
            Every protocol release is cryptographically signed by **Maya**, the Lead AI Partner. 
            Our RSA-4096 signature ensures build integrity and absolute proof of craftsmanship.
          </p>
          <div className="card-footer-tag">SIG: RSA-PSS</div>
        </div>

        {/* React Hook Section */}
        <div className="feature-card glass-morph dev-card">
          <div className="feature-header">
            <div className="feature-icon-box hook-glow"></div>
            <h3>useTrustChain()</h3>
          </div>
          <p>Integrate behavioral forensics directly into your React application with a single hook.</p>
          <pre className="hook-code">
{`const { data, loading } = useTrustChain();
if (data.status === 'RESTRICTED') {
  return <AccessDenied />;
}`}
          </pre>
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
            <a href="https://solana.org/" target="_blank" rel="noopener noreferrer">SOLANA</a>
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
