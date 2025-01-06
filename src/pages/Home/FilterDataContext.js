import React, { useState, createContext, useContext } from "react";

const initState = {
  filters: {
    searchTerm: "",
    date: "",
    category: "",
    source: "",
  },
  handleChangeFilters: () => {},
  setFilterData: () => {},
};

/**
 * Creates a context for managing filter data.
 * Returns an array with two elements. The first element is the ContextProvider
 * and the second element is a custom hook to access the context.
 * The ContextProvider is a component that wraps the app and provides the
 * context to all components down the tree.
 * The custom hook useContext is used to access the context in functional components.
 * The context has the following properties:
 * - filterData: an object with the following properties:
 *   - searchTerm: string
 *   - date: string
 *   - category: string
 *   - source: string
 * - handleChangeFilters: a function to handle changes in the filters.
 * - setFilterData: a function to set the filterData.
 * @returns {array} an array with the ContextProvider and the custom hook.
 */

export function createFilterDataContext() {

  const StateContext = createContext(initState);

  /**
   * The ContextProvider component wraps the app and provides the context to
   * all components down the tree. It manages the state of the filterData and
   * provides a way to update the state through the handleChangeFilters function.
   *
   * @param {Object} children - The components to be wrapped by the provider.
   * @returns {Object} A component that wraps the children and provides the context.
   */
  const ContextProvider = ({ children }) => {
    const [filterData, setFilterData] = useState(initState.filters);
    /**
     * Updates the filterData state with the new value for the specified filter.
     * The function takes an event object as input and uses the name and value
     * properties of the target element to update the corresponding field in
     * the filterData state.
     *
     * @param {Object} e - The event object from the input field change.
     * @param {string} e.target.name - The name of the filter field to update.
     * @param {string} e.target.value - The new value for the specified filter field.
     */
    const handleChangeFilters = (e) => {
      setFilterData({
        ...filterData,
        [e.target.id || e.target.name]: e.target.value,
      });
    };

    return (
      <StateContext.Provider
        value={{
          filterData,
          setFilterData,
          handleChangeFilters,
        }}
      >
        {children}
      </StateContext.Provider>
    );
  };

  const useCustomContext = () => useContext(StateContext);

  return [ContextProvider, useCustomContext];
}

export const [FilterDataProvider, useFilterData] = createFilterDataContext();
