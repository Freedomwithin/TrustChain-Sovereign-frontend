import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;
import { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import RiskDetail from './components/RiskDetail.jsx';
import InstitutionalInsights from './components/InstitutionalInsights.jsx';
import GovernanceStanding from './components/GovernanceStanding.jsx';
import { useTrustChain } from './sdk/useTrustChain';
import { getStatusDisplay } from './utils/statusDisplay';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://trustchain-sovereign-backend.vercel.app';

function WalletIntegrity({ isSimulationMode, showToast }) {
  const { connected: walletConnected, publicKey } = useWallet();
  const isForcedDemo = typeof window !== 'undefined' && window.forceDemoWallet;
  const connected = walletConnected || isForcedDemo;

  const { data, loading, error, refetch } = useTrustChain();

  // Destructure data safely
  let status = data?.status || null;
  let scores = data?.scores || {};
  let giniScore = scores.gini != null ? parseFloat(scores.gini) : null;
  let hhiScore = scores.hhi != null ? parseFloat(scores.hhi) : null;
  let syncIndex = scores.syncIndex != null ? parseFloat(scores.syncIndex) : null;
  let reason = data?.reason || null;
  let latencyMs = data?.latencyMs != null ? parseFloat(data.latencyMs) : null;
  let totalScore = data?.totalScore != null ? parseFloat(data.totalScore) : null;
  let fairScaleSocial = data?.fairScaleSocial != null ? parseFloat(data.fairScaleSocial) : null;
  let governance = data?.governance || null;

  // --- INSTITUTIONAL DEMO OVERRIDE ---
  const isDemoWallet = (publicKey?.toBase58() === "FBbjMhKtg1iyy83CeHaieqEFqw586i3WYG4zCcnXr7tc") || isForcedDemo;

  if (isDemoWallet) {
    status = "VERIFIED";
    giniScore = 0.125;
    hhiScore = 0.082;
    syncIndex = 0.150;
    reason = "Institutional Integrity Confirmed via Notary";
    totalScore = 95;
    fairScaleSocial = 80;
  }
  // --- END OVERRIDE ---

  if (!connected) return null;

  const isElite = totalScore !== null && totalScore >= 85;

  return (
    <>
      <RiskDetail
        status={status}
        giniScore={giniScore}
        hhiScore={hhiScore}
        syncIndex={syncIndex}
        reason={reason}
        latencyMs={latencyMs}
        loading={loading}
        error={error}
        refetch={refetch}
        totalScore={totalScore}
        fairScaleSocial={fairScaleSocial}
        isSimulationMode={isSimulationMode}
      />
      <InstitutionalInsights
        isElite={isElite}
        giniScore={giniScore}
        hhiScore={hhiScore}
        showToast={showToast}
      />
      <GovernanceStanding
        governance={governance}
        isProbationary={status === 'PROBATIONARY'}
        hhiScore={hhiScore}
      />
    </>
  );
}

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

const pools = [
  { id: 'SOL-USDC', name: 'SOL-USDC Pool' },
  { id: 'JUP-SOL', name: 'JUP-SOL Pool' },
  { id: 'RAY-SOL', name: 'RAY-SOL Pool' },
];

function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(13, 17, 23, 0.95)',
      border: '1px solid #00ffa3',
      color: '#00ffa3',
      padding: '1rem 2rem',
      borderRadius: '2px',
      boxShadow: '0 0 20px rgba(0, 255, 163, 0.2)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontFamily: 'monospace',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{ display: 'flex' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div>{message}</div>
    </div>
  );
}

function App() {
  const [poolIntegrity, setPoolIntegrity] = useState({});
  const [loadingPools, setLoadingPools] = useState(true);
  const [isSimulationMode, setSimulationMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setLoadingPools(true);

    const fetchPromises = pools.map(pool =>
      fetch(`${API_BASE_URL}/api/pool/${pool.id}/integrity`)
        .then(res => res.json())
        .then(data => ({ id: pool.id, data }))
        .catch(err => ({ id: pool.id, error: err }))
    );

    Promise.all(fetchPromises)
      .then(results => {
        const integrityMap = {};
        results.forEach(result => {
          if (!result.error) {
            integrityMap[result.id] = result.data;
          }
        });
        setPoolIntegrity(integrityMap);
        setLoadingPools(false);
      })
      .catch(err => {
        console.error('Parallel API error:', err);
        setLoadingPools(false);
      });
  }, []);

  return (
    <div className="App">
      <Sidebar
        isSimulationMode={isSimulationMode}
        toggleSimulationMode={() => setSimulationMode(prev => !prev)}
      />
      <div className="main-content" style={{ marginLeft: 'var(--sidebar-width)', width: 'calc(100% - var(--sidebar-width))' }}>
        <Navbar />
        <div className="hero-content">
          <h1>TrustChain - Live Solana Pools</h1>
          <WalletIntegrity
            isSimulationMode={isSimulationMode}
            showToast={showToast}
          />
          <div className="pool-grid">
            {pools.map(pool => (
              <div key={pool.id} className="pool-card">
                <h3>{pool.name}</h3>
                <PoolIntegrityBadge
                  integrity={poolIntegrity[pool.id]}
                  loading={loadingPools}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
