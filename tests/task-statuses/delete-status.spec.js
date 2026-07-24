import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { TaskStatusesPage } from '../pages/TaskStatusesPage';

test('user can delete a task status', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const taskStatusesPage = new TaskStatusesPage(page);

  // Авторизация
  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  // Создаем статус для удаления
  await taskStatusesPage.goto();
  await taskStatusesPage.clickCreate();

  const status = {
    name: `Delete Test ${Date.now()}`,
    slug: `delete-test-${Date.now()}`,
  };

  await taskStatusesPage.nameInput.fill(status.name);
  await taskStatusesPage.slugInput.fill(status.slug);
  await taskStatusesPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  // Возвращаемся к списку
  await taskStatusesPage.openList();
  await taskStatusesPage.expectStatusesList();

  // Выбираем созданный статус
  await taskStatusesPage.selectRowByName(status.name);

  // Проверяем, что статус выбран
  await expect(
    page.getByRole('heading', { name: '1 item selected' })
  ).toBeVisible();

  // Удаляем
  await taskStatusesPage.deleteButton.click();

  // Проверяем уведомление
  await expect(page.getByText('Element deleted')).toBeVisible();

  // Проверяем, что статус удален (getRowByName теперь не async)
  await expect(
    taskStatusesPage.getRowByName(status.name)
  ).toHaveCount(0);

  // Скриншот
/*  await page.screenshot({ 
    path: 'test-results/status-deleted.png', 
    fullPage: true 
  });*/
});
