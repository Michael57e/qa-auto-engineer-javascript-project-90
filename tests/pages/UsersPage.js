import { expect } from '@playwright/test';

export class UsersPage {
  constructor(page) {
    this.page = page;

    this.usersMenu = page.getByRole('menuitem', { name: 'Users' });

    this.createButton = page.getByRole('button', { name: 'Create' });

    this.table = page.locator('table');

    this.rows = page.locator('tbody tr');

    this.emailCells = page.locator('tbody tr td:nth-child(2)');
    this.firstNameCells = page.locator('tbody tr td:nth-child(3)');
    this.lastNameCells = page.locator('tbody tr td:nth-child(4)');
  }

  async open() {
    await this.usersMenu.click();
    await expect(this.table).toBeVisible();
  }

  async openCreatePage() {
    await this.createButton.click();
  }

  async expectUsersTableVisible() {
    await expect(this.table).toBeVisible();
    await expect(this.rows.first()).toBeVisible();
  }

  async expectUsersDisplayed() {
    const rowsCount = await this.rows.count();

    expect(rowsCount).toBeGreaterThan(0);

    for (let i = 0; i < rowsCount; i++) {
      await expect(this.emailCells.nth(i)).not.toBeEmpty();
      await expect(this.firstNameCells.nth(i)).not.toBeEmpty();
      await expect(this.lastNameCells.nth(i)).not.toBeEmpty();
    }
  }
}
