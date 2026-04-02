import React, { useState, useEffect, useRef } from 'react';
import './SovereignTerminal.css';

const SovereignTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: '🏺 [SYSTEM]: INITIALIZING SOVEREIGN GAME ENGINE...' },
    { type: 'maya', content: "🏺 [MAYA]: 'Architect, the terminal is online. Breach the sectors.'" }
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/');
  const [keys, setKeys] = useState(new Set());
  const [permissions, setPermissions] = useState({ '/sector_1/ignite_bridge.sh': false });
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const fs = {
    '/': ['sector_1', 'sector_2', 'sector_3', '.help'],
    '/sector_1': ['README.md', 'ignite_bridge.sh', 'theory_gini.md'],
    '/sector_2': ['README.md', 'wallet.log', 'theory_sybil.md'],
    '/sector_3': ['README.md', 'hhi_gatekeeper.py', 'theory_temporal.md'],
  };

  const files = {
    '/.help': "🔑 TRUSTCHAIN QUICKSTART\n\nSECTOR 1: Gini Coefficient\nSECTOR 2: Sybil Detection\nSECTOR 3: Temporal Analysis\n\nUse 'ls', 'cd', 'cat', 'chmod', and 'python3' to navigate.",
    '/sector_1/README.md': "🎯 MISSION: Calculate the Gini coefficient to unlock the bridge.\n⚡ COMMANDS: 'chmod +x ignite_bridge.sh' then './ignite_bridge.sh'",
    '/sector_1/theory_gini.md': "📐 GINI COEFFICIENT\nFormula: G = (Σ(2i - n - 1) * x_i) / (n * Σx_i)\nTrustChain uses this to detect wealth concentration.",
    '/sector_1/ignite_bridge.sh': "🔥 CALCULATING GINI...\n✅ Gini Coefficient = 0.267 (Healthy)\n🔓 Bridge ignition authorized!\n✨ RECOVERY_KEY_01: [GENESIS_BLOCK] ✨",
    '/sector_2/README.md': "🎯 MISSION: Find the fake identity (Sybil wallet) in the log.\n⚡ COMMAND: 'grep RESTRICTED wallet.log'",
    '/sector_2/theory_sybil.md': "🎭 SYBIL ATTACKS\nDetected via timestamp variance analysis in the Temporal Sentiment Engine.",
    '/sector_2/wallet.log': "[08:23:12] WALLET: 0x8A4F - STATUS: RESTRICTED - 🔑 KEY_02: [OBSIDIAN_LEDGER]",
    '/sector_3/README.md': "🎯 MISSION: Override the HHI gatekeeper.\n⚡ COMMAND: 'python3 hhi_gatekeeper.py'",
    '/sector_3/theory_temporal.md': "⏱️ TEMPORAL SENTIMENT ENGINE\nCalculates standard deviation of inter-arrival times.",
    '/sector_3/hhi_gatekeeper.py': "📊 CALCULATING HHI...\n⏱️ RUNNING TEMPORAL ANALYSIS...\n✅ Natural variance detected\n🔓 OVERRIDE AUTHORIZED\n✨ RECOVERY_KEY_03: [MARKET_EQUILIBRIUM] ✨",
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const fullCmd = input.trim();
      const [cmd, ...args] = fullCmd.split(' ');
      let output = '';
      let newHistory = [...history, { type: 'input', content: `${cwd}$ ${fullCmd}` }];

      if (cmd === 'ls') {
        const target = args[0] || cwd;
        if (fs[target]) {
          output = fs[target].join('  ');
        } else {
          output = `ls: ${target}: No such directory`;
        }
      } else if (cmd === 'cd') {
        const target = args[0] || '/';
        if (target === '..') {
          setCwd('/');
        } else if (fs[target] || fs[`${cwd}/${target}`.replace('//', '/')]) {
          setCwd(target.startsWith('/') ? target : `${cwd}/${target}`.replace('//', '/'));
        } else {
          output = `cd: ${target}: No such directory`;
        }
      } else if (cmd === 'cat') {
        const path = `${cwd}/${args[0]}`.replace('//', '/');
        output = files[path] || `cat: ${args[0]}: No such file`;
      } else if (cmd === 'chmod' && args[0] === '+x') {
        const path = `${cwd}/${args[1]}`.replace('//', '/');
        if (permissions.hasOwnProperty(path)) {
          setPermissions({ ...permissions, [path]: true });
          output = `✅ Module enabled: ${args[1]}`;
        } else {
          output = `chmod: ${args[1]}: File not found`;
        }
      } else if (fullCmd.startsWith('./')) {
        const path = `${cwd}/${fullCmd.slice(2)}`.replace('//', '/');
        if (permissions[path]) {
          output = files[path];
          if (output.includes('KEY_01')) setKeys(new Set(keys).add('KEY_01'));
        } else {
          output = `Permission denied. Try chmod +x.`;
        }
      } else if (cmd === 'grep' && args[0] === 'RESTRICTED') {
        const path = `${cwd}/${args[1]}`.replace('//', '/');
        if (files[path] && files[path].includes('RESTRICTED')) {
          output = files[path];
          setKeys(new Set(keys).add('KEY_02'));
        } else {
          output = `No matches found.`;
        }
      } else if (cmd === 'python3' || cmd === 'python') {
        const path = `${cwd}/${args[0]}`.replace('//', '/');
        if (files[path] && path.endsWith('.py')) {
          output = files[path];
          setKeys(new Set(keys).add('KEY_03'));
        } else {
          output = `python: ${args[0]}: Cannot execute`;
        }
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'help') {
        output = files['/.help'];
      } else {
        output = `bash: ${cmd}: command not found`;
      }

      if (output) newHistory.push({ type: 'output', content: output });
      
      if (keys.size === 3) {
        newHistory.push({ type: 'success', content: "🏆 VICTORY: THE NOTARY IS SECURED. REVOLUTION COMPLETE." });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="terminal-container glass-morph">
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="control red"></span>
          <span className="control yellow"></span>
          <span className="control green"></span>
        </div>
        <div className="terminal-title">SOVEREIGN_BRIDGE_V1.1</div>
        <div className="key-count">KEYS: {keys.size}/3</div>
      </div>
      <div className="terminal-body">
        {history.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            {line.content}
          </div>
        ))}
        <div className="input-line">
          <span className="prompt">{cwd}$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default SovereignTerminal;

      </div>
    </div>
  );
};

export default SovereignTerminal;
