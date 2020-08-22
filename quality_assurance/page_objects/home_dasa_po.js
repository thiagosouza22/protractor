'use strict'
const { element, browser } = require("protractor");
const EC = protractor.ExpectedConditions;
const assert = require('assert');


class HomeDasa {
    constructor() {
        this.btnFiltro = element(by.id('open-close'));
        this.selectRegiao = element(by.css('div:nth-child(1) > div > label > i'));
        this.txtLaboratorio = element(by.css('div > h2'));
    }

    async abrirUrl(url) {
        browser.manage().deleteAllCookies()
        browser.get(url);
    }
    async clicarAbrirFiltro() {
        browser.wait(EC.visibilityOf(this.btnFiltro), 9000);
        return await this.btnFiltro.click();
    }
    async selecionarRegiao(regiao) {
        browser.wait(EC.visibilityOf(this.selectRegiao), 9000);
        return element(by.cssContainingText('#region > option', regiao)).click();
    }
    async listarLaboratorio(laboratorio) {
        browser.wait(EC.invisibilityOf(this.txtLaboratorio), 9000);
        var _laboratorio = 'img[alt="' + laboratorio + '"]';
        var _laboratorio = await element(by.css(_laboratorio));
        browser.wait(EC.visibilityOf(_laboratorio), 9000);
    }
    async acessarLaboratorio(laboratorio) {
        browser.wait(EC.invisibilityOf(this.txtLaboratorio), 9000);
        var _laboratorio = 'img[alt="' + laboratorio + '"]';
        //Valida elemento na página do laboratório
        if (await element(by.css(_laboratorio)).isPresent() == true) {
            var _laboratorio = await element(by.css(_laboratorio));
            await _laboratorio.click();
            await browser.sleep(1000);
            var _acessarLaboratorio = '//a[text()="' + laboratorio + '"]';
            var _acessarLaboratorio = await element(by.xpath(_acessarLaboratorio));
            return await _acessarLaboratorio.click();
        }
        else {
            assert.equal('Passou', 'Falhou', "Não foi possível acessar área do laboratório, elemento não está presente na tela")
        }
    }
}
module.exports = HomeDasa