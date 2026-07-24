import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { TaskStatusesPage } from '../pages/TaskStatusesPage';

test('user can bulk delete task statuses', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const taskStatusesPage = new TaskStatusesPage(page);

  // Авторизация
  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  // Переходим к статусам
  await taskStatusesPage.goto();
  await taskStatusesPage.expectStatusesList();

  // Выделяем все статусы
  await taskStatusesPage.selectAllCheckbox.check();

  // Проверяем, что статусы выделены
  await expect(
    page.getByRole('heading', { name: /\d+ items selected/ })
  ).toBeVisible();

  // Удаляем все выбранные статусы
  await taskStatusesPage.deleteButton.click();

  // Проверяем уведомление
  await expect(page.getByText(/\d+ elements deleted/)).toBeVisible();

  // Проверяем, что список пуст
  await taskStatusesPage.expectEmptyList();

  // Скриншот
/*  await page.screenshot({ 
    path: 'test-results/statuses-bulk-deleted.png', 
    fullPage: true 
  });*/
});
