const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
const linkHome = 'http://localhost:3000/';

let browser, page;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(linkHome);
});

After(async function () {
    await browser.close();
});

// Seletores comuns
const selectors = {
    loginLink: 'Entrar',
    form: 'form',
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    createAccountButton: 'Criar minha conta'
};

// Cadastro com email inválido
Given('que {string} não possui uma conta no sistema', async function (string) {
    // Não há ação específica necessária aqui além da navegação inicial
});

When('{string} acessa a aba de Login\\/Cadastro', async function (string) {
    return await page.getByRole('link', { name: selectors.loginLink }).click();
});

When('{string} preenche o email com um formato inválido', async function (string) {
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').fill('fulano@asdfsf');
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').fill('123456');
});

When('{string} aciona o botão para criar a conta', async function (string) {
    return await page.getByRole('button', { name: selectors.createAccountButton }).click();
});

Then('aparecerá uma mensagam informando que o email é invalido', async function () {
    return await expect(page.getByText('Email inválido')).toBeVisible();
});


// Cadastro com senha muito curta
Given('que {string} não está cadastrado no sistema', async function (string) {
    // Não há ação específica necessária aqui além da navegação inicial
});

When('{string} abre a aba de Login\\/Cadastro', async function (string) {
    return await page.getByRole('link', { name: selectors.loginLink }).click();
});

When('{string} preenche a senha com menos de {int} caracteres', async function (string, int) {
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').fill('fulano@gmail.com');
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').fill('12');
});

When('{string} clica na opção de cadastro', async function (string) {
    return await page.getByRole('button', { name: selectors.createAccountButton }).click();
});

Then('{string} deve receber uma mensagem da página informando que a senha é muito curta', async function (string) {
    return await expect(page.getByText('Senha precisa ter entre 3 e 50 caracteres')).toBeVisible();
});

// Cadastro válido
Given('que {string} ainda não possui um registro no sistema', async function (string) {
    // Não há ação específica necessária aqui além da navegação inicial
});

When('{string} navega até a aba de Login\\/Cadastro', async function (string) {
    return await page.getByRole('link', { name: selectors.loginLink }).click();
});

When('{string} preenche com suas credencias válidas', async function (string) {
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').fill('fulano@gmail.com');
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').fill('123456');
});

When('{string} aciona a opção para Cadastro', async function (string) {
    await page.getByRole('button', { name: selectors.createAccountButton }).click();
});

Then('{string} deve receber uma mensagem da pagina informando que foi cadastrado com sucesso', async function (string) {
    await expect(page.getByText('Seu usuário foi criado com sucesso.')).toBeVisible();
});

// Cadastro inválido
Given('que {string} ja possui uma conta no sistema', async function (string) {
    // Não há ação específica necessária aqui além da navegação inicial
});

When('{string} entra na pagina de Login\\/Cadastro', async function (string) {
    await page.getByRole('link', { name: selectors.loginLink }).click();
});

When('{string} preenche com seus dados', async function (string) {
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').fill('fulano@gmail.com');
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').fill('123456');
});

When('{string} seleciona a opção para cadastrar', async function (string) {
    await page.getByRole('button', { name: selectors.createAccountButton }).click();
});

Then('uma mensagem de aviso aparecerá informando que ja foi cadastrado.', async function () {
    await expect(page.getByText('Usuário já existe')).toBeVisible();
});
