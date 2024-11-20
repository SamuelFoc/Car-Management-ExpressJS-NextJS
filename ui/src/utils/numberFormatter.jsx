/**
 * Formats a number with spaces as thousand separators.
 * @param {number|string} number - The number to format.
 * @returns {string} The formatted number with spaces as thousand separators.
 */
export default function numberFormatter(number) {
  if (number == null) return ""; // Handle null or undefined inputs
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
