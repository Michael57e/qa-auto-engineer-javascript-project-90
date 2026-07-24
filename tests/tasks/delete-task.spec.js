import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { TasksPage } from '../pages/TasksPage';

test('user can delete a task', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const tasksPage = new TasksPage(page);

  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  // 1. Создаем задачу для последующего удаления
  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();
  await tasksPage.clickCreate();

  const taskTitle = `DeleteTask ${Date.now()}`;
  await tasksPage.fillTaskForm(taskTitle);
  await tasksPage.saveButton.click();
  await expect(page.getByText('Element created')).toBeVisible();

  // 2. Открываем созданную задачу на редактирование
  await tasksPage.openList();
  await tasksPage.expectKanbanBoard();
  const card = tasksPage.getCardByTitle(taskTitle);
  await expect(card).toBeVisible();
  await card.getByRole('link', { name: 'Edit' }).click();

  // 3. Удаляем задачу
  await expect(tasksPage.deleteButton).toBeVisible();
  await tasksPage.deleteButton.click();
  await expect(page.getByText('Element deleted')).toBeVisible();

  // 4. Проверяем, что задачи больше нет на доске
  await tasksPage.openList();
  await tasksPage.expectKanbanBoard();
  await expect(tasksPage.getCardByTitle(taskTitle)).toHaveCount(0);

//  await page.screenshot({ path: 'test-results/task-deleted.png', fullPage: true });
});
