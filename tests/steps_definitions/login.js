const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
const linkHome = 'http://localhost:3000/';

// Seletores comuns
const selectors = {
    loginLink: 'Entrar',
    form: 'form',
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'Entrar'
};

let browser, page;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(linkHome);
});

After(async function () {
    await browser.close();
});


Given('que {string} possui uma conta no sistema', async function (string) {
    // Não há ação específica necessária aqui além da navegação inicial
});


When('ele acessa a página de Login\\/Cadastro', async function () {
    return await page.getByRole('link', { name: selectors.loginLink }).click();
});

// Cenário: Login valido
When('ele preenche suas credenciais válidas', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).fill('fulano@gmail.com');
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).fill('123456');
});

When('ele aciona a opção para logar', async function () {
    return await page.getByRole('button', { name: selectors.loginButton }).click();
});

Then('ele deve ser redirecionado para a página inicial de usuário logado', async function () {
    await expect(page.getByText('Você entrou no sistema.')).toBeVisible();
});

// Cenário: Login com senha incorreta
When('ele preenche suas credenciais com senha incorreta', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).fill('fulano@gmail.com');
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).fill('1234567');
});

When('ele preciona o botão para logar', async function () {
    return await page.getByRole('button', { name: selectors.loginButton }).click();
});

Then('uma mensagem de aviso de senha incorreta deve ser exibida', async function () {
    await expect(page.getByText('Senha inválida')).toBeVisible();
});

// Cenário: Login com email não registrado
When('ele preenche suas credenciais com um email não registrado', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).fill('Ze123@gmail.com');
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).fill('123456');
});

Then('uma mensagem de aviso de email não registrado deve ser exibida', async function () {
    await expect(page.getByText('Usuário não existe')).toBeVisible();
});

// Cenário: Login com campos vazios
When('ele deixa os campos de email e senha vazios', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).fill('');
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).fill('');
});

Then('uma mensagem de aviso para preencher os campos deve ser exibida', async function () {
    await expect(page.getByText('Email inválido A senha')).toBeVisible();
});

// Cenário: Login com email inválido
When('ele preenche o campo de email com um formato inválido', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).fill('emailinvalido@inv');
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).fill('123456');
});

Then('uma mensagem de aviso de email inválido deve ser exibida', async function () {
    await expect(page.getByText('Email inválido')).toBeVisible();
});

// Cenário: Login com senha vazia
When('ele preenche o campo de email corretamente', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).fill('fulano@gmail.com');
});

When('ele deixa o campo de senha vazio', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).fill('');
});

Then('uma mensagem de aviso para preencher a senha deve ser exibida', async function () {
    await expect(page.getByText('A senha precisa ter entre 3 e')).toBeVisible();
});

// Cenário: Login com email vazio
When('ele deixa o campo de email vazio', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).fill('');
});

When('ele preenche o campo de senha corretamente', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).fill('123456');
});

Then('uma mensagem de aviso para preencher o email deve ser exibida', async function () {
    await expect(page.getByText('Email inválido')).toBeVisible();
});

// Cenário: Login com email e senha incorretos
When('ele preenche suas credenciais com email e senha incorretos', async function () {
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.emailInput).fill('fulano@gmail.con');
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).click();
    await page.locator(selectors.form).filter({ hasText: selectors.loginButton }).locator(selectors.passwordInput).fill('12345');
});

Then('uma mensagem de aviso de email e senha incorretos deve ser exibida', async function () {
    await expect(page.getByText('Usuário não existe')).toBeVisible();
});
