import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectLoginPage() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }
}
