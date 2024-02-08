import {
    convertLowerCaseToCamelCase,
    convertLowerCaseToPascalCase,
    validateEmailAddress,
    generateRandomString,
    getDateStringFromCurrentDate,
    getLocalDateStringFromCurrentDate,
} from "./index.js";

function runTests() {
    const testString = "this_is_a_lower_case_stRIng";

    const camelCaseString = convertLowerCaseToCamelCase(testString, "_");
    if (camelCaseString !== "thisIsALowerCaseString") {
        console.error("convertLowerCaseToPascalCase failed. " + camelCaseString + " != " + testString);
    } else {
        console.log("convertLowerCaseToCamelCase passed");
    }

    const pascalCaseString = convertLowerCaseToPascalCase(testString, "_");
    if (pascalCaseString !== "ThisIsALowerCaseString") {
        console.error("convertLowerCaseToPascalCase failed. " + pascalCaseString + " != " + testString);
    } else {
        console.log("convertLowerCaseToPascalCase passed");
    }

    let testEmails = [
        "notanemail.com",
        "workingexample@stackabuse.com",
        "example@yale.edu.com",
        "johndoe@gmail.com",
        "john.doe@gmail.com",
        "johndoe@gmail.co",
        "johndoe@gmail.co.uk",
        "johndoe@gmail.app",
        "Johndoe@gmail.com",
        "johndoe@GMAILcom",
        "test@test.123",
        "TeSt@teST.123",
        "johndoe@GMAIL.com",
    ];

    testEmails.forEach((address) => {
        console.log("Email: " + address + ": " + validateEmailAddress(address));
    });

    console.log("Random string: " + generateRandomString(4));

    console.log("Current utc date: " + getDateStringFromCurrentDate());
    process.env.TZ = "Africa/Johannesburg";
    console.log("Current local date (Africa/Johannesburg): " + getLocalDateStringFromCurrentDate());
    process.env.TZ = "America/Ensenada";
    console.log("Current local date (America/Ensenada): " + getLocalDateStringFromCurrentDate());
    process.env.TZ = "Asia/Almaty";
    console.log("Current local date (Asia/Almaty): " + getLocalDateStringFromCurrentDate());
}

runTests();
