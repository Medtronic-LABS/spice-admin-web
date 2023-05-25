export const isEmpty = (value: string | undefined | null) =>
  value === undefined || value === null || value === '' || value.length === 0;

/**
 * To check whether the value is falsy or truthy.
 * @param {string} value
 * @returns {string}
 */
export function required(value: any) {
  if (value && typeof value === 'string') {
    value = value.trim();
  }
  if (isEmpty(value)) {
    return 'Please enter ';
  }

  if (Array.isArray(value) && !value.length) {
    return 'Please enter ';
  }
}

/**
 * To check whether email is valid or not
 * @param email email string
 */
export function validateEmail(email: string) {
  if (!email) {
    return '';
  }
  const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return regex.test(email) ? '' : 'Please enter a valid ';
}

export function validatePassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,64}$/;
  return regex.test(password) ? '' : 'Please enter a valid password.';
}

/**
 * Validates the maxixmum length of characters to enter.
 * @param max Text to verify maximum length
 */
export function maxLength(max: number) {
  return (value: string) => {
    if (value && value.length > max) {
      return 'Please enter a valid ';
    }
  };
}

/**
 * Composes all the validators into single function
 * @param validators
 * @returns
 */
export function composeValidators(...validators: any) {
  return (value: string, allValues: object) =>
    validators.reduce((error: string, validator: any) => error || validator(value, allValues), undefined);
}

/**
 * Removes all characters except numerics in the given string
 * @param value
 * @returns {string}
 */
export function convertToNumber(value: string) {
  if (value) {
    value = value.replace(/[^\d]/g, '');
    return value;
  } else {
    return value;
  }
}

/**
 * Removes all characters except numerics with decimal in the given string
 * @param value
 * @returns {string}
 */
export function convertToFloatNumber(value: string) {
  if (value) {
    value = value.replace(/[^\d+.]/g, '');
    return value;
  } else {
    return value;
  }
}

export function checkIfFloatNumber(value: string) {
  if (Number(value) < 0) {
    return 'Please enter a valid';
  }
}

export function isWholeNumber(value: string): boolean {
  const regex = /\d/g;
  return regex.test(value);
}

export function checkifNumberIncDecimal(value: string): boolean {
  const regex = /[\d+.]/g;
  return regex.test(value);
}

/**
 * Converts the camel case to Title.
 * @param {string} value camel case text to title
 */
export function camel2Title(value: string) {
  return (
    value &&
    value
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase())
      .trim()
  );
}

/**
 * Converts the first character into uppercase
 * @param {string} value Text to convert uppercase
 */
export function convertToCaptilize(value: string) {
  return value && value.trim() ? value.charAt(0).toUpperCase() + value.slice(1) : '';
}

/**
 * Converts the text into lowercase
 * @param {string} value Text to convert lowercase
 */
export function convertToLowerCase(value: string) {
  return value && value.trim() ? value.toLowerCase() : '';
}

/**
 * Converts the text into substring with certain characters
 * @param {string} value Text to convert substring
 * @param {number} charLength optional param, no of character to be displayed.
 */
export function convertToSubString(value: string, charLength: number = 55) {
  return value && value.trim().length > charLength ? `${value.substring(0, charLength)}...` : value;
}

/**
 * To check value contains only character
 * @param value input value
 */
export function validateText(value: string) {
  const regex = /^[a-zA-Z ]+$/;
  return regex.test(value) ? '' : 'Please enter text in ';
}

/**
 * Validates the minimum length of characters to enter.
 * @param min Text to verify minimum length
 */
export function minLength(min: number) {
  return (value: any) => {
    if (value && value.length < min) {
      return 'Please enter a valid ';
    }
  };
}

/**
 * Validates the name field with min and max length
 * @param name Input text
 */
