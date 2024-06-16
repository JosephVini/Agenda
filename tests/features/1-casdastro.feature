#encoding: UTF-8
# language: pt
Funcionalidade: Cadastro
    Como um usuario que deseja usar o sistema Agenda
    Fulano quer fazer o cadastro
    Para que ele tenha acesso às funcinalidades de usuario logado

  Cenário: Cadastro com email inválido
    Dado que "Fulano" não possui uma conta no sistema
    Quando "Fulano" acessa a aba de Login/Cadastro
    E "Fulano" preenche o email com um formato inválido
    E "Fulano" aciona o botão para criar a conta
    Então aparecerá uma mensagam informando que o email é invalido

  Cenário: Cadastro com senha muito curta
    Dado que "Fulano" não está cadastrado no sistema
    Quando "Fulano" abre a aba de Login/Cadastro
    E "Fulano" preenche a senha com menos de 3 caracteres
    E "Fulano" clica na opção de cadastro
    Então "Fulano" deve receber uma mensagem da página informando que a senha é muito curta

  Cenário: Cadastro valido
    Dado que "Fulano" ainda não possui um registro no sistema
    Quando "Fulano" navega até a aba de Login/Cadastro
    E "Fulano" preenche com suas credencias válidas
    E "Fulano" aciona a opção para Cadastro
    Então "Fulano" deve receber uma mensagem da pagina informando que foi cadastrado com sucesso

  Cenário: Cadastro invalido
    Dado que "Fulano" ja possui uma conta no sistema
    Quando "Fulano" entra na pagina de Login/Cadastro
    E "Fulano" preenche com seus dados
    E "Fulano" seleciona a opção para cadastrar
    Então uma mensagem de aviso aparecerá informando que ja foi cadastrado.
