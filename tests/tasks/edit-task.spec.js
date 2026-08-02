import { test, expect } from '../fixtures.js';

test('user can edit a task', async ({ page, tasksPage }) => {
  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();

  const firstCard = page.locator('.MuiCard-root').first();
  const originalTitle = (await firstCard.locator('.MuiTypography-h5').innerText()).trim();

  await firstCard.getByRole('link', { name: 'Edit' }).click();

  await expect(tasksPage.titleInput).toHaveValue(originalTitle);

  const updatedTitle = `Updated Task ${Date.now()}`;
  await tasksPage.titleInput.fill(updatedTitle);
  await tasksPage.saveButton.click();

  await expect(page.getByText('Element updated')).toBeVisible();
  await expect(page).toHaveURL(/#\/tasks/);
  await tasksPage.expectKanbanBoard();

  await expect(tasksPage.getCardByTitle(updatedTitle)).toBeVisible();
});