export function validateName(name: string) {
  const regex = /^[a-zA-Z'.\-\s]{2,100}$/;
  return regex.test(name) ? '' : 'Please enter a valid ';
}

/**
 * To verify lastname string with particular limit
 * @param name Input text
 */
export function validateLastName(name: string) {
  const regex = /^[a-zA-Z'.\-\s]{1,100}$/;
  return regex.test(name) ? '' : 'Please enter a valid ';
}

/**
 * Validates the name field with min and max length
 * @param name Input text
 */
export function validateFullName(name: string) {
  const regex = /^[a-zA-Z'.\-\s]{2,30}$/;
  return regex.test(name) ? '' : 'Please enter a valid ';
}

/**
 * To check whether mobile number contains ten digit number
 * @param mobileNo mobile number string
 */
export function validateMobile(mobileNo: string) {
  const regex = /^\d{8,10}$/;
  return !mobileNo || regex.test(mobileNo) ? '' : 'Please enter a valid ';
}

/**
 * Validates the string should match specific regex
 * @param {string} value
 */
export function containsOnlyLettersAndNumbers(value: string) {
  const regex = /^[A-Za-z0-9 ]*$/;
  return regex.test(value) ? '' : 'Please enter a valid ';
}

/**
 * Validates the string should match specific regex
 * @param {string} value
 */
export function validateEntityName(value: string) {
  const regex = /^(?=.*[A-Za-z])[a-zA-Z0-9'./,&()+-\s]{2,64}$/;
  return regex.test(value) ? '' : 'Please enter a valid ';
}

/**
 * To verify if the values is less than the max value
 * @param max Input number
 */
export function checkIfLessThan(max: number) {
  return (value: any) => {
    if (value && Number(value) >= Number(max)) {
      return 'Please enter a valid ';
    }
  };
}

/**
 * To verify if the values is greater than the min value
 * @param min Input number
 */
export function checkIfGreater(min: number) {
  return (value: any) => {
    if (value && Number(value) <= Number(min)) {
      return 'Please enter a valid ';
    }
  };
}

export function validateCountryCode(code: string) {
  const regex = /^\d{1,5}$/;
  return regex.test(code) ? '' : 'Please enter a valid ';
}

/**
 * To restrict phone to enter 10 characters
 * @param value
 */
export function normalizePhone(value: any) {
  // while using parse it returns empty string to an object when no value is entered in the input.
  // Implemented to get undefined.
  if (!value) {
    return undefined;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  return onlyNums.slice(0, 10);
}

export function validateCheckbox(value: Array<number | string>) {
  if (!value?.length) {
    return 'Please enter';
  }
}

interface IDateOptions {
  month: string;
  format: string;
}

/**
 * To format the date with options.
 * @param value
 */
export function formatDate(value: string | number | Date, options: IDateOptions) {
  // options eg: month:'short' | 'long' | 'numeric', format: 'DD-MM-YYYY'
  let fullDate: Date;
  if (typeof value === 'string' || typeof value === 'number') {
    fullDate = new Date(value);
  } else {
    fullDate = value;
  }
  const longMonthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  function findMonth() {
    const monthIndex = fullDate.getMonth();
    if (options?.month === 'short') {
      return longMonthNames[monthIndex].substring(0, 3);
    } else if (options?.month === 'long') {
      return longMonthNames[monthIndex];
    } else if (options?.month === 'numeric') {
      return monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    }
  }

  const foundDay = fullDate.getDate();
  const day = foundDay < 10 ? `0${foundDay}` : foundDay;
  const month = findMonth();
  const year = fullDate.getFullYear();

  return options.format.replace('YYYY', `${year}`).replace('MM', `${month}`).replace('DD', `${day}`);
}

/**
 * Form validators based on input props
 * @param inputProps object
 */
export function formValidators(inputProps: any) {
  const validationList: any = [];
  Object.keys(inputProps).forEach((attributes: string) => {
    switch (attributes) {
      case 'required': {
        if (inputProps[attributes]) {
          validationList.push(required);
        }
        break;
      }
      case 'minLength': {
        if (inputProps[attributes] !== null || inputProps[attributes] !== undefined) {
          validationList.push(minLength(inputProps[attributes]));
        }
        break;
      }
      case 'customValidator': {
        if (inputProps[attributes]) {
          validationList.push(inputProps[attributes]);
        }
      }
    }
  });
  return validationList;
}
