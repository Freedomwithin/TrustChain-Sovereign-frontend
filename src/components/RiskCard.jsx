import React from 'react';
import { getStatusDisplay } from '../utils/statusDisplay';

function PoolIntegrityBadge({ integrity, loading }) {
  if (loading) return <span className="badge loading">Analyzing...</span>;

  const display = getStatusDisplay(integrity?.status, integrity?.extractivenessScore || 0);

  return (
    <div className={`badge-container risk-${display.color}`}>
      <span className={`badge risk-${display.color}`}>
        {display.label}
      </span>
      <div className="notary-info" style={{ marginTop: '8px', lineHeight: '1.2' }}>
        <small style={{ display: 'block', fontSize: '11px', fontWeight: 'bold' }}>
          Gini: {integrity?.giniScore?.toFixed(3) || '0.125'}
        </small>
        <small style={{
          display: 'block',
          fontSize: '9px',
          color: '#00ffa3',
          opacity: 0.8,
          fontFamily: 'monospace',
          marginTop: '4px',
          borderTop: '1px solid rgba(0, 255, 163, 0.2)',
          paddingTop: '4px'
        }}>
          {/* Updated Notary Label for 6QsE Era */}
          Notary: 6QsE...xJ5
        </small>
      </div>
    </div>
  );
}

export default function RiskCard({ pool, integrity, loading }) {
  return (
    <div className="pool-card">
      <h3>{pool.name}</h3>
      <PoolIntegrityBadge
        integrity={integrity}
        loading={loading}
      />
    </div>
  );
}
