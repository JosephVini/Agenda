#encoding: UTF-8
#language: pt

Funcionalidade: Editar contato
    Como um usuario do sistema Agenda
    Fulano quer editar os contatos listados
    Para manter um registro atualizado das pessoas importantes

Cenário: Editar um contato sem estar logado
    Dado que "Fulano" não está conectado ao sistema
    Quando "Fulano" aciona a opção de Editar
    Então "Fulano" uma mensagem será exibida, indicando que é necessário fazer login para acessar essa funcionalidade

Cenário: Editar um contato com sucesso
    Dado que "Fulano" já é usuário e está conectado
    Quando "Fulano" seleciona a opção de Editar
    E informa o que deve ser modificado
    Quando "Fulano" ativa a opção de salvar
    Então "Fulano" deve receber uma mensagem informando que o contato foi editado com sucesso