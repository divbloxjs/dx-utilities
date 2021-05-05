const dxUtils = require('./index');

function runTests() {
    const testString = "this_is_a_lower_case_stRIng";

    const camelCaseString = dxUtils.convertLowerCaseToCamelCase(testString,"_");
    if (camelCaseString !== "thisIsALowerCaseString") {
        console.error("convertLowerCaseToPascalCase failed. "+camelCaseString+" != "+testString);
    } else {
        console.log("convertLowerCaseToCamelCase passed");
    }

    const pascalCaseString = dxUtils.convertLowerCaseToPascalCase(testString,"_");
    if (pascalCaseString !== "ThisIsALowerCaseString") {
        console.error("convertLowerCaseToPascalCase failed. "+pascalCaseString+" != "+testString);
    } else {
        console.log("convertLowerCaseToPascalCase passed");
    }
}

runTests();