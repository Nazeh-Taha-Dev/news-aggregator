/**
 * Format a date string as a human-readable date
 * @param {string} dateStr - String representation of a date
 * @returns {string} Formatted date string in the format "DD MMM YYYY"
 */
export function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options);
  }