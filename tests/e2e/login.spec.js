import { test, expect } from '../support/index.js'

test('Deve logar como administrador', async ({ loginPage, moviesPage }) => {
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'pwd123')

  await moviesPage.isLoggedIn()
})

test('Não deve logar como administrador', async ({ loginPage, toast }) => {
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'abc123')

  const message =
    'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
  await toast.containText(message)
})

test('Não deve logar quando o email é inválido', async ({ loginPage, toast }) => {
  await loginPage.visit()
  await loginPage.submit('victor.com.br', 'abc123')

  await toast.alertHaveText('Email incorreto')
})

test('Não deve logar quando o email não é preenchido', async ({ loginPage, toast }) => {
  await loginPage.visit()
  await loginPage.submit('', 'abc123')

  await toast.alertHaveText('Campo obrigatório')
})

test('Não deve logar quando a senha não é preenchido', async ({ loginPage, toast }) => {
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', '')

  await toast.alertHaveText('Campo obrigatório')
})

test('Não deve logar quando nenhum campo é preenchido', async ({ loginPage, toast }) => {
  await loginPage.visit()
  await loginPage.submit('', '')

  await toast.alertHaveCount('Campo obrigatório', 2)
})
