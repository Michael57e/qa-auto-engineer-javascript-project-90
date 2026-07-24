import { expect } from '@playwright/test';

export class LabelsPage {
  constructor(page) {
    this.page = page;
    this.url = '#/labels';

    // Кнопки и ссылки
    this.createButton = page.getByRole('link', { name: 'Create' });
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });

    // Таблица
    this.table = page.getByRole('table');
    this.selectAllCheckbox = page.getByRole('checkbox', { name: 'Select all' });

    // Форма
    this.nameInput = page.getByLabel('Name *');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async goto() {
    await this.page.goto(this.url);
    await expect(this.table).toBeVisible({ timeout: 10000 });
  }

  async openList() {
    await this.page.goto(this.url);
    await expect(this.table).toBeVisible({ timeout: 10000 });
  }

  async clickCreate() {
    await this.createButton.click();
  }

  async openFirstLabel() {
    await this.page.locator('tbody tr').first().click();
  }

  getRowByName(name) {
    return this.page.getByRole('row', { name: new RegExp(name) });
  }

  async selectRowByName(name) {
    const row = this.getRowByName(name);
    await row.getByRole('checkbox').check();
    return row;
  }

  async expectLabelsList() {
    await expect(this.table).toBeVisible({ timeout: 10000 });
  }

  async expectEmptyList() {
    await expect(this.page.getByText(/No Labels yet/i)).toBeVisible();
  }
}
