import { test, expect } from '../fixtures.js';

test('user can create a label', async ({ page, labelsPage }) => {
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
});
