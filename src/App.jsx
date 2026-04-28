import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SpecsPage from './pages/SpecsPage';
import VisionPage from './pages/VisionPage';
import Dashboard from './pages/Dashboard';
import CommanderLanding from './pages/CommanderLanding';
import SwarmHubLanding from './pages/SwarmHubLanding';
import BridgePage from './pages/BridgePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/specs" element={<SpecsPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/commander" element={<CommanderLanding />} /> */}
          <Route path="/swarm-hub" element={<SwarmHubLanding />} />
          <Route path="/bridge" element={<BridgePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
