
/**
 * Converts a date string into the format "YYYYMMDD".
 * @param {string} date - The input date string.
 * @returns {string} The formatted date string. Returns an empty string if the input is not provided.
 */
export function formatNYTDate(date) {
    if (!date) return '';
  
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const day = String(d.getDate()).padStart(2, '0'); // Ensure 2-digit day
  
    return `${year}${month}${day}`;
  }