import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { TasksPage } from '../pages/TasksPage';

test('user can drag and drop a task card to another column', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const tasksPage = new TasksPage(page);

  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();

  // Берем первую карточку из первой колонки
  const sourceCard = page.locator('[data-rfd-draggable-id]').first();
  // Целевая колонка (например "To Review" с droppable-id="2")
  const targetDroppable = page.locator('[data-rfd-droppable-id="2"]');

  await expect(sourceCard).toBeVisible();
  await expect(targetDroppable).toBeVisible();

  // Перетаскиваем карточку во вторую колонку
  await sourceCard.dragTo(targetDroppable);

//  await page.screenshot({ path: 'test-results/task-moved.png', fullPage: true });
});
