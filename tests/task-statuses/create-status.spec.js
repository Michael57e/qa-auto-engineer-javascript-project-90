import { test, expect } from '../fixtures.js';

test('user can create a task status', async ({ page, taskStatusesPage }) => {
  await taskStatusesPage.goto();
  await taskStatusesPage.expectStatusesList();

  await taskStatusesPage.clickCreate();

  await expect(taskStatusesPage.nameInput).toBeVisible();
  await expect(taskStatusesPage.slugInput).toBeVisible();
  await expect(taskStatusesPage.saveButton).toBeVisible();

  const status = {
    name: `Test Status ${Date.now()}`,
    slug: `test-status-${Date.now()}`,
  };

  await taskStatusesPage.nameInput.fill(status.name);
  await taskStatusesPage.slugInput.fill(status.slug);
  await taskStatusesPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  await taskStatusesPage.openList();
  await taskStatusesPage.expectStatusesList();

  const row = taskStatusesPage.getRowByName(status.name);
  await expect(row).toBeVisible();
  await expect(row).toContainText(status.slug);
});
