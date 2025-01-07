import { useState } from "react";
/**
 * A hook to store and retrieve data from localStorage.
 *
 * @param {string} key the key to store the data under
 * @param {any} initialValue the initial value to set if the key doesn't already exist
 * @returns {[any, (newValue: any) => void]} an array containing the stored value and a setter function.
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  };

  return [storedValue, setValue];
};
