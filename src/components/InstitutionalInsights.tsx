import React from 'react';
import './InstitutionalInsights.css';

interface InstitutionalInsightsProps {
  isElite: boolean;
}

export const InstitutionalInsights: React.FC<InstitutionalInsightsProps> = ({ isElite }) => {
  return (
    <div className={`institutional-insights-container ${isElite ? 'unlocked' : 'locked'}`}>
      <div className="header">
        <h2>Institutional Insights</h2>
        <div className="badge-container">
           {isElite ? <span className="status-badge elite">ELITE VERIFIED</span> : <span className="status-badge locked">LOCKED</span>}
        </div>
      </div>

      <div className="content-area">
        {isElite ? (
          <div className="insights-content">
             <div className="insight-card">
                <h3>Market Depth Analysis</h3>
                <div className="placeholder-chart"></div>
                <p>Real-time liquidity concentration indicates strong support at key levels.</p>
             </div>
             <div className="insight-card">
                <h3>Whale Activity</h3>
                <div className="placeholder-chart"></div>
                <p>Institutional accumulation detected in major pools over the last 4 hours.</p>
             </div>
          </div>
        ) : (
          <div className="gated-content">
            <div className="lock-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15V17M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Access Restricted</h3>
            <p className="gated-message">
              This intelligence layer is reserved for wallets with verified high-integrity history.
              <br />
              <span className="requirement">Requirement: FairScale Reputation Score 85+</span>
            </p>
            <div className="cta-container">
              <button className="learn-more-btn" disabled>Build Reputation</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
