/**
 * Removes spaces at the beginning of each line of text
 * @param text
 * @returns {*}
 */
export const removeSpaces = text => {
  return text.replace(/^ +/gm, "");
};
