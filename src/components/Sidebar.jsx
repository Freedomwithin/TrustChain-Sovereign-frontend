import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isSimulationMode, toggleSimulationMode }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">SENTINEL PROTOCOL</div>
        <div className="sidebar-subtitle">v2.4.0-ALPHA</div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">NETWORK STATE</div>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">MAINNET-BETA</span>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">SIMULATION CONTROL</div>
        <div className="toggle-container">
          <span className="toggle-label">ATTACK VECTOR</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isSimulationMode}
              onChange={toggleSimulationMode}
            />
            <span className="slider"></span>
          </label>
        </div>
        {isSimulationMode && (
          <div className="simulation-warning">
            WARNING: SIMULATED VOLATILITY ACTIVE
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="footer-item">UPTIME: 99.99%</div>
        <div className="footer-item">LATENCY: 12ms</div>
      </div>
    </div>
  );
};

export default Sidebar;
