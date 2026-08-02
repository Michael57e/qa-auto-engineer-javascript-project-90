import { test, expect } from '../fixtures.js';

test('user can drag and drop a task card to another column', async ({ tasksPage, page }) => {

  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();

  const sourceColumn = page.locator('[data-rfd-droppable-id="1"]');
  const targetColumn = page.locator('[data-rfd-droppable-id="2"]');

  const sourceCard = sourceColumn.locator('[data-rfd-draggable-id]').first();
  await expect(sourceCard).toBeVisible();

  const taskTitle = (await sourceCard.locator('.MuiTypography-h5').innerText()).trim();

  await sourceCard.focus();
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Space');

  await expect(targetColumn.locator('.MuiCard-root', { hasText: taskTitle })).toBeVisible();
  await expect(sourceColumn.locator('.MuiCard-root', { hasText: taskTitle })).toHaveCount(0);
});
