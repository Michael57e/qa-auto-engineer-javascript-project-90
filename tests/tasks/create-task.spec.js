import { test } from '../fixtures.js';

test('user can create a task', async ({ tasksPage }) => {
  const taskTitle = `Task ${Date.now()}`;

  await tasksPage.createTask({
    title: taskTitle,
    status: 'Draft',
  });

  await tasksPage.openList();
  await tasksPage.expectTaskVisible(taskTitle);
});
