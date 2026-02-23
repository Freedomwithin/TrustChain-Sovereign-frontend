import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
  return (
    <nav className="glass-navbar">
      <div className="logo">
        <span className="icon" style={{ display: 'flex', alignItems: 'center', color: '#00ffa3' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </span>
        <span className="text">TrustChain</span>
      </div>
      <div className="nav-actions">
        <WalletMultiButton className="wallet-btn" />
      </div>
    </nav>
  );
};

export default Navbar;
