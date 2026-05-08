import { expect } from '@playwright/test'

export class Toast {
  constructor(page) {
    this.page = page
  }

  async haveText(message) {
    const toast = this.page.locator('.toast')

    await expect(toast).toContainText(message)
    await expect(toast).not.toBeVisible({ timeout: 5000 })
  }

  async alertHaveText(target, expectedCount = 1, selector = 'span[class$="alert"]') {
    await expect(this.page.locator(selector, { hasText: target })).toHaveCount(expectedCount)
  }
}
