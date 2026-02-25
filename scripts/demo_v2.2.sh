#!/bin/bash
# TrustChain Demo Script V2.2.1
# Now supports passing a wallet address as an argument

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

# Capture address argument if it exists
WALLET_ADDR=$1

echo "🚀 Running TrustChain Sovereign Hydration V2.2.1..."
cd "$ROOT_DIR"

# Pass the wallet address to the TS script
npx ts-node --project tsconfig.json scripts/simulate_behavior_v2.2.ts "$WALLET_ADDR"