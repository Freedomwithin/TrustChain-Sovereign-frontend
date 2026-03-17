import { useState, useCallback } from 'react';

interface NotarizationResult {
  signature: string;
  gini: string;
  hhi: string;
  pda?: string;
  scores?: any;
  status?: string;
}

interface UseTrustChainReturn {
  notarize: (address: string) => Promise<NotarizationResult | null>;
  data: NotarizationResult | null;
  loading: boolean;
  error: string | null;
}

export const useTrustChain = (): UseTrustChainReturn => {
  const [data, setData] = useState<NotarizationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const notarize = useCallback(async (address: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Pointing to the Hardened Backend Vercel URL
      const baseUrl = 'https://trustchain-sovereign-backend.vercel.app';
      const response = await fetch(`${baseUrl}/api/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Verification failed at Gateway');
      }

      const result = await response.json();
      
      // Map Backend V3.1 structure to Frontend legacy expectations + extra data
      const mappedResult: NotarizationResult = {
        signature: result.signature || '',
        gini: result.scores?.gini?.toString() || '0',
        hhi: result.scores?.hhi?.toString() || '0',
        scores: result.scores,
        status: result.status
      };

      setData(mappedResult);
      return mappedResult;
    } catch (err: any) {
      console.error('TrustChain Hook Error:', err);
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { notarize, data, loading, error };
};