/**
 * Formats a date string to the European format (dd/mm/yyyy).
 * @param {string} isoDate - The ISO 8601 date string to format.
 * @returns {string} The formatted date in dd/mm/yyyy format.
 */
export default function dateFormater(isoDate) {
  if (!isoDate) return ""; // Return empty string if no date provided
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0"); // Extract and pad day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Extract and pad month
  const year = date.getFullYear(); // Extract year
  return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
}
