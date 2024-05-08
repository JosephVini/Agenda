#encoding: UTF-8
#language: pt

Funcionalidade: Adicionar contatos
    Como um usuario do sistema Agenda
    Fulano quer adicionar contatos a minha lista
    Para manter um registro de pessoas importantes

Cenário: Cadastrar contato sem logar
    Dado que "Fulano" não está logado no sistema
    Quando "Fulano" acessa a pagina de Cadastrar contato
    Então "Fulano" deve receber uma mensagem informando que é preciso fazer login para acessar essa funcinalidade

Cenário: Cadastrar contato sem informar email e telefone
    Dado que "Fulano" possui uma conta e já esteja logado
    Quando "Fulano" acessa a pagina de Cadastrar contato
    E "Fulano" preenche as informações sem informar o email e telefone
    Quando "Fulano" aciona a opção de salvar
    Então "Fulano" deve receber uma mensagem da pagina informando que pelo menos uma forma de contato deve ser informado

Cenário: Cadastrar contato com sucesso
    Dado que "Fulano" possui uma conta e já esteja logado
    Quando "Fulano" acessa a pagina de Cadastrar contato
    E "Fulano" preenche as informações do contato que deseja registrar
    Quando "Fulano" aciona a opção de salvar
    Então "Fulano" deve receber uma mensagem da pagina informando que o contato foi registrado com sucesso

*-----------------------------------------------------------------------------------*

Funcionalidade: Editar contato
    Como um usuario do sistema Agenda
    Fulano quer editar os contatos listados
    Para manter um registro atualizado das pessoas importantes

Cenário: Editar um contato sem estar logado
    Dado que "Fulano" não está logado no sistema
    Quando "Fulano" aciona a opção de Editar
    Então "Fulano" deve receber uma mensagem informando que é preciso fazer login para acessar essa funcinalidade

Cenário: Editar um contato com sucesso
    Dado que "Fulano" possui uma conta e já esteja logado
    Quando "Fulano" aciona a opção de Editar
    E informa o que deve ser modificado
    Quando "Fulano" aciona a opção de salvar
    Então "Fulano" deve receber uma mensagem informando que o contato foi editado com sucesso

*-----------------------------------------------------------------------------------*

Funcionalidade: Excluir contato
    Como um usuario do sistema Agenda
    Fulano quer deletar os contatos listados
    Para manter um registro atualizado das pessoas importantes

Cenário: Excluir um contato sem estar logado
    Dado que "Fulano" não está logado no sistema
    Quando "Fulano" aciona a opção de Excluir
    Então "Fulano" deve receber uma mensagem informando que é preciso fazer login para acessar essa funcinalidade

Cenário: Excluir um contato com sucesso
    Dado que "Fulano" possui uma conta e já esteja logado
    Quando "Fulano" aciona a opção de Excluir
    Então "Fulano" deve receber uma mensagem informando que o contato foi deletado com sucesso