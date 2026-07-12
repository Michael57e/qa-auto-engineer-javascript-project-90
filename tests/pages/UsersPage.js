import { expect } from '@playwright/test';

export class UsersPage {
  constructor(page) {
    this.page = page;

    this.usersMenu = page.getByRole('menuitem', { name: 'Users' });
    this.createButton = page.getByRole('button', { name: 'Create' });
  }

  async open() {
    await this.usersMenu.click();
    await expect(this.page).toHaveURL(/users/);
  }

  async clickCreate() {
    await this.createButton.click();
  }
}
