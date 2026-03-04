import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const DEFAULT_API_URL = import.meta.env.VITE_API_BASE_URL || "https://trustchain-sovereign-backend.vercel.app";

// --- Sovereign Cache Hardening ---
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minute window
const MAX_CACHE_ENTRIES = 100;

const requestCache = new Map();
const responseCache = new Map();

const getCachedValue = (cache, key) => {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() - entry.createdAt > CACHE_TTL_MS) {
    cache.delete(key);
    return undefined;
  }
  return entry.value;
};

const setCachedValue = (cache, key, value) => {
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, { value, createdAt: Date.now() });
};

export function useTrustChain(options = {}) {
  const {
    mock = false,
    refreshInterval = 0,
    address: propAddress,
    apiUrl = DEFAULT_API_URL,
  } = options;

  const { publicKey, connected } = useWallet();
  const address = propAddress || (connected && publicKey ? publicKey.toBase58() : null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (config = { isSilent: false, force: false }) => {
      if (!address && !mock) {
        setData(null);
        return;
      }

      const cacheKey = `${apiUrl}-${address}`;
      
      // Force refresh logic
      if (config.force) {
        responseCache.delete(cacheKey);
      } else {
        const cached = getCachedValue(responseCache, cacheKey);
        if (cached && !config.isSilent) {
          setData(cached);
          return;
        }
      }

      if (!config.isSilent) setLoading(true);
      setError(null);

      if (mock) {
        setData({ status: "VERIFIED", scores: { syncIndex: 1.0 } });
        setLoading(false);
        return;
      }

      try {
        // Deduplication: reuse in-flight promise
        let fetchPromise = requestCache.get(cacheKey);
        
        if (!fetchPromise) {
          fetchPromise = fetch(`${apiUrl}/api/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address }),
          }).then(async (res) => {
            if (!res.ok) throw new Error(`TrustChain API Error: ${res.status}`);
            return res.json();
          }).finally(() => {
            requestCache.delete(cacheKey);
          });
          
          requestCache.set(cacheKey, fetchPromise);
        }

        const result = await fetchPromise;
        setCachedValue(responseCache, cacheKey, result);
        setData(result);
      } catch (err) {
        setError(err.message.includes("429") ? "Sentinel Rate Limited" : "Sentinel Offline");
      } finally {
        setLoading(false);
      }
    },
    [address, mock, apiUrl]
  );

  useEffect(() => {
    fetchData();
    let intervalId;
    if (refreshInterval > 0) {
      intervalId = setInterval(() => fetchData({ isSilent: true }), refreshInterval);
    }
    return () => clearInterval(intervalId);
  }, [address, fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    voterWeightMultiplier: data?.governance?.voterWeightMultiplier || 1.0,
    refetch: () => fetchData({ isSilent: false, force: true }), 
  };
}
