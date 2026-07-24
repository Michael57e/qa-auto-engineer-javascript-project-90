import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { TaskStatusesPage } from '../pages/TaskStatusesPage';

test('user can create a task status', async ({ page }) => {
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

  // Создаем новый статус
  await taskStatusesPage.clickCreate();

  // Проверяем форму
  await expect(taskStatusesPage.nameInput).toBeVisible();
  await expect(taskStatusesPage.slugInput).toBeVisible();
  await expect(taskStatusesPage.saveButton).toBeVisible();

  const status = {
    name: `Test Status ${Date.now()}`,
    slug: `test-status-${Date.now()}`,
  };

  // Заполняем форму
  await taskStatusesPage.nameInput.fill(status.name);
  await taskStatusesPage.slugInput.fill(status.slug);
  await taskStatusesPage.saveButton.click();

  // Проверяем уведомление
  await expect(page.getByText('Element created')).toBeVisible();

  // Возвращаемся к списку через openList
  await taskStatusesPage.openList();
  await taskStatusesPage.expectStatusesList();

  // Проверяем, что созданный статус отображается в таблице
  const row = taskStatusesPage.getRowByName(status.name);
  await expect(row).toBeVisible();
  await expect(row).toContainText(status.slug);

  // Скриншот
/*  await page.screenshot({ 
    path: 'test-results/status-created.png', 
    fullPage: true 
  });*/
});
