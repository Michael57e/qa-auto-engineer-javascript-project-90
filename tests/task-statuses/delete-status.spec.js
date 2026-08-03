import { test } from '../fixtures.js';

test('user can delete a task status', async ({ taskStatusesPage }) => {
  const status = {
    name: `Delete Test ${Date.now()}`,
    slug: `delete-test-${Date.now()}`,
  };

  await taskStatusesPage.createStatus(status);

  await taskStatusesPage.openList();
  await taskStatusesPage.selectRowByName(status.name);

  await taskStatusesPage.expectSelectedItemsCount('1 item selected');

  await taskStatusesPage.deleteSelectedStatuses();
  await taskStatusesPage.expectDeletedNotification();

  await taskStatusesPage.expectStatusNotInList(status.name);
});
