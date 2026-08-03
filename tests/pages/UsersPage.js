import { expect } from '@playwright/test';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export class UsersPage {
  constructor(page) {
    this.page = page;

    this.mainContent = page.locator('#main-content');

    this.table = page.getByRole('table');
    this.rows = page.locator('tbody tr');

    this.createButton = page.getByRole('link', { name: /create/i });
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.deleteButton = page.getByRole('button', { name: /delete/i });
    this.selectAllCheckbox = page.getByRole('checkbox', { name: 'Select all' });

    this.emailInput = page.locator('input[name="email"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
  }

  async goto() {
    await this.page.goto('/#/users');
    await expect(this.page).toHaveURL(/#\/users/);
    await expect(this.mainContent).toBeVisible();
  }

  async openList() {
    await this.goto();
    await this.expectUsersList();
  }

  async expectUsersList() {
    await expect(this.mainContent).toBeVisible();
    await expect(this.createButton).toBeVisible();
    await expect(this.table).toBeVisible();

    await expect
      .poll(async () => this.rows.count())
      .toBeGreaterThan(0);
  }

  async expectEmptyList() {
    await expect(this.page.getByText('No Users yet.')).toBeVisible();
  }

  async clickCreate() {
    await expect(this.createButton).toBeVisible();
    await expect(this.createButton).toBeEnabled();

    await this.createButton.click();

    await this.expectUserFormVisible();
  }

  async expectUserFormVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.saveButton).toBeVisible();
  }

  async fillUserForm(user) {
    await this.emailInput.fill(user.email);
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
  }

  async saveForm() {
    await expect(this.saveButton).toBeVisible();
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
  }

  async createUser(user) {
    await this.goto();
    await this.clickCreate();
    await this.fillUserForm(user);
    await this.saveForm();
    await this.expectCreatedNotification();
  }

  async updateCurrentUser(user) {
    await this.expectUserFormVisible();
    await this.fillUserForm(user);
    await this.saveForm();
    await this.expectUpdatedNotification();
  }

  async openFirstUser() {
    await expect(this.rows.first()).toBeVisible();

    await this.rows
      .first()
      .getByRole('cell')
      .nth(2)
      .click();
  }

  getRowByName(name) {
    return this.page.getByRole('row', {
      name: new RegExp(escapeRegExp(name)),
    });
  }

  async selectRowByName(name) {
    const row = this.getRowByName(name);

    await expect(row).toBeVisible({ timeout: 10000 });
    await row.getByRole('checkbox').check();

    return row;
  }

  async selectAllUsers() {
    await expect(this.selectAllCheckbox).toBeVisible({ timeout: 10000 });
    await this.selectAllCheckbox.check();
  }

  async deleteSelectedUsers() {
    await expect(this.deleteButton).toBeVisible({ timeout: 10000 });
    await this.deleteButton.click();
  }

  async expectSelectedItemsCount(countTextOrRegExp) {
    await expect(
      this.page.getByRole('heading', { name: countTextOrRegExp })
    ).toBeVisible();
  }

  async expectCreatedNotification() {
    await expect(this.page.getByText('Element created')).toBeVisible();
  }

  async expectUpdatedNotification() {
    await expect(this.page.getByText('Element updated')).toBeVisible();
  }

  async expectDeletedNotification() {
    await expect(this.page.getByText('Element deleted')).toBeVisible();
  }

  async expectBulkDeletedNotification() {
    await expect(this.page.getByText(/\d+ elements deleted/)).toBeVisible();
  }

  async expectUsersUrl() {
    await expect(this.page).toHaveURL(/#\/users/);
  }

  async expectUserInList(user) {
    const row = this.getRowByName(user.email);

    await expect(row).toBeVisible();

    const cells = row.getByRole('cell');

    await expect(cells.nth(2)).toHaveText(user.email);
    await expect(cells.nth(3)).toHaveText(user.firstName);
    await expect(cells.nth(4)).toHaveText(user.lastName);
  }

  async expectUserNotInList(email) {
    await expect(this.getRowByName(email)).toHaveCount(0);
  }

  async openUserByEmail(email) {
  const row = this.getRowByName(email);

  await expect(row).toBeVisible({ timeout: 10000 });
  await row.getByRole('cell').nth(2).click();
  }
}
