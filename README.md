# TrustChain Sovereign: Frontend

Institutional-Grade Monitoring HUD for the Solana Behavioral Firewall

**Live Interface:** [trustchainsovereign.com](https://trustchainsovereign.com)
**Video Demo:** [Full System Walkthrough on Vimeo](https://vimeo.com/1164908949)
**Build Version:** v3.2.0-Sovereign (The Sentinel's Eye)
**Project Status:** Production-Ready — Devnet Operational / Mainnet Deployment Pending

---

## What This Is

The TrustChain HUD is the visual and interaction layer for the TrustChain Sovereign behavioral firewall. It was purpose-built to feel like a security operations terminal — not a consumer dashboard. Every component reflects a live signal from the decoupled backend: Gini/HHI concentration scores, Temporal Sentinel timing deviation, governance multipliers, and on-chain notarization events are all rendered in real time as data flows from the Yellowstone gRPC pipeline.

The system shifts the security paradigm from static smart contract auditing (checking the code) to dynamic behavioral forensics (monitoring how wallets actually act). A wallet that has never triggered a static exploit can still be part of a coordinated Sybil swarm — TrustChain detects the behavioral signature of that coordination.

---

## Core Interface Features

### Temporal Sentiment Index
Visualizes the standard deviation of transaction inter-arrival timing in a live gauge. A variance approaching zero signals inhuman mechanical regularity — cron jobs, automated scripts, or coordinated bot clusters. The gauge enters an active warning state with pulsing indicators during burst detection events, communicating urgency without interrupting the data flow.

### Gini/HHI Forensics Panel
Displays the Gini coefficient (measuring wallet distribution inequality, 0–1 scale) and the HHI concentration index side by side against configurable thresholds. Wallets exceeding the 0.70 Gini hard limit or triggering the HHI dual-gatekeeper are immediately flagged and displayed in the breach state.

### Governance Standing Panel
Maps the wallet's notarized on-chain score to a visible Voter Weight Multiplier, sourced live from the Anchor Notary Bridge PDA. A Steward-tier wallet displays a 1.5x multiplier on its governance participation weight. A RESTRICTED wallet is capped at 0.1x. The Simulate Vote feature lets users apply their real multiplier against their token balance to make governance impact tangible before a live proposal.

### Pool Integrity Cards
Each Solana liquidity pool card (SOL-USDC, JUP-SOL, RAY-SOL, and others) displays a real-time risk badge driven by live Gini/HHI signals. These update continuously as the backend engine processes new transaction data from the gRPC stream.

### Notarization Toasts
Success and failure notifications fire specifically when the Anchor Notary Bridge commits an integrity score to a Solana PDA. Toasts display the PDA address for on-chain verification, proving that the score is a real blockchain write and not a local state update.

### Attack Vector Simulation Mode
A toggle in the sidebar activates simulated high-churn bot behavior, allowing the user to observe how the HUD's scoring and alert systems respond to mechanical transaction patterns. All simulation output is clearly flagged as SIMULATION MODE to distinguish it from live Notary Bridge writes.

### Transparent Terminal Overlay
A stylized terminal panel surfaces raw JSON logs and RPC responses. This demonstrates that the data displayed is live backend output, not hardcoded values.

---

## Reputation Tiers

Wallet states are mapped to a four-tier governance hierarchy. Tiers are derived from the notarized on-chain score and updated in real time as backend data changes — the UI does not cache or lag state.

| Tier | Score Range | Governance Multiplier | Trigger Condition |
|---|---|---|---|
| STEWARD | 85 – 100 | 1.5x | Total integrity score >= 85, sustained behavioral maturity |
| RESIDENT | 50 – 84 | 1.0x | Verified behavioral stability, passes Gini/HHI thresholds |
| PROBATIONARY | 10 – 49 | 0.5x | 0–2 transactions or insufficient behavioral history |
| RESTRICTED | 0 – 9 | 0.1x | Temporal Sentinel or Gini/HHI breach detected |

---

## Total Integrity Score

The HUD surfaces the complete score composition, making the calculation auditable at a glance:

```
TotalIntegrityScore = (TrustChainBehavioral × 0.7) + (FairScaleSocial × 0.3)
```

The behavioral score (70% weight) is derived from the Gini coefficient, HHI concentration index, and Temporal Sentinel deviation analysis. The FairScale social component (30% weight) is displayed alongside it so that neither signal can silently override the other.

---

## useTrustChain SDK (v3.2)

The SDK abstracts all backend communication, caching, and polling logic from the component layer. Any component in the application can access a wallet's full integrity profile with a single hook call.

```js
import { useTrustChain } from './sdk/useTrustChain';

const {
  status,
  gini,
  hhiScore,
  temporalIndex,
  totalScore,
  voterWeightMultiplier,
  isQualified
} = useTrustChain(walletAddress);
```

**Shared Module Caching:** 30-second TTL with FIFO eviction policy. Multiple components referencing the same wallet address share a single cached result, eliminating redundant network overhead.

**Request Deduplication:** In-flight promises are coalesced. If ten components simultaneously trigger a re-render requesting the same wallet, only one upstream API call is made.

**Automated Polling:** High-efficiency interval polling for wallets in the PROBATIONARY or RESTRICTED tier, ensuring low-trust wallets are continuously re-evaluated as their behavioral history grows.

**Force-Refetch Support:** A `refetch()` method is exposed on the hook for immediate manual re-evaluation, used by the forensic dashboard when an operator wants to refresh a specific wallet in real time.

---

## Frontend Architecture

```
src/
  components/
    Sidebar.jsx           — Network state, version, simulation toggle, uptime/latency
    Navbar.jsx            — Route navigation (Home, Specs, Vision, Bridge, Swarm Hub)
    RiskDetail.jsx        — Gini, HHI, Temporal metrics with dynamic color feedback
    SovereignTerminal.jsx — Live terminal log output, raw JSON and RPC responses
    InstitutionalInsights.jsx — Institutional data panel (gated at 85+ score)
    Guard.tsx             — Route-level integrity gate component
  pages/
    LandingPage.jsx       — Hero, stats bar, feature cards, reputation tiers
    SpecsPage.jsx         — Full technical specification and sentinel config reference
    VisionPage.jsx        — Sovereign roadmap phases 1–4
    SwarmHubLanding.jsx   — Swarm Hub access and payment bridge
  sdk/
    useTrustChain.js      — Primary integration hook with caching and deduplication
  hooks/
    useIntegrity.ts       — Low-level API bridge to backend /api/verify endpoint
```

---

## Performance and Security

**Vite Environment Hardening:** All backend communication routes through `VITE_API_BASE_URL`, enforcing strict `VITE_` prefixing to ensure environment variables are never accidentally leaked to the client bundle.

**Exponential Backoff UI:** The frontend mirrors the backend retry logic with visual feedback during network congestion. The Temporal Sentinel component enters a graceful "Reconnecting" display during backend retry cycles rather than hanging or showing stale state.

**Race Condition Prevention:** All rapid-state UI components (Sentinel alerts, status badges) use functional state updaters (`prev => !prev`) to eliminate race conditions during high-frequency updates.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | TailwindCSS / Vanilla CSS |
| Wallet Integration | Phantom, Solflare |
| SDK | useTrustChain() — custom hook with caching layer |
| Deployment | Vercel (auto-deploy from main branch) |
| Language | JavaScript / TypeScript |

---

## Local Setup

```bash
git clone https://github.com/Freedomwithin/TrustChain-Sovereign-frontend
cd TrustChain-Sovereign-frontend
npm install
cp .env.example .env
# Set VITE_API_BASE_URL to the backend Vercel endpoint
npm run dev
# Runs at http://localhost:5173
```

The frontend connects to the production backend by default. To run fully local, deploy the backend separately and point `VITE_API_BASE_URL` at `http://localhost:3001`.

---

## Roadmap

**Phase 1 — Behavioral Immunity (Operational)**
Deployment of the core Behavioral Firewall and Gini Index forensics. The 0.70 parity threshold and 3,000ms Temporal Sentinel window are established and active.

**Phase 2 — Sovereign Lattice (In Development)**
Expansion of behavioral monitoring to cross-chain environments. Full HHI Dual Gatekeeper deployment for liquid assets.

**Phase 3 — Sentinel DAO (Planned)**
Transitioning protocol thresholds and reputation multipliers to on-chain community governance. Sentinel-led automated slashing.

**Phase 4 — Composable SDK**
Publishing `@trustchain/web3-react` as a public npm package, allowing any Solana dApp to embed behavioral gating with a single hook.

---

## Repository

Architect: Jonathon Koerner
Contact: [@TrustChainDev](https://x.com/TrustChainDev)
GitHub: [Freedomwithin/TrustChain-Sovereign-frontend](https://github.com/Freedomwithin/TrustChain-Sovereign-frontend)

---

## License

Proprietary. All rights reserved.