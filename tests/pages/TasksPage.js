import { expect } from '@playwright/test';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export class TasksPage {
  constructor(page) {
    this.page = page;
    this.url = '#/tasks';

    this.createButton = page.getByRole('link', { name: 'Create' });

    // Фильтры
    this.assigneeFilter = page.locator('.ra-input-assignee_id [role="combobox"]');
    this.statusFilter = page.locator('.ra-input-status_id [role="combobox"]');
    this.labelFilter = page.locator('.ra-input-label_id [role="combobox"]');

    // Поля формы
    this.assigneeSelect = page.locator('.ra-input-assignee_id [role="combobox"]');
    this.statusSelect = page.locator('.ra-input-status_id [role="combobox"]');
    this.labelSelect = page.locator('.ra-input-label_id [role="combobox"]');

    this.titleInput = page.locator('input[name="title"]');
    this.contentInput = page.locator('textarea[name="content"]').first();

    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  async goto() {
    await this.page.goto(this.url);
    await this.expectKanbanBoard();
  }

  async openList() {
    await this.goto();
  }

  async expectKanbanBoard() {
    await expect(
      this.page.getByRole('heading', { name: 'Draft' })
    ).toBeVisible({ timeout: 10000 });
  }

  async clickCreate() {
    await expect(this.createButton).toBeVisible();
    await this.createButton.click();
    await expect(this.titleInput).toBeVisible();
  }

  async selectOption(selectLocator, optionNameOrIndex = 0) {
    await selectLocator.click();

    const listbox = this.page.getByRole('listbox').last();

    const option =
      typeof optionNameOrIndex === 'number'
        ? listbox.getByRole('option').nth(optionNameOrIndex)
        : listbox.getByRole('option', { name: optionNameOrIndex, exact: true });

    await expect(option).toBeVisible({ timeout: 10000 });

    const selectedText = (await option.innerText()).trim();

    await option.click();

    return selectedText;
  }

  async fillTaskForm({
    title,
    content = 'Test task description',
    assignee,
    assigneeIndex = 0,
    status = 'Draft',
    label,
  }) {
    const selectedAssignee = assignee
      ? await this.selectOption(this.assigneeSelect, assignee)
      : await this.selectOption(this.assigneeSelect, assigneeIndex);

    await this.titleInput.fill(title);

    if (content) {
      await this.contentInput.fill(content);
    }

    await this.selectOption(this.statusSelect, status);

    if (label) {
      await this.selectOption(this.labelSelect, label);
      await this.page.keyboard.press('Escape');
    }

    return {
      title,
      assignee: selectedAssignee,
      status,
      label,
    };
  }

  async saveForm() {
    await expect(this.saveButton).toBeEnabled({ timeout: 10000 });
    await this.saveButton.click();
  }

  async createTask(taskData) {
    await this.goto();
    await this.clickCreate();

    const task = await this.fillTaskForm(taskData);

    await this.saveForm();

    // После создания React Admin открывает страницу редактирования созданной задачи
    await expect(this.page).toHaveURL(/#\/tasks\/\d+$/);
    await expect(this.titleInput).toHaveValue(task.title);

    return task;
  }

  getCardByTitle(title) {
    return this.page.getByRole('button').filter({
      has: this.page.getByText(title, { exact: true }),
    });
  }

  getColumnByTitle(columnTitle) {
    return this.page
      .getByRole('heading', { name: columnTitle })
      .locator('xpath=..');
  }

  getCardInColumn(columnTitle, taskTitle) {
    return this.getColumnByTitle(columnTitle).getByRole('button').filter({
      has: this.page.getByText(taskTitle, { exact: true }),
    });
  }

  async openTaskForEdit(title) {
    const card = this.getCardByTitle(title);

    await expect(card).toBeVisible({ timeout: 10000 });
    await card.getByRole('link', { name: 'Edit' }).click();

    await expect(this.titleInput).toHaveValue(title);
  }

  async updateCurrentTaskTitle(newTitle) {
    await expect(this.titleInput).toBeVisible();
    await this.titleInput.fill(newTitle);

    await this.saveForm();

    await expect(this.page.getByText('Element updated')).toBeVisible();
    await expect(this.page).toHaveURL(/#\/tasks/);
    await this.expectKanbanBoard();
  }

  async deleteCurrentTask() {
    await expect(this.deleteButton).toBeVisible();
    await this.deleteButton.click();
    await expect(this.page.getByText('Element deleted')).toBeVisible();
  }

  async expectTaskVisible(title) {
    await expect(this.getCardByTitle(title)).toBeVisible({ timeout: 10000 });
  }

  async expectTaskNotVisible(title) {
    await expect(this.getCardByTitle(title)).toHaveCount(0);
  }

  async expectTaskInColumn(title, columnTitle) {
    await expect(
      this.getCardInColumn(columnTitle, title)
    ).toBeVisible({ timeout: 10000 });
  }

  async expectTaskNotInColumn(title, columnTitle) {
    await expect(
      this.getCardInColumn(columnTitle, title)
    ).toHaveCount(0);
  }

  async filterByAssignee(assignee) {
    await this.selectOption(this.assigneeFilter, assignee);
    await this.expectKanbanBoard();
  }

  async filterByStatus(status) {
    await this.selectOption(this.statusFilter, status);
    await this.expectKanbanBoard();
  }

  async filterByLabel(label) {
    await this.selectOption(this.labelFilter, label);
    await this.expectKanbanBoard();
  }

  async moveTaskToNextColumn(title) {
    const card = this.getCardByTitle(title);

    await expect(card).toBeVisible({ timeout: 10000 });

    // react-beautiful-dnd стабильно поддерживает keyboard drag-and-drop:
    // Space — поднять, ArrowRight — перенести в следующую колонку, Space — отпустить.
    await card.focus();
    await this.page.keyboard.press('Space');
    await this.page.keyboard.press('ArrowRight');
    await this.page.keyboard.press('Space');
  }
}
