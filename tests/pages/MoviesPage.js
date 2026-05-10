import { expect } from '@playwright/test'

export class MoviesPage {
  constructor(page) {
    this.page = page
  }

  async isLoggedIn() {
    await expect(this.page.locator('a[href="/logout"]')).toBeVisible()
    await expect(this.page.url()).toContain('admin')
  }

  async create(title, overview, company, releaseYear, featured, cover) {
    await this.goForm()
    await this.page.getByLabel('Titulo do filme').fill(title)
    await this.page.getByLabel('Sinopse').fill(overview)
    await this.page.locator('[id="select_company_id"] svg').click()
    await this.page.getByText(company).click()
    await this.page.locator('[id="select_year"]').click()
    await this.page.getByText(releaseYear).click()

    await this.submit()
  }

  async goForm() {
    await this.page.locator('a[href$="register"]').click()
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Cadastrar' }).click()
  }
}
