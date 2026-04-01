import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { API_BASE_URL as DEFAULT_API_URL } from '../config/constants';

// --- Shared Module Caches ---
const responseCache = new Map();
const requestCache = new Map();
const CACHE_TTL = 30000; // 30 seconds
const MAX_CACHE_SIZE = 100;


function evictOldest() {
  const oldestKey = responseCache.keys().next().value;
  if (oldestKey) responseCache.delete(oldestKey);
}

function getCachedResponse(key) {
  const cached = responseCache.get(key);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    responseCache.delete(key);
    return null;
  }
  return cached.data;
}


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

    const fetchData = useCallback(async (options = {}) => {
    const { signal, isSilent = false, force = false } = options;
    
    if (!address && !mock) {
        setData(null);
        return;
    }

    if (!isSilent) setLoading(true);
    setError(null);

    // Cache Key
    const cacheKey = `${apiUrl}:${address}`;

    // 1. Check Response Cache (if not forced)
    if (!force && !mock) {
      const cached = getCachedResponse(cacheKey);
      if (cached) {
        if (!signal?.aborted) {
          setData(cached);
          setLoading(false);
        }
        return;
      }
    }

    // 2. Check In-Flight Request (Deduplication)
    if (requestCache.has(cacheKey) && !force && !mock) {
      try {
        const result = await requestCache.get(cacheKey);
        if (!signal?.aborted) {
          setData(result);
          setLoading(false);
        }
        return;
      } catch (e) {
        // Fall through to retry if the shared request failed
      }
    }

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

      const mockData = {
        status: 'VERIFIED',
        totalScore: 90,
        fairScaleSocial: 85,
        scores: { gini: 0.15, hhi: 0.05, temporalIndex: 0.1 },
        governance: {
          tier: 'Steward',
          voterWeightMultiplier: 1.5,
          reason: 'High Reputation'
        },
        reason: 'Mock verification (SDK Mock Mode)',
        latencyMs: 15
      };
      setData(mockData);
      setLoading(false);
      return;
    }

    // Real API Call
    const fetchPromise = (async () => {
      const response = await fetch(`${apiUrl}/api/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
        // Note: Decoupling AbortSignal from the underlying fetch to allow 
        // the shared request to complete even if one component unmounts.
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `TrustChain API Error: ${response.status}`);
      }

      const result = await response.json();
      
      // Update Response Cache
      if (responseCache.size >= MAX_CACHE_SIZE) evictOldest();
      responseCache.set(cacheKey, { data: result, timestamp: Date.now() });
      
      return result;
    })();

    // Store in Request Cache (Deduplication)
    requestCache.set(cacheKey, fetchPromise);

    try {
      const result = await fetchPromise;
      if (!signal?.aborted) {
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
    } finally {
      // Clean up Request Cache
      if (requestCache.get(cacheKey) === fetchPromise) {
        requestCache.delete(cacheKey);
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
