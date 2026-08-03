import { test } from '../fixtures.js';

test('user can create a new user', async ({ usersPage }) => {
  const user = {
    email: `autotest-${Date.now()}@test.com`,
    firstName: 'Ivan',
    lastName: 'Ivanov',
  };

  await usersPage.createUser(user);
  await usersPage.openList();
  await usersPage.expectUserInList(user);
});
