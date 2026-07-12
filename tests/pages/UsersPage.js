import { expect } from '@playwright/test';

export class UsersPage {
  constructor(page) {
    this.page = page;

    this.usersMenu = page.getByRole('menuitem', { name: 'Users' });
    this.createButton = page.getByRole('button', { name: 'Create' });

    this.table = page.locator('table');

    // для массового удаления
    this.selectAllCheckbox = page.locator('thead input[type="checkbox"]');
    this.deleteSelectedButton = page.getByRole('button', {
      name: /^Delete$/i,
    });

    this.deleteNotification = page.getByText('Element deleted');
  }

  async open() {
    await this.usersMenu.click();
    await expect(this.page).toHaveURL(/users/);
  }

  async openCreateForm() {
    await this.createButton.click();
  }

  async openUserByEmail(email) {
    await this.page.getByRole('link', { name: email }).click();
  }

  async expectUserExists(email, firstName, lastName) {
    const row = this.page.locator('tbody tr').filter({
      hasText: email,
    });

    await expect(row).toContainText(firstName);
    await expect(row).toContainText(lastName);
  }

  async expectUserNotExists(email) {
    const row = this.page.locator('tbody tr').filter({
      hasText: email,
    });

    await expect(row).toHaveCount(0);
  }

  async expectUsersTableVisible() {
    await expect(this.table).toBeVisible();
  }

  async selectAllUsers() {
    await this.selectAllCheckbox.check();
  }

  async deleteSelectedUsers() {
    await this.deleteSelectedButton.click();
  }

  async expectDeleteSuccess() {
    await expect(this.deleteNotification).toBeVisible();
  }

  async expectTableIsEmpty() {
    await expect(this.page.locator('tbody tr')).toHaveCount(0);
  }
}
