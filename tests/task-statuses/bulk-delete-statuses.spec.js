import { test, expect } from '../fixtures.js';

test('user can bulk delete task statuses', async ({ page, taskStatusesPage }) => {
  await taskStatusesPage.goto();
  await taskStatusesPage.expectStatusesList();

  await taskStatusesPage.selectAllCheckbox.check();

  await expect(
    page.getByRole('heading', { name: /\d+ items selected/ })
  ).toBeVisible();

  await taskStatusesPage.deleteButton.click();

  await expect(page.getByText(/\d+ elements deleted/)).toBeVisible();

  await taskStatusesPage.expectEmptyList();
});
