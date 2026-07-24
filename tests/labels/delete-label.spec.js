import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { LabelsPage } from '../pages/LabelsPage';

test('user can delete a label', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const labelsPage = new LabelsPage(page);

  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  // Создаем метку для последующего удаления
  await labelsPage.goto();
  await labelsPage.expectLabelsList();
  await labelsPage.clickCreate();

  const labelName = `label-del-${Date.now()}`;
  await labelsPage.nameInput.fill(labelName);
  await labelsPage.saveButton.click();
  await expect(page.getByText('Element created')).toBeVisible();

  // Возвращаемся к списку и выбираем созданную метку
  await labelsPage.openList();
  await labelsPage.expectLabelsList();
  await labelsPage.selectRowByName(labelName);

  await expect(page.getByRole('heading', { name: '1 item selected' })).toBeVisible();

  // Удаляем
  await labelsPage.deleteButton.click();
  await expect(page.getByText('Element deleted')).toBeVisible();

  // Проверяем, что метка удалена
  await expect(labelsPage.getRowByName(labelName)).toHaveCount(0);

//  await page.screenshot({ path: 'test-results/label-deleted.png', fullPage: true });
});
