import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { LabelsPage } from '../pages/LabelsPage';

test('user can edit a label', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const labelsPage = new LabelsPage(page);

  // Авторизация
  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  // Переходим к списку меток
  await labelsPage.goto();
  await labelsPage.expectLabelsList();

  // Открываем первую метку в списке
  await labelsPage.openFirstLabel();

  // Проверяем форму
  await expect(labelsPage.nameInput).toBeVisible();
  await expect(labelsPage.saveButton).toBeVisible();

  const updatedName = `label-${Date.now()}`;

  // Редактируем название
  await labelsPage.nameInput.fill(updatedName);
  await labelsPage.saveButton.click();

  // Проверяем уведомление и автоматический редирект на список
  await expect(page.getByText('Element updated')).toBeVisible();
  await expect(page).toHaveURL(/#\/labels/);
  await labelsPage.expectLabelsList();

  // Проверяем обновленную метку в таблице
  const row = labelsPage.getRowByName(updatedName);
  await expect(row).toBeVisible();

//  await page.screenshot({ path: 'test-results/label-edited.png', fullPage: true });
});
