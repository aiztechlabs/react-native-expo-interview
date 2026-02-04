import { useCallback, useEffect, useRef, useState } from "react";

/**
 * usePaginatedList(fetchPage, options?)
 *
 * fetchPage: async ({ page, pageSize }) => ({ items: any[], hasMore: boolean })
 *
 * Requirements:
 * - Keep items in a flat array
 * - loadMore() fetches next page (no-op if already loading or no more pages)
 * - refresh() clears items and reloads page 1
 * - Expose: { items, error, isLoading, isRefreshing, hasMore, loadMore, refresh }
 * - Prevent stale responses from overwriting newer state (race protection)
 * - Avoid setState after unmount
 */
export function usePaginatedList(fetchPage, options = {}) {
  const pageSize = options.pageSize ?? 10;
  const enabled = options.enabled ?? true;

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // TODO: track page number
  // TODO: request id for race protection
  // TODO: mounted ref to avoid setState after unmount

  const loadMore = useCallback(async () => {
    // TODO
  }, [enabled, fetchPage, hasMore, isLoading, pageSize]);

  const refresh = useCallback(async () => {
    // TODO
  }, [enabled, fetchPage, pageSize]);

  useEffect(() => {
    if (!enabled) return;
    // TODO: initial load (page 1)
    // You can call refresh() here, but be careful about deps.
  }, [enabled]);

  return { items, error, isLoading, isRefreshing, hasMore, loadMore, refresh };
}
