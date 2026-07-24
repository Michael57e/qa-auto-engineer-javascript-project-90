import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { LabelsPage } from '../pages/LabelsPage';

test('user can bulk delete labels', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const labelsPage = new LabelsPage(page);

  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  await labelsPage.goto();
  await labelsPage.expectLabelsList();

  // Выбираем все метки
  await labelsPage.selectAllCheckbox.check();

  await expect(page.getByRole('heading', { name: /\d+ items selected/ })).toBeVisible();

  // Удаляем
  await labelsPage.deleteButton.click();
  await expect(page.getByText(/\d+ elements deleted/)).toBeVisible();

  // Проверяем пустой список
  await labelsPage.expectEmptyList();

//  await page.screenshot({ path: 'test-results/labels-bulk-deleted.png', fullPage: true });
});
