import { test, expect } from '../fixtures.js';

test('user can delete a task status', async ({ page, taskStatusesPage }) => {
  await taskStatusesPage.goto();
  await taskStatusesPage.clickCreate();

  const status = {
    name: `Delete Test ${Date.now()}`,
    slug: `delete-test-${Date.now()}`,
  };

  await taskStatusesPage.nameInput.fill(status.name);
  await taskStatusesPage.slugInput.fill(status.slug);
  await taskStatusesPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  await taskStatusesPage.openList();
  await taskStatusesPage.expectStatusesList();

  await taskStatusesPage.selectRowByName(status.name);

  await expect(
    page.getByRole('heading', { name: '1 item selected' })
  ).toBeVisible();

  await taskStatusesPage.deleteButton.click();

  await expect(page.getByText('Element deleted')).toBeVisible();

  await expect(taskStatusesPage.getRowByName(status.name)).toHaveCount(0);
});
