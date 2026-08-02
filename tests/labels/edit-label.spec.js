import { test, expect } from '../fixtures.js';

test('user can edit a label', async ({ page, labelsPage }) => {
  await labelsPage.goto();
  await labelsPage.expectLabelsList();

  await labelsPage.openFirstLabel();

  await expect(labelsPage.nameInput).toBeVisible();
  await expect(labelsPage.saveButton).toBeVisible();

  const updatedName = `label-${Date.now()}`;

  await labelsPage.nameInput.fill(updatedName);
  await labelsPage.saveButton.click();

  await expect(page.getByText('Element updated')).toBeVisible();
  await expect(page).toHaveURL(/#\/labels/);
  await labelsPage.expectLabelsList();

  const row = labelsPage.getRowByName(updatedName);
  await expect(row).toBeVisible();
});
