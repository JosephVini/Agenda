#encoding: UTF-8
# language: pt
Funcionalidade: Login
    Como um usuario do sistema Agenda
    Fulano quer completar o Login
    Para que ele tenha acesso às funcionalidades de usuário logado

  Cenário: Login válido
    Dado que "Fulano" possui uma conta no sistema
    E ele acessa a página de Login/Cadastro
    E ele preenche suas credenciais válidas
    Quando ele aciona a opção para logar
    Então ele deve ser redirecionado para a página inicial de usuário logado

  Cenário: Login com senha incorreta
    Dado que "Fulano" possui uma conta no sistema
    E ele acessa a página de Login/Cadastro
    E ele preenche suas credenciais com senha incorreta
    Quando ele preciona o botão para logar
    Então uma mensagem de aviso de senha incorreta deve ser exibida

  Cenário: Login com email não registrado
    Dado que "Fulano" possui uma conta no sistema
    E ele acessa a página de Login/Cadastro
    E ele preenche suas credenciais com um email não registrado
    Quando ele preciona o botão para logar
    Então uma mensagem de aviso de email não registrado deve ser exibida

  Cenário: Login com campos vazios
    Dado que "Fulano" possui uma conta no sistema
    E ele acessa a página de Login/Cadastro
    E ele deixa os campos de email e senha vazios
    Quando ele preciona o botão para logar
    Então uma mensagem de aviso para preencher os campos deve ser exibida

  Cenário: Login com email inválido
    Dado que "Fulano" possui uma conta no sistema
    E ele acessa a página de Login/Cadastro
    E ele preenche o campo de email com um formato inválido
    E ele preenche o campo de senha corretamente
    Quando ele preciona o botão para logar
    Então uma mensagem de aviso de email inválido deve ser exibida

  Cenário: Login com senha vazia
    Dado que "Fulano" possui uma conta no sistema
    E ele acessa a página de Login/Cadastro
    E ele preenche o campo de email corretamente
    E ele deixa o campo de senha vazio
    Quando ele preciona o botão para logar
    Então uma mensagem de aviso para preencher a senha deve ser exibida

  Cenário: Login com email vazio
    Dado que "Fulano" possui uma conta no sistema
    E ele acessa a página de Login/Cadastro
    E ele deixa o campo de email vazio
    E ele preenche o campo de senha corretamente
    Quando ele preciona o botão para logar
    Então uma mensagem de aviso para preencher o email deve ser exibida

  Cenário: Login com email e senha incorretos
    Dado que "Fulano" possui uma conta no sistema
    E ele acessa a página de Login/Cadastro
    E ele preenche suas credenciais com email e senha incorretos
    Quando ele preciona o botão para logar
    Então uma mensagem de aviso de email e senha incorretos deve ser exibida
