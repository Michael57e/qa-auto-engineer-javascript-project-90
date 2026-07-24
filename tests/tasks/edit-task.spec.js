import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { TasksPage } from '../pages/TasksPage';

test('user can edit a task', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const tasksPage = new TasksPage(page);

  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  await tasksPage.goto();
  await tasksPage.expectKanbanBoard();

  // Запоминаем исходный заголовок первой карточки
  const firstCard = page.locator('.MuiCard-root').first();
  const originalTitle = (await firstCard.locator('.MuiTypography-h5').innerText()).trim();

  await firstCard.getByRole('link', { name: 'Edit' }).click();

  // ВАЖНО для WebKit: ждем, пока форма подгрузит данные
  await expect(tasksPage.titleInput).toHaveValue(originalTitle);

  const updatedTitle = `Updated Task ${Date.now()}`;
  await tasksPage.titleInput.fill(updatedTitle);
  await tasksPage.saveButton.click();

  await expect(page.getByText('Element updated')).toBeVisible();

  // НЕ перезагружаем страницу — ждем авто-редирект React-Admin на доску
  await expect(page).toHaveURL(/#\/tasks/);
  await tasksPage.expectKanbanBoard();

  await expect(tasksPage.getCardByTitle(updatedTitle)).toBeVisible();

//  await page.screenshot({ path: 'test-results/task-edited.png', fullPage: true });
});
