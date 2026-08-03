import { test } from '../fixtures.js';

test('user can delete a user', async ({ usersPage }) => {
  const user = {
    email: `delete-${Date.now()}@test.com`,
    firstName: 'Delete',
    lastName: 'User',
  };

  await usersPage.createUser(user);

  await usersPage.openList();
  await usersPage.selectRowByName(user.email);

  await usersPage.expectSelectedItemsCount('1 item selected');

  await usersPage.deleteSelectedUsers();
  await usersPage.expectDeletedNotification();

  await usersPage.expectUserNotInList(user.email);
});
