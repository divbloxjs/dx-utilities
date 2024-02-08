//#region Timers

/**
 * Sleeps for ms seconds when called with the await keyword
 * @param {number} ms
 * @returns {Promise<unknown>}
 */
export const sleep = async (ms = 0) => {
    return await new Promise((resolve) => setTimeout(resolve, ms));
};
//#endregion

//#region Numbers and math related

/**
 * Returns the value as a float with [decimalPoints] number of decimals
 * @param {number} value
 * @param {number} decimalPoints
 * @returns {number}
 */
export const getValueToDecimal = (value = 0, decimalPoints = 0) => {
    const factor = Math.pow(10, decimalPoints);
    return Math.round(factor * value) / factor;
};
//#endregion

//#region Strings and string manipulation

/**
 * Returns a utc date string that can be used with MySQL
 * @param {Date} currentDateUtc
 * @param {number} secondsToAdd
 * @return {string}
 */
export const getDateStringFromCurrentDate = (currentDateUtc = new Date(), secondsToAdd = 0) => {
    let currentDate = new Date(currentDateUtc);
    currentDate.setSeconds(currentDate.getSeconds() + secondsToAdd);

    const dateFromCurrent = currentDate.toISOString().replace("T", " ");

    return dateFromCurrent.substring(0, dateFromCurrent.length - 5);
};

/**
 * Returns a local date string that can be used with MySQL
 * @param {Date} currentDateLocal
 * @param {number} secondsToAdd
 * @return {string}
 */
export const getLocalDateStringFromCurrentDate = (currentDateLocal = new Date(), secondsToAdd = 0) => {
    let currentDate = new Date(currentDateLocal);
    currentDate.setSeconds(currentDate.getSeconds() + secondsToAdd);
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset());

    const dateFromCurrent = currentDate.toISOString().replace("T", " ");

    return dateFromCurrent.substring(0, dateFromCurrent.length - 5);
};

/**
 * Splits a camel case string into a lower case string, separated with a splitter character
 * @param {string} camelCase The string to split
 * @param {string} splitter The character to use as the splitter "" or "-", etc
 * @returns {string} The splitted string in lower case
 */
export const getCamelCaseSplittedToLowerCase = (camelCase = "", splitter = "") => {
    return camelCase.replace(/([a-z0-9])([A-Z0-9])/g, "$1" + splitter + "$2").toLowerCase();
};

/**
 * Splits a camel case string into an upper case string, separated with a splitter character
 * @param camelCase The string to split
 * @param splitter The character to use as the splitter "" or "-", etc
 * @returns {string} The splitted string in upper case
 */
export const getCamelCaseSplittedToUpperCase = (camelCase = "", splitter = "") => {
    return camelCase.replace(/([a-z0-9])([A-Z0-9])/g, "$1" + splitter + "$2").toUpperCase();
};

/**
 * Converts a string, separated by the splitter character to a camelCase string
 * @param {string} lowerCase The string to convert
 * @param {string} splitter The character to use as the splitter "" or "-", etc
 * @returns {string} The converted string in camelCase
 */
export const convertLowerCaseToCamelCase = (lowerCase = "", splitter = "_") => {
    const components = lowerCase.split(splitter);
    let returnString = "";
    for (let componentCount = 0; componentCount < components.length; componentCount++) {
        if (componentCount === 0) {
            returnString += components[componentCount].toLowerCase();
        } else {
            returnString +=
                components[componentCount].charAt(0).toUpperCase() + components[componentCount].slice(1).toLowerCase();
        }
    }
    return returnString;
};

/**
 * Converts a string, separated by the splitter character to a PascalCase string
 * @param {string} lowerCase The string to convert
 * @param {string} splitter The character to use as the splitter "" or "-", etc
 * @returns {string} The converted string in PascalCase
 */
export const convertLowerCaseToPascalCase = (lowerCase = "", splitter = "_") => {
    const components = lowerCase.split(splitter);
    let returnString = "";
    for (let componentCount = 0; componentCount < components.length; componentCount++) {
        returnString +=
            components[componentCount].charAt(0).toUpperCase() + components[componentCount].slice(1).toLowerCase();
    }
    return returnString;
};

/**
 * Converts a camelCase string to PascalCase
 * @param {string} camelCase The string to convert
 * @returns {string} The converted string in PascalCase
 */
export const convertCamelCaseToPascalCase = (camelCase = "") => {
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

/**
 * Converts a PascalCase string to PascalCase
 * @param {string} pascalCase The string to convert
 * @returns {string} The converted string in camelCase
 */
export const convertPascalCaseToCamelCase = (pascalCase = "") => {
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
};

/**
 * Returns a random string of the length specified
 * @param {number} length The length of the required string
 * @return {string} The randomly generated string
 */
export const generateRandomString = (length = 8) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

/**
 * Determines whether or not a string is a valid json string
 * @param {string} str The string to check on
 * @returns {boolean} True if valid
 */
export const isJsonString = (str = "") => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

/**
 * Checks whether a value is numeric or not (string or number)
 * @param {*} value
 * @returns {boolean}
 */
export const isNumeric = (value) => {
    if (Array.isArray(value)) {
        return false;
    }

    return !isNaN(value - parseFloat(value));
};
//#endregion

//#region Validators & Regex's

/**
 * Validates a given email address against a comprehensive regex
 * @param {string} emailAddress The email address to validate
 * @return {boolean} True if a valid email address, false otherwise
 */
export const validateEmailAddress = (emailAddress) => {
    const regex = new RegExp(
        "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\n" +
            '\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\n' +
            "\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:\n" +
            "(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])",
    );

    return regex.test(emailAddress);
};
//#endregion

//#region Object validation

/**
 * Checks whether or not the provided input is a valid JS object or not
 * Valid if input is of type object, but not an array or null.
 * @param {*} objectToCheck Input value to validate
 * @param {boolean} checkNotEmpty Flag to add a further check of whether the object is empty or not
 * @returns {boolean} True if conditions are met, false otherwise
 */
export const isValidObject = (objectToCheck = null, checkNotEmpty = false) => {
    let isValid = true;

    isValid &&= typeof objectToCheck === "object";
    isValid &&= objectToCheck?.constructor === Object;
    isValid &&= !Array.isArray(objectToCheck);
    isValid &&= objectToCheck !== null;

    if (!isValid) {
        return false;
    }

    if (checkNotEmpty && Object.values(objectToCheck).length === 0) {
        isValid &&= false;
    }

    return isValid;
};

/**
 * Check whether or not a given variable is an empty object
 * @param {*} objectToCheck The object to validate
 * @returns {boolean} True if empty object, false otherwise
 */
export const isEmptyObject = (objectToCheck = null) => {
    let isValid = true;

    isValid &&= this.isValidObject(objectToCheck, true);

    return isValid;
};
//#endregion
