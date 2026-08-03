import { expect } from '@playwright/test';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export class LabelsPage {
  constructor(page) {
    this.page = page;
    this.url = '#/labels';

    this.createButton = page.getByRole('link', { name: 'Create' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });

    this.table = page.getByRole('table');
    this.selectAllCheckbox = page.getByRole('checkbox', { name: 'Select all' });

    this.nameInput = page.getByLabel('Name *');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async goto() {
    await this.page.goto(this.url);
    await expect(this.table).toBeVisible({ timeout: 10000 });
  }

  async openList() {
    await this.goto();
  }

  async expectLabelsList() {
    await expect(this.table).toBeVisible({ timeout: 10000 });
  }

  async expectEmptyList() {
    await expect(this.page.getByText(/No Labels yet/i)).toBeVisible();
  }

  async clickCreate() {
    await expect(this.createButton).toBeVisible();
    await this.createButton.click();
    await this.expectLabelFormVisible();
  }

  async expectLabelFormVisible() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.saveButton).toBeVisible();
  }

  async fillLabelForm(name) {
    await this.nameInput.fill(name);
  }

  async saveForm() {
    await expect(this.saveButton).toBeVisible();
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
  }

  async createLabel(name) {
    await this.goto();
    await this.clickCreate();
    await this.fillLabelForm(name);
    await this.saveForm();
    await this.expectCreatedNotification();
  }

  async updateCurrentLabel(name) {
    await this.expectLabelFormVisible();
    await this.fillLabelForm(name);
    await this.saveForm();
    await this.expectUpdatedNotification();
  }

  async openFirstLabel() {
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

  async selectAllLabels() {
    await expect(this.selectAllCheckbox).toBeVisible({ timeout: 10000 });
    await this.selectAllCheckbox.check();
  }

  async deleteSelectedLabels() {
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

  async expectLabelsUrl() {
    await expect(this.page).toHaveURL(/#\/labels/);
  }

  async expectLabelInList(name) {
    await expect(this.getRowByName(name)).toBeVisible();
  }

  async expectLabelNotInList(name) {
    await expect(this.getRowByName(name)).toHaveCount(0);
  }

  async openLabelByName(name) {
  const row = this.getRowByName(name);

  await expect(row).toBeVisible({ timeout: 10000 });
  await row.click();

  await expect(this.nameInput).toHaveValue(name);
  }
}
