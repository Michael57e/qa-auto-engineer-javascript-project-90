import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { UsersPage } from '../pages/UsersPage';

test('user can edit user information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const usersPage = new UsersPage(page);

  // Авторизация
  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  // Переходим к списку пользователей
  await usersPage.goto();
  await usersPage.expectUsersList();

  // Открываем первого пользователя
  await usersPage.openFirstUser();

  // Проверяем форму
  await expect(usersPage.emailInput).toBeVisible();
  await expect(usersPage.firstNameInput).toBeVisible();
  await expect(usersPage.lastNameInput).toBeVisible();
  await expect(usersPage.saveButton).toBeVisible();

  const updatedUser = {
    email: `autotest-${Date.now()}@test.com`,
    firstName: 'Fedor',
    lastName: 'Fedorov',
  };

  // Редактируем пользователя
  await usersPage.emailInput.fill(updatedUser.email);
  await usersPage.firstNameInput.fill(updatedUser.firstName);
  await usersPage.lastNameInput.fill(updatedUser.lastName);

  await usersPage.saveButton.click();

  await expect(page.getByText('Element updated')).toBeVisible();

  await expect(page).toHaveURL(/#\/users/);

  await usersPage.expectUsersList();

  // Проверяем строку с отредактированным пользователем
  const row = page.getByRole('row', {
    name: new RegExp(updatedUser.email),
  });

  await expect(row).toBeVisible();

  const cells = row.getByRole('cell');

  await expect(cells.nth(2)).toHaveText(updatedUser.email);
  await expect(cells.nth(3)).toHaveText(updatedUser.firstName);
  await expect(cells.nth(4)).toHaveText(updatedUser.lastName);

  // Скриншот для визуальной проверки
  await page.screenshot({ path: 'test-results/user-edited.png', fullPage: true });
});
