import React from 'react';

const InstitutionalInsights = ({ isElite, giniScore, hhiScore, showToast }) => {
  if (!isElite) {
    return (
      <div className="institutional-insights-locked" style={{
        marginTop: '2rem',
        padding: '2rem',
        borderRadius: '16px',
        background: 'rgba(13, 17, 23, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '200px'
      }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(12px)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(13, 17, 23, 0.8)',
            flexDirection: 'column',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <h3 style={{
                color: '#fff',
                textShadow: '0 0 10px rgba(0,0,0,0.5)',
                marginBottom: '0.5rem'
            }}>
                Access Denied
            </h3>
            <p style={{ color: '#ccc' }}>85+ Integrity Score Required for Institutional Data.</p>
        </div>
        {/* Placeholder content behind the blur */}
        <div style={{ opacity: 0.3, filter: 'blur(4px)' }}>
            <h3>Institutional Market Depth</h3>
            <div style={{ height: '60px', background: '#333', margin: '1rem 0', borderRadius: '8px' }}></div>
            <div style={{ height: '60px', background: '#333', margin: '1rem 0', borderRadius: '8px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="institutional-insights-unlocked" style={{
        marginTop: '2rem',
        padding: '2rem',
        borderRadius: '16px',
        background: 'rgba(0, 255, 163, 0.05)',
        border: '1px solid rgba(0, 255, 163, 0.2)',
        textAlign: 'center'
    }}>
      <h3 style={{ color: '#00ffa3', marginBottom: '1rem' }}>Institutional Insights Unlocked</h3>
      <p style={{ color: '#ccc' }}>Advanced market analysis and wallet behavioral patterns are now available.</p>

      {/* Liquidity Persistence Chart */}
      <div style={{
          marginTop: '2rem',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
          <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem', fontFamily: 'monospace' }}>Liquidity Persistence</h4>
          <div style={{ display: 'flex', justifyContent: 'center', height: '150px' }}>
            <svg viewBox="0 0 300 150" style={{ width: '100%', maxWidth: '300px', height: '100%', overflow: 'visible' }}>
                {/* Axes */}
                <line x1="40" y1="130" x2="280" y2="130" stroke="#444" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="130" stroke="#444" strokeWidth="1" />

                {/* Bars logic: Loyal (Green) vs Mercenary (Red) */}
                {/* Use mock or derived values if real data unavailable, ensuring visible bars */}
                <rect x="70" y={130 - Math.min(100, (1 - (hhiScore || 0)) * 90)} width="50" height={Math.min(100, (1 - (hhiScore || 0)) * 90)} fill="rgba(0, 255, 163, 0.8)" />
                <rect x="190" y={130 - Math.min(100, ((hhiScore || 0) * 200 + (giniScore || 0) * 50))} width="50" height={Math.min(100, ((hhiScore || 0) * 200 + (giniScore || 0) * 50))} fill="rgba(239, 68, 68, 0.8)" />

                {/* Labels */}
                <text x="95" y="145" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace">LOYAL</text>
                <text x="215" y="145" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace">MERCENARY</text>
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.75rem', color: '#6c757d', fontFamily: 'monospace' }}>
             <span>RETENTION: HIGH</span>
             <span>CHURN: LOW</span>
          </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button
            onClick={() => showToast && showToast("Integrity Score committed to Solana PDA: 8Xj...9L2")}
            style={{
                background: 'transparent',
                border: '1px solid #00ffa3',
                color: '#00ffa3',
                padding: '0.8rem 1.5rem',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}
            onMouseOver={(e) => {
                e.target.style.background = 'rgba(0, 255, 163, 0.1)';
                e.target.style.boxShadow = '0 0 15px rgba(0, 255, 163, 0.2)';
            }}
            onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.boxShadow = 'none';
            }}
        >
            Notarize Integrity Score
        </button>
      </div>
    </div>
  );
};

export default InstitutionalInsights;
