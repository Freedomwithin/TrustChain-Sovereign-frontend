import React, { useState, useEffect, useRef } from 'react';
import './SovereignTerminal.css';

const SovereignTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: '[SYSTEM]: INITIALIZING SOVEREIGN GAME ENGINE...' },
    { type: 'maya', content: "[SENTINEL]: 'Architect, the terminal is online. Breach the sectors.'" }
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/');
  const [keys, setKeys] = useState(new Set());
  const [permissions, setPermissions] = useState({ '/sector_1/ignite_bridge.sh': false });
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fs = {
    '/': ['sector_1', 'sector_2', 'sector_3', '.help'],
    '/sector_1': ['README.md', 'ignite_bridge.sh', 'theory_gini.md'],
    '/sector_2': ['README.md', 'wallet.log', 'theory_sybil.md'],
    '/sector_3': ['README.md', 'hhi_gatekeeper.py', 'theory_temporal.md'],
  };

  const files = {
    '/.help': "TRUSTCHAIN QUICKSTART\n\nSECTOR 1: Gini Coefficient\nSECTOR 2: Sybil Detection\nSECTOR 3: Temporal Analysis\n\nUse 'ls', 'cd', 'cat', 'chmod', and 'python3' to navigate.",
    '/sector_1/README.md': "MISSION: Calculate the Gini coefficient to unlock the bridge.\nCOMMANDS: 'chmod +x ignite_bridge.sh' then './ignite_bridge.sh'",
    '/sector_1/theory_gini.md': "GINI COEFFICIENT\nFormula: G = (sum(2i - n - 1) * x_i) / (n * sum(x_i))\nTrustChain enforces a hard limit of 0.70.\nAbove this threshold, distribution inequality signals bot-driven concentration.",
    '/sector_1/ignite_bridge.sh': "CALCULATING GINI...\nAnalyzing wallet distribution across 847 active participants...\nGini Coefficient = 0.267 — Healthy organic distribution detected.\nBridge ignition authorized.\nRECOVERY_KEY_01: [GENESIS_BLOCK]",
    '/sector_2/README.md': "MISSION: Find the restricted wallet (Sybil actor) in the log.\nCOMMAND: 'grep RESTRICTED wallet.log'",
    '/sector_2/theory_sybil.md': "SYBIL DETECTION\nCoordinated identity networks are detected via correlated transaction timing.\nThe Temporal Sentiment Engine measures inter-arrival standard deviation.\nA variance approaching zero indicates mechanical, non-human regularity.",
    '/sector_2/wallet.log': "[08:23:12] WALLET: 0x8A4F — STATUS: RESTRICTED — KEY_02: [OBSIDIAN_LEDGER]",
    '/sector_3/README.md': "MISSION: Override the HHI gatekeeper.\nCOMMAND: 'python3 hhi_gatekeeper.py'",
    '/sector_3/theory_temporal.md': "TEMPORAL SENTINEL ENGINE\nCalculates standard deviation of inter-arrival times.\nFormula: sigma = sqrt((1/M) * sum((t_m - t_mean)^2))\nWhen sigma approaches 0, mechanical regularity is confirmed.",
    '/sector_3/hhi_gatekeeper.py': "CALCULATING HHI...\nRunning Temporal Sentinel analysis...\nHHI Index = 0.119 — Concentration within safe threshold.\nTemporal sigma = 0.84 — Natural human variance confirmed.\nDual gatekeeper override authorized.\nRECOVERY_KEY_03: [MARKET_EQUILIBRIUM]",
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const fullCmd = input.trim();
      if (!fullCmd) return;
      const [cmd, ...args] = fullCmd.split(' ');
      let output = '';
      let newHistory = [...history, { type: 'input', content: `${cwd}$ ${fullCmd}` }];
      let newKeys = new Set(keys);

      if (cmd === 'ls') {
        const target = args[0] || cwd;
        const normalizedTarget = target.startsWith('/') ? target : `${cwd}/${target}`.replace('//', '/');
        if (fs[normalizedTarget]) {
          output = fs[normalizedTarget].join('  ');
        } else {
          output = `ls: ${target}: No such directory`;
        }
      } else if (cmd === 'cd') {
        const target = args[0] || '/';
        if (target === '..') {
          setCwd('/');
        } else {
          const newPath = target.startsWith('/') ? target : `${cwd}/${target}`.replace('//', '/');
          if (fs[newPath]) {
            setCwd(newPath);
          } else {
            output = `cd: ${target}: No such directory`;
          }
        }
      } else if (cmd === 'pwd') {
        output = cwd;
      } else if (cmd === 'cat') {
        if (!args[0]) {
          output = 'cat: missing operand';
        } else {
          const path = `${cwd}/${args[0]}`.replace('//', '/');
          output = files[path] || `cat: ${args[0]}: No such file`;
        }
      } else if (cmd === 'chmod' && args[0] === '+x') {
        const path = `${cwd}/${args[1]}`.replace('//', '/');
        if (permissions.hasOwnProperty(path)) {
          setPermissions({ ...permissions, [path]: true });
          output = `Permissions updated: ${args[1]} is now executable.`;
        } else {
          output = `chmod: ${args[1]}: File not found`;
        }
      } else if (fullCmd.startsWith('./')) {
        const scriptName = fullCmd.slice(2);
        const path = `${cwd}/${scriptName}`.replace('//', '/');
        if (permissions[path]) {
          output = files[path];
          if (output && output.includes('KEY_01')) newKeys.add('KEY_01');
        } else {
          output = `Permission denied. Run 'chmod +x ${scriptName}' first.`;
        }
      } else if (cmd === 'grep') {
        const term = args[0];
        const filename = args[1];
        const path = `${cwd}/${filename}`.replace('//', '/');
        if (files[path] && files[path].includes(term)) {
          output = files[path];
          if (term === 'RESTRICTED') newKeys.add('KEY_02');
        } else {
          output = `grep: no matches found for '${term}'`;
        }
      } else if (cmd === 'python3' || cmd === 'python') {
        if (!args[0]) {
          output = 'python3: missing filename';
        } else {
          const path = `${cwd}/${args[0]}`.replace('//', '/');
          if (files[path] && path.endsWith('.py')) {
            output = files[path];
            newKeys.add('KEY_03');
          } else {
            output = `python3: ${args[0]}: Cannot open or find file`;
          }
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

      if (output) {
        const lines = output.split('\n');
        lines.forEach(line => newHistory.push({ type: 'output', content: line }));
      }
      
      if (newKeys.size === 3 && keys.size < 3) {
        newHistory.push({ type: 'success', content: "ALL THREE SECTORS SECURED. THE NOTARY BRIDGE IS LIVE. BEHAVIORAL FIREWALL ONLINE." });
      }

      setKeys(newKeys);
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
