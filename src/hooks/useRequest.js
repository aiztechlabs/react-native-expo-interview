import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useRequest(key, fetcher, options)
 *
 * key: any stable value used for caching
 * fetcher: () => Promise<any>
 * options:
 *   - staleTimeMs?: number (default 0)
 *   - enabled?: boolean (default true)
 *
 * Requirements:
 * - Return { data, error, isLoading, refresh }
 * - Cache successful responses in memory by key
 * - Automatically run when key changes (if enabled)
 * - refresh() must bypass cache and refetch
 * - Prevent stale responses (older request resolving after newer one)
 * - Prevent setState after unmount
 * - Do NOT use external data-fetching libraries
 */

// Simple in-memory cache
// key -> { data, ts }
const cache = new Map();

export function useRequest(key, fetcher, options = {}) {
  const staleTimeMs = options.staleTimeMs ?? 0;
  const enabled = options.enabled ?? true;

  // --- state ---
  const [data, setData] = useState(() => {
    const hit = cache.get(key);
    return hit ? hit.data : null;
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- refs for lifecycle & race protection ---
  // TODO: track whether component is mounted
  // TODO: track latest request id (or similar mechanism)

  // --- helpers ---
  // TODO: optional helper to check cache freshness using staleTimeMs

  const run = useCallback(
    async ({ bypassCache = false } = {}) => {
      // TODO:
      // 1. Exit early if not enabled
      // 2. Serve cached data if allowed and fresh
      // 3. Increment request id
      // 4. Set loading state
      // 5. Call fetcher
      // 6. Ignore stale responses
      // 7. Cache successful result
      // 8. Handle errors
      // 9. Avoid setState after unmount
    },
    [key, fetcher, enabled, staleTimeMs]
  );

  // Auto-run on mount / key change
  useEffect(() => {
    if (!enabled) return;
    run({ bypassCache: false });
  }, [run, enabled]);

  const refresh = useCallback(() => {
    return run({ bypassCache: true });
  }, [run]);

  return { data, error, isLoading, refresh };
}
