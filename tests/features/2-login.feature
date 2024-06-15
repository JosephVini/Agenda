#encoding: UTF-8
# language: pt
Funcionalidade: Login
    Como um usuario do sistema Agenda
    Fulano quer completar o Login
    Para que ele tenha acesso às funcinalidades de usuário logado

  Contexto:
    Dado que Fulano possui uma conta no sistema

  Cenário: Login valido
    E ele acessa a pagina de Login/Cadastro
    E ele preenche suas credencias válidas
    Quando ele aciona a opção para logar
    Então ele deve ser redirecionado para a pagina inicial de usuario logado

  Cenário: Login com senha incorreta
    E ele acessa a pagina de Login/Cadastro
    E ele preenche suas credencias com senha incorreta
    Quando ele preciona o botão para logar
    Então uma mensagem de aviso de senha incorreta deve ser exibida
