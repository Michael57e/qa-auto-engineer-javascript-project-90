import { expect } from '@playwright/test';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export class TaskStatusesPage {
  constructor(page) {
    this.page = page;
    this.url = '#/task_statuses';

    this.createButton = page.getByRole('link', { name: 'Create' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });

    this.table = page.getByRole('table');
    this.selectAllCheckbox = page.getByRole('checkbox', { name: 'Select all' });

    this.nameInput = page.getByLabel('Name *');
    this.slugInput = page.getByLabel('Slug *');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async goto() {
    await this.page.goto(this.url);
    await expect(this.table).toBeVisible({ timeout: 10000 });
  }

  async openList() {
    await this.goto();
  }

  async expectStatusesList() {
    await expect(this.table).toBeVisible({ timeout: 10000 });
  }

  async expectEmptyList() {
    await expect(this.page.getByText('No Task statuses yet.')).toBeVisible();
  }

  async clickCreate() {
    await expect(this.createButton).toBeVisible();
    await this.createButton.click();
    await this.expectStatusFormVisible();
  }

  async expectStatusFormVisible() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.slugInput).toBeVisible();
    await expect(this.saveButton).toBeVisible();
  }

  async fillStatusForm(status) {
    await this.nameInput.fill(status.name);
    await this.slugInput.fill(status.slug);
  }

  async saveForm() {
    await expect(this.saveButton).toBeVisible();
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
  }

  async createStatus(status) {
    await this.goto();
    await this.clickCreate();
    await this.fillStatusForm(status);
    await this.saveForm();
    await this.expectCreatedNotification();
  }

  async updateCurrentStatus(status) {
    await this.expectStatusFormVisible();
    await this.fillStatusForm(status);
    await this.saveForm();
    await this.expectUpdatedNotification();
  }

  async openFirstStatus() {
    await this.page.locator('tbody tr').first().click();
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

  async selectAllStatuses() {
    await expect(this.selectAllCheckbox).toBeVisible({ timeout: 10000 });
    await this.selectAllCheckbox.check();
  }

  async deleteSelectedStatuses() {
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

  async expectStatusInList(status) {
    const row = this.getRowByName(status.name);

    await expect(row).toBeVisible();
    await expect(row).toContainText(status.slug);
  }

  async expectStatusNotInList(name) {
    await expect(this.getRowByName(name)).toHaveCount(0);
  }
}
