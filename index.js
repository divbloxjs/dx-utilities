const readline = require("readline");

const dx_utils = {
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
     * Sleeps for ms seconds when called with the await keyword
     * @param ms
     * @returns {Promise<unknown>}
     */
    async sleep(ms = 0) {
        return await new Promise(resolve => setTimeout(resolve, ms));
    },
    /**
     * Returns the value as a float with [decimal_points] number of decimals
     * @param value
     * @param decimal_points
     * @returns {number}
     */
    getValueToDecimal(value = 0,decimal_points = 0) {
    const factor = Math.pow(10,decimal_points);
    return Math.round(factor*value)/factor;
}
}
module.exports = dx_utils;