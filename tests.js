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
    const color = dxUtils.commandLineColors.foregroundGreen+
        dxUtils.commandLineColors.backgroundBlack+
        dxUtils.commandLineColors.bright;
    dxUtils.outputFormattedLog("A test message",color);
    console.log("Test formatting reset");

    dxUtils.printFormattedMessage("A test heading message", dxUtils.commandLineFormats.heading, dxUtils.commandLineFormats.warning);
    dxUtils.printFormattedMessage("A test sub heading message", dxUtils.commandLineFormats.subHeading, dxUtils.commandLineFormats.info);
    dxUtils.printFormattedMessage("A test default message", dxUtils.commandLineFormats.default, dxUtils.commandLineFormats.danger);

    dxUtils.printHeadingMessage("Preformatted heading message");
    dxUtils.printSubHeadingMessage("Preformatted sub heading message");
    dxUtils.printErrorMessage("Preformatted error message");
    dxUtils.printWarningMessage("Preformatted warning message");
    dxUtils.printSuccessMessage("Preformatted success message");
    dxUtils.printInfoMessage("Preformatted info message");
    dxUtils.printTerminalMessage("Preformatted terminal message");
}

runTests();