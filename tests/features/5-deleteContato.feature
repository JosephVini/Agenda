# #encoding: UTF-8
# #language: pt

# Funcionalidade: Excluir contato
#     Como um usuario do sistema Agenda
#     Fulano quer deletar os contatos listados
#     Para manter um registro atualizado das pessoas importantes

# Cenário: Excluir um contato sem estar logado
#     Dado que "Fulano" não está autenticado no sistema
#     Quando "Fulano" aciona a opção de Excluir
#     Então "Fulano" deve-se receber uma mensagem informando que é necessário efetuar o login para acessar essa funcionalidade

# Cenário: Excluir um contato com sucesso
#     Dado que "Fulano" já está registrado e logado
#     Quando "Fulano" seleciona a opção de Excluir
#     Então Será exibida uma mensagem informando que o contato foi removido com sucesso