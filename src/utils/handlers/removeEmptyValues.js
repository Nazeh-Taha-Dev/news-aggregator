
/**
 * Removes any properties from an object that have null, undefined, or empty string values.
 * @param {Object} obj - The object to remove empty values from.
 * @returns {Object} A new object with the same properties as the original, minus any empty values.
 */
export function removeEmptyValues(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== null && value !== undefined && value !== '')
    );
  }