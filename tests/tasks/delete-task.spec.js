import { test, expect } from '../fixtures.js';

test('user can delete a task', async ({ page, tasksPage }) => {
  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();
  await tasksPage.clickCreate();

  const taskTitle = `DeleteTask ${Date.now()}`;
  await tasksPage.fillTaskForm(taskTitle);
  await tasksPage.saveButton.click();
  await expect(page.getByText('Element created')).toBeVisible();

  await tasksPage.openList();
  await tasksPage.expectKanbanBoard();
  const card = tasksPage.getCardByTitle(taskTitle);
  await expect(card).toBeVisible();
  await card.getByRole('link', { name: 'Edit' }).click();

  await expect(tasksPage.deleteButton).toBeVisible();
  await tasksPage.deleteButton.click();
  await expect(page.getByText('Element deleted')).toBeVisible();

  await tasksPage.openList();
  await tasksPage.expectKanbanBoard();
  await expect(tasksPage.getCardByTitle(taskTitle)).toHaveCount(0);
});
