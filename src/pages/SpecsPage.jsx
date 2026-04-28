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
            <p>
              The Behavioral Firewall represents the first line of defense in the TrustChain immune system. 
              It operates at the ingestion layer, intercepting incoming transaction data from the gRPC 
              Yellowstone stream before state commitment occurs. By utilizing a high-performance 
              pattern-matching engine, the firewall identifies known mechanical signatures—such as 
              identical transaction structures across multiple addresses—and routes them to the 
              surgical isolation layer.
            </p>
            <ul>
              <li><strong>Latency:</strong> &lt; 15ms overhead on state processing</li>
              <li><strong>Detection:</strong> Real-time mechanical pattern matching</li>
              <li><strong>Isolation:</strong> Automated Sybil trap triggering</li>
              <li><strong>Throughput:</strong> Scalable to 50k+ TPS</li>
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
            <p>
              The Gini Forensics engine provides a statistical lens for measuring the concentration of wealth 
              and governance power. By applying the Gini Coefficient—a worldwide standard for measuring 
              economic inequality—TrustChain identifies address clusters that exhibit unnatural "clumpiness." 
              If a group of wallets moves in a way that suggests a single entity controlling a 
              disproportionate share of a protocol's liquidity, the Gini Sentinel triggers an immediate 
              parity breach alert.
            </p>
            <ul>
              <li><strong>Hard Threshold:</strong> 0.70 (Adjustable via DAO governance)</li>
              <li><strong>Sampling Frequency:</strong> Every 50 slots for deep cluster analysis</li>
              <li><strong>Alert Trigger:</strong> Parity breach &gt; 5% deviation from baseline</li>
              <li><strong>Metric:</strong> Lorentz Curve statistical dispersion</li>
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
            <p>
              The Temporal Sentinel is our primary tool for algorithmic detection. It analyzes the "rhythm" 
              of address activity, measuring the standard deviation of inter-arrival times between 
              transactions. Human interactions are naturally stochastic and "messy," whereas bot swarms 
              exhibit a signature of mechanical regularity. By maintaining a relentless 3,000ms sliding 
              window, the Temporal Sentinel can distinguish between a user and a machine with sub-second 
              precision.
            </p>
            <ul>
              <li><strong>Window Size:</strong> 3,000ms rolling analysis</li>
              <li><strong>Metric:</strong> Inter-arrival time (IAT) variance</li>
              <li><strong>Penalty:</strong> Immediate reputation degradation to RESTRICTED</li>
              <li><strong>Validation:</strong> Sub-3s response time</li>
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
            <p>
              The HHI Gatekeeper monitors the structural integrity of liquidity pools and governance vaults. 
              Using the Herfindahl-Hirschman Index (HHI)—the U.S. Department of Justice’s standard for 
              antitrust enforcement—it detects when power becomes too concentrated in a specific sector. 
              When the HHI threshold is breached, the Gatekeeper activates a dual-key authentication 
              protocol, requiring additional verification for high-impact events until the concentration 
              spike subsides.
            </p>
            <ul>
              <li><strong>Logic:</strong> Dual-key authentication for high-HHI events</li>
              <li><strong>Scope:</strong> Liquidity pools & Governance vaults</li>
              <li><strong>Response:</strong> Rate-limiting under centralisation spikes</li>
              <li><strong>Origin:</strong> DOJ Antitrust Enforcement Standard</li>
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
