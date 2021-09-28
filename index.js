const readline = require("readline");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

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
        backgroundWhite: "\x1b[47m"
    },

    /**
     * Returns the user's input to the given command line question
     * @param {string} question
     * @returns {Promise<unknown>}
     */
    async getCommandLineInput(question = "") {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return await new Promise(resolve => {
            rl.question(question+" ", answer => {rl.close();resolve(answer)})
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
        console.log(colorReference+'%s'+this.commandLineColors.reset, message);
    },
    //#endregion

    //#region Timers
    /**
     * Sleeps for ms seconds when called with the await keyword
     * @param {number} ms
     * @returns {Promise<unknown>}
     */
    async sleep(ms = 0) {
        return await new Promise(resolve => setTimeout(resolve, ms));
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
     * Returns a date string that can be used with MySQL
     * @param {Date} currentDateUtc
     * @param {number} secondsToAdd
     * @return {string}
     */
    getDateStringFromCurrentDate(currentDateUtc = new Date(), secondsToAdd = 0) {
        let currentDate = new Date(currentDateUtc);
        currentDate.setSeconds(currentDate.getSeconds() + secondsToAdd);
        const dateFromCurrent = currentDate.toISOString().replace('T', ' ');
        return dateFromCurrent.substring(0,dateFromCurrent.length - 5);
    },

    /**
     * Splits a camel case string into a lower case string, separated with a splitter character
     * @param {string} camelCase The string to split
     * @param {string} splitter The charactor to use as the splitter "" or "-", etc
     * @returns {string} The splitted string in lower case
     */
    getCamelCaseSplittedToLowerCase(camelCase = '', splitter = "") {
        return camelCase.replace(/([a-z0-9])([A-Z0-9])/g, '$1'+splitter+'$2').toLowerCase();
    },

    /**
     * Converts a string, separated by the splitter character to a camelCase string
     * @param {string} lowerCase The string to convert
     * @param {string} splitter The character to use as the splitter "" or "-", etc
     * @returns {string} The converted string in camelCase
     */
    convertLowerCaseToCamelCase(lowerCase = '', splitter = "_") {
        const components = lowerCase.split(splitter);
        let returnString = "";
        for (let componentCount = 0; componentCount < components.length; componentCount++) {
            if (componentCount === 0) {
                returnString += components[componentCount].toLowerCase();
            } else {
                returnString += components[componentCount].charAt(0).toUpperCase() + components[componentCount].slice(1).toLowerCase();
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
    convertLowerCaseToPascalCase(lowerCase = '', splitter = "_") {
        const components = lowerCase.split(splitter);
        let returnString = "";
        for (let componentCount = 0; componentCount < components.length; componentCount++) {
            returnString += components[componentCount].charAt(0).toUpperCase() + components[componentCount].slice(1).toLowerCase();
        }
        return returnString;
    }
    //#endregion
}

module.exports = dxUtils;