import sacredBg from '../assets/sacred_geometry_backround.png';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleStep = (step) => {
    setActiveStep(activeStep === step ? null : step);
  };

  const copyHookCode = () => {
    const code = `const { data, loading } = useIntegrity();\nif (data.status === 'RESTRICTED') {\n  return <AccessDenied />;\n}`;
    navigator.clipboard.writeText(code);
    alert("Hook code copied to clipboard!");
  };

  return (
    <div className="sovereign-landing">
      {/* Sacred Geometry Background */}
      <div className="sacred-geometry-bg" style={{ backgroundImage: `url(${sacredBg})`, opacity: 0.15 }}></div>
      
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
            TrustChain is the "Cloudflare for Solana." While others search for bugs in code, we identify inhuman behavior in real-time. 
            Protect your liquidity and ensure your community remains human with our high-speed behavioral camera.
          </p>
          <div className="cta-group" key="sovereign-ctas">
            <button className="btn-primary glow-green" onClick={() => navigate('/dashboard')}>LAUNCH LIVE INTERFACE</button>
            <button className="btn-secondary glow-indigo" onClick={() => navigate('/bridge')}>TRAINING SIMULATOR</button>
            <Link to="/specs" className="btn-secondary cta-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>TECHNICAL SPECS</Link>
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
        <h2 className="section-title">The Sovereign Architecture</h2>
        <p className="section-intro">
          TrustChain doesn't just block addresses; it understands the "why" behind every transaction. 
          Here is how we maintain a 3,000ms behavioral firewall.
        </p>
        <div className="workflow-container-v2">
          <div className={`workflow-step-v2 ${activeStep === 1 ? 'active' : ''}`} onClick={() => toggleStep(1)}>
            <div className="step-header">
              <div className="step-number">01</div>
              <h4>Ingestion: The Speed of Reality</h4>
              <span className="expand-icon">{activeStep === 1 ? '−' : '+'}</span>
            </div>
            {activeStep === 1 && (
              <div className="step-content">
                <p>
                  At the core of our protocol lies an unwavering dedication to temporal accuracy, 
                  recognizing that even the slightest delay in detecting malicious activity can have 
                  severe consequences. Traditional security systems often employ a polling mechanism, 
                  which involves periodically capturing data snapshots at predetermined intervals. This 
                  approach, however, creates a perilous blind spot, as malicious actors can exploit the 
                  time gap between scans to infiltrate the system, execute their intentions, and escape 
                  undetected before the next scheduled scan. To address this vulnerability, we have 
                  incorporated the <strong>Helius Yellowstone gRPC pipeline</strong>, the most advanced 
                  and low-latency data stream available on the Solana network.
                </p>
                <p>
                  The Yellowstone pipeline functions as our digital ocular nerve, incessantly 
                  "inhaling" every transaction, account update, and instruction the exact millisecond 
                  it is broadcast to the network. This real-time data ingestion enables us to maintain 
                  a direct, high-fidelity link to the blockchain's pulse, ensuring that TrustChain's 
                  security layer is always vigilant and aware of the absolute present. By doing so, 
                  we have effectively eliminated the lag time that hackers typically rely on to obfuscate 
                  their movements, conceal their digital footprints, and remain undetected. While 
                  malicious actors are still awaiting confirmation of their transactions, our engine 
                  has already ingested their data, meticulously mapped their intent, and prepared a 
                  robust defense against potential threats.
                </p>
                <p>
                  This architectural choice is pivotal in providing a significant advantage over 
                  traditional security systems, as it enables our protocol to respond to emerging 
                  threats in real-time, rather than reacting to historical data. By leveraging the 
                  Yellowstone pipeline, we can identify and mitigate potential security risks as they 
                  arise, thereby ensuring the integrity and security of the network. The ability to 
                  process and analyze data in real-time also allows us to refine our security protocols, 
                  making adjustments as needed to stay ahead of evolving threats and protect against 
                  even the most sophisticated attacks.
                </p>
              </div>
            )}          </div>

          <div className={`workflow-step-v2 ${activeStep === 2 ? 'active' : ''}`} onClick={() => toggleStep(2)}>
            <div className="step-header">
              <div className="step-number">02</div>
              <h4>Analysis: Forensic Intelligence at 3,000ms</h4>
              <span className="expand-icon">{activeStep === 2 ? '−' : '+'}</span>
            </div>
            {activeStep === 2 && (
              <div className="step-content">
                <p>
                  Data ingestion is merely the initial step in the process, as the true strength of 
                  TrustChain lies in its capacity to identify the "Inhuman Signal" that is concealed 
                  within the noise of transaction flows. Unlike traditional firewalls that rely on 
                  static blacklists, our engine utilizes advanced <strong>Economic Forensics</strong> to 
                  analyze transaction flows and detect anomalies. This approach enables us to uncover 
                  patterns and behaviors that may indicate malicious activity, such as coordinated 
                  Sybil attacks or bot swarms.
                </p>
                <p>
                  To achieve this, we employ two primary metrics: the <strong>Gini Coefficient</strong> 
                  and the <strong>Herfindahl-Hirschman Index (HHI)</strong>. The Gini Coefficient is a 
                  statistical measure that assesses the dispersion of wallet activity, providing insights 
                  into the distribution of transactions across different wallets. A low Gini Coefficient 
                  indicates a more uniform distribution, while a high coefficient suggests a concentration 
                  of activity among a smaller group of wallets. This metric is particularly useful in 
                  identifying wallets that exhibit unusual patterns of behavior, such as those acting as 
                  centralized hubs for mechanical distribution.
                </p>
                <p>
                  The Herfindahl-Hirschman Index (HHI), on the other hand, is a measure of market 
                  concentration that identifies unnatural concentrations of power or timing. In the context 
                  of blockchain transactions, a high HHI value suggests that a small group of wallets is 
                  dominating the transaction flow, which is a key indicator of a coordinated attack. These 
                  metrics act as a forensic lens, allowing us to examine the transaction flows and 
                  identify patterns that are not immediately apparent to traditional security layers.
                </p>
                <p>
                  To detect these patterns, TrustChain utilizes a relentless <strong>3,000ms sliding window</strong>, 
                  which enables us to analyze the transaction flows in real-time and identify anomalies as 
                  they occur. This approach allows us to detect when a group of seemingly separate addresses 
                  are actually acting as a single, synchronized entity. We refer to this as the 
                  <strong>Temporal Sentinel</strong>—a mathematical filter that catches what the human eye 
                  and traditional security layers may miss.
                </p>
                <p>
                  We repurposed these formulas from the highest levels of global finance and law enforcement. 
                  The HHI is the same tool used by the <strong>U.S. Department of Justice (DOJ)</strong> to 
                  identify illegal market monopolies, while the Gini Coefficient is the worldwide standard 
                  for measuring economic inequality. By applying these battle-tested economic indicators to 
                  blockchain transaction flows, TrustChain transforms "big data" into actionable security, 
                  measuring the concentration of power and behavioral entropy with the same precision used 
                  to regulate global markets.
                </p>
              </div>
            )}
          </div>

          <div className={`workflow-step-v2 ${activeStep === 3 ? 'active' : ''}`} onClick={() => toggleStep(3)}>
            <div className="step-header">
              <div className="step-number">03</div>
              <h4>Action: Autonomous Neutralization & Immunity</h4>
              <span className="expand-icon">{activeStep === 3 ? '−' : '+'}</span>
            </div>
            {activeStep === 3 && (
              <div className="step-content">
                <p>
                  Detection is merely the catalyst for immediate, autonomous response, marking the inception 
                  of a multi-layered defense mechanism that safeguards the integrity of the network. Once the 
                  forensic engine identifies a statistical anomaly, TrustChain's <strong>Action Layer</strong> 
                  executes a surgical isolation protocol, leveraging advanced algorithms to pinpoint and contain 
                  the malicious activity. This precision-driven approach enables the swift identification and 
                  segregation of compromised addresses, which are then instantly assigned a 
                  <strong>"Restricted"</strong> status in the global reputation ledger. This designation is 
                  more than a simple "ban"; it represents a sophisticated isolation into a 
                  <strong>Sybil-Trap</strong>—a cordoned environment where the attacker's transactions are 
                  neutralized before they can ever impact the protocol's core liquidity or governance systems.
                </p>
                <p>
                  The <strong>Sybil-Trap</strong>, a proprietary component of TrustChain's defense architecture, 
                  operates as a dynamic quarantine zone, where suspect addresses are redirected and their 
                  transactions are rendered inert. This proactive measure prevents the potential contamination 
                  of the network, ensuring that the protocol's core systems remain insulated from malicious influence. 
                  By creating an environment that is inhospitable to automated threats, TrustChain effectively 
                  disrupts the attack vectors that bot swarms and other malicious entities rely upon to 
                  manipulate the network.
                </p>
                <p>
                  This automated response creates a self-healing <strong>"Sovereign Immune System"</strong> 
                  for your application, empowering it to withstand and adapt to an ever-evolving landscape 
                  of threats. By isolating bot swarms at the network's edge, TrustChain ensures that token 
                  launches remain fair, liquidity pools remain deep and resilient, and DAO voting remains 
                  uncorrupted by mechanical influence. Furthermore, this system grants 
                  <strong>Sovereign Immunity</strong> to legitimate users. Those elevated to 
                  <strong>Steward</strong> or <strong>Resident</strong> status receive priority access and 
                  enhanced multipliers. In the world of TrustChain, the network remains a sanctuary for real 
                  participants while remaining a desert for machines.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROTOCOL REVEAL VIDEO */}
      <section className="protocol-reveal">
        <div className="section-content">
          <h2 className="section-title">Protocol Reveal</h2>
          <div className="video-wrapper glass-morph">
            <iframe 
              src="https://player.vimeo.com/video/1179204911?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              style={{ width: '100%', aspectRatio: '16/9', borderRadius: '4px' }}
              title="TrustChain Protocol Reveal"
            ></iframe>
          </div>
          <p className="video-caption">Real-time entropy analysis neutralizing a distributed Sybil attack.</p>
        </div>
      </section>

      <section className="features-grid">
        {/* React Hook Section - PROMOTED */}
        <div className="feature-card glass-morph dev-card">
          <div className="feature-header">
            <div className="feature-icon-box hook-glow"></div>
            <h3>useTrustChain() React Hook</h3>
          </div>
          <p>
            Protect your frontend with a single line of code. Our React hook connects directly to the 
            Sentinel network, providing real-time reputation data for the connected wallet. Instantly 
            gate high-value actions, prevent Sybil manipulation in DAOs, and ensure your token launches 
            remain strictly human-only.
          </p>
          <div className="hook-code-wrapper">
            <pre className="hook-code">
{`const { data, loading } = useIntegrity();
if (data.status === 'RESTRICTED') {
  return <AccessDenied />;
}`}
            </pre>
            <button className="copy-btn" onClick={copyHookCode}>COPY HOOK</button>
          </div>
          <div className="card-footer-tag">NPM: @trustchain/react</div>
        </div>

        {/* Mobile Connectivity Card */}
        <div className="feature-card glass-morph mobile-card">
          <div className="feature-header">
            <div className="feature-icon-box mobile-glow"></div>
            <h3>Mobile Frontier Sync</h3>
          </div>
          <p>
            TrustChain is natively optimized for the mobile frontier. Whether you're using Solflare, 
            Phantom, or the Saga hardware, our protocol maintains a persistent, low-latency 
            connection to the behavioral ledger. Secure your mobile dApp with the same high-fidelity 
            forensics used on desktop, ensuring a seamless and secure experience for users on the move.
          </p>
          <div className="connection-guide">
            <ol>
              <li>Initialize the TrustChain Provider in your App root.</li>
              <li>Connect via Solflare or Phantom mobile apps.</li>
              <li>Identity is verified in under 3,000ms.</li>
            </ol>
          </div>
          <div className="card-footer-tag">NETWORK: MAINNET-READY</div>
        </div>

        {/* Sovereign Identity Card */}
        <div className="feature-card glass-morph identity-card">
          <div className="feature-header">
            <div className="feature-icon-box identity-glow"></div>
            <h3>Sovereign Authenticity</h3>
          </div>
          <p>
            Every line of our protocol is a statement of integrity. All official releases are 
            cryptographically signed using our RSA-4096 Sovereign Key. This isn't just a 
            security feature; it's a digital wax seal from <strong>Jonathon & Maya</strong>, 
            ensuring that the code you run is the exact, uncorrupted architecture we built 
            in the forge. Zero backdoors. Absolute transparency.
          </p>
          <div className="card-footer-tag">SIG: RSA-PSS VERIFIED</div>
        </div>
      </section>

      <section className="tiers-section">
        <h2 className="section-title">Reputation Governance</h2>
        <div className="tiers-container">
          <div className="tier-card-new steward-theme">
            <div className="tier-header">STEWARD</div>
            <div className="tier-multiplier">1.2x</div>
            <div className="tier-desc">
              <strong>100% Trust. Full Priority.</strong>
              <p>The highest echelon of Sovereign Identity. Stewards are verified human participants with a flawless history of organic behavior. They receive maximum governance weight and prioritized transaction execution.</p>
            </div>
          </div>
          <div className={`tier-card-new resident-theme`}>
            <div className="tier-header">RESIDENT</div>
            <div className="tier-multiplier">1.0x</div>
            <div className="tier-desc">
              <strong>Verified Stability.</strong>
              <p>Standard operating status for established users. Residents have cleared the initial entropy checks and are recognized as stable, non-mechanical participants in the ecosystem.</p>
            </div>
          </div>
          <div className="tier-card-new probationary-theme">
            <div className="tier-header">PROBATIONARY</div>
            <div className="tier-multiplier">0.5x</div>
            <div className="tier-desc">
              <strong>Observation Window.</strong>
              <p>New addresses and low-activity wallets enter here. During this phase, the Sentinel monitors for any signs of Sybil-cluster alignment or mechanical bursts before elevating status.</p>
            </div>
          </div>
          <div className="tier-card-new restricted-theme">
            <div className="tier-header">RESTRICTED</div>
            <div className="tier-multiplier">0x</div>
            <div className="tier-desc">
              <strong>Firewall Isolation.</strong>
              <p>Addresses flagged by the forensic engine for high entropy, coordinated timing, or Sybil-pattern alignment. Restricted addresses are isolated in the Sybil-trap to protect the protocol.</p>
            </div>
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
