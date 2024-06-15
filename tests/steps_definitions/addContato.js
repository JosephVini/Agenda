const { Given, When, Then } = require('@cucumber/cucumber')
const { expect, chromium } = require('@playwright/test');
const linkHome = 'http://localhost:3000/';

let browser, page

async function Login(page) {
    await page.getByRole('link', { name: 'Entrar' }).click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').fill('fulano@gmail.com');
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').fill('123456');
    await page.getByRole('button', { name: 'Entrar' }).click();
}

Given('que {string} não está logado no sistema', async function (string) {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    return page.goto(linkHome)
});

When('{string} acessa a pagina de Cadastrar contato', async function (string) {
    await page.getByRole('link', { name: 'Cadastrar contato' }).click();
});

Then('{string} deve receber uma mensagem informando que é preciso fazer login para acessar essa funcinalidade', async function (string) {
    await expect(page.getByText('Você precisa fazer login.')).toBeVisible();
});

Given('que {string} possui uma conta e já esteja conectado', async function (string) {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    page.goto(linkHome)
    return Login(page)
});

When('{string} abre a aba de Cadastro de contato.', async function (string) {
    await page.getByRole('link', { name: 'Cadastrar contato' }).click();
});

When('{string} preenche as informações sem informar o email e telefone', async function (string) {
    return [
        await page.locator('input[name="nome"]').click(),
        await page.locator('input[name="nome"]').fill('teste')
    ]
});

When('{string} aciona o butão de salvar', async function (string) {
    await page.getByRole('button', { name: 'Salvar' }).click();
});

Then('{string} deve receber uma mensagem da pagina informando que pelo menos uma forma de contato deve ser informado', async function (string) {
    await expect(page.getByText('Pelo menos um contato precisa ser enviado: e-mail ou telefone')).toBeVisible();
});

Given('que {string} possui uma conta e já esteja logado', async function (string) {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    page.goto(linkHome)
    return Login(page)
});

When('{string} visualiza a aba de Cadastro de contato.', async function (string) {
    await page.getByRole('link', { name: 'Cadastrar contato' }).click();
});

When('{string} preenche as informações do contato que deseja registrar', async function (string) {
    return [
        await page.locator('input[name="nome"]').click(),
        await page.locator('input[name="nome"]').fill('teste'),
        await page.locator('input[name="email"]').click(),
        await page.locator('input[name="email"]').fill('teste@gmail.com'),
        await page.locator('input[name="telefone"]').click(),
        await page.locator('input[name="telefone"]').fill('123456789'),
    ]
});

When('{string} aciona a opção de salvar', async function (string) {
    await page.getByRole('button', { name: 'Salvar' }).click();
});

Then('{string} deve receber uma mensagem da pagina informando que o contato foi registrado com sucesso', async function (string) {
    await expect(page.getByText('Contato registrado com sucesso.')).toBeVisible();
});