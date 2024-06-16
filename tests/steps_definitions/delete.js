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

let browser, page

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


// Excluir sem estar logado
Given('que {string} não está autenticado no sistema', async function (string) {
    // O usuário não está logado, nada adicional é necessário aqui
});

When('{string} aciona a opção de Excluir', async function (string) {
    await page.getByRole('link', { name: 'Excluir' }).click();
});

Then('{string} deve-se receber uma mensagem informando que é necessário efetuar o login para acessar essa funcionalidade', async function (string) {
    await expect(page.getByText('Você precisa fazer login.')).toBeVisible();
})


// Excluir um contato com sucesso
Given('que {string} já está registrado e logado', async function(string){
    return await Login(page);
})

When('{string} seleciona a opção de Excluir', async function (string) {
    await page.getByRole('link', { name: 'Excluir' }).click();
});

Then('Será exibida uma mensagem informando que o contato foi removido com sucesso', async function(){
    await expect(page.getByText('Contato deletado com sucesso.')).toBeVisible();
})