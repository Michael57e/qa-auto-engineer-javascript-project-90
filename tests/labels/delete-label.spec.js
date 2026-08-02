import { test, expect } from '../fixtures.js';

test('user can delete a label', async ({ page, labelsPage }) => {
  await labelsPage.goto();
  await labelsPage.expectLabelsList();
  await labelsPage.clickCreate();

  const labelName = `label-del-${Date.now()}`; // ← исправлен шаблон
  await labelsPage.nameInput.fill(labelName);
  await labelsPage.saveButton.click();
  await expect(page.getByText('Element created')).toBeVisible();

  await labelsPage.openList();
  await labelsPage.expectLabelsList();
  await labelsPage.selectRowByName(labelName);

  await expect(page.getByRole('heading', { name: '1 item selected' })).toBeVisible();

  await labelsPage.deleteButton.click();
  await expect(page.getByText('Element deleted')).toBeVisible();

  await expect(labelsPage.getRowByName(labelName)).toHaveCount(0);
});
