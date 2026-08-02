import { test, expect } from '../fixtures.js';

test('user can bulk delete labels', async ({ page, labelsPage }) => {
  await labelsPage.goto();
  await labelsPage.expectLabelsList();

  await labelsPage.selectAllCheckbox.check();

  await expect(page.getByRole('heading', { name: /\d+ items selected/ })).toBeVisible();

  await labelsPage.deleteButton.click();
  await expect(page.getByText(/\d+ elements deleted/)).toBeVisible();

  await labelsPage.expectEmptyList();
});