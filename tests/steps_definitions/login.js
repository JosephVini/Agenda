const { Given, When, Then } = require('@cucumber/cucumber')
const { expect, chromium } = require('@playwright/test');
const linkHome = 'http://localhost:3000/';

let browser, page


Given('que Fulano possui uma conta no sistema', async function () {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    return page.goto(linkHome)
});

When('ele acessa a pagina de Login\\/Cadastro', async function () {
    return await page.getByRole('link', { name: 'Entrar' }).click();
})

When('ele preenche suas credencias válidas', async function () {
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').fill('fulano@gmail.com');
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').fill('123456');
})

When('ele aciona a opção para logar', async function () {
    await page.getByRole('button', { name: 'Entrar' }).click();
})

Then('ele deve ser redirecionado para a pagina inicial de usuario logado', async function () {
    await expect(page.getByText('Você entrou no sistema.')).toBeVisible();
})

When('ele preenche suas credencias com senha incorreta', async function () {
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').fill('fulano@gmail.com');
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').fill('1234567');
})

When('ele preciona o botão para logar', async function () {
    await page.getByRole('button', { name: 'Entrar' }).click();
})

Then('uma mensagem de aviso de senha incorreta deve ser exibida', async function () {
    await expect(page.getByText('Senha inválida')).toBeVisible();
});
