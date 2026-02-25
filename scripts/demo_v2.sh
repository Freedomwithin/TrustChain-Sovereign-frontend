#!/bin/bash
# TrustChain Demo Script V2
# Populates scoring engine with behavioral profiles

echo "Running TrustChain Demo V2..."
npx ts-node --esm --experimental-specifier-resolution=node scripts/simulate_behavior.ts
