import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import './GovernanceStanding.css';

const GovernanceStanding = ({ governance, isProbationary, hhiScore }) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [showPower, setShowPower] = useState(false);

  // Default governance values if missing
  const tier = governance?.tier || (isProbationary ? 'Probationary' : 'Verified');
  const multiplier = governance?.voterWeightMultiplier !== undefined ? governance.voterWeightMultiplier : (isProbationary ? 0.1 : 1.0);

  // Determine if HHI is high (Whale/Concentration)
  const isHighHHI = hhiScore > 0.25; // Matching RiskDetail logic

  useEffect(() => {
    if (publicKey && connection) {
      setLoadingBalance(true);
      connection.getBalance(publicKey)
        .then(bal => {
            setBalance(bal / LAMPORTS_PER_SOL);
            setLoadingBalance(false);
        })
        .catch(err => {
            console.error("Failed to fetch balance", err);
            setLoadingBalance(false);
        });
    }
  }, [publicKey, connection]);

  const effectivePower = balance * multiplier;

  const getTierClass = (t) => {
    switch (t?.toLowerCase()) {
        case 'steward': return 'tier-steward';
        case 'verified': return 'tier-verified';
        case 'probationary': return 'tier-probationary';
        case 'restricted': return 'tier-restricted';
        default: return 'tier-verified';
    }
  };

  const tierClass = getTierClass(tier);

  return (
    <div className={`governance-standing-card ${tierClass}`}>
      <h3>Governance Standing</h3>

      <div className={`tier-badge ${tier.toLowerCase()}`}>
        {tier}
      </div>

      <div className="governance-metrics">
        <div className="metric-item">
            <span className="metric-label">Multiplier</span>
            <span className="metric-value" style={{ color: tier === 'Restricted' ? '#ef4444' : (tier === 'Steward' ? '#FFD700' : '#fff') }}>
                {multiplier.toFixed(1)}x
            </span>
        </div>
        <div className="metric-item">
             <span className="metric-label">Vote Status</span>
             <span className="metric-value">
                {tier === 'Restricted' ? 'BLOCKED' : 'ACTIVE'}
             </span>
        </div>
      </div>

      <button
        className="simulated-vote-btn"
        disabled={tier === 'Restricted'}
        onMouseEnter={() => setShowPower(true)}
        onMouseLeave={() => setShowPower(false)}
        onClick={() => setShowPower(!showPower)}
      >
        {showPower ? (
            <span>Power: <span className="vote-power-value">{effectivePower.toFixed(2)}</span></span>
        ) : (
            <span>Simulate Vote</span>
        )}
      </button>

      {/* Forensic Breakdown Tooltip */}
      {isProbationary && isHighHHI && (
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#fbbf24' }}>
            <span className="warning-icon">⚠️</span>
            <span style={{ marginLeft: '0.5rem' }}>Throttled</span>
            <div className="forensic-tooltip-container">
                <span style={{ borderBottom: '1px dotted #fbbf24' }}>Forensic Breakdown</span>
                <div className="forensic-tooltip">
                    <strong>Forensic Heartbeat:</strong><br/>
                    Voting power throttled due to high concentration (HHI: {hhiScore?.toFixed(2)}).
                    This indicates potential "Whale" behavior or low liquidity spread.
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceStanding;
