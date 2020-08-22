#language: pt

Funcionalidade: Acessar site dos laboratórios 

 Esquema do Cenário: Acessar site do laboratório <laboratorio>
 Dado que acesso ao site dasa, url "<url>"
 E filtro o laboratório por, região "<regiao>", tipo serviço "<tiposervico>", tipo negócio "<tiponegocio>", segmentação "<segmentacao>"
 Quando acesso o laboratório "<laboratorio>"
 Então verifico se fui direcionado para site do laboratório "<laboratorio>"

 Exemplos:
 |url    |regiao    |tiposervico               |tiponegocio               |segmentacao           |laboratorio      |
 |marcas |São Paulo |Todos os tipos de serviço |Todos os tipos de negócio |Todas as segmentações |Delboni Auriemo  |