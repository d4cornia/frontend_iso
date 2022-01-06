const validator = {
  /**
   * To check if value is empty or null or undefined
   * @param {any} value Value to be checked
   */
  isEmpty: (value) => {
    return value === null || value === undefined || value === '';
  },
  /**
   * To check if value has number and/or alphabets
   * @param {any} value Value to be checked
   */
  isAlphaNum: (value) => {
    return /^[a-zA-Z0-9]+$/.test(value);
  },
  /**
   * To check if value has atleast 1 number and 1 letter
   * @param {any} value Value to be checked
   */
  isStrictAlphaNum: (value) => {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
  },
  /**
   * To check if value is alphabetic(Disallow Spaces)
   * @param {any} value Value to be checked
   */
  isStrictAlpha: (value) => {
    return /^[a-zA-Z]+$/.test(value);
  },
  /**
   * To check if value is alphabetic(Allow Spaces)
   * @param {any} value Value to be checked
   */
  isAlpha: (value) => {
    return /^[a-zA-Z ]*$/.test(value);
  },
  /**
   * To check if value is numeric
   * @param {any} value Value to be checked
   */
  isNumeric: (value) => {
    return /^(0|[1-9][0-9]*)$/.test(value);
  },
  /**
   * To check if value has space in it
   * @param {any} value Value to be checked
   */
  hasSpace: (value) => {
    return !/^\S*$/.test(value);
  },
  /**
   * To check if value has any special characters in it
   * @param {any} value Value to be checked
   */
  hasSpecialChars: (value) => {
    return !/^[a-zA-Z0-9 ]*$/.test(value);
  },
  /**
   * To check if value is a double
   * @param {any} value Value to be checked
   */
  isDouble: (value) => {
    return /[+-]?([0-9]*[.])?[0-9]+/.test(value);
  },
  /**
   * To check if the length of value is less or equal to a number
   * @param {any} value Value to be checked
   * @param {Number} ceiling Desired Max length of value
   */
  isMaxLength: (value, ceiling) => {
    return value.length <= ceiling;
  },
  /**
   * To check if the length of value is more or equal to a number
   * @param {any} value Value to be checked
   * @param {Number} floor Desired Min length of value
   */
  isMinLength: (value, floor) => {
    return value.length >= floor;
  },
  /**
   * To check if value(email) is valid
   * @param {any} value Value to be checked
   */
  isEmailValid: (value) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value.toLowerCase()
    );
  }
};

export default validator;
