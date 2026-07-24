import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { TasksPage } from '../pages/TasksPage';

test('user can filter tasks', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const tasksPage = new TasksPage(page);

  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();

  // Открываем фильтр по Label и выбираем значение
  await tasksPage.labelFilter.click();
  const option = page.getByRole('option').first();
  await option.click();

  // Проверяем, что доска обновилась и отображается
  await tasksPage.expectKanbanBoard();

//  await page.screenshot({ path: 'test-results/tasks-filtered.png', fullPage: true });
});
