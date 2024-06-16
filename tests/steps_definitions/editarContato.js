const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
const linkHome = 'http://localhost:3000/';

const selectors = {
    loginLink: 'Entrar',
    form: 'form',
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'Entrar',
    homeLink:'Agenda',
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
    await expect(page.getByText('Você entrou no sistema.')).toBeVisible();
    await page.getByRole('link', { name: selectors.homeLink }).click();

}

//Editar um contato sem estar logado

Given('que {string} não está conectado ao sistema', async function (string) {
    // O usuário não está logado, nada adicional é necessário aqui
});

When('{string} aciona a opção de Editar', async function (string) {
    return await page.getByRole('link', { name: 'Editar' }).click();;
});

Then('{string} uma mensagem será exibida, indicando que é necessário fazer login para acessar essa funcionalidade', async function (string) {
    return await expect(page.getByText('Você precisa fazer login.')).toBeVisible();;
});

//Editar um contato com email inválido

Given('que {string} já é usuário e está conectado', async function (string) {
    return await Login(page);
});

When('{string} seleciona a opção de Editar', async function (string) {
    return await page.getByRole('link', { name: 'Editar' }).click();;
});

When('informa um email inválido', async function () {
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('teste@inv');
});

When('{string} ativa a opção de salvar', async function (string) {
    return await page.getByRole('button', { name: 'Salvar' }).click();;
});

Then('{string} deve receber uma mensagem informando que o email informado é inválido', async function (string) {
    return await expect(page.getByText('E-mail inválido')).toBeVisible();;
});

//Editar um contato sem informar nome

When('remove o nome do contato', async function () {
    await page.locator('input[name="nome"]').click();
    await page.locator('input[name="nome"]').fill('');
});

Then('{string} deve receber uma mensagem informando que o campo de nome deve ser informado', async function (string) {
    return await expect(page.getByText('Nome é um campo obrigatório.')).toBeVisible();;
});

//Editar um contato com telefone inválido

When('informa um telefone inválido', async function () {
    await page.locator('input[name="telefone"]').click();
    await page.locator('input[name="telefone"]').fill('abc');
});

Then('{string} deve receber uma mensagem informando que o telefone informado é inválido', async function (string) {
    return await expect(page.getByText('Telefone inválido.')).toBeVisible();;
});

// Editar um contato com sucesso

When('informa o que deve ser modificado', async function () {
    await page.locator('input[name="nome"]').click();
    await page.locator('input[name="nome"]').fill('Validado');
    await page.locator('input[name="nome"]').click();
    await page.locator('input[name="nome"]').fill('40028922');
});

Then('{string} deve receber uma mensagem informando que o contato foi editado com sucesso', async function (string) {
    return await expect(page.getByText('Contato editado com sucesso.')).toBeVisible();
});