import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const DEFAULT_API_URL = import.meta.env.VITE_API_BASE_URL || 'https://trustchain-sovereign-backend.vercel.app';

export interface TrustChainScores {
  gini: number | null;
  hhi: number | null;
  syncIndex: number | null;
  weightedScore?: number;
}

export interface TrustChainData {
  status: string | null;
  scores: TrustChainScores;
  reason: string | null;
  latencyMs: number | null;
}

export interface UseTrustChainOptions {
  mock?: boolean;
  refreshInterval?: number;
  address?: string;
  apiUrl?: string;
}

export interface UseTrustChainReturn {
  data: TrustChainData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isElite: boolean;
  weightedScore: number | null;
}

/**
 * useTrustChain Hook
 *
 * A composable hook for integrating TrustChain Sentinel integrity checks.
 * Now supports FairScale weighted scores and Elite Tier logic.
 */
export function useTrustChain(options: UseTrustChainOptions = {}): UseTrustChainReturn {
  const {
    mock = false,
    refreshInterval = 0,
    address: propAddress,
    apiUrl = DEFAULT_API_URL
  } = options;

  const { publicKey, connected } = useWallet();

  // Determine target address: prop > connected wallet
  const address = propAddress || (connected && publicKey ? publicKey.toBase58() : null);

  const [data, setData] = useState<TrustChainData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (signal?: AbortSignal, isSilent = false) => {
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
            } else {
                 resolve(null);
            }
        });
      } catch (e) {
        return;
      }

      if (signal?.aborted) return;

      setData({
        status: 'VERIFIED',
        scores: { gini: 0.15, hhi: 0.05, syncIndex: 0.1, weightedScore: 88 },
        reason: 'Mock verification (SDK Mock Mode)',
        latencyMs: 15
      });
      setLoading(false);
      return;
    }

    // Real API Call
    try {
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
    } catch (err: any) {
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

  // Auto-polling
  useEffect(() => {
    let intervalId: any;

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

  // Derived state
  const weightedScore = data?.scores?.weightedScore ?? null;
  const isElite = weightedScore !== null && weightedScore >= 85;

  return {
    data,
    loading,
    error,
    refetch: async () => await fetchData(),
    isElite,
    weightedScore
  };
}
