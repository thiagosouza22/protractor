'use strict'
const Data = require('./environments_parameters.json');
const Reporter = require('../quality_assurance/support/reporter');

const TEST_ENV = process.env.TEST_ENV || 'local'
let environmentParameters

switch (TEST_ENV) {
    case 'local':
        environmentParameters = Data[0].local
        break
}

exports.config = {
    seleniumAddress: environmentParameters.seleniumAddress,
    ignoreUncaughtExceptions: true,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    restartBrowserBetweenTests: false,
    getPageTimeout: 700000,
    allScriptsTimeout: 500000,
    rootElement: 'body',
    baseUrl: environmentParameters.baseUrl,
    params: {
    },

    capabilities: {
        browserName: process.env.TEST_BROWSER_NAME || "chrome",
        chromeOptions: {
            args: [
                //"headless", //executa o teste em segundo plano
                "--disable-gpu",
                "--window-size=1280,1024",
                "--Buffer.allocUnsafe()",
                "--disable-infobars",
                "--disable-extensions",
            ]
        }
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        'feature/*.feature',
    ],

    onPrepare: async function () {
        await browser.waitForAngularEnabled(false);
        await browser.manage().window().maximize();
    },

    cucumberOpts: {
        strict: true,
        format: 'json:results.json',
        require: '../quality_assurance/step_definitions/*.js',
        tags: [''],
    },

    onComplete: function () {
        Reporter.createHTMLReport();
    },

    resultJsonOutputFile: "C:/Relatórios/json/protractor_report.json",
    onPrepare: async function () {
        await browser.waitForAngularEnabled(false);
        await browser.manage().window().maximize();
    },

};