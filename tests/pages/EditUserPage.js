import { expect } from '@playwright/test';

export class EditUserPage {
  constructor(page) {
    this.page = page;

    this.email = page.locator('input[name="email"]');
    this.firstName = page.locator('input[name="firstName"]');
    this.lastName = page.locator('input[name="lastName"]');

    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });

    this.updateNotification = page.getByText('Element updated');
    this.deleteNotification = page.getByText('Element deleted');
  }

  async expectFormVisible() {
    await expect(this.email).toBeVisible();
    await expect(this.firstName).toBeVisible();
    await expect(this.lastName).toBeVisible();
  }

  async editUser({ email, firstName, lastName }) {
    if (email !== undefined) {
      await this.email.fill(email);
    }

    if (firstName !== undefined) {
      await this.firstName.fill(firstName);
    }

    if (lastName !== undefined) {
      await this.lastName.fill(lastName);
    }

    await this.saveButton.click();
  }

  async deleteUser() {
    await this.deleteButton.click();
  }

  async expectValues({ email, firstName, lastName }) {
    if (email !== undefined) {
      await expect(this.email).toHaveValue(email);
    }

    if (firstName !== undefined) {
      await expect(this.firstName).toHaveValue(firstName);
    }

    if (lastName !== undefined) {
      await expect(this.lastName).toHaveValue(lastName);
    }
  }

  async expectSuccess() {
    await expect(this.updateNotification).toBeVisible();
  }

  async expectDeleteSuccess() {
    await expect(this.deleteNotification).toBeVisible();
  }

  async expectEmailValidation() {
    await expect(this.saveButton).toBeDisabled();
  }
}
