import { test } from '@playwright/test';
import { UsersPage } from './pages/UsersPage.js';
import { CreateUserPage } from './pages/CreateUserPage.js';
import { EditUserPage } from './pages/EditUserPage.js';

test.describe('Users', () => {
  let usersPage;
  let editUserPage;

  test.beforeEach(async ({ page }) => {
    usersPage = new UsersPage(page);
    editUserPage = new EditUserPage(page);

    await usersPage.open();
  });

  test('Users list is displayed correctly', async () => {
    await usersPage.expectUsersTableVisible();

    await usersPage.expectUserExists(
      'test@test.com',
      'Ivan',
      'Ivanov',
    );
  });

  test('Edit form is displayed correctly', async () => {
    await usersPage.openUserByEmail('test@test.com');

    await editUserPage.expectFormVisible();

    await editUserPage.expectValues({
      email: 'test@test.com',
      firstName: 'Ivan',
      lastName: 'Ivanov',
    });
  });

  test('User can be edited', async () => {
    await usersPage.openUserByEmail('test@test.com');

    await editUserPage.editUser({
      firstName: 'Petr',
      lastName: 'Petrov',
    });

    await editUserPage.expectSuccess();

    await editUserPage.expectValues({
      firstName: 'Petr',
      lastName: 'Petrov',
    });
  });

  test('Email validation works', async () => {
    await usersPage.openUserByEmail('test@test.com');

    await editUserPage.editUser({
      email: 'incorrect-email',
    });

    await editUserPage.expectEmailValidation();
  });

  test('User can be deleted', async () => {
    await usersPage.openUserByEmail('test@test.com');

    await editUserPage.deleteUser();

    await editUserPage.expectDeleteSuccess();

    await usersPage.expectUserNotExists('test@test.com');
  });

  test('All users can be deleted', async () => {
    await usersPage.selectAllUsers();

    await usersPage.deleteSelectedUsers();

    await usersPage.expectDeleteSuccess();

    await usersPage.expectTableIsEmpty();
  });
});

