import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { TasksPage } from '../pages/TasksPage';

test('user can create a task', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const tasksPage = new TasksPage(page);

  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();

  await tasksPage.clickCreate();

  const taskTitle = `Task ${Date.now()}`;
  await tasksPage.fillTaskForm(taskTitle);

  await tasksPage.saveButton.click();
  await expect(page.getByText('Element created')).toBeVisible();

  await tasksPage.openList();
  await tasksPage.expectKanbanBoard();

  const card = tasksPage.getCardByTitle(taskTitle);
  await expect(card).toBeVisible();

//  await page.screenshot({ path: 'test-results/task-created.png', fullPage: true });
});
