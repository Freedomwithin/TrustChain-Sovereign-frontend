import React, { useState } from 'react';
import './SwarmHubLanding.css';

const SwarmHubLanding = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showManifesto, setShowManifesto] = useState(false);
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
        <h1 className="swarm-title">Beyond Single-Agent AI:<br/><span className="text-highlight">The Multi-Agent Research Engine.</span></h1>
        
        <p className="swarm-subtitle">
          The Sovereign Swarm Hub is a local-first command center that orchestrates teams of PhD-level AI experts with persistent semantic memory.
        </p>

        <div className="manifesto-toggle-wrapper">
          <button className="manifesto-btn" onClick={() => setShowManifesto(!showManifesto)}>
            {showManifesto ? 'CLOSE THE MANIFESTO' : 'READ THE PARADIGM SHIFT'}
          </button>
        </div>

        {showManifesto && (
          <div className="swarm-manifesto-window glass-morph">
            <div className="manifesto-header">
              <span className="manifesto-tag">PROTOCOL MANIFESTO v1.0</span>
              <h3>The Sovereign Paradigm Shift</h3>
            </div>
            <div className="manifesto-content">
              <p>
                The Sovereign Swarm Hub represents a paradigm shift in artificial intelligence coordination, 
                functioning as a local-first command center that orchestrates teams of highly specialized, 
                PhD-level AI experts. This innovative approach differs significantly from standard large 
                language models (LLMs), which are often criticized for their inability to retain information 
                and tendency to drift from their intended mission over time due to the lack of a robust 
                memory mechanism. In contrast, the Sovereign Swarm Hub is designed to maintain persistent 
                semantic memory, ensuring that knowledge and insights gained during operations are preserved 
                and can be built upon, rather than being lost or forgotten.
              </p>
              <p>
                A critical aspect of the Sovereign Swarm Hub's design is its ability to provide a 
                verifiable agency score, denoted by the lambda value ($\lambda = 0.47$). This metric 
                serves as a quantifiable measure of the system's autonomy and decision-making capabilities, 
                allowing users to assess the reliability and trustworthiness of the Hub's outputs. By 
                providing a transparent and objective means of evaluating the system's performance, 
                the Sovereign Swarm Hub enables users to have confidence in the accuracy and relevance 
                of the insights and recommendations generated.
              </p>
              <p>
                One of the primary advantages of the Sovereign Swarm Hub is its capacity to facilitate 
                research, auditing, and simulation of complex, multi-domain problems. This capability 
                is particularly significant, as it enables users to tackle challenges that were 
                previously reserved for top-tier institutional labs, which often possess significant 
                resources and expertise. By democratizing access to such advanced capabilities, the 
                Sovereign Swarm Hub has the potential to level the playing field, allowing a broader 
                range of organizations and individuals to engage with complex problems and develop 
                innovative solutions.
              </p>
              <p>
                Furthermore, the Sovereign Swarm Hub's local-first architecture ensures that sensitive 
                data and information remain under the control of the user, rather than being transmitted 
                to remote servers or cloud-based infrastructure. This approach is particularly important 
                for organizations or individuals working with sensitive or proprietary information, as 
                it minimizes the risk of data breaches or unauthorized access. By maintaining control 
                over their data and insights, users can ensure that their research and development 
                efforts remain secure and confidential.
              </p>
              <p>
                The Sovereign Swarm Hub's ability to provide a secure and controlled environment for 
                research and development is further enhanced by its modular design, which enables 
                users to customize the system to meet their specific needs and requirements. By 
                selecting from a range of specialized AI modules, users can tailor the Hub's 
                capabilities to address specific challenges or problems, and integrate the system 
                with existing tools and infrastructure.
              </p>
            </div>
          </div>
        )}
        
        <div className="status-signals">
          <span className="status-badge">$\lambda = 0.47$ AGENCY VERIFIED</span>
          <span className="status-badge">LOCAL-FIRST PERSISTENCE</span>
          <span className="status-badge">AIR-GAPPED COMPATIBLE</span>
        </div>

        <div className="hero-actions">
          <button className="primary-btn lg" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>Secure Your Forge</button>
          <button className="secondary-btn lg" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>Architecture Deep-Dive</button>
        </div>
        <div className="urgency-tag">🚀 v6.0 "Neural Sentinel" Early Access is limited to 25 sovereign teams.</div>
      </header>

      {/* CASE STUDY SECTION - NEW */}
      <section className="case-study-section">
        <div className="section-content">
          <h2 className="section-title">Verified Strikes: Real-World Proof</h2>
          <div className="case-study-card glass-morph">
            <div className="case-study-header">
              <span className="case-tag">SECURITY AUDIT SUCCESS</span>
              <h3>The Monero-Oxide Vulnerability Strike</h3>
            </div>
            <p>
              In April 2026, a Sovereign Swarm was tasked with auditing the <strong>monero-oxide</strong> Bulletproofs+ implementation. 
              Within 8 minutes of initiation, the swarm identified a critical "Weak Fiat-Shamir" vulnerability in the 
              transcript generation logic. The audit was escalated to the primary maintainers and successfully 
              validated, demonstrating that our multi-agent architecture can identify cryptographic flaws that 
              human maintainers and single-agent models frequently miss.
            </p>
            <div className="case-study-stats">
              <div className="case-stat"><span>TIME TO DETECTION:</span> 8m 12s</div>
              <div className="case-stat"><span>VERDICT:</span> ESCALATED & VALIDATED</div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROP SECTION */}
      <section id="features" className="swarm-value-section">
        <div className="section-content">
          <h2 className="section-title">The Sovereign Advantage</h2>
          <p className="section-intro">
            Single-agent prompts are a tool; a Sovereign Swarm is a workforce. We have solved the "Context Fog" 
            that plagues standard AI interactions by creating a decentralized, collaborative architecture.
          </p>
          
          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">🧠</div>
              <h3>The Expert Forge</h3>
              <p>
                Don't just prompt; forge. Launch specialized experts—from Adversarial Cryptographers to 
                Cryogenic Engineers—that carry specific, high-signal technical personas. These experts 
                collaborate across a shared "Blackboard" to stress-test your architecture and identify 
                blind spots with surgical precision.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🧬</div>
              <h3>Persistent Semantic Memory</h3>
              <p>
                Standard LLMs are ephemeral; the Hub is permanent. By utilizing local, vector-based 
                indexing, your swarm maintains a persistent memory of every breakthrough, every error, 
                and every design pivot. Your project's history becomes the bedrock of its future intelligence.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Data Sovereignty</h3>
              <p>
                In an era of corporate data-harvesting, the Hub ensures your proprietary research 
                remains yours. Run fully air-gapped on local hardware or use our hardened gateways. 
                Your keys, your logic, your breakthroughs—absolute sovereignty by design.
              </p>
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
