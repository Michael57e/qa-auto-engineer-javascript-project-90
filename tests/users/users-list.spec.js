import { test } from '../fixtures.js';

test('users list is displayed correctly', async ({ usersPage }) => {
  await usersPage.goto();
  await usersPage.expectUsersList();
});
