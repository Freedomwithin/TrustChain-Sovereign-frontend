#!/bin/bash
# TrustChain Demo Script V2.3
# Supports passing a wallet address as an argument to mock high-integrity behavior

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

# Capture address argument if it exists
WALLET_ADDR=$1

echo "🚀 Running TrustChain Sovereign Hydration V2.3..."
cd "$ROOT_DIR"

# Pass the wallet address to the TS script
npx ts-node --project tsconfig.json scripts/simulate_behavior_v2.3.ts "$WALLET_ADDR"
