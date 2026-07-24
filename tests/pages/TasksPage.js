import { expect } from '@playwright/test';

export class TasksPage {
  constructor(page) {
    this.page = page;
    this.url = '#/tasks';

    this.createButton = page.getByRole('link', { name: 'Create' });

    // Фильтры
    this.assigneeFilter = page.locator('.ra-input-assignee_id');
    this.statusFilter = page.locator('.ra-input-status_id');
    this.labelFilter = page.locator('.ra-input-label_id');

    // Поля формы
    this.assigneeSelect = page.locator('.ra-input-assignee_id [role="combobox"]');
    this.statusSelect = page.locator('.ra-input-status_id [role="combobox"]');
    this.titleInput = page.locator('input[name="title"]');
    this.contentInput = page.locator('textarea[name="content"]').first();
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  async goto() {
    await this.page.goto(this.url);
    await expect(this.page.getByRole('heading', { name: 'Draft' })).toBeVisible({ timeout: 10000 });
  }

  async openList() {
    await this.page.goto(this.url);
    await expect(this.page.getByRole('heading', { name: 'Draft' })).toBeVisible({ timeout: 10000 });
  }

  async clickCreate() {
    await this.createButton.click();
  }

  // Заполнение всех обязательных полей задачи
  async fillTaskForm(title) {
    // 1. Выбираем Assignee (первый доступный в списке)
    await this.assigneeSelect.click();
    await this.page.getByRole('option').first().click();

    // 2. Заполняем Title
    await this.titleInput.fill(title);

    // 3. Выбираем Status (первый доступный в списке)
    await this.statusSelect.click();
    await this.page.getByRole('option').first().click();
  }

  getCardByTitle(title) {
    return this.page.locator('.MuiCard-root', { hasText: title });
  }

  async expectKanbanBoard() {
    await expect(this.page.getByRole('heading', { name: 'Draft' })).toBeVisible({ timeout: 10000 });
  }
}
