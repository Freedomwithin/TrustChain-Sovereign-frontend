# TrustChain Sovereign: Frontend

Institutional-Grade Monitoring HUD for the Solana Behavioral Firewall

**Live Interface:** [trustchainsovereign.com](https://trustchainsovereign.com)
**Build Version:** v3.2.0-Sovereign (The Sentinel's Eye)
**Project Status:** Production-Ready (Devnet — Mainnet deployment pending)

---

## Overview

The TrustChain HUD is a real-time forensic monitoring interface for the Solana behavioral firewall. It gives protocol operators a continuous view of wallet integrity, concentration indices, and temporal regularity scores derived from live transaction data — allowing Sybil clusters and automated bot swarms to be identified and isolated before they affect pool mechanics.

---

## Core Interface Features

- **Temporal Sentiment Index:** High-fidelity visualization of transaction timing regularity. Identifies mechanical bursts indicative of scripted automation in real time.
- **Gini/HHI Forensics HUD:** Real-time display of wallet concentration and inequality scores. Flags wallets and pools that breach the 0.70 Gini or HHI dual-gatekeeper thresholds.
- **Governance Standing Panel:** Displays the on-chain reputation tier (STEWARD, RESIDENT, PROBATIONARY, RESTRICTED) and corresponding voter weight multiplier sourced from the Anchor Notary Bridge PDA.
- **Real-Time Sentinel Sync:** Sub-3,000ms response window for live wallet verification against the backend engine.
- **Attack Vector Simulation Mode:** Toggle to simulate high-churn bot behavior and observe the HUD's live detection response.

---

## useTrustChain SDK (v3.2)

The frontend SDK abstracts all backend communication and caching logic from the component layer.

```js
import { useTrustChain } from './sdk/useTrustChain';

const { status, gini, temporalIndex, totalScore, voterWeightMultiplier, isQualified } = useTrustChain(walletAddress);
```

- **Shared Module Caching:** 30-second TTL with FIFO eviction policy to eliminate redundant network requests.
- **Request Deduplication:** Coalesces in-flight promises to prevent request storms during rapid re-renders.
- **Automated Polling:** High-efficiency polling logic for probationary and low-reputation wallets.
- **Force-Refetch Support:** Real-time refresh toggle for immediate forensic updates.

---

## Reputation Tier Reference

| Tier | Score Range | Governance Multiplier |
|---|---|---|
| STEWARD | 85 - 100 | 1.5x |
| RESIDENT | 50 - 84 | 1.0x |
| PROBATIONARY | 10 - 49 | 0.5x |
| RESTRICTED | 0 - 9 | 0.1x |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | TailwindCSS / Vanilla CSS |
| Wallet | Phantom / Solflare |
| Deployment | Vercel |

---

## Local Setup

```bash
git clone https://github.com/Freedomwithin/TrustChain-Sovereign-frontend
cd TrustChain-Sovereign-frontend
npm install
cp .env.example .env
# Set VITE_API_BASE_URL to the backend Vercel endpoint
npm run dev
```

---

## Roadmap

- **Q3 2026:** Composable Reputation HUD — allowing third-party protocols to embed TrustChain forensic cards natively via the SDK.
- **Q3 2026:** Advanced Sybil Cluster Visualization — macro-economic cluster detection across correlated wallet groups.
- **Q4 2026:** Sentinel DAO — transitioning Gini and HHI threshold governance to on-chain community control.

---

## License

Proprietary. All rights reserved. Contact: [@TrustChainDev](https://x.com/TrustChainDev)