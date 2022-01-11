export function _calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Generate random alphanumeric
 * @param {Number} Length length of string
 * @param {Number} mode Mode for generating
 */
export const generateId = (length, mode) => {
  const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  let key = '';

  for (let i = 0; i < length; i++) {
    let hash = Math.floor(Math.random() * 2) + 1;
    let model = Math.floor(Math.random() * 2) + 1;
    let randAlpha = Math.floor(Math.random() * alphabets.length);

    if (hash === 1 || mode == 2) {
      key += Math.floor(Math.random() * 10);
    } else if (mode != 2) {
      if (model === 1) key += alphabets[randAlpha];
      else key += alphabets[randAlpha];
    }
  }

  return key;
};
