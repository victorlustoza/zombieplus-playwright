import { test, expect } from '../fixtures/fixtures.js'
import { faker } from '@faker-js/faker'

test('Deve cadastrar um lead na fila de espera', async ({ landingPage, toast }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message =
    'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)
})

test('Não deve cadastrar um lead na fila de espera com email já existente', async ({
  landingPage,
  toast,
  request,
}) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  const newLead = await request.post('http://localhost:3333/leads', {
    data: { name: leadName, email: leadEmail },
  })
  expect(newLead.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.haveText(message)
})

test('Não deve cadastrar com email incorreto', async ({ landingPage, toast }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Victor Lustoza', 'victor1.com.br')

  await toast.alertHaveText('Email incorreto')
})

test('Não deve cadastrar quando o campo nome não for preenchido', async ({ landingPage, toast }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'victor1@teste.com')

  await toast.alertHaveText('Campo obrigatório')
})

test('Não deve cadastrar quando o campo email não for preenchido', async ({ landingPage, toast }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Victor Lustoza', '')

  await toast.alertHaveText('Campo obrigatório')
})

test('Não deve cadastrar quando nenhum campo é preenchido', async ({ landingPage, toast }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await toast.alertHaveText('Campo obrigatório', 2)
})
