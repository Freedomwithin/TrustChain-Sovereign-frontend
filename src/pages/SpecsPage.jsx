import React from 'react';
import './SpecsPage.css';

const SpecsPage = () => {
  return (
    <div className="specs-container">
      <div className="grid-overlay"></div>
      
      <section className="specs-hero">
        <h1 className="specs-title">Technical Specifications</h1>
        <p className="specs-subtitle">Sovereign Protocol Architecture v3.1</p>
      </section>

      <div className="specs-grid">
        {/* Behavioral Firewall Section */}
        <div className="spec-card">
          <div className="spec-header">
            <span className="spec-index">01</span>
            <h3>Behavioral Firewall</h3>
          </div>
          <div className="spec-body">
            <p>The Behavioral Firewall operates at the ingestion layer, analyzing transaction entropy before state commitment.</p>
            <ul>
              <li><strong>Latency:</strong> &lt; 15ms overhead</li>
              <li><strong>Detection:</strong> Real-time pattern matching</li>
              <li><strong>Isolation:</strong> Automated Sybil trap triggering</li>
            </ul>
          </div>
        </div>

        {/* Gini Forensics Section */}
        <div className="spec-card">
          <div className="spec-header">
            <span className="spec-index">02</span>
            <h3>Gini Forensics</h3>
          </div>
          <div className="spec-body">
            <p>Calculates the concentration of token distribution and voting power across address clusters.</p>
            <ul>
              <li><strong>Hard Threshold:</strong> 0.70 (Adjustable by DAO)</li>
              <li><strong>Sampling Frequency:</strong> Every 50 slots</li>
              <li><strong>Alert Trigger:</strong> Parity breach &gt; 5%</li>
            </ul>
          </div>
        </div>

        {/* Temporal Sentinel Section */}
        <div className="spec-card">
          <div className="spec-header">
            <span className="spec-index">03</span>
            <h3>Temporal Sentinel</h3>
          </div>
          <div className="spec-body">
            <p>Analyzes the "rhythm" of address activity to distinguish between human and algorithmic interaction.</p>
            <ul>
              <li><strong>Window Size:</strong> 3,000ms sliding</li>
              <li><strong>Metric:</strong> Standard deviation of inter-arrival times</li>
              <li><strong>Penalty:</strong> Immediate reputation degradation</li>
            </ul>
          </div>
        </div>

        {/* HHI Gatekeeper Section */}
        <div className="spec-card">
          <div className="spec-header">
            <span className="spec-index">04</span>
            <h3>HHI Gatekeeper</h3>
          </div>
          <div className="spec-body">
            <p>Monitors market concentration using the Herfindahl-Hirschman Index.</p>
            <ul>
              <li><strong>Logic:</strong> Dual-key authentication for high-HHI events</li>
              <li><strong>Scope:</strong> Liquidity pools & Governance vaults</li>
              <li><strong>Response:</strong> Rate-limiting under centralisation spikes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Snippet / Config Example */}
      <section className="config-preview">
        <h3>Sentinel Configuration</h3>
        <pre className="code-block">
{`{
  "protocol": "TrustChain",
  "version": "3.1",
  "sentinel": {
    "window_ms": 3000,
    "gini_limit": 0.70,
    "hhi_dual_gate": true,
    "reputation_tiers": ["STEWARD", "RESIDENT", "PROBATIONARY", "RESTRICTED"]
  }
}`}
        </pre>
      </section>
    </div>
  );
};

export default SpecsPage;
