import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { TaskStatusesPage } from '../pages/TaskStatusesPage';

test('user can edit a task status', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const taskStatusesPage = new TaskStatusesPage(page);

  // Авторизация
  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  // Создаем статус для редактирования
  await taskStatusesPage.goto();
  await taskStatusesPage.clickCreate();

  const originalStatus = {
    name: `Edit Test ${Date.now()}`,
    slug: `edit-test-${Date.now()}`,
  };

  await taskStatusesPage.nameInput.fill(originalStatus.name);
  await taskStatusesPage.slugInput.fill(originalStatus.slug);
  await taskStatusesPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  // Находим созданный статус и открываем для редактирования
  await taskStatusesPage.goto();
  const row = await taskStatusesPage.getRowByName(originalStatus.name);
  await row.click();

  // Проверяем форму редактирования
  await expect(taskStatusesPage.nameInput).toHaveValue(originalStatus.name);
  await expect(taskStatusesPage.slugInput).toHaveValue(originalStatus.slug);

  // Редактируем
  const updatedStatus = {
    name: `Updated Status ${Date.now()}`,
    slug: `updated-status-${Date.now()}`,
  };

  await taskStatusesPage.nameInput.clear();
  await taskStatusesPage.nameInput.fill(updatedStatus.name);
  await taskStatusesPage.slugInput.clear();
  await taskStatusesPage.slugInput.fill(updatedStatus.slug);
  await taskStatusesPage.saveButton.click();

  // Проверяем уведомление
  await expect(page.getByText('Element updated')).toBeVisible();

  // Проверяем, что изменения отобразились в списке
  await taskStatusesPage.expectStatusesList();
  const updatedRow = await taskStatusesPage.getRowByName(updatedStatus.name);
  await expect(updatedRow).toBeVisible();
  await expect(updatedRow).toContainText(updatedStatus.slug);

  // Скриншот
/*  await page.screenshot({ 
    path: 'test-results/status-edited.png', 
    fullPage: true 
  });*/
});
