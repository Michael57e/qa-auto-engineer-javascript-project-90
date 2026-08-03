import { test } from '../fixtures.js';

test('user can create a label', async ({ labelsPage }) => {
  const labelName = `label-${Date.now()}`;

  await labelsPage.createLabel(labelName);

  await labelsPage.openList();
  await labelsPage.expectLabelInList(labelName);
});
