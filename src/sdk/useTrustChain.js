import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { API_BASE_URL as DEFAULT_API_URL } from '../config/constants';

// ---- Cache Configuration ----
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minute TTL
const CACHE_MAX_SIZE = 100;          // FIFO eviction after 100 entries

// In-memory caches (module-scoped, shared across all hook instances)
const responseCache = new Map();   // key -> { data, timestamp }
const requestCache = new Map();    // key -> Promise (for deduplication)

/**
 * Evicts the oldest entry if the cache exceeds CACHE_MAX_SIZE.
 */
const evictIfNeeded = () => {
  if (responseCache.size > CACHE_MAX_SIZE) {
    const oldestKey = responseCache.keys().next().value;
    responseCache.delete(oldestKey);
  }
};

/**
 * Returns cached data if it exists and hasn't expired, otherwise null.
 */
const getCachedData = (key) => {
  const entry = responseCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    responseCache.delete(key);
    return null;
  }
  return entry.data;
};

/**
 * useTrustChain Hook
 *
 * A composable hook for integrating TrustChain Sentinel integrity checks.
 *
 * @param {Object} options - Configuration options.
 * @param {boolean} [options.mock=false] - If true, returns mock data without network calls.
 * @param {number} [options.refreshInterval=0] - Interval in ms to refresh data. 0 disables auto-refresh.
 * @param {string} [options.address] - Wallet address to verify. Defaults to connected wallet.
 * @param {string} [options.apiUrl] - Custom API Base URL.
 * @returns {Object} { data, loading, error, refetch }
 */
export function useTrustChain(options = {}) {
  const {
    mock = false,
    refreshInterval = 0,
    address: propAddress,
    apiUrl = DEFAULT_API_URL
  } = options;

  const { publicKey, connected } = useWallet();

  // Determine target address: prop > connected wallet
  const address = propAddress || (connected && publicKey ? publicKey.toBase58() : null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async ({ signal, isSilent = false, force = false } = {}) => {
    if (!address && !mock) {
        setData(null);
        return;
    }

    if (!isSilent) setLoading(true);
    setError(null);

    // Mock Mode
    if (mock) {
      try {
        await new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, 500);
            if (signal) {
                signal.addEventListener('abort', () => {
                    clearTimeout(timer);
                    reject(new DOMException('Aborted', 'AbortError'));
                });
            }
        });
      } catch (e) {
        return;
      }

      if (signal?.aborted) return;

      setData({
        status: 'VERIFIED',
        totalScore: 90,
        fairScaleSocial: 85,
        scores: { gini: 0.15, hhi: 0.05, syncIndex: 0.1 },
        governance: {
          tier: 'Steward',
          voterWeightMultiplier: 1.5,
          reason: 'High Reputation'
        },
        reason: 'Mock verification (SDK Mock Mode)',
        latencyMs: 15
      });
      setLoading(false);
      return;
    }

    // Real API Call
    try {
      const cacheKey = `${apiUrl}-${address}`;

      // Force flag: clear cache entry so we get fresh data
      if (force) {
        responseCache.delete(cacheKey);
        requestCache.delete(cacheKey);
      }

      // Serve from cache if valid and not a forced refresh
      const cached = getCachedData(cacheKey);
      if (cached && !force) {
        setData(cached);
        setLoading(false);
        return;
      }

      // Deduplicate: if a request for this key is already in-flight, reuse it.
      // The fetch promise is decoupled from any single component's AbortSignal
      // so that unmounting one component doesn't cancel it for others.
      if (!requestCache.has(cacheKey)) {
        const fetchPromise = fetch(`${apiUrl}/api/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address })
          // NOTE: No signal passed here intentionally.
          // The fetch runs independently so one component unmounting
          // doesn't abort the request for other listening components.
        }).then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `TrustChain API Error: ${response.status}`);
          }
          return response.json();
        }).finally(() => {
          // Clean up in-flight tracker once settled
          requestCache.delete(cacheKey);
        });

        requestCache.set(cacheKey, fetchPromise);
      }

      const result = await requestCache.get(cacheKey);

      // Only update state if the calling component hasn't unmounted
      if (!signal?.aborted) {
        // Store in cache with timestamp
        responseCache.set(cacheKey, { data: result, timestamp: Date.now() });
        evictIfNeeded();
        setData(result);
        setLoading(false);
      }
    } catch (err) {
      if (!signal?.aborted) {
        if (err.name === 'AbortError') return;

        console.error('TrustChain Verification Failed:', err);

        let errorMessage = err.message || 'Unknown Error';
        if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Network request failed')) {
             errorMessage = 'Sentinel Offline - Check RPC Connection';
        }

        setError(errorMessage);
        setLoading(false);
      }
    }
  }, [address, mock, apiUrl]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchData({ signal: abortController.signal });

    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  // Auto-polling for PROBATIONARY status or if refreshInterval is set
  useEffect(() => {
    let intervalId;

    if (refreshInterval > 0) {
        intervalId = setInterval(() => {
            fetchData({ isSilent: true }); // Silent refresh
        }, refreshInterval);
    } else if (data?.status === 'PROBATIONARY') {
        intervalId = setInterval(() => {
            fetchData({ isSilent: true }); // Silent refresh
        }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [refreshInterval, data?.status, fetchData]);

  return {
    data,
    loading,
    error,
    voterWeightMultiplier: data?.governance?.tier === 'Steward' ? 1.5 : (data?.governance?.voterWeightMultiplier || 1.0),
    refetch: () => fetchData({ force: true })
  };
}
