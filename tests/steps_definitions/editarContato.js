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

Given('que {string} não está conectado ao sistema', async function (string) {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    return page.goto(linkHome)
});

When('{string} aciona a opção de Editar', async function (string) {
    await page.getByRole('link', { name: 'Editar' }).click();
});

Then('{string} uma mensagem será exibida, indicando que é necessário fazer login para acessar essa funcionalidade', async function (string) {
    await expect(page.getByText('Você precisa fazer login.')).toBeVisible();
})

Given('que {string} já é usuário e está conectado', async function (string) {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    page.goto(linkHome)
    return Login(page)
});

When('{string} seleciona a opção de Editar', async function (string) {
    await page.getByRole('link', { name: 'Agenda' }).click();
    await page.getByRole('link', { name: 'Editar' }).click();
});

When('informa o que deve ser modificado', async function () {
    await page.locator('input[name="telefone"]').click();
    await page.locator('input[name="telefone"]').fill('1234567891011');
});

When('{string} ativa a opção de salvar', async function (string) {
    await page.getByRole('button', { name: 'Salvar' }).click();
})

Then('{string} deve receber uma mensagem informando que o contato foi editado com sucesso', async function (string) {
    await expect(page.getByText('Contato editado com sucesso.')).toBeVisible();
});
