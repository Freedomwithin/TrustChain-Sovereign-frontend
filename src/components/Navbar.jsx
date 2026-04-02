import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sovereign-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon"></span>
          <span className="logo-text">TRUSTCHAIN</span>
        </Link>
        
        {/* Mobile Wallet Button (Visible only on mobile) */}
        <div className="mobile-wallet-container">
          <WalletMultiButton className="wallet-adapter-button" />
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-item">HOME</Link>
          <Link to="/specs" className="nav-item">SPECS</Link>
          <Link to="/vision" className="nav-item">VISION</Link>
          <Link to="/bridge" className="nav-item" style={{ color: '#6366f1', fontWeight: 'bold' }}>BRIDGE</Link>
          <Link to="/commander" className="nav-item" style={{ color: '#C084FC', fontWeight: 'bold' }}>LABS</Link>
          <a href="https://github.com/Freedomwithin/TrustChain-Sovereign-frontend" target="_blank" rel="noopener noreferrer" className="nav-item">GITHUB</a>
          <button className="nav-cta" onClick={() => navigate('/dashboard')}>LAUNCH CONSOLE</button>
          <WalletMultiButton className="wallet-adapter-button" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
