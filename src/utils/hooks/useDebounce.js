import { useEffect, useState } from "react";
/**
 * Hook to debounce a value.
 * @param {any} value - The value to debounce.
 * @param {number} [delay=500] - The delay in milliseconds.
 * @returns {any} The debounced value.
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
