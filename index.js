const readline = require("readline");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const dxUtils = {
    //#region Command line functionality
    /**
     * A color reference to be used with dxUtils.outputFormattedLog()
     */
    commandLineColors: {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
        foregroundBlack: "\x1b[30m",
        foregroundRed: "\x1b[31m",
        foregroundGreen: "\x1b[32m",
        foregroundYellow: "\x1b[33m",
        foregroundBlue: "\x1b[34m",
        foregroundMagenta: "\x1b[35m",
        foregroundCyan: "\x1b[36m",
        foregroundWhite: "\x1b[37m",
        backgroundBlack: "\x1b[40m",
        backgroundRed: "\x1b[41m",
        backgroundGreen: "\x1b[42m",
        backgroundYellow: "\x1b[43m",
        backgroundBlue: "\x1b[44m",
        backgroundMagenta: "\x1b[45m",
        backgroundCyan: "\x1b[46m",
        backgroundWhite: "\x1b[47m",
    },

    /**
     * A more readable and friendly way to present colors for printing certain cases to the console
     */
    commandLineFormats: {
        heading: "heading",
        subHeading: "subHeading",
        default: "default",
        primary: "primary",
        secondary: "secondary",
        success: "success",
        danger: "danger",
        warning: "warning",
        info: "info",
        light: "light",
        dark: "dark",
        terminal: "terminal",
    },

    /**
     * Returns a combination of colors and setup for certain output types
     * @param {[string]} formats An array of commandLineFormats
     * @return {string} The final format to be applied to the text being printed in the console
     */
    getCommandLineFormat(formats = []) {
        let finalFormat = this.commandLineColors.reset;
        for (const format of formats) {
            switch (format) {
                case this.commandLineFormats.heading:
                    finalFormat += this.commandLineColors.bright;
                    break;
                case this.commandLineFormats.subHeading:
                    finalFormat += this.commandLineColors.dim;
                    break;
                case this.commandLineFormats.default:
                    finalFormat += this.commandLineColors.reset;
                    break;
                case this.commandLineFormats.primary:
                    finalFormat += this.commandLineColors.foregroundBlue;
                    break;
                case this.commandLineFormats.secondary:
                    finalFormat += this.commandLineColors.foregroundCyan;
                    break;
                case this.commandLineFormats.success:
                    finalFormat += this.commandLineColors.foregroundGreen;
                    break;
                case this.commandLineFormats.danger:
                    finalFormat += this.commandLineColors.foregroundRed;
                    break;
                case this.commandLineFormats.warning:
                    finalFormat += this.commandLineColors.foregroundYellow;
                    break;
                case this.commandLineFormats.info:
                    finalFormat += this.commandLineColors.foregroundMagenta;
                    break;
                case this.commandLineFormats.light:
                    finalFormat += this.commandLineColors.foregroundWhite;
                    break;
                case this.commandLineFormats.dark:
                    finalFormat += this.commandLineColors.foregroundBlack;
                    break;
                case this.commandLineFormats.terminal:
                    finalFormat += this.commandLineColors.foregroundWhite + this.commandLineColors.backgroundBlack;
                    break;
            }
        }
        return finalFormat;
    },

    /**
     * Returns the user's input to the given command line question
     * @param {string} question
     * @returns {Promise<unknown>}
     */
    async getCommandLineInput(question = "") {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        return await new Promise((resolve) => {
            rl.question(question + " ", (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    },

    /**
     * Executes a command on the terminal
     * @param command The command to execute
     * @return {Promise<{stdout, stderr}>}
     */
    async executeCommand(command) {
        try {
            const { stdout, stderr } = await exec(command);
            return { stdout, stderr };
        } catch (e) {
            console.error(e); // should contain code (exit code) and signal (that caused the termination).
        }
    },

    /**
     * Prints a log to the console, using the provided formatting
     * @param message The message to print
     * @param colorReference The color reference to use. See dxUtils.commandLineColors
     */
    outputFormattedLog(message, colorReference) {
        console.log(colorReference + "%s" + this.commandLineColors.reset, message);
    },

    /**
     * Prints a formatted message to the console for the given type and color. Useful when you want to apply consistent
     * styling to your console messages
     * @param {string} message The message to print to the console
     * @param {string} messageType A type defined in dxUtils.commandLineFormats
     * @param {string} messageColor A color reference defined in dxUtils.commandLineFormats
     */
    printFormattedMessage(
        message = "",
        messageType = this.commandLineFormats.default,
        messageColor = this.commandLineFormats.dark,
    ) {
        let lineText = "";
        for (let i = 0; i < process.stdout.columns; i++) {
            lineText += "-";
        }

        switch (messageType) {
            case this.commandLineFormats.heading:
                this.outputFormattedLog(lineText, this.getCommandLineFormat([messageType, messageColor]));
                this.outputFormattedLog(message.toUpperCase(), this.getCommandLineFormat([messageType, messageColor]));
                this.outputFormattedLog(lineText, this.getCommandLineFormat([messageType, messageColor]));
                break;
            case this.commandLineFormats.subHeading:
                this.outputFormattedLog(message, this.getCommandLineFormat([messageType, messageColor]));
                this.outputFormattedLog(lineText, this.getCommandLineFormat([messageType, messageColor]));
                break;
            case this.commandLineFormats.default:
                this.outputFormattedLog(message, this.getCommandLineFormat([messageType, messageColor]));
                break;
            case this.commandLineFormats.terminal:
                this.outputFormattedLog(": " + message + " ", this.getCommandLineFormat([messageType, messageColor]));
                break;
            default:
                this.outputFormattedLog(message, this.getCommandLineFormat([messageType, messageColor]));
        }
    },

    /**
     * A wrapper function for printing a message to the console, formatted as an error
     * @param {string} message The message to print to the console
     */
    printErrorMessage(message = "") {
        dxUtils.printFormattedMessage(message, this.commandLineFormats.default, this.commandLineFormats.danger);
    },

    /**
     * A wrapper function for printing a message to the console, formatted as a warning
     * @param {string} message The message to print to the console
     */
    printWarningMessage(message = "") {
        dxUtils.printFormattedMessage(message, this.commandLineFormats.default, this.commandLineFormats.warning);
    },

    /**
     * A wrapper function for printing a message to the console, formatted as a general info message
     * @param {string} message The message to print to the console
     */
    printInfoMessage(message = "") {
        dxUtils.printFormattedMessage(message, this.commandLineFormats.default, this.commandLineFormats.info);
    },

    /**
     * A wrapper function for printing a message to the console, formatted as a success message
     * @param {string} message The message to print to the console
     */
    printSuccessMessage(message = "") {
        dxUtils.printFormattedMessage(message, this.commandLineFormats.default, this.commandLineFormats.success);
    },

    /**
     * A wrapper function for printing a message to the console, formatted as a heading
     * @param {string} message The message to print to the console
     */
    printHeadingMessage(message = "") {
        dxUtils.printFormattedMessage(message, this.commandLineFormats.heading, this.commandLineFormats.primary);
    },

    /**
     * A wrapper function for printing a message to the console, formatted as a sub heading
     * @param {string} message The message to print to the console
     */
    printSubHeadingMessage(message = "") {
        dxUtils.printFormattedMessage(message, this.commandLineFormats.subHeading, this.commandLineFormats.secondary);
    },

    /**
     * A wrapper function for printing a message to the console, formatted as a terminal command
     * @param {string} message The message to print to the console
     */
    printTerminalMessage(message = "") {
        dxUtils.printFormattedMessage(message, this.commandLineFormats.terminal, this.commandLineFormats.terminal);
    },

    //#endregion

    //#region Timers
    /**
     * Sleeps for ms seconds when called with the await keyword
     * @param {number} ms
     * @returns {Promise<unknown>}
     */
    async sleep(ms = 0) {
        return await new Promise((resolve) => setTimeout(resolve, ms));
    },
    //#endregion

    //#region Numbers and math related
    /**
     * Returns the value as a float with [decimalPoints] number of decimals
     * @param {number} value
     * @param {number} decimalPoints
     * @returns {number}
     */
    getValueToDecimal(value = 0, decimalPoints = 0) {
        const factor = Math.pow(10, decimalPoints);
        return Math.round(factor * value) / factor;
    },
    //#endregion

    //#region Strings and string manipulation
    /**
     * Returns a utc date string that can be used with MySQL
     * @param {Date} currentDateUtc
     * @param {number} secondsToAdd
     * @return {string}
     */
    getDateStringFromCurrentDate(currentDateUtc = new Date(), secondsToAdd = 0) {
        let currentDate = new Date(currentDateUtc);
        currentDate.setSeconds(currentDate.getSeconds() + secondsToAdd);

        const dateFromCurrent = currentDate.toISOString().replace("T", " ");

        return dateFromCurrent.substring(0, dateFromCurrent.length - 5);
    },

    /**
     * Returns a local date string that can be used with MySQL
     * @param {Date} currentDateLocal
     * @param {number} secondsToAdd
     * @return {string}
     */
    getLocalDateStringFromCurrentDate(currentDateLocal = new Date(), secondsToAdd = 0) {
        let currentDate = new Date(currentDateLocal);
        currentDate.setSeconds(currentDate.getSeconds() + secondsToAdd);
        currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset());

        const dateFromCurrent = currentDate.toISOString().replace("T", " ");

        return dateFromCurrent.substring(0, dateFromCurrent.length - 5);
    },

    /**
     * Splits a camel case string into a lower case string, separated with a splitter character
     * @param {string} camelCase The string to split
     * @param {string} splitter The character to use as the splitter "" or "-", etc
     * @returns {string} The splitted string in lower case
     */
    getCamelCaseSplittedToLowerCase(camelCase = "", splitter = "") {
        return camelCase.replace(/([a-z0-9])([A-Z0-9])/g, "$1" + splitter + "$2").toLowerCase();
    },

    /**
     * Splits a camel case string into an upper case string, separated with a splitter character
     * @param camelCase The string to split
     * @param splitter The character to use as the splitter "" or "-", etc
     * @returns {string} The splitted string in upper case
     */
    getCamelCaseSplittedToUpperCase(camelCase = "", splitter = "") {
        return camelCase.replace(/([a-z0-9])([A-Z0-9])/g, "$1" + splitter + "$2").toUpperCase();
    },

    /**
     * Converts a string, separated by the splitter character to a camelCase string
     * @param {string} lowerCase The string to convert
     * @param {string} splitter The character to use as the splitter "" or "-", etc
     * @returns {string} The converted string in camelCase
     */
    convertLowerCaseToCamelCase(lowerCase = "", splitter = "_") {
        const components = lowerCase.split(splitter);
        let returnString = "";
        for (let componentCount = 0; componentCount < components.length; componentCount++) {
            if (componentCount === 0) {
                returnString += components[componentCount].toLowerCase();
            } else {
                returnString +=
                    components[componentCount].charAt(0).toUpperCase() +
                    components[componentCount].slice(1).toLowerCase();
            }
        }
        return returnString;
    },

    /**
     * Converts a string, separated by the splitter character to a PascalCase string
     * @param {string} lowerCase The string to convert
     * @param {string} splitter The character to use as the splitter "" or "-", etc
     * @returns {string} The converted string in PascalCase
     */
    convertLowerCaseToPascalCase(lowerCase = "", splitter = "_") {
        const components = lowerCase.split(splitter);
        let returnString = "";
        for (let componentCount = 0; componentCount < components.length; componentCount++) {
            returnString +=
                components[componentCount].charAt(0).toUpperCase() + components[componentCount].slice(1).toLowerCase();
        }
        return returnString;
    },

    /**
     * Converts a camelCase string to PascalCase
     * @param {string} camelCase The string to convert
     * @returns {string} The converted string in PascalCase
     */
    convertCamelCaseToPascalCase(camelCase = "") {
        return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
    },

    /**
     * Converts a PascalCase string to PascalCase
     * @param {string} pascalCase The string to convert
     * @returns {string} The converted string in camelCase
     */
    convertPascalCaseToCamelCase(pascalCase = "") {
        return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
    },

    /**
     * Returns a random string of the length specified
     * @param {number} length The length of the required string
     * @return {string} The randomly generated string
     */
    generateRandomString(length = 8) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    },

    /**
     * Determines whether or not a string is a valid json string
     * @param {string} str The string to check on
     * @returns {boolean} True if valid
     */
    isJsonString(str = "") {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    /**
     * Checks whether a value is numeric or not (string or number)
     * @param {*} value
     * @returns {boolean}
     */
    isNumeric(value) {
        if (Array.isArray(value)) {
            return false;
        }

        return !isNaN(value - parseFloat(value));
    },
    //#endregion

    //#region Validators & Regex's

    /**
     * Validates a given email address against a comprehensive regex
     * @param {string} emailAddress The email address to validate
     * @return {boolean} True if a valid email address, false otherwise
     */
    validateEmailAddress(emailAddress) {
        const regex = new RegExp(
            "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\n" +
                '\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\n' +
                "\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:\n" +
                "(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])",
        );

        return regex.test(emailAddress);
    },
    //#endregion

    //#region Object validation
    /**
     * Checks whether or not the provided input is a valid JS object or not
     * Valid if input is of type object, but not an array or null.
     * @param {*} objectToCheck Input value to validate
     * @param {boolean} checkNotEmpty Flag to add a further check of whether the object is empty or not
     * @returns {boolean} True if conditions are met, false otherwise
     */
    isValidObject(objectToCheck = null, checkNotEmpty = false) {
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
    },
    /**
     * Check whether or not a given variable is an empty object
     * @param {*} objectToCheck The object to validate
     * @returns {boolean} True if empty object, false otherwise
     */
    isEmptyObject(objectToCheck = null) {
        let isValid = true;

        isValid &&= this.isValidObject(objectToCheck, true);

        return isValid;
    },
    //#endregion
};

module.exports = dxUtils;
