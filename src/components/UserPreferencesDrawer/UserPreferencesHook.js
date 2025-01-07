import { useState } from "react";
import { useLocalStorage } from "../../utils/hooks";
import { usePreferencesData } from "../../global-context";
/**
 * A hook to manage user preferences.
 * It provides the current user preferences, a list of authors, and two functions to handle user input.
 * The functions are:
 * - `handleToggle`: toggles a preference of a given category (e.g. source, category, author) and updates the
 *   temporary preferences state.
 * - `handleSave`: saves the temporary preferences to localStorage and updates the global context, then closes the drawer.
 * @param {object} props The props object.
 * @param {function} props.handleClose The function to call when the user closes the drawer.
 * @returns {object} An object with the following properties:
 *   - `preferences`: the current user preferences
 *   - `authorsList`: a list of authors
 *   - `handleSave`: a function to save the user preferences
 *   - `handleToggle`: a function to toggle a preference
 */
export const useUserPreferences = ({ handleClose }) => {
  const { setPreferences } = usePreferencesData();
  const [authorsList] = useLocalStorage("authorsList", []);
  const [storedPreferences, setStoredPreferences] = useLocalStorage(
    "userPreferences",
    {
      source: [],
      category: [],
      author: [],
    }
  );
  const [tempPreferences, setTempPreferences] = useState(storedPreferences);

  /**
   * Toggles a preference of a given category (e.g. source, category, author) and updates the
   * temporary preferences state.
   * @param {string} itemCategory The category of the preference to toggle.
   * @param {string} selectedItem The preference to toggle.
   */
  const handleToggle = (itemCategory, selectedItem) => {
    if (tempPreferences[itemCategory]?.includes(selectedItem)) {
      setTempPreferences((prev) => ({
        ...prev,
        [itemCategory]: prev[itemCategory].filter((el) => el !== selectedItem),
      }));
    } else {
      setTempPreferences((prev) => ({
        ...prev,
        [itemCategory]: [...prev[itemCategory], selectedItem],
      }));
    }
  };

  const handleSave = () => {
    // Save changes to localStorage
    setStoredPreferences(tempPreferences);
    // Update global context
    setPreferences(tempPreferences);
    // Close the drawer after saving
    handleClose();
  };

  return {
    preferences: tempPreferences,
    authorsList,
    handleSave,
    handleToggle,
  };
};
