#encoding: UTF-8
# language: pt
Funcionalidade: Adicionar contatos
    Como um usuario do sistema Agenda
    Fulano quer adicionar contatos a minha lista
    Para manter um registro de pessoas importantes

  Cenário: Cadastrar contato sem logar
    Dado que "Fulano" não está logado no sistema
    Quando "Fulano" acessa a pagina de Cadastrar contato
    Então "Fulano" deve receber uma mensagem informando que é preciso fazer login para acessar essa funcionalidade

  Cenário: Cadastrar contato sem informar email e telefone
    Dado que "Fulano" possui uma conta e já esteja conectado
    Quando "Fulano" abre a aba de Cadastro de contato.
    E "Fulano" preenche as informações sem informar o email e telefone
    Quando "Fulano" aciona o butão de salvar
    Então "Fulano" deve receber uma mensagem da pagina informando que pelo menos uma forma de contato deve ser informado

  Cenário: Cadastrar contato com email inválido
    Dado que "Fulano" possui uma conta e já esteja logado
    Quando "Fulano" visualiza a aba de Cadastro de contato
    E "Fulano" preenche as informações do contato com um email inválido
    Quando "Fulano" aciona a opção de salvar
    Então "Fulano" deve receber uma mensagem da página informando que o email informado é inválido

  Cenário: Cadastrar contato com telefone inválido
    Dado que "Fulano" possui uma conta e já esteja logado
    Quando "Fulano" visualiza a aba de Cadastro de contato
    E "Fulano" preenche as informações do contato com um telefone inválido
    Quando "Fulano" aciona a opção de salvar
    Então "Fulano" deve receber uma mensagem da página informando que o telefone informado é inválido

  Cenário: Cadastrar contato com campos obrigatórios vazios
    Dado que "Fulano" possui uma conta e já esteja logado
    Quando "Fulano" visualiza a aba de Cadastro de contato
    E "Fulano" deixa o campo obrigatório de nome vazio
    Quando "Fulano" aciona a opção de salvar
    Então "Fulano" deve receber uma mensagem da página informando que o campo de nome deve ser informado

  Cenário: Cadastrar contato com sucesso
    Dado que "Fulano" possui uma conta e já esteja logado
    Quando "Fulano" visualiza a aba de Cadastro de contato
    E "Fulano" preenche as informações do contato que deseja registrar
    Quando "Fulano" aciona a opção de salvar
    Então "Fulano" deve receber uma mensagem da pagina informando que o contato foi registrado com sucesso
