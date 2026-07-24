import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { UsersPage } from '../pages/UsersPage';

test('user can bulk delete users', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const usersPage = new UsersPage(page);

  await loginPage.goto();
  
  // Всегда выполняем вход
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  // Переходим к списку пользователей
  await usersPage.goto();

  // Проверяем, что таблица отображается
  await expect(page.getByRole('table')).toBeVisible();

  // Выделяем всех пользователей
  await page.getByRole('checkbox', { name: 'Select all' }).check();

  // Проверяем, что пользователи выделены
  await expect(
    page.getByRole('heading', { name: /\d+ items selected/ })
  ).toBeVisible();

  // Удаляем всех выбранных пользователей
  await page.getByRole('button', { name: 'Delete' }).click();

  // Проверяем уведомление
  await expect(page.getByText(/\d+ elements deleted/)).toBeVisible();

  // Проверяем, что пользователей больше нет
  await expect(page.getByText('No Users yet.')).toBeVisible();
  
  // Скриншот для проверки результата
//  await page.screenshot({ path: 'test-results/bulk-delete-result.png', fullPage: true });
});
