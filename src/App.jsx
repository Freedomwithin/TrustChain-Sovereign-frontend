import React from 'react';
import RiskCard from './components/RiskCard.jsx';
import './App.css';

const pools = [
  { id: 'SOL-USDC', name: 'SOL-USDC Pool' },
  { id: 'RAY-SOL', name: 'RAY-SOL Pool' }
];

export default function App() {
  // Logic for loading state and data fetching typically lives here 
  // or inside individual RiskCards depending on architecture choice.
  return (
    <div className="app-container">
      <div className="pool-grid">
        {pools.map(pool => (
          <RiskCard
            key={pool.id}
            pool={pool}
            integrity={null} // Replace with actual data logic
            loading={false}
          />
        ))}
      </div>
    </div>
  );
}
