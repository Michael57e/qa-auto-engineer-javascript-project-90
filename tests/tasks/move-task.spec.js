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

  const sourceColumn = page.locator('[data-rfd-droppable-id="1"]');
  const targetColumn = page.locator('[data-rfd-droppable-id="2"]');

  // Берем первую карточку именно из колонки Draft
  const sourceCard = sourceColumn.locator('[data-rfd-draggable-id]').first();

  await expect(sourceCard).toBeVisible();
  await expect(targetColumn).toBeVisible();

  const taskTitle = (
    await sourceCard.locator('.MuiTypography-h5').innerText()
  ).trim();

  // react-beautiful-dnd поддерживает доступное keyboard drag-and-drop:
  // Space — поднять карточку, ArrowRight — перенести в следующую колонку,
  // Space — отпустить карточку.
  await sourceCard.focus();
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Space');

  const taskInTargetColumn = targetColumn.locator('.MuiCard-root', {
    has: page.getByText(taskTitle, { exact: true }),
  });

  const taskInSourceColumn = sourceColumn.locator('.MuiCard-root', {
    has: page.getByText(taskTitle, { exact: true }),
  });

  // Карточка должна появиться в To Review
  await expect(taskInTargetColumn).toBeVisible({ timeout: 10000 });

  // И исчезнуть из Draft
  await expect(taskInSourceColumn).toHaveCount(0);
});
