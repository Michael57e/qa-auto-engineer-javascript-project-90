import { expect } from '@playwright/test';

export class MainPage {
  constructor(page) {
    this.page = page;

    this.profileButton = page.getByRole('button', {
      name: 'Profile',
    });

    this.logoutButton = page.getByRole('menuitem', {
      name: 'Logout',
    });

    this.dashboard = page.getByRole('menuitem', {
      name: 'Dashboard',
    });
  }

  async expectMainPage() {
    await expect(this.dashboard).toBeVisible();
  }

  async logout() {
    await this.profileButton.click();
    await this.logoutButton.click();
  }
}
