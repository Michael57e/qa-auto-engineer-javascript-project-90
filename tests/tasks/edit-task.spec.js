import { test } from '../fixtures.js';

test('user can edit a task', async ({ tasksPage }) => {
  const originalTitle = `Task Edit ${Date.now()}`;
  const updatedTitle = `Updated Task ${Date.now()}`;

  await tasksPage.createTask({
    title: originalTitle,
    status: 'Draft',
  });

  await tasksPage.openList();
  await tasksPage.openTaskForEdit(originalTitle);

  await tasksPage.updateCurrentTaskTitle(updatedTitle);

  await tasksPage.expectTaskVisible(updatedTitle);
  await tasksPage.expectTaskNotVisible(originalTitle);
});
