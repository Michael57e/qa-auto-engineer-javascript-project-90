import { test, expect } from '../fixtures.js';

test('user can edit a task status', async ({ page, taskStatusesPage }) => {
  await taskStatusesPage.goto();
  await taskStatusesPage.clickCreate();

  const originalStatus = {
    name: `Edit Test ${Date.now()}`,
    slug: `edit-test-${Date.now()}`,
  };

  await taskStatusesPage.nameInput.fill(originalStatus.name);
  await taskStatusesPage.slugInput.fill(originalStatus.slug);
  await taskStatusesPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  await taskStatusesPage.goto();
  const row = taskStatusesPage.getRowByName(originalStatus.name);
  await row.click();

  await expect(taskStatusesPage.nameInput).toHaveValue(originalStatus.name);
  await expect(taskStatusesPage.slugInput).toHaveValue(originalStatus.slug);

  const updatedStatus = {
    name: `Updated Status ${Date.now()}`,
    slug: `updated-status-${Date.now()}`,
  };

  await taskStatusesPage.nameInput.clear();
  await taskStatusesPage.nameInput.fill(updatedStatus.name);
  await taskStatusesPage.slugInput.clear();
  await taskStatusesPage.slugInput.fill(updatedStatus.slug);
  await taskStatusesPage.saveButton.click();

  await expect(page.getByText('Element updated')).toBeVisible();

  await taskStatusesPage.expectStatusesList();
  const updatedRow = taskStatusesPage.getRowByName(updatedStatus.name);
  await expect(updatedRow).toBeVisible();
  await expect(updatedRow).toContainText(updatedStatus.slug);
});
