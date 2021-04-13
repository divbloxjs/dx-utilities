const readline = require("readline");

const dx_utils = {
    //#region Command line functionality
    /**
     * Returns the user's input to the given command line question
     * @param question
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
    //#endregion

    //#region Timers
    /**
     * Sleeps for ms seconds when called with the await keyword
     * @param ms
     * @returns {Promise<unknown>}
     */
    async sleep(ms = 0) {
        return await new Promise(resolve => setTimeout(resolve, ms));
    },
    //#endregion

    //#region Numbers and math related
    /**
     * Returns the value as a float with [decimal_points] number of decimals
     * @param value
     * @param decimal_points
     * @returns {number}
     */
    getValueToDecimal(value = 0,decimal_points = 0) {
        const factor = Math.pow(10,decimal_points);
        return Math.round(factor*value)/factor;
    },
    //#endregion

    //#region Strings and string manipulation
    /**
     * Returns a date string that can be used with MySQL
     * @param current_date_utc
     * @param seconds_to_add
     * @return {string}
     */
    getDateStringFromCurrentDate(current_date_utc = new Date(),seconds_to_add = 0) {
        let current_date_obj = new Date(current_date_utc);
        current_date_obj.setSeconds(current_date_obj.getSeconds() + seconds_to_add);
        const date_from_current_str = current_date_obj.toISOString().replace('T', ' ');
        return date_from_current_str.substring(0,date_from_current_str.length - 5);
    },

    /**
     * Splits a camel case string into a lower case string, separated with a splitter character
     * @param camel_case_str The string to split
     * @param splitter The charactor to use as the splitter "_" or "-", etc
     * @returns {string} The splitted string in lower case
     */
    getCamelCaseSplittedToLowerCase(camel_case_str = '',splitter = "_") {
        return camel_case_str.replace(/([a-z0-9])([A-Z0-9])/g, '$1'+splitter+'$2').toLowerCase();
    }
    //#endregion
}
module.exports = dx_utils;