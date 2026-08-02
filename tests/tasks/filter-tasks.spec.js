import { test, expect } from '../fixtures.js';

test('user can filter tasks', async ({ page, tasksPage }) => {
  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();

  await tasksPage.labelFilter.click();
  const option = page.getByRole('option').first();
  await option.click();

  await tasksPage.expectKanbanBoard();
});
