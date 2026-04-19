import React, { useState } from 'react';
import './SwarmHubLanding.css';

const SwarmHubLanding = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState("Join the Waitlist — Get 50% Off");

  const solAddress = "GAZDwoHW6x4QCaWXizhckqta6v7nFYEFg2aULTk52k7b";
  const generalBtcLink = "bitcoin:bc1q6kmtqp5a6pv6449kksggdzn905d2raj9t2mlcu?message=swarm-hub-website-payments-seed";

  const tiers = [
    {
      id: 'self-hosted',
      name: 'Sovereign Enterprise',
      price: '$5,000',
      period: '/year',
      originalPrice: '$10,000',
      stripeLink: 'https://buy.stripe.com/fZu9AS9jD23obi74S973G03', // Placeholder: Reuse Sovereign link
      btcLink: 'bitcoin:bc1qc4j2qpr6fn2c2c8asxxjukwfzgra8q4ce6fk2g?amount=0.00353043&message=Swarm%20Hub%20Enterprise',
      desc: 'Absolute Sovereignty for elite research organizations.',
      features: [
        'Unlimited Swarm Runs',
        'On-Prem / Local Hardware',
        'Zero Data Leakage (Air-Gapped)',
        'Full Logic Transparency',
        'Custom Persona Integration',
        'Dedicated IP Pool Support'
      ],
      highlight: false
    },
    {
      id: 'pro-annual',
      name: 'Pro Annual',
      price: '$5,000',
      period: '/year',
      originalPrice: '$10,000',
      stripeLink: 'https://buy.stripe.com/5kQ4gy2Vf6jEcmb2K173G04', // Placeholder: Reuse Commander link
      btcLink: 'bitcoin:bc1q5cer6sm023lvrvkavf4hyq6padwzk4xw6zqfjh?amount=0.00176514&message=Swarm%20Hub%20Annual',
      desc: 'Best value for long-term materials & biotech research.',
      features: [
        '150 Swarm Runs / Month',
        'Cloud-Hosted Infrastructure',
        'PhD-Level Expert Forge',
        'Persistent Semantic Memory',
        '2 Months Free Equivalent',
        'Priority Technical Support'
      ],
      highlight: true,
      badge: 'Best Value'
    },
    {
      id: 'pro-monthly',
      name: 'Pro Monthly',
      price: '$500',
      period: '/mo',
      originalPrice: '$1,000',
      stripeLink: 'https://buy.stripe.com/3cI14meDX8rM2LB3O573G05', // Placeholder: Reuse Strategist link
      btcLink: 'bitcoin:bc1qh9f07l0u9x50wh0a8za8rpt8we49tv9zrwrvn8?amount=0.00070597&message=Swarm%20Hub%20Monthly',
      desc: 'For high-velocity teams solving immediate R&D blockers.',
      features: [
        '100 Swarm Runs / Month',
        'PhD-Level Expert Forge',
        'Persistent Semantic Memory',
        'One-Click Anchored Reports',
        'Verifiable Agency (λ = 0.47)',
        'Email Support'
      ],
      highlight: false
    }
  ];

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setShowPayment(true);
    setCopied(false);
  };

  const handleStripeRedirect = () => {
    if (selectedTier && selectedTier.stripeLink) {
      window.open(selectedTier.stripeLink, '_blank');
    }
  };

  const handleBtcRedirect = () => {
    if (selectedTier && selectedTier.btcLink) {
      window.location.href = selectedTier.btcLink;
    }
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
        <div className="urgency-tag">🚀 v6.0 "Neural Sentinel" early access is limited to 25 teams.</div>
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
              <p>Launch Materials Scientists, Molecular Biologists, and Quantitative Analysts on demand. Each agent is tuned for high-signal architectural output.</p>
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
                {tier.badge && <div className="popular-badge">{tier.badge}</div>}
                <div className="tier-header">
                  <span className="original-price">{tier.originalPrice}</span>
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
                  {tier.id === 'self-hosted' ? 'Reserve Enterprise' : `Start with ${tier.name.split(' ')[1]}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT MODAL (High-Conversion Bridge) */}
      {showPayment && (
        <div className="payment-overlay">
          <div className="payment-modal">
            <button className="close-modal" onClick={() => setShowPayment(false)}>×</button>
            <div className="modal-header">
              <div className="labs-badge">SECURE CHECKOUT</div>
              <h2>{selectedTier.name}</h2>
              <p className="modal-price">{selectedTier.price}<span>{selectedTier.period}</span></p>
            </div>
            
            <div className="payment-options">
              <div className="payment-method">
                <h3>Pay with Card</h3>
                <p>Secure checkout via Stripe</p>
                <button className="checkout-btn stripe-btn" onClick={handleStripeRedirect}>Proceed to Stripe</button>
              </div>
              
              <div className="payment-method crypto-method">
                <h3>Pay with Crypto</h3>
                <p>Direct payment in BTC or SOL</p>
                <div className="crypto-btns">
                  <button className="checkout-btn btc-btn" onClick={handleBtcRedirect}>Pay with Bitcoin</button>
                  <button className={`checkout-btn sol-btn ${copied ? 'copied' : ''}`} onClick={handleCopySol}>
                    {copied ? 'Address Copied!' : 'Copy Solana Address'}
                  </button>
                </div>
                <div className="alt-crypto">
                  <a href={generalBtcLink} className="custom-amt-link">Use Custom BTC Amount</a>
                </div>
              </div>
            </div>
            
            <p className="payment-disclaimer">Activation is instant upon confirmation. All research data remains sovereign.</p>
          </div>
        </div>
      )}

      {/* FOOTER CTA & LINKS */}
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
          
          <div className="footer-links">
            <div className="footer-brand">© 2026 TrustChain Labs</div>
            <div className="legal-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="https://github.com/Freedomwithin" target="_blank" rel="noopener noreferrer">Infrastructure Source</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SwarmHubLanding;
