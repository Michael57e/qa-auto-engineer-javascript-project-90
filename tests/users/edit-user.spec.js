import { test } from '../fixtures.js';

test('user can edit user information', async ({ usersPage }) => {
  const originalUser = {
    email: `edit-${Date.now()}@test.com`,
    firstName: 'Edit',
    lastName: 'User',
  };

  const updatedUser = {
    email: `updated-${Date.now()}@test.com`,
    firstName: 'Fedor',
    lastName: 'Fedorov',
  };

  await usersPage.createUser(originalUser);

  await usersPage.openList();
  await usersPage.openUserByEmail(originalUser.email);

  await usersPage.updateCurrentUser(updatedUser);

  await usersPage.expectUsersUrl();
  await usersPage.expectUsersList();
  await usersPage.expectUserInList(updatedUser);
  await usersPage.expectUserNotInList(originalUser.email);
});
