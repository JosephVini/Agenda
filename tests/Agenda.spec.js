// @ts-check

const { test, expect, } = require('@playwright/test');
const linkHome = 'http://localhost:3000/';

async function Login(page) {
    await page.goto(linkHome);
    await page.getByRole('link', { name: 'Entrar' }).click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').fill('fulano@gmail.com');
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').click();
    await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').fill('123456');
    await page.getByRole('button', { name: 'Entrar' }).click();
}

async function Deslogar(page) {
    if (await page.isVisible('role=link[name="Sair"]')) {
        await page.getByRole('link', { name: 'Sair' }).click();
    }
}

test.describe.serial('Testes das funcionalidades do Agenda', () => {
    test.describe.serial('Cadastro', () => {
        test('Cadastro valido', async ({ page }) => {
            await page.goto(linkHome);
            await page.getByRole('link', { name: 'Entrar' }).click();
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').click();
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').fill('fulano@gmail.com');
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').click();
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').fill('123456');
            await page.getByRole('button', { name: 'Criar minha conta' }).click();
            await expect(page.getByText('Seu usuário foi criado com sucesso.')).toBeVisible();
        })

        test('Cadastro invalido', async ({ page }) => {
            await page.goto(linkHome);
            await page.getByRole('link', { name: 'Entrar' }).click();
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').click();
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').fill('fulano@gmail.com');
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').click();
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').fill('123456');
            await page.getByRole('button', { name: 'Criar minha conta' }).click();
            await expect(page.getByText('Usuário já existe')).toBeVisible();
        })
    })

    test.describe.serial('Login', () => {
        test('Login valido', async ({ page }) => {
            await Login(page);
            await expect(page.getByText('Você entrou no sistema.')).toBeVisible();
            await Deslogar(page);
        })

        test('Login invalido', async ({ page }) => {
            await page.goto(linkHome);
            await page.getByRole('link', { name: 'Entrar' }).click();
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').click();
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').fill('fulano@gmail.com');
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').click();
            await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').fill('1234567');
            await page.getByRole('button', { name: 'Entrar' }).click();
            await expect(page.getByText('Senha inválida')).toBeVisible();
        })
    })

    test.describe.serial('Contatos', () => {
        test('Cadastrar contato sem logar', async ({ page }) => {
            await page.goto(linkHome);
            await page.getByRole('link', { name: 'Cadastrar contato' }).click();
            await expect(page.getByText('Você precisa fazer login.')).toBeVisible();
        })

        test('Cadastrar contato sem informar email e telefone', async ({ page }) => {
            await page.goto(linkHome);
            await Login(page);
            await page.getByRole('link', { name: 'Cadastrar contato' }).click();
            await page.locator('input[name="nome"]').click();
            await page.locator('input[name="nome"]').fill('teste');
            await page.locator('input[name="email"]').click();
            await page.locator('input[name="email"]').fill('');
            await page.locator('input[name="telefone"]').click();
            await page.locator('input[name="telefone"]').fill('');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await expect(page.getByText('Pelo menos um contato precisa ser enviado: e-mail ou telefone')).toBeVisible();
            await Deslogar(page);
        })

        test('Cadastrar contato com sucesso', async ({ page }) => {
            await page.goto(linkHome);
            await Login(page);
            await page.getByRole('link', { name: 'Cadastrar contato' }).click();
            await page.locator('input[name="nome"]').click();
            await page.locator('input[name="nome"]').fill('teste');
            await page.locator('input[name="email"]').click();
            await page.locator('input[name="email"]').fill('teste@gmail.com');
            await page.locator('input[name="telefone"]').click();
            await page.locator('input[name="telefone"]').fill('123456789');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await expect(page.getByText('Contato registrado com sucesso.')).toBeVisible();
            await Deslogar(page);
        })

        test('Editar um contato sem estar logado', async ({ page }) => {
            await page.goto(linkHome);
            await page.getByRole('link', { name: 'Editar' }).click();
            await expect(page.getByText('Você precisa fazer login.')).toBeVisible();
        })

        test('Editar um contato com sucesso', async ({ page }) => {
            await page.goto(linkHome);
            await Login(page);
            await page.getByRole('link', { name: 'Agenda' }).click();
            await page.getByRole('link', { name: 'Editar' }).click();
            await page.locator('input[name="telefone"]').click();
            await page.locator('input[name="telefone"]').fill('1234567891011');
            await page.getByRole('button', { name: 'Salvar' }).click();
            await expect(page.getByText('Contato editado com sucesso.')).toBeVisible();
            await Deslogar(page);
        })

        test('Excluir um contato sem estar logado', async ({ page }) => {
            await page.goto(linkHome);
            await page.getByRole('link', { name: 'Excluir' }).click();
            await expect(page.getByText('Você precisa fazer login.')).toBeVisible();
        })

        test('Excluir um contato com sucesso', async ({ page }) => {
            await page.goto(linkHome);
            await Login(page);
            await page.getByRole('link', { name: 'Agenda' }).click();
            await page.getByRole('link', { name: 'Excluir' }).click();
            await expect(page.getByText('Contato deletado com sucesso.')).toBeVisible();
            await Deslogar(page);
        })
    })
})