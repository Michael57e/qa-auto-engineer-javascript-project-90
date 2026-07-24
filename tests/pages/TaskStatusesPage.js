import { expect } from '@playwright/test';

export class TaskStatusesPage {
  constructor(page) {
    this.page = page;
    this.url = '#/task_statuses';
    
    // Кнопки и ссылки
    this.createButton = page.getByRole('link', { name: 'Create' });
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    
    // Таблица
    this.table = page.getByRole('table');
    this.selectAllCheckbox = page.getByRole('checkbox', { name: 'Select all' });
    this.bulkActionsToolbar = page.locator('[data-test="bulk-actions-toolbar"]');
    
    // Форма создания/редактирования
    this.nameInput = page.getByLabel('Name *');
    this.slugInput = page.getByLabel('Slug *');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async goto() {
    await this.page.goto(this.url);
    // Ждем появления таблицы после перехода
    await this.page.waitForSelector('table', { timeout: 10000 });
  }

  async clickCreate() {
    await this.createButton.click();
  }

  async openFirstStatus() {
    await this.page.locator('tbody tr').first().click();
  }

  // Убираем async - метод должен возвращать Locator напрямую
  getRowByName(name) {
    return this.page.getByRole('row', { name: new RegExp(name) });
  }

  async selectRowByName(name) {
    const row = this.getRowByName(name);
    await row.getByRole('checkbox').check();
    return row;
  }

  async expectStatusesList() {
    await expect(this.table).toBeVisible({ timeout: 10000 });
  }

  async expectEmptyList() {
    await expect(this.page.getByText('No Task statuses yet.')).toBeVisible();
  }

  // Добавляем метод для возврата к списку после создания/редактирования
  async openList() {
    await this.page.goto(this.url);
    await this.page.waitForSelector('table', { timeout: 10000 });
  }
}
