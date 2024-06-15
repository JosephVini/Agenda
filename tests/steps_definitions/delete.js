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

Given('que {string} não está autenticado no sistema', async function (string) {
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    return page.goto(linkHome)
});

When('{string} aciona a opção de Excluir', async function (string) {
    await page.getByRole('link', { name: 'Excluir' }).click();
});

Then('{string} deve-se receber uma mensagem informando que é necessário efetuar o login para acessar essa funcionalidade', async function (string) {
    await expect(page.getByText('Você precisa fazer login.')).toBeVisible();
})

Given('que {string} já está registrado e logado', async function(string){
    browser = await chromium.launch({ headless: false })
    page = await browser.newPage()
    await page.goto(linkHome)
    await Login(page)
}) 

When('{string} seleciona a opção de Excluir', async function (string) {
    await page.getByRole('link', { name: 'Agenda' }).click();
    await page.getByRole('link', { name: 'Excluir' }).click();
});

Then('Será exibida uma mensagem informando que o contato foi removido com sucesso', async function(){
    await expect(page.getByText('Contato deletado com sucesso.')).toBeVisible();
})