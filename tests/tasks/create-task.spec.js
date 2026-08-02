import { test, expect } from '../fixtures.js';

test('user can create a task', async ({ page, tasksPage }) => {
  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();
  await tasksPage.clickCreate();

  const taskTitle = `Task ${Date.now()}`; // ← исправлен шаблон
  await tasksPage.fillTaskForm(taskTitle);

  await tasksPage.saveButton.click();
  await expect(page.getByText('Element created')).toBeVisible();

  await tasksPage.openList();
  await tasksPage.expectKanbanBoard();

  const card = tasksPage.getCardByTitle(taskTitle);
  await expect(card).toBeVisible();
});
