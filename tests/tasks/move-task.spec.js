import { test } from '../fixtures.js';

test('user can drag and drop a task card to another column', async ({ tasksPage }) => {
  const taskTitle = `Move Task ${Date.now()}`;

  await tasksPage.createTask({
    title: taskTitle,
    status: 'Draft',
  });

  await tasksPage.openList();

  await tasksPage.expectTaskInColumn(taskTitle, 'Draft');

  await tasksPage.moveTaskToNextColumn(taskTitle);

  await tasksPage.expectTaskInColumn(taskTitle, 'To Review');
  await tasksPage.expectTaskNotInColumn(taskTitle, 'Draft');
});
