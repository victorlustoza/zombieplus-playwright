import { expect } from '@playwright/test'

export class Toast {
  constructor(page) {
    this.page = page
  }

  async containText(message) {
    const toast = this.page.locator('.toast')

    await expect(toast).toContainText(message)
    await expect(toast).not.toBeVisible({ timeout: 5000 })
  }

  async alertHaveText(text, selector = 'span[class$="alert"]') {
    await expect(this.page.locator(selector, { hasText: text })).toBeVisible()
  }

  async alertHaveCount(text, expectedCount = 1, selector = 'span[class$="alert"]') {
    await expect(this.page.locator(selector, { hasText: text })).toHaveCount(expectedCount)
  }

  async alertHaveTexts(texts) {
    for (const text of texts) {
      await this.alertHaveText(text)
    }
  }
}
