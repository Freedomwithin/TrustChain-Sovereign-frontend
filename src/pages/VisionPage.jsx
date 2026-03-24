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
        <h3>Our Core Philosophy</h3>
        <p>
          TrustChain is not just a tool; it is a philosophy of digital sovereignty. 
          We believe that decentralized networks deserve the same level of immunity 
          as biological systems. By monitoring "rhythm" and "entropy" instead of just 
          static signatures, we create a network that grows stronger with every 
          attempted breach.
        </p>
      </section>
    </div>
  );
};

export default VisionPage;
