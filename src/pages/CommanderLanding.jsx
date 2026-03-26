import React, { useState } from 'react';
import './CommanderLanding.css';

const CommanderLanding = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState("Join the Waitlist — Get 50% Off");

  const solAddress = "GAZDwoHW6x4QCaWXizhckqta6v7nFYEFg2aULTk52k7b";

  const tiers = [
    {
      id: 'strategist',
      name: 'The Strategist',
      originalPrice: '$100',
      price: '$49.99',
      stripeLink: 'https://buy.stripe.com/3cI14meDX8rM2LB3O573G05',
      btcLink: 'bitcoin:bc1qh9f07l0u9x50wh0a8za8rpt8we49tv9zrwrvn8?amount=0.00070597&message=The%20Stratagist%20Discount',
      desc: 'For solo entrepreneurs reclaiming their voice.',
      features: ['Up to 5 Accounts', 'Ghost Hand Posting', '50 Signal Seed Drafts', 'Local Data Encryption'],
      highlight: false
    },
    {
      id: 'commander',
      name: 'The Commander',
      originalPrice: '$250',
      price: '$124.99',
      stripeLink: 'https://buy.stripe.com/5kQ4gy2Vf6jEcmb2K173G04',
      btcLink: 'bitcoin:bc1q5cer6sm023lvrvkavf4hyq6padwzk4xw6zqfjh?amount=0.00176514&message=The%20Command%20Discount%2050%25',
      desc: 'For scaling SaaS founders & marketers.',
      features: ['Up to 25 Accounts', 'Unlimited Signal Seed', 'Premium Media Chamber', 'Priority Support'],
      highlight: true
    },
    {
      id: 'sovereign',
      name: 'The Sovereign',
      originalPrice: '$500',
      price: '$249.99',
      stripeLink: 'https://buy.stripe.com/fZu9AS9jD23obi74S973G03',
      btcLink: 'bitcoin:bc1qc4j2qpr6fn2c2c8asxxjukwfzgra8q4ce6fk2g?amount=0.00353043&message=The%20Sovereign%20Discount%2050%25',
      desc: 'White-label solution for elite agencies.',
      features: ['Unlimited Accounts & Brands', 'SaaS Mode (Resell Seats)', 'Client Approval Dashboard', 'Dedicated IP Pool Support'],
      highlight: false
    }
  ];

  const generalBtcLink = "bitcoin:bc1q6kmtqp5a6pv6449kksggdzn905d2raj9t2mlcu?message=sovereign-command-center-website-payments-seed";

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
    setWaitlistStatus("You're on the list, strategist! ⚡");
    // Placeholder for actual API call
    console.log("Waitlist signup:", email);
    setEmail("");
  };

  return (
    <div className="commander-container">
      {/* HERO SECTION */}
      <header className="commander-hero">
        <div className="labs-badge">TRUSTCHAIN LABS</div>
        <h1 className="commander-title">Restore Your Organic Reach.<br/><span className="text-highlight">Post Like a Human.</span></h1>
        <p className="commander-subtitle">Bypass the API Trap with the Social Commander OS. High-fidelity browser automation powered by the Ghost Hand mechanism.</p>
        
        <div className="compatibility-signals">
          <span className="os-badge">WINDOWS</span>
          <span className="os-badge">LINUX</span>
          <span className="os-badge">MAC (AppImage)</span>
          <span className="os-badge locked">MOBILE COMING SOON</span>
        </div>

        <div className="hero-actions">
          <button className="primary-btn" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>Join Early Access — 50% Off</button>
          <button className="secondary-btn">Watch Calibration Demo</button>
        </div>
        <div className="urgency-tag">🚀 First 25 users get 50% off lifetime access.</div>
      </header>

      {/* THE API TRAP (PAIN POINT) */}
      <section className="api-trap-section">
        <div className="section-content">
          <h2 className="section-title">The API Trap</h2>
          <p className="section-intro">Did you know posting through Buffer, Hootsuite, or Sprout Social can <strong>kill your organic reach by 70-90%</strong>?</p>
          <div className="trap-grid">
            <div className="trap-card">
              <h3>Algorithmic Suppression</h3>
              <p>Platforms flag API-posted content as "business" and bury it. The same post through an API gets 1-2% reach. The same post natively gets 5-10%.</p>
            </div>
            <div className="trap-card">
              <h3>Social Commander Restores Reach</h3>
              <p>By mimicking human behavior at the UI level, we bypass the markers that schedulers leave on the back-end. Post natively, at scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="commander-pricing">
        <h2 className="section-title">Sovereign Pricing</h2>
        <div className="pricing-grid">
          {tiers.map((tier) => (
            <div key={tier.id} className={`pricing-card ${tier.highlight ? 'highlighted' : ''}`}>
              {tier.highlight && <div className="popular-badge">Most Popular</div>}
              <h3>{tier.name}</h3>
              <div className="price-container">
                <span className="original-price">{tier.originalPrice}</span>
                <div className="price">{tier.price}<span>/mo</span></div>
              </div>
              <p className="tier-desc">{tier.desc}</p>
              <ul className="tier-features">
                {tier.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button 
                className={`pricing-btn ${tier.highlight ? 'primary' : ''}`}
                onClick={() => handleSelectTier(tier)}
              >
                Select {tier.name.split(' ')[1]}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PAYMENT MODAL (The Bridge) */}
      {showPayment && (
        <div className="payment-overlay">
          <div className="payment-modal">
            <button className="close-modal" onClick={() => setShowPayment(false)}>×</button>
            <div className="modal-header">
              <div className="labs-badge">SECURE CHECKOUT</div>
              <h2>{selectedTier.name}</h2>
              <p className="modal-price">{selectedTier.price}<span>/month</span></p>
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
            
            <p className="payment-disclaimer">Activation is instant upon confirmation. All data remains sovereign.</p>
          </div>
        </div>
      )}

      {/* REACH RESTORATION TABLE */}
      <section className="reach-stats">
        <h2 className="section-title">Reach Restoration</h2>
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>API Tools</th>
                <th className="highlight-cell">Social Commander</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>X (Twitter)</td>
                <td>1-2% reach</td>
                <td className="highlight-cell">5-10% reach</td>
              </tr>
              <tr>
                <td>Facebook</td>
                <td>1-2% reach</td>
                <td className="highlight-cell">5-10% reach</td>
              </tr>
              <tr>
                <td>Instagram</td>
                <td>3-5% reach</td>
                <td className="highlight-cell">8-12% reach</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="table-note">*Same content. Same effort. 5x more reach. Zero ad spend.</p>
      </section>

      {/* FINAL CTA & WAITLIST */}
      <footer id="waitlist" className="final-cta">
        <h2 className="section-title">Ready to reclaim your reach?</h2>
        
        <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email for 50% discount..." 
            className="waitlist-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn lg">{waitlistStatus}</button>
        </form>
        
        <p className="no-risk-note">No credit card required for demo. Join 25+ strategists already on the list.</p>
      </footer>
    </div>
  );
};

export default CommanderLanding;
