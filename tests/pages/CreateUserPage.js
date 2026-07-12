import { expect } from '@playwright/test';

export class CreateUserPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator('input[name="email"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');

    this.saveButton = page.getByRole('button', { name: 'Save' });

    this.successNotification = page.getByText('Element created');
  }

  async checkFormIsVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.saveButton).toBeVisible();
  }

  async fillForm({ email, firstName, lastName }) {
    await this.emailInput.fill(email);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async save() {
    await this.saveButton.click();
  }

  async expectSuccessMessage() {
    await expect(this.successNotification).toBeVisible();
  }

  async expectDataSaved({ email, firstName, lastName }) {
    await expect(this.emailInput).toHaveValue(email);
    await expect(this.firstNameInput).toHaveValue(firstName);
    await expect(this.lastNameInput).toHaveValue(lastName);
  }
}