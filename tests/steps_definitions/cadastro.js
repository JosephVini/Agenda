
const { Given, When, Then } = require('@cucumber/cucumber')
const { expect, chromium } = require('@playwright/test');
const linkHome = 'http://localhost:3000/';

let browser, page

Given('que {string} não possui uma conta no sistema', async function (string) {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    return page.goto(linkHome)
});

When('{string} acessa a pagina de Login\\/Cadastro', async function (string) {
    return await page.getByRole('link', { name: 'Entrar' }).click();
});

When('{string} preenche com suas credencias válidas', async function (string) {
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').click()
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').fill('fulano@gmail.com')
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').click(),
        await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').fill('123456')
})

When('{string} aciona a opção para Cadastro', async function (string) {
    return await page.getByRole('button', { name: 'Criar minha conta' }).click();
});

Then('{string} deve receber uma mensagem da pagina informando que foi cadastrado com sucesso', async function (string) {
    return await expect(page.getByText('Seu usuário foi criado com sucesso.')).toBeVisible();
});

Given('que {string} ja possui uma conta no sistema', async function (string) {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    return page.goto(linkHome)
});

When('{string} entrar na pagina de Login\\/Cadastro', async function (string) {
    return await page.getByRole('link', { name: 'Entrar' }).click();
});

When('{string} preenche com seus dados', async function (string) {
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').click()
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').fill('fulano@gmail.com')
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').click(),
        await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').fill('123456')
})

When('{string} seleciona a opção para cadastrar', async function (string) {
    return await page.getByRole('button', { name: 'Criar minha conta' }).click();
});

Then('uma mensagem de aviso aparecerá informando que ja foi cadastrado.', async function () {
    return await expect(page.getByText('Usuário já existe')).toBeVisible();
});
