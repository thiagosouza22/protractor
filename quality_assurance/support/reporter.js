const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const reporter = require("cucumber-html-reporter");
const report = require("cucumber-html-report");
const htmlReports = process.cwd() + "../../../../Relatórios/html";
const targetJson = process.cwd() + "/results.json";

var now = new Date
var ano = now.getFullYear()
var dia = now.getDate()
var mes = now.getMonth() + 1
var hora = now.getHours()
var min = now.getMinutes()

const cucumberReporteroptions = {
  theme: "bootstrap",
  name: "Relatório de Testes",
  brandTitle: "Thiago Testes",
  launchReport: true,
  columnLayout: 1,
  jsonFile: targetJson,
  output: '../../../../Relatórios/html/Relatório_Testes_' + dia + '-' + mes + '-' + ano + '_' + hora + '-' + min + '.html',
  storeScreenshots: false,
  screenshotsDirectory: 'C:/Relatórios/Screenshots/Img_' + dia + '-' + mes + '-' + ano,
};

class Reporter {

  static createDirectory(dirName) {
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }
  }

  static createHTMLReport() {

    try {
      reporter.generate(cucumberReporteroptions);
      report
        .create(cucumberReportOptions)
        .then(function () {
          console.log('Relatório_Testes_MOD2_' + dia + '-' + mes + '-' + ano + '_' + hora + '-' + min + '.html criado com sucesso!');
        })
        .catch(function (err) {
          if (err) {
            console.error(err);
          }
        });
    } catch (err) {
      if (err) {
        console.log("Failed to save cucumber test results to json file.");
        console.log(err);
      }
    }
  }
  static createAllureXML() {
    const allureReporter = require("cucumberjs-allure-reporter");
    const xmlReports = process.cwd() + "/reports/xml";
    Reporter.createDirectory(xmlReports);
    allureReporter.config({
      targetDir: xmlReports
    })
  }
}
module.exports = Reporter;