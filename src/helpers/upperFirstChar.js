/**
 * @param {string} str
 * @returns returns the string with the first letter in uppercase
 */
export const toUpperFirstChar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
