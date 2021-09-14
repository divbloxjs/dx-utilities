const readline = require("readline");
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const dxUtils = {
    //#region Command line functionality
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
    async executeCommand(command) {
        try {
            const { stdout, stderr } = await exec(command);
            return { stdout, stderr };
        } catch (e) {
            console.error(e); // should contain code (exit code) and signal (that caused the termination).
        }
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