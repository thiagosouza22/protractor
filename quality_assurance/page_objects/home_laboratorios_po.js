'use strict'
const { element } = require("protractor");

class HomeLaboratorios {
    constructor() {
        // page para mapear elementos de cada laboratório, para validar acesso.

        //------------------------| Delboni Auriemo |-----------------------
        this.validaDelboni = element(by.css('#block-examinationresultsblock'));
        this.validaUrlDelboni = 'https://delboniauriemo.com.br/';
    }
}
module.exports = HomeLaboratorios