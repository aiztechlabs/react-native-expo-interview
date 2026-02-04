import { useEffect, useState } from "react";

/**
 * useDebouncedValue(value, delayMs)
 *
 * Requirements:
 * - Returns a debounced version of `value`
 * - Updates only after `delayMs` of no changes
 * - Cleans up timers correctly on unmount and on value/delay change
 */
export function useDebouncedValue(value, delayMs) {
  // TODO
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // TODO: set timeout, cleanup
  }, [value, delayMs]);

  return debounced;
}
