import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const DEFAULT_API_URL = import.meta.env.VITE_API_BASE_URL || 'https://trustchain-sovereign-backend.vercel.app';

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

  const fetchData = useCallback(async (signal, isSilent = false) => {
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
      // Switched to POST to match useIntegrity implementation
      const response = await fetch(`${apiUrl}/api/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
        signal
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `TrustChain API Error: ${response.status}`);
      }

      const result = await response.json();

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
    }
  }, [address, mock, apiUrl]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  // Auto-polling for PROBATIONARY status or if refreshInterval is set
  useEffect(() => {
    let intervalId;

    if (refreshInterval > 0) {
        intervalId = setInterval(() => {
            fetchData(undefined, true); // Silent refresh
        }, refreshInterval);
    } else if (data?.status === 'PROBATIONARY') {
        intervalId = setInterval(() => {
            fetchData(undefined, true); // Silent refresh
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
    voterWeightMultiplier: data?.governance?.voterWeightMultiplier || 1.0,
    refetch: () => fetchData()
  };
}
