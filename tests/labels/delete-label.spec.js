import { test } from '../fixtures.js';

test('user can delete a label', async ({ labelsPage }) => {
  const labelName = `label-del-${Date.now()}`;

  await labelsPage.createLabel(labelName);

  await labelsPage.openList();
  await labelsPage.selectRowByName(labelName);

  await labelsPage.expectSelectedItemsCount('1 item selected');

  await labelsPage.deleteSelectedLabels();
  await labelsPage.expectDeletedNotification();

  await labelsPage.expectLabelNotInList(labelName);
});
