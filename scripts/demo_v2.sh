#!/bin/bash
# TrustChain-Sovereign: Frontend Demo Sequence
cd "$(dirname "$0")"

# Load environment from the frontend root
if [ -f ../.env ]; then
    export $(grep -v '^#' ../.env | xargs)
fi

# Use the GAZD fallback or the judge's custom wallet
DEMO_WALLET=${VITE_TARGET_WALLET:-"GAZDwoHW6x4QCaWXizhckqta6v7nFYEFg2aULTk52k7b"}
# Sync with the backend port we defined in the Quickstart
BACKEND_URL=${VITE_API_BASE_URL:-"http://localhost:3001"}

echo "🎥 Starting Behavioral Simulation for Wallet: $DEMO_WALLET"
sleep 2

# --- 1. HYDRATION ---
echo "🛡️  Step 1: Simulating Behavioral Patterns..."
# Use the compiled CJS script to avoid ts-node environment errors
node "./hydrate.cjs" "$DEMO_WALLET"
sleep 3

# --- 2. NOTARIZATION ---
echo "🏛️  Step 2: Notarizing via Local Backend ($BACKEND_URL)..."
RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/verify" \
    -H "Content-Type: application/json" \
    -d "{\"address\": \"$DEMO_WALLET\"}")

echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"

echo "----------------------------------------------------"
echo "✨ Frontend Demo Complete. Refresh the HUD to see scores."
echo "----------------------------------------------------"
