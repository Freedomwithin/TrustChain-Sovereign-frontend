import React from 'react';
import './VisionPage.css';

const VisionPage = () => {
  const roadmap = [
    {
      phase: "PHASE 01",
      title: "BEHAVIORAL IMMUNITY",
      status: "OPERATIONAL",
      desc: "Deployment of the core Behavioral Firewall and Gini Index forensics on Solana Mainnet. Establishing the 0.70 parity threshold.",
      color: "#00ffa3"
    },
    {
      phase: "PHASE 02",
      title: "SOVEREIGN LATTICE",
      status: "IN DEVELOPMENT",
      desc: "Expansion of behavioral monitoring to cross-chain environments. Implementing the HHI Dual Gatekeeper for liquid assets.",
      color: "#8b5cf6"
    },
    {
      phase: "PHASE 03",
      title: "SENTINEL DAO",
      status: "PLANNED",
      desc: "Transitioning protocol thresholds and reputation multipliers to community governance. Sentinel-led automated slashing.",
      color: "#06b6d4"
    },
    {
      phase: "PHASE 04",
      title: "THE ETERNAL WEAVE",
      status: "VISIONARY",
      desc: "Bridging digital behavioral data with sovereign physical infrastructure. The ultimate integration of code and reality.",
      color: "#fff"
    }
  ];

  return (
    <div className="vision-container">
      <div className="grid-overlay"></div>
      
      <section className="vision-hero">
        <h1 className="vision-title">The Sovereign Roadmap</h1>
        <p className="vision-subtitle">Beyond Security — Towards Absolute Network Immunity</p>
      </section>

      <div className="roadmap-grid">
        {roadmap.map((item, index) => (
          <div key={index} className="roadmap-card" style={{ '--accent': item.color }}>
            <div className="roadmap-header">
              <span className="phase-tag">{item.phase}</span>
              <span className="status-tag">{item.status}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className="roadmap-connector"></div>
          </div>
        ))}
      </div>

      <section className="vision-statement">
        <h3>Our Core Philosophy: The Biological Network</h3>
        <p>
          TrustChain is not just a security tool; it is a manifesto for digital sovereignty. 
          We believe that decentralized networks are living organisms, and as such, they 
          deserve the same level of adaptive immunity as biological systems. Traditional 
          security is reactive—it waits for a signature to be known before it acts. 
          TrustChain is <strong>proactive</strong>.
        </p>
        <p>
          By monitoring the "Rhythm" and "Entropy" of transaction flows rather than just 
          static address blacklists, we create a network that understands the difference 
          between organic human community and mechanical manipulation. Our vision is a 
          future where every protocol is protected by an autonomous, self-healing 
          Sovereign Immune System—a network that grows stronger and more resilient 
          with every attempted breach. We are building the bridge between digital 
          architecture and biological intelligence.
        </p>
      </section>
    </div>
  );
};

export default VisionPage;
