import { expect } from '@playwright/test'

export class LoginPage {
  constructor(page) {
    this.page = page
  }

  async visit() {
    await this.page.goto('/admin/login')

    await expect(this.page.locator('[class="login-form"] form')).toBeVisible()
  }

  async submit(email, password) {
    await this.page.getByPlaceholder('E-mail').fill(email)
    await this.page.getByPlaceholder('Senha').fill(password)

    await this.page.getByRole('button', { type: 'submit' }).click()
  }
}
