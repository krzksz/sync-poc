/**
 * Returns simple hash for given string.
 * @see https://github.com/darkskyapp/string-hash/blob/master/index.js
 * @param string String to calculate hash of.
 */
const calculate = string => {
  let hash = 5381;
  let index = string.length;

  while (index) {
    hash = (hash * 33) ^ string.charCodeAt(--index);
  }

  return hash >>> 0;
};

export { calculate };
