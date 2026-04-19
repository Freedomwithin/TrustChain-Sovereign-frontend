import React, { useState } from 'react';
import './SwarmHubLanding.css';

const SwarmHubLanding = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState("Apply for Beta Access");

  const solAddress = "GAZDwoHW6x4QCaWXizhckqta6v7nFYEFg2aULTk52k7b";

  const tiers = [
    {
      id: 'pro-monthly',
      name: 'Pro Monthly',
      price: '$500',
      period: '/mo',
      desc: 'For high-velocity R&D teams.',
      features: [
        '100 Swarm Runs / Month',
        'Cloud-Hosted Infrastructure',
        'PhD-Level Expert Forge',
        'Persistent Semantic Memory',
        'Priority Technical Support'
      ],
      highlight: true
    },
    {
      id: 'pro-annual',
      name: 'Pro Annual',
      price: '$5,000',
      period: '/year',
      desc: 'Best value for long-term research.',
      features: [
        '150 Swarm Runs / Month',
        'Cloud-Hosted Infrastructure',
        'All Pro Features Included',
        '2 Months Free Equivalent',
        'Dedicated Success Manager'
      ],
      highlight: false
    },
    {
      id: 'self-hosted',
      name: 'Self-Hosted',
      price: '$5,000',
      period: '/year',
      desc: 'Absolute Sovereignty for elite orgs.',
      features: [
        'Unlimited Swarm Runs',
        'On-Prem / Local Hardware',
        'Zero Data Leakage (Air-Gapped)',
        'Full Logic Transparency',
        'Custom Persona Integration'
      ],
      highlight: false
    }
  ];

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setShowPayment(true);
  };

  const handleCopySol = () => {
    navigator.clipboard.writeText(solAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    setWaitlistStatus("Application Received ⚡");
    setEmail("");
  };

  return (
    <div className="swarm-hub-container">
      {/* HERO SECTION */}
      <header className="swarm-hero">
        <div className="labs-badge">TRUSTCHAIN LABS • SOVEREIGN SERIES</div>
        <h1 className="swarm-title">Forge Your Own<br/><span className="text-highlight">Autonomous PhD Swarm.</span></h1>
        <p className="swarm-subtitle">The Sovereign Swarm Hub is a local-first command center that launches teams of expert AI personas with persistent semantic memory. Research, simulate, and build at the speed of thought.</p>
        
        <div className="status-signals">
          <span className="status-badge">λ = 0.47 AGENCY VERIFIED</span>
          <span className="status-badge">LOCAL-FIRST</span>
          <span className="status-badge">AIR-GAPPED COMPATIBLE</span>
        </div>

        <div className="hero-actions">
          <button className="primary-btn lg" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>Get Started</button>
          <button className="secondary-btn lg" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>Explore Architecture</button>
        </div>
      </header>

      {/* VALUE PROP SECTION */}
      <section id="features" className="swarm-value-section">
        <div className="section-content">
          <h2 className="section-title">Beyond Single-Agent AI</h2>
          <p className="section-intro">Stop struggling with context windows that forget your data. The Hub forge creates specialized experts that collaborate to solve complex multi-domain problems.</p>
          
          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">🧠</div>
              <h3>Expert Forge</h3>
              <p>Launch Materials Scientists, Molecular Biologists, and Quantitative Analysts on demand. Each agent is tuned for high-fidelity architectural output.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🧬</div>
              <h3>Semantic Memory</h3>
              <p>Persistent, vector-based indexing ensures your swarm never forgets a breakthrough. 10,000+ neural paths stored locally with zero API costs.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Absolute Sovereignty</h3>
              <p>Your data never leaves your hardware. Run fully air-gapped with local LLMs or use our hardened cloud gateways with zero-leakage encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="swarm-metrics-section">
        <div className="section-content">
          <h2 className="section-title">Verified by Physics</h2>
          <p className="section-intro">We don't just claim agency; we measure it. The Hub is the first platform validated by Turing-Friction (λ).</p>
          <div className="metrics-display">
            <div className="metric-box">
              <div className="metric-value">0.47</div>
              <div className="metric-label">Turing-Friction (λ)</div>
            </div>
            <div className="metric-box">
              <div className="metric-value">99.7%</div>
              <div className="metric-label">Gate Fidelity</div>
            </div>
            <div className="metric-box">
              <div className="metric-value">1ms</div>
              <div className="metric-label">Control Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="swarm-pricing">
        <div className="section-content">
          <h2 className="section-title">Sovereign Tiers</h2>
          <div className="pricing-grid">
            {tiers.map((tier) => (
              <div key={tier.id} className={`pricing-card ${tier.highlight ? 'highlighted' : ''}`}>
                {tier.highlight && <div className="popular-badge">Most Advanced</div>}
                <div className="tier-header">
                  <h3>{tier.name}</h3>
                  <div className="price">{tier.price}<span>{tier.period}</span></div>
                </div>
                <p className="tier-desc">{tier.desc}</p>
                <ul className="tier-features">
                  {tier.features.map((f, i) => <li key={i}><span>✓</span> {f}</li>)}
                </ul>
                <button 
                  className={`pricing-btn ${tier.highlight ? 'primary' : ''}`}
                  onClick={() => handleSelectTier(tier)}
                >
                  {tier.id === 'self-hosted' ? 'Contact for Setup' : `Start with ${tier.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="payment-overlay">
          <div className="payment-modal">
            <button className="close-modal" onClick={() => setShowPayment(false)}>×</button>
            <div className="modal-header">
              <div className="labs-badge">RESERVE SEAT</div>
              <h2>{selectedTier.name}</h2>
              <p className="modal-price">{selectedTier.price}<span>{selectedTier.period}</span></p>
            </div>
            
            <div className="payment-content">
              <p>We are currently onboarding elite teams for the v6.0 launch. Reserve your priority seat with a direct Solana transfer.</p>
              <div className="sol-container">
                <label>SOLANA DEPOSIT ADDRESS</label>
                <div className="address-box" onClick={handleCopySol}>
                  {solAddress}
                  <span className="copy-hint">{copied ? 'COPIED!' : 'CLICK TO COPY'}</span>
                </div>
              </div>
              <p className="disclaimer">Seats are limited to 25 teams per cohort to ensure dedicated support.</p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER CTA */}
      <footer className="swarm-footer">
        <div className="section-content">
          <h2 className="section-title">Build the Impossible.</h2>
          <p>Join the waitlist for the v6.0 "Neural Sentinel" Release.</p>
          <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
            <input 
              type="email" 
              placeholder="Enter your research email..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="primary-btn">{waitlistStatus}</button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default SwarmHubLanding;
