#encoding: UTF-8
#language: pt

Funcionalidade: Cadastro 
    Como um usuario que deseja usar o sistema Agenda
    Fulano quer fazer o Cadastro
    Para que ele tenha acesso às funcinalidades de usuario logado


Cenário: Cadastro valido
    Dado que "Fulano" não possui uma conta no sistema
    E quando "Fulano" acessa a pagina de Login/Cadastro
    E "Fulano" preenche com suas credencias válidas
    Quando "Fulano" aciona a opção para Cadastro
    Então "Fulano" deve receber uma mensagem da pagina que "Fulano" foi cadastrado com sucesso

Cenário: Cadastro invalido
    Dado que "Fulano" ja possui uma conta no sistema
    E quando "Fulano" acessa a pagina de Login/Cadastro
    E "Fulano" preenche com suas credencias válidas
    Quando "Fulano" aciona a opção para cadastrar
    Então uma mensagem de aviso aparecerá informando que ja foi cadastrado.
