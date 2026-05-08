// tests/fixtures/fixtures.js
import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import { MoviesPage } from '../pages/MoviesPage.js'
import { LandingPage } from '../pages/LandingPage.js'
import { Toast } from '../pages/Components.js'

// Sobrescrevemos o "test" base injetando nossos Page Objects
const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  moviesPage: async ({ page }, use) => {
    await use(new MoviesPage(page))
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page))
  },
  toast: async ({ page }, use) => {
    await use(new Toast(page))
  },
})

// O segredo do padrão está aqui: exportamos o nosso 'test' customizado e o 'expect' original
export { test, expect }
