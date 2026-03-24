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
        
        <div className="nav-links">
          <Link to="/" className="nav-item">HOME</Link>
          <Link to="/specs" className="nav-item">SPECS</Link>
          <Link to="/vision" className="nav-item">VISION</Link>
          <a href="https://github.com/Freedomwithin/TrustChain-Sovereign-frontend" target="_blank" rel="noopener noreferrer" className="nav-item">GITHUB</a>
          <button className="nav-cta" onClick={() => navigate('/dashboard')}>LAUNCH CONSOLE</button>
          <WalletMultiButton className="wallet-adapter-button" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
