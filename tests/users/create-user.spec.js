import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { UsersPage } from '../pages/UsersPage';

test('user can create a new user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const usersPage = new UsersPage(page);

  // Шаг 1. Открываем страницу логина
  await loginPage.goto();

  // Шаг 2. Логинимся
  await loginPage.login('login', 'password');

  // Шаг 3. Проверяем главную страницу
  await mainPage.expectMainPage();

  // Шаг 4. Переходим в Users
  await usersPage.goto();

  // Шаг 5. Проверяем наличие кнопки Create
  console.log(
    'Create visible:',
    await usersPage.createButton.isVisible().catch(() => false)
  );

  await usersPage.clickCreate();

  // Шаг 6. Проверяем форму
  await expect(usersPage.emailInput).toBeVisible();
  await expect(usersPage.firstNameInput).toBeVisible();
  await expect(usersPage.lastNameInput).toBeVisible();
  await expect(usersPage.saveButton).toBeVisible();

  const timestamp = Date.now();

  const user = {
    email: `autotest-${timestamp}@test.com`,
    firstName: 'Ivan',
    lastName: 'Ivanov',
  };

  await usersPage.emailInput.fill(user.email);
  await usersPage.firstNameInput.fill(user.firstName);
  await usersPage.lastNameInput.fill(user.lastName);

  // Шаг 7. Сохраняем
  await usersPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  // Шаг 8. Возвращаемся к списку
  await usersPage.openList();

  const row = page.getByRole('row', {
    name: new RegExp(user.email),
  });

  await expect(row).toContainText(user.firstName);
  await expect(row).toContainText(user.lastName);

});
