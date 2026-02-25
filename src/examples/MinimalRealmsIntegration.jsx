import React from 'react';
import { useTrustChain } from '../sdk/useTrustChain';

const MinimalRealmsIntegration = () => {
    // 1. Hook Integration
    const {
        data,
        voterWeightMultiplier,
        loading,
        error
    } = useTrustChain({ mock: false });

    // 2. Gating Logic
    // We assume data.status contains 'VERIFIED', 'PROBATIONARY', etc.
    const status = data?.status || 'UNKNOWN';
    const isVerified = status === 'VERIFIED';
    const hasVotingPower = voterWeightMultiplier >= 1.0;

    // Simple permission check
    const canPropose = isVerified && hasVotingPower;

    return (
        <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', background: '#0D1117', color: '#fff', fontFamily: 'monospace' }}>
            <h3>TrustChain Realms Integration</h3>

            <div style={{ marginBottom: '15px' }}>
                <div style={{ marginBottom: '5px' }}>
                    <strong>Integrity Status:</strong> <span style={{ color: isVerified ? '#00ffa3' : '#ef4444' }}>{loading ? 'Checking...' : status}</span>
                </div>
                <div>
                    <strong>Voting Multiplier:</strong> {loading ? '...' : `${(voterWeightMultiplier || 0).toFixed(2)}x`}
                </div>
            </div>

            {error && <div style={{ color: '#ef4444', marginBottom: '10px' }}>Error: {error}</div>}

            {/* 3. Gated Action Button */}
            <button
                disabled={!canPropose || loading}
                style={{
                    backgroundColor: canPropose ? '#00ffa3' : '#1F2937',
                    color: canPropose ? '#000' : '#6B7280',
                    cursor: canPropose ? 'pointer' : 'not-allowed',
                    padding: '10px 20px',
                    border: '1px solid #333',
                    borderRadius: '2px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                }}
            >
                Submit Proposal
            </button>

            {!canPropose && !loading && (
                <p style={{ fontSize: '0.8em', color: '#6B7280', marginTop: '10px' }}>
                    * Requires VERIFIED status and >= 1.0x multiplier
                </p>
            )}
        </div>
    );
};

export default MinimalRealmsIntegration;
