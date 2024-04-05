// @ts-check

const { test, expect } = require('@playwright/test');
const linkHome = 'http://localhost:3000/';


test('has title', async ({ page }) => {
  await page.goto(linkHome)

  await expect(page).toHaveTitle(/Agenda/);
})

test('Register', async ({ page }) => {
  await page.goto(linkHome)
  await page.getByRole('link', { name: 'Entrar' }).click();
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').click();
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="email"]').fill('teste@gmail.com');
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').click();
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Criar' }).locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'Criar minha conta' }).click();
  await expect(page.getByText('Seu usuário foi criado com sucesso.')).toBeVisible()

})

test('Login', async ({ page }) => {
  await page.goto(linkHome);

  await page.getByRole('link', { name: 'Entrar' }).click();
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').click();
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').fill('teste@gmail.com');
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').click();
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByText('Você entrou no sistema.')).toBeVisible();

})

test('Register Contact', async ({ page }) => {
  await page.goto(linkHome);
  await page.getByRole('link', { name: 'Entrar' }).click();
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').click();
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="email"]').fill('teste@gmail.com');
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').click();
  await page.locator('form').filter({ hasText: 'Seu e-mail Sua senha Entrar' }).locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('link', { name: 'Cadastrar contato' }).click();
  await page.locator('input[name="nome"]').click();
  await page.locator('input[name="nome"]').fill('Ze');
  await page.locator('input[name="sobrenome"]').click();
  await page.locator('input[name="sobrenome"]').fill('  Vini');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('Ze@gmail.com');
  await page.locator('input[name="telefone"]').click();
  await page.locator('input[name="telefone"]').fill('123456');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Contato registrado com')).toBeVisible();
});

