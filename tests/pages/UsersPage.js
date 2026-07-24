import { expect } from '@playwright/test';

export class UsersPage {
  constructor(page) {
    this.page = page;

    // Таблица пользователей
    this.table = page.getByRole('table');

    // Строки таблицы
    this.rows = page.locator('tbody tr');

    // Кнопки
    this.createButton = page.getByRole('link', { name: /create/i });
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.deleteButton = page.getByRole('button', { name: /delete/i });

    // Поля формы пользователя
    this.emailInput = page.locator('input[name="email"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');

    // Локатор таблицы с пользователями
    this.mainContent = this.page.locator('#main-content');
  }

  async goto() {
    await this.page.goto('/#/users');

    await expect(this.page).toHaveURL(/#\/users/);

    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickCreate() {
    await expect(this.createButton).toBeVisible();
    await expect(this.createButton).toBeEnabled();

    await this.createButton.click();

    await expect(this.saveButton).toBeVisible();
  }

  async openList() {
    await this.page.goto('/#/users');

    await expect(this.page).toHaveURL(/#\/users/);

    await expect(this.mainContent).toBeVisible();

    await expect(this.table).toBeVisible();

    await expect
      .poll(async () => await this.rows.count())
      .toBeGreaterThan(0);
  }
/*
  async expectUsersList() {
    await expect(this.rows.first()).toBeVisible({
        timeout: 10000,
    });

    expect(await this.rows.count()).toBeGreaterThan(0);
  }
*/

  async expectUsersList() {
    await expect(this.mainContent).toBeVisible();

    await expect(this.createButton).toBeVisible();
    await expect(this.table).toBeVisible();

    await expect
      .poll(async () => await this.rows.count())
      .toBeGreaterThan(0);
  }

  async openFirstUser() {
    await expect(this.rows.first()).toBeVisible();

    await this.rows
      .first()
      .getByRole('cell')
      .nth(2)
      .click();
  }

  async selectAllUsers() {
    const selectAll = this.page.getByRole('checkbox', {
      name: 'Select all',
    });

    await expect(selectAll).toBeVisible({
      timeout: 10000,
    });

    await selectAll.check();
  }

  async deleteSelectedUsers() {
    await expect(this.deleteButton).toBeVisible({
      timeout: 10000,
    });

    await this.deleteButton.click();
  }
}
