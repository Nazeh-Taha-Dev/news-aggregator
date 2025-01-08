import React, { useState, createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../utils/hooks";

const initState = {
  preferences: {
    source: [],
    category: [],
    author: [],
  },
  setPreferences: () => {},
};

/**
 * Creates a context for managing user preferences.
 * Returns an array with two elements. The first element is the ContextProvider
 * and the second element is a custom hook to access the context.
 * The ContextProvider is a component that wraps the app and provides the
 * context to all components down the tree.
 * The custom hook useContext is used to access the context in functional components.
 * The context has the following properties:
 * - preferences: an object with the following properties:
 *   - source: an array of selected sources
 *   - category: an array of selected categories
 *   - author: an array of selected authors
 * - setPreferences: a function to set the preferences.
 * @returns {array} an array with the ContextProvider and the custom hook.
 */
export function createUserPreferencesContext() {
  const StateContext = createContext(initState);
  /**
   * The ContextProvider component wraps the app and provides the context to
   * all components down the tree. It manages the state of the user preferences
   * and provides a way to update the state through the setPreferences function.
   *
   * @param {Object} children - The components to be wrapped by the provider.
   * @returns {Object} A component that wraps the children and provides the context.
   */
  const ContextProvider = ({ children }) => {
    const [preferences, setPreferences] = useState(initState.preferences);
    const [storedPreferences] = useLocalStorage("userPreferences", {
      source: [],
      category: [],
      author: [],
    });

    useEffect(() => {
      setPreferences(storedPreferences);
    }, [storedPreferences]);

    return (
      <StateContext.Provider
        value={{
          preferences,
          setPreferences,
        }}
      >
        {children}
      </StateContext.Provider>
    );
  };

  const useCustomContext = () => useContext(StateContext);

  return [ContextProvider, useCustomContext];
}

export const [UserPreferencesProvider, usePreferencesData] =
  createUserPreferencesContext();
