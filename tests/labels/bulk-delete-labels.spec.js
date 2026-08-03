import { test } from '../fixtures.js';

test('user can bulk delete labels', async ({ labelsPage }) => {
  await labelsPage.goto();
  await labelsPage.expectLabelsList();

  await labelsPage.selectAllLabels();

  await labelsPage.expectSelectedItemsCount(/\d+ items selected/);

  await labelsPage.deleteSelectedLabels();
  await labelsPage.expectBulkDeletedNotification();

  await labelsPage.expectEmptyList();
});
