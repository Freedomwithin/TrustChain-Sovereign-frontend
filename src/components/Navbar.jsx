import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sovereign-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <span className="logo-icon"></span>
          <span className="logo-text">TRUSTCHAIN</span>
        </Link>
        
        <div className="mobile-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
          <Link to="/specs" className="nav-item" onClick={() => setMobileMenuOpen(false)}>SPECS</Link>
          <Link to="/vision" className="nav-item" onClick={() => setMobileMenuOpen(false)}>VISION</Link>
          <Link to="/bridge" className="nav-item" style={{ color: '#6366f1', fontWeight: 'bold' }} onClick={() => setMobileMenuOpen(false)}>BRIDGE</Link>
          <Link to="/swarm-hub" className="nav-item" style={{ color: '#A5B4FC', fontWeight: 'bold' }} onClick={() => setMobileMenuOpen(false)}>SWARM HUB</Link>
          <a href="https://github.com/Freedomwithin/TrustChain-Sovereign-frontend" target="_blank" rel="noopener noreferrer" className="nav-item">GITHUB</a>
          <button className="nav-cta" onClick={() => handleNavClick('/dashboard')}>LAUNCH CONSOLE</button>
          <div className="nav-wallet-wrapper">
            <WalletMultiButton className="wallet-adapter-button" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
