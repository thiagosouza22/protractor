const { Given, When, Then } = require('cucumber');
const protractor = require('protractor');
const EC = protractor.ExpectedConditions;
const assert = require('assert');

const HomeDasa = require('../page_objects/home_dasa_po');
const _HomeDasa = new HomeDasa();

const HomeLaboratorios = require('../page_objects/home_laboratorios_po');
const _HomeLaboratorios = new HomeLaboratorios();


Given('que acesso ao site dasa, url {string}', async function (url) {
   _HomeDasa.abrirUrl(url);
});

When('filtro o laboratório por, região {string}, tipo serviço {string}, tipo negócio {string}, segmentação {string}', async function (regiao, tiposervico, tiponegocio, segmentacao) {
   await _HomeDasa.clicarAbrirFiltro();
   await _HomeDasa.selecionarRegiao(regiao);
});

When('acesso o laboratório {string}', async function (laboratorio) {
   var _laboratoriosSP =
      [
         "Alta Diagnósticos",
         "Delboni Auriemo",
         "Labsim",
         "Cytolab",
         "Laboratório Médico Vital Brasil",
         "Salomão Zoppi Diagnósticos",
         "Laboratório Oswaldo Cruz",
         "Lavoisier Laboratório e Imagem",
         "Deliberato Análises Clínicas",
         "Previlab",
         "ValeClin",
         "Padrão Ribeirão"
      ];

   //Lista todos laboratórios de São paulo validando se estão visíveis na tela.
   var i;
   for (i = 0; i < _laboratoriosSP.length; i++) {
      _laboratoriosSP[i];
      await _HomeDasa.listarLaboratorio(_laboratoriosSP[i]);
      console.log('Laboratório de São Paulo: ' + _laboratoriosSP[i]);
   }

   await _HomeDasa.acessarLaboratorio(laboratorio);
});

Then('verifico se fui direcionado para site do laboratório {string}', async function (laboratorio) {
   //Retorna GUID da janela atual.
   browser.getWindowHandle().then(async function (guidAtual) {
      //Retorna todos os GUID das janelas/Guias.
      browser.getAllWindowHandles().then(async function (colecaoGuid) {
         //Fecha a guia atual          
         browser.close();
         for (let guidAbaNova of colecaoGuid) {
            if (guidAbaNova != guidAtual) {
               //Alterna para a janela/guia passando o GUID especifica da mesma.
               browser.switchTo().window(guidAbaNova);
               break;
            }
         }
      });
   });

   //Screenshot da tela
   let world = this;
   {
      await browser.takeScreenshot().then(function (buffer) {
         world.attach(buffer, "image/png");
      });
   }

   switch (laboratorio) {
      case "Delboni Auriemo":
         //Asserção para validar acesso a url do laboratório
         browser.wait(EC.visibilityOf(_HomeLaboratorios.validaDelboni), 12000)
         const _validaDelboni = await _HomeLaboratorios.validaDelboni.getText()
         assert.equal(_validaDelboni, 'Resultados de Exames');
         //Captura a url do laboratório
         const _urlDelboni = await browser.driver.getCurrentUrl();
         assert.equal(_urlDelboni, _HomeLaboratorios.validaUrlDelboni);
         break;
   }
});