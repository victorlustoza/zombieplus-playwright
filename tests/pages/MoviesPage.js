import { expect } from '@playwright/test'

export class MoviesPage {
  constructor(page) {
    this.page = page
  }

  async isLoggedIn() {
    await expect(this.page.locator('a[href="/logout"]')).toBeVisible()
    await expect(this.page.url()).toContain('admin')
  }
}
