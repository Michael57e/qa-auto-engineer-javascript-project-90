import { test } from '../fixtures.js';

test('user can create a task status', async ({ taskStatusesPage }) => {
  const status = {
    name: `Test Status ${Date.now()}`,
    slug: `test-status-${Date.now()}`,
  };

  await taskStatusesPage.createStatus(status);

  await taskStatusesPage.openList();
  await taskStatusesPage.expectStatusInList(status);
});
