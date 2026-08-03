import { test } from '../fixtures.js';

test('user can bulk delete task statuses', async ({ taskStatusesPage }) => {
  await taskStatusesPage.goto();
  await taskStatusesPage.expectStatusesList();

  await taskStatusesPage.selectAllStatuses();

  await taskStatusesPage.expectSelectedItemsCount(/\d+ items selected/);

  await taskStatusesPage.deleteSelectedStatuses();
  await taskStatusesPage.expectBulkDeletedNotification();

  await taskStatusesPage.expectEmptyList();
});
