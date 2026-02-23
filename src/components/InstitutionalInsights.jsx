import React from 'react';

const InstitutionalInsights = ({ isElite }) => {
  if (!isElite) {
    return (
      <div className="institutional-insights-locked" style={{
        marginTop: '2rem',
        padding: '2rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
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
            backdropFilter: 'blur(8px)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.6)',
            flexDirection: 'column',
            padding: '2rem'
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

      <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
          textAlign: 'left'
      }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Market Sentiment</h4>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Bullish Trend Detected</div>
              <div style={{ height: '4px', background: '#333', marginTop: '0.5rem', borderRadius: '2px' }}>
                  <div style={{ width: '70%', height: '100%', background: '#00ffa3', borderRadius: '2px' }}></div>
              </div>
          </div>
           <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Whale Accumulation</h4>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Moderate Activity</div>
              <div style={{ height: '4px', background: '#333', marginTop: '0.5rem', borderRadius: '2px' }}>
                   <div style={{ width: '40%', height: '100%', background: '#fbbf24', borderRadius: '2px' }}></div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default InstitutionalInsights;
