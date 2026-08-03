import { test } from '../fixtures.js';

test('user can edit a label', async ({ labelsPage }) => {
  const originalName = `label-edit-${Date.now()}`;
  const updatedName = `label-updated-${Date.now()}`;

  await labelsPage.createLabel(originalName);

  await labelsPage.openList();
  await labelsPage.openLabelByName(originalName);

  await labelsPage.updateCurrentLabel(updatedName);

  await labelsPage.expectLabelsUrl();
  await labelsPage.expectLabelsList();
  await labelsPage.expectLabelInList(updatedName);
  await labelsPage.expectLabelNotInList(originalName);
});
