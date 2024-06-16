const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
const linkHome = 'http://localhost:3000/';

const selectors = {
    loginLink: 'Entrar',
    form: 'form',
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'Entrar',
    registerContactLink: 'Cadastrar contato',
    nameInput: 'input[name="nome"]',
    phoneInput: 'input[name="telefone"]',
    saveButton: 'Salvar',
    loginMessage: 'Você precisa fazer login.',
    contactMessage: 'Pelo menos um contato precisa',
    invalidEmailMessage: 'E-mail inválido',
    invalidPhoneMessage: 'Telefone inválido.',
    requiredNameMessage: 'Nome é um campo obrigatório.',
    successMessage: 'Contato registrado com sucesso.'
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

async function Login(page) {
    await page.getByRole('link', { name: selectors.loginLink }).click();
    await page.locator(selectors.form).filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator(selectors.emailInput).click();
    await page.locator(selectors.form).filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator(selectors.emailInput).fill('fulano@gmail.com');
    await page.locator(selectors.form).filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator(selectors.passwordInput).click();
    await page.locator(selectors.form).filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator(selectors.passwordInput).fill('123456');
    await page.getByRole('button', { name: selectors.loginButton }).click();
}

// Cadastrar sem logar
Given('que {string} não está logado no sistema', async function (string) {
    // O usuário não está logado, nada adicional é necessário aqui
});

When('{string} acessa a pagina de Cadastrar contato', async function (string) {
    return await page.getByRole('link', { name: selectors.registerContactLink }).click();
});

Then('{string} deve receber uma mensagem informando que é preciso fazer login para acessar essa funcionalidade', async function (string) {
    await expect(page.getByText(selectors.loginMessage)).toBeVisible();
});

// Cadastrar contato sem informar email ou telefone
Given('que {string} possui uma conta e já esteja conectado', async function (string) {
    await Login(page);
});

When('{string} abre a aba de Cadastro de contato.', async function (string) {
    await page.getByRole('link', { name: selectors.registerContactLink }).click();
});

When('{string} preenche as informações sem informar o email e telefone', async function (string) {
    await page.locator(selectors.nameInput).click();
    await page.locator(selectors.nameInput).fill('teste');
});

When('{string} aciona o butão de salvar', async function (string) {
    return await page.getByRole('button', { name: selectors.saveButton }).click();
});

Then('{string} deve receber uma mensagem da pagina informando que pelo menos uma forma de contato deve ser informado', async function (string) {
    return await expect(page.getByText(selectors.contactMessage)).toBeVisible();
});

// Cadastrar contato com email inválido
When('{string} preenche as informações do contato com um email inválido', async function (string) {
    await page.locator(selectors.nameInput).fill('testeEmailInvalido');
    await page.locator(selectors.emailInput).click();
    await page.locator(selectors.emailInput).fill('testeemailinvalido@inv');
});

Then('{string} deve receber uma mensagem da página informando que o email informado é inválido', async function (string) {
    await expect(page.getByText(selectors.invalidEmailMessage)).toBeVisible();
});

// Cadastrar contato com telefone inválido
When('{string} preenche as informações do contato com um telefone inválido', async function (string) {
    await page.locator(selectors.nameInput).click();
    await page.locator(selectors.nameInput).fill('teste');
    await page.locator(selectors.phoneInput).click();
    await page.locator(selectors.phoneInput).fill('abc');
});

Then('{string} deve receber uma mensagem da página informando que o telefone informado é inválido', async function (string) {
    await expect(page.getByText(selectors.invalidPhoneMessage)).toBeVisible();
});

// Cadastrar contato com campos obrigatórios vazios
When('{string} deixa o campo obrigatório de nome vazio', async function (string) {
    await page.locator(selectors.emailInput).click();
    await page.locator(selectors.emailInput).fill('teste@gmail.com');
    await page.locator(selectors.phoneInput).fill('123456');
});

Then('{string} deve receber uma mensagem da página informando que o campo de nome deve ser informado', async function (string) {
    await expect(page.getByText(selectors.requiredNameMessage)).toBeVisible();
});

// Cadastrar contato com sucesso
Given('que {string} possui uma conta e já esteja logado', async function (string) {
    await Login(page);
});

When('{string} visualiza a aba de Cadastro de contato', async function (string) {
    await page.getByRole('link', { name: selectors.registerContactLink }).click();
});

When('{string} preenche as informações do contato que deseja registrar', async function (string) {
    await page.locator(selectors.nameInput).click();
    await page.locator(selectors.nameInput).fill('teste');
    await page.locator(selectors.emailInput).click();
    await page.locator(selectors.emailInput).fill('teste@gmail.com');
    await page.locator(selectors.phoneInput).click();
    await page.locator(selectors.phoneInput).fill('123456789');
});

When('{string} aciona a opção de salvar', async function (string) {
    await page.getByRole('button', { name: selectors.saveButton }).click();
});

Then('{string} deve receber uma mensagem da pagina informando que o contato foi registrado com sucesso', async function (string) {
    return await expect(page.getByText(selectors.successMessage)).toBeVisible();
});
