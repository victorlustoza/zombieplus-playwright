import { test, expect } from '../support/index.js'
const { executeSQL } = require('../support/database.js')

const data = require('../support/fixtures/movies.json')

test('Deve cadastrar um filme', async ({ page, loginPage, moviesPage, toast }) => {
  //   const request = await request.post('http://localhost:3333/sessions', {
  //     body: {
  //         email: 'admin@zombieplus.com',
  //         password: 'pwd123'
  //     }
  //   })
  //   await expect(request).toBeOK()

  const movie = data.guerra_mundial_z

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'pwd123')
  await moviesPage.isLoggedIn()

  await moviesPage.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year,
    movie.featured,
    movie.cover
  )
  await toast.containText('Cadastro realizado com sucesso!')
})

test('Não deve cadastrar filme quando campos obrigatórios não forem preenchidos', async ({
  page,
  loginPage,
  moviesPage,
  toast
}) => {
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'pwd123')
  await moviesPage.isLoggedIn()

  await moviesPage.goForm()
  await moviesPage.submit()
  await toast.alertHaveTexts([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ])
})
