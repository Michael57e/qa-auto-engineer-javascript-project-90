import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { LabelsPage } from '../pages/LabelsPage';

test('user can create a label', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const labelsPage = new LabelsPage(page);

  await loginPage.goto();
  await loginPage.login('login', 'password');
  await mainPage.expectMainPage();

  await labelsPage.goto();
  await labelsPage.expectLabelsList();

  await labelsPage.clickCreate();

  await expect(labelsPage.nameInput).toBeVisible();
  await expect(labelsPage.saveButton).toBeVisible();

  const labelName = `label-${Date.now()}`;

  await labelsPage.nameInput.fill(labelName);
  await labelsPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  await labelsPage.openList();
  await labelsPage.expectLabelsList();

  const row = labelsPage.getRowByName(labelName);
  await expect(row).toBeVisible();

//  await page.screenshot({ path: 'test-results/label-created.png', fullPage: true });
});
