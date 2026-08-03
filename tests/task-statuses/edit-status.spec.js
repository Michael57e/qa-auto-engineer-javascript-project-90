import { test } from '../fixtures.js';

test('user can edit a task status', async ({ taskStatusesPage }) => {
  const originalStatus = {
    name: `Edit Test ${Date.now()}`,
    slug: `edit-test-${Date.now()}`,
  };

  await taskStatusesPage.createStatus(originalStatus);

  await taskStatusesPage.openList();

  const row = taskStatusesPage.getRowByName(originalStatus.name);
  await row.click();

  const updatedStatus = {
    name: `Updated Status ${Date.now()}`,
    slug: `updated-status-${Date.now()}`,
  };

  await taskStatusesPage.updateCurrentStatus(updatedStatus);

  await taskStatusesPage.expectStatusesList();
  await taskStatusesPage.expectStatusInList(updatedStatus);
});
