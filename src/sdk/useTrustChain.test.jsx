import { renderHook, act, waitFor } from '@testing-library/react';
import { useTrustChain } from './useTrustChain';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock useWallet
vi.mock('@solana/wallet-adapter-react', () => ({
  useWallet: vi.fn()
}));

const mockWalletAdapter = await import('@solana/wallet-adapter-react');

describe('useTrustChain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    mockWalletAdapter.useWallet.mockReturnValue({
      publicKey: { toBase58: () => 'MockWalletAddress' },
      connected: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles slow network responses correctly (3+ seconds)', async () => {
    const mockData = { status: 'VERIFIED', totalScore: 95 };

    // Create a deferred promise to control when the fetch resolves
    let resolveFetch;
    const fetchPromise = new Promise(resolve => {
        resolveFetch = resolve;
    });

    global.fetch.mockImplementation(() => fetchPromise);

    const { result } = renderHook(() => useTrustChain({ mock: false, address: 'SlowAddress' }));

    // Initially loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    // Resolve the slow network call
    await act(async () => {
        resolveFetch({
            ok: true,
            json: async () => mockData,
        });
    });

    // Check that the data is eventually set
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Check caching: a subsequent call should use the cache
    const { result: result2 } = renderHook(() => useTrustChain({ mock: false, address: 'SlowAddress' }));

    expect(result2.current.loading).toBe(false);
    expect(result2.current.data).toEqual(mockData);

    // Fetch should still have been called only once
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('handles partial failures (500 errors) gracefully', async () => {
    // Mock a 500 Internal Server Error
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' })
    });

    const { result } = renderHook(() => useTrustChain({ mock: false, address: 'ErrorAddress' }));

    // Wait for the hook to finish processing the error
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check that error state is populated
    expect(result.current.error).toBe('Internal Server Error');
    expect(result.current.data).toBe(null);

    // Call again, should retry the fetch since the previous one failed (no response cache, request cache removed)
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'VERIFIED' })
    });

    const { result: result2 } = renderHook(() => useTrustChain({ mock: false, address: 'ErrorAddress' }));

    await waitFor(() => {
        expect(result2.current.loading).toBe(false);
    });

    expect(result2.current.data).toEqual({ status: 'VERIFIED' });
    expect(global.fetch).toHaveBeenCalledTimes(2); // One failure, one success
  });

  it('handles concurrent re-renders (deduplication) correctly', async () => {
    const mockData = { status: 'VERIFIED', totalScore: 90 };

    // Create a delayed fetch so we can test the flight deduplication
    let resolveFetch;
    const fetchPromise = new Promise(resolve => {
        resolveFetch = resolve;
    });

    global.fetch.mockImplementation(() => fetchPromise);

    // Render the hook twice concurrently
    const { result: result1 } = renderHook(() => useTrustChain({ mock: false, address: 'ConcurrentAddress' }));
    const { result: result2 } = renderHook(() => useTrustChain({ mock: false, address: 'ConcurrentAddress' }));

    expect(result1.current.loading).toBe(true);
    expect(result2.current.loading).toBe(true);

    // Resolve the single fetch promise
    await act(async () => {
        resolveFetch({
            ok: true,
            json: async () => mockData,
        });
    });

    // Wait for both hooks to finish loading
    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
      expect(result2.current.loading).toBe(false);
    });

    expect(result1.current.data).toEqual(mockData);
    expect(result2.current.data).toEqual(mockData);

    // Crucially, verify fetch was only called ONCE despite two concurrent hook renders
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

});
