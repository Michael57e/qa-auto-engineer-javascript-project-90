import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { UsersPage } from '../pages/UsersPage';

test('user can delete a user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const usersPage = new UsersPage(page);

  // Авторизация
  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  // Создаем пользователя для удаления
  await usersPage.goto();
  await usersPage.clickCreate();

  const user = {
    email: `delete-${Date.now()}@test.com`,
    firstName: 'Delete',
    lastName: 'User',
  };

  await usersPage.emailInput.fill(user.email);
  await usersPage.firstNameInput.fill(user.firstName);
  await usersPage.lastNameInput.fill(user.lastName);
  await usersPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  // Возвращаемся к списку пользователей
  await usersPage.openList();

  // Скриншот для проверки (delete)
/*  await page.screenshot({ 
    path: 'test-results/delete-single-user1.png', 
    fullPage: true 
  });*/

  // Находим созданного пользователя
  const row = page.getByRole('row', {
    name: new RegExp(user.email),
  });

  await expect(row).toBeVisible({ timeout: 10000 });

  // Выбираем пользователя
  await row.getByRole('checkbox').check();

  // Проверяем, что пользователь выделен
  await expect(
    page.getByRole('heading', { name: '1 item selected' })
  ).toBeVisible();

  // Удаляем
  await page.getByRole('button', { name: 'Delete' }).click();

  // Проверяем уведомление
  await expect(page.getByText('Element deleted')).toBeVisible();

  // Проверяем, что пользователя больше нет
  await expect(
    page.getByRole('row', {
      name: new RegExp(user.email),
    })
  ).toHaveCount(0);

  // Скриншот для проверки
/*  await page.screenshot({ 
    path: 'test-results/delete-single-user.png', 
    fullPage: true 
  });*/
});
