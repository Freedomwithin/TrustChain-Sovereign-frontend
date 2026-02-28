<div align="center">

# TrustChain-Sovereign: Frontend
### Institutional-Grade Monitoring HUD for the Solana Behavioral Firewall

**Live Interface:** [trustchainsovereign.com](https://trustchainsovereign.com)  
**System Demo:** [Watch the Full System Demo on Vimeo](https://vimeo.com/1167869054)  
**Legacy Endpoint:** [trustchain-sovereign-frontend.vercel.app](https://trustchain-sovereign-frontend.vercel.app)  
**Project Status:** Institutional Hardening (Production-Ready)  
**Build Version:** 2.1.5-Sovereign (Hardened)

</div>

---

## Judging Quick-Start

To replicate the full behavioral notarization and governance simulation in under 5 minutes, please follow the [Quick-Start Demo Guide](QUICKSTART_judges.md).

---

## 🏛️ Sovereign Architecture & Strategy

Since the initial submission, TrustChain has undergone a **Sovereign Hardening** phase to move from prototype heuristics to an institutional-grade security primitive.

### 📊 Roadmap & Technical Pitch

For a deep dive into the **Gini/HHI Dual Gatekeeper** math, our **Helius gRPC pipeline**, and the **90-day Shadow Audit Roadmap**, refer to our strategic documentation:

- **[View Technical Pitch & Roadmap (PPTX)](./docs/TrustChain_Sovereign_Deck.pptx)**

### ⚡ Infrastructure Upgrades

- **Helius gRPC (Yellowstone):** Migrated to a direct data-push stream to maintain a deterministic **3,000ms sync window**.
- **Anchor Notary Bridge:** All behavioral integrity scores are notarized to on-chain **PDAs**, making reputation a composable and immutable primitive on Solana.
- **Gini/HHI Forensics:** Implementation of macro-economic concentration indices to detect coordinated clusters rather than isolated wallets.

---

## Updates

### Audit & Commit History
This repository represents the consolidated **Sovereign Hardening** phase. The full audit trail of our development journey—from initial proof-of-concept to the current gRPC implementation—is preserved in the original development roots:
* **[TrustChain Core](https://github.com/Freedomwithin/TrustChain)** — *Early behavioral logic and proof-of-concept.*
* **[TrustChain Sovereign](https://github.com/Freedomwithin/TrustChain-Sovereign)** — *Infrastructure hardening and gRPC integration.*

### 2026-02-25 — Sovereign Hardening (v2.2.1)

**MinimalRealmsIntegration Component**  
Added a new SDK reference implementation demonstrating how third-party protocols (such as Catoff) can gate actions based on TrustChain integrity scores. This component serves as a drop-in integration guide for external governance protocols building on Realms.

**Dynamic Multipliers**  
The UI now reflects the hardened multiplier logic: `STEWARD` tier wallets display a `1.5x` voter weight multiplier and `SYBIL`-flagged wallets are capped at `0.1x`. Multipliers are derived directly from the notarized on-chain score.

**Hydration Simulation Script**  
Added `scripts/demo_v2.sh` to simulate high-velocity transaction behavior with a 10,000 micro-lamport priority fee. All simulation output is explicitly logged as `SIMULATION MODE` to distinguish demo activity from live Notary Bridge writes.

**Defensive Multiplier Logic**  
Implemented fallback handling for `voterWeightMultiplier` to prevent runtime crashes during initial chain sync before the Anchor PDA has been read.

---

### February 2026 — Governance & SDK

**Governance Standing HUD (`GovernanceStanding.jsx`)**  
Added the `GovernanceStanding.jsx` component that maps notarized on-chain scores to visible **Voter Weight Multipliers** — for example, a Steward-tier wallet displays a `1.5x` multiplier on its token vote weight. This component is the visual bridge between TrustChain's behavioral reputation layer and active DAO governance participation.

**"Simulate Vote" Interaction**  
Implemented a live demo feature that allows users to test their behavioral multiplier against their token balance. The system pulls `voterWeightMultiplier` in real time from the Anchor Notary PDA and applies it to the wallet's token balance, making governance impact tangible and verifiable without requiring a live proposal.

**`useTrustChain()` SDK Expansion**  
The hook now supports two additional flags for seamless integration with external Solana governance protocols:
- `voterWeightMultiplier` — governance multiplier derived from the wallet's notarized integrity tier
- `isQualified` — boolean for simple governance gating (e.g., minimum VERIFIED status required to participate)

---

## What This Is

This repository contains the **frontend only**: the React 18 / Vite / TailwindCSS institutional monitoring HUD that surfaces TrustChain-Sovereign's real-time behavioral integrity signals.

The UI was purpose-built to feel like a security operations terminal — not a consumer dashboard. Every component reflects a live signal from the decoupled backend: Gini/HHI scores, FairScale reputation tiers, Temporal Sentinel alerts, and on-chain notarization events are all rendered in real time.

> The backend (Node.js/TypeScript Express, Integrity Engine, Anchor Notary Bridge) lives in a separate repository as part of the decoupled V2.1 infrastructure.

---

## FairScale Integration — Visual Layer

The frontend surfaces the FairScale weighted score as a **named, visible component** of every wallet evaluation — not a hidden backend calculation. The UI renders:

- The raw **FairScale Social Score** alongside the **TrustChain Behavioral Score**
- The **Total Integrity Score** derived from the weighted formula:

```
TotalIntegrityScore = (TrustChainBehavioral × 0.7) + (FairScaleSocial × 0.3)
```

This makes the FairScale contribution auditable at a glance. A judge, protocol partner, or user can see exactly how much social reputation is influencing the final verdict — and verify that behavioral signals cannot be overridden by a high FairScore alone.

---

## Reputation Status Display

The HUD maps wallet states to a clear visual hierarchy:

| Status | Color | Trigger Condition |
|---|---|---|
| **PROBATIONARY** | Yellow | 0–2 transactions or unverified FairScore |
| **VERIFIED** | Cyan | 3+ transactions, behavioral maturity confirmed |
| **ELITE_VERIFIED** | Blue | Weighted score ≥ 85 (behavioral + FairScale) |
| **SYBIL / ALERT** | Red | Temporal Sentinel detects high-churn or one-block LP pattern |
| **Steward ** | Gold | Total Score ≥ 85 + 1.5x Voter Weight Multiplier |

Status transitions are rendered live as backend data updates — the UI does not cache or lag state.

---

## Frontend Enhancements (Sovereign V2.1)

The V2.1 Sovereign update transitioned the interface from a diagnostic panel to a full institutional-grade monitoring HUD. The following features were implemented:

### 1. Technical HUD Layout
The interface uses a **left-aligned HUD architecture**: system logs, status readouts, and Sentinel alerts are anchored to the left margin, keeping the central Pool Cards unobstructed. The layout is designed to read like a command center, not a web app.

All system messages use a **typewriter-by-character reveal effect** — terminal-style text animation that makes the Behavioral Engine analysis feel live and computational rather than static.

### 2. Institutional Monitoring Components

**Pool Integrity Badges** — each Solana Liquidity Pool card displays a real-time risk badge ("Low / Medium / High") driven by live Gini/HHI signals from the backend. These update as the backend's integrity engine processes new transaction data.

**Temporal Sync Monitor** — a dedicated UI element visualizes the 2,000ms sliding window used by the Temporal Sentinel. During high-frequency burst detection, the monitor enters an "Active Warning" state with pulsing red borders to communicate urgency without interrupting the data flow.

**Notarization Toasts** — success and failure notifications fire specifically when the Anchor Notary Bridge commits an integrity score to a Solana PDA. These toasts confirm the on-chain write event and display the PDA address for verification.

### 3. Interactive Simulation & Transparency Tools

**Hydration Reactor** — the UI is wired to react to the `hydrate.cjs` behavioral simulation script. As the script processes transactions in the background terminal, the HUD displays live "jumps" in Gini/HHI scores, showing the Sentinel and scoring engine responding in real time. This was built specifically to make the demo auditable — viewers can watch scores change as data flows in rather than seeing a static result.

**Transparent Terminal Overlay** — a stylized terminal container (bottom-left of the HUD) surfaces raw JSON logs and RPC responses. This proves the data displayed is live backend output, not hardcoded demo values.

### 4. Performance & Security

**Vite Environment Hardening** — all backend communication routes through `VITE_API_BASE_URL`, enforcing strict `VITE_` prefixing to ensure environment variables are never accidentally leaked to the client bundle.

**Exponential Backoff UI** — the frontend mirrors the backend's retry logic with visual feedback during network congestion. Rather than hanging or showing a stale state, the Temporal Sentinel component enters a graceful "Reconnecting" display during backend retry cycles.

**Race Condition Prevention** — all rapid-state UI components (Sentinel alerts, status badges) use functional state updaters (`prev => !prev`) to eliminate race conditions during high-frequency updates.

---

## SDK Integration

The frontend consumes backend signals via the `@trustchain/web3-react` SDK:

```js
import { useTrustChain } from '@trustchain/web3-react';

const { status, gini, syncIndex, totalScore, voterWeightMultiplier, isQualified } = useTrustChain(walletAddress);
```

The `useTrustChain()` hook returns `status`, `gini`, `syncIndex`, `totalIntegrityScore`, `voterWeightMultiplier`, and `isQualified` in a single call, abstracting all backend communication and caching logic from the component layer.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | TailwindCSS |
| Wallet | Phantom / Solflare Integration |
| SDK | `@trustchain/web3-react` — `useTrustChain()` hook |
| Deployment | Vercel (Production) |

---

## Local Setup

```bash
# Clone the frontend repo
git clone https://github.com/freedomwithin/trustchain-sovereign-frontend

cd trustchain-sovereign-frontend
npm install

# Configure environment
cp .env.example .env
# Set VITE_API_BASE_URL=https://trustchain-sovereign-backend.vercel.app

npm run dev
```

Frontend runs at `http://localhost:5173` and connects to the production backend by default.

---

## High-Velocity Agentic Workflow
This repository is managed by an **Agentic Swarm**, enabling enterprise-grade development velocity:
- **Architect:** Jonathon (Human)
- **Agentic Coder:** Jules (Gemini 3 Pro)
- **Logic Auditor:** Claude (Security Audit)

```mermaid
graph TD
    User((Jonathon: Architect)) -->|Strategic Input| Gemini(Gemini 3 Pro: Central Intelligence)
    
    subgraph "The Agentic Swarm"
        Gemini -->|Task Delegation| Jules[Jules: Agentic Coder]
        Gemini -->|Recon & Research| Perplexity[Perplexity: Librarian]
        Gemini -->|Logic/Security Audit| Claude[Claude: Pedantic Auditor]
    end

    Jules -->|Automated PRs| GitHub[(GitHub: freedomwithin/TrustChain)]
    Perplexity -->|Live CVE Data| Gemini
    Claude -->|Vulnerability Check| GitHub

    subgraph "Core Project: TrustChain"
        GitHub --> Osmosis[Osmosis DEX Integration]
        GitHub --> FairScale[FairScale/Gini Logic]
        GitHub --> Gatekeeper[Dual Gatekeeper Protocol]
    end

    %% Color Styling
    classDef human fill:#1E3A8A,stroke:#3B82F6,stroke-width:3px,color:#fff;
    classDef ai fill:#4C1D95,stroke:#8B5CF6,stroke-width:2px,color:#fff;
    classDef core fill:#064E3B,stroke:#10B981,stroke-width:2px,color:#fff;
    classDef githubStyle fill:#1E3A8A,stroke:#0366d6,stroke-width:2px,color:#fff;

    class User human;
    class Gemini,Jules,Perplexity,Claude ai;
    class Osmosis,FairScale,Gatekeeper core;
    class GitHub githubStyle;
```

The V2.1 frontend enhancements were primarily delivered by **Jules (Gemini Agentic Coder)**, covering the HUD layout, typewriter effects, Temporal Sync Monitor, and Notarization Toasts. Security and state hygiene review was handled by **Claude (Logic Auditor)**.

---

**Architect:** Jonathon | Freedomwithin  
**Frontend:** [trustchain-sovereign-frontend.vercel.app](https://trustchain-sovereign-frontend.vercel.app)  
**Contact:** [X / Twitter @TrustChainDev](https://x.com/TrustChainDev/)