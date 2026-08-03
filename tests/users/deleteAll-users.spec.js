import { test } from '../fixtures.js';

test('user can bulk delete users', async ({ usersPage }) => {
  await usersPage.goto();
  await usersPage.expectUsersList();

  await usersPage.selectAllUsers();

  await usersPage.expectSelectedItemsCount(/\d+ items selected/);

  await usersPage.deleteSelectedUsers();
  await usersPage.expectBulkDeletedNotification();

  await usersPage.expectEmptyList();
});
