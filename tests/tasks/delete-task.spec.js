import { test } from '../fixtures.js';

test('user can delete a task', async ({ tasksPage }) => {
  const taskTitle = `DeleteTask ${Date.now()}`;

  await tasksPage.createTask({
    title: taskTitle,
    status: 'Draft',
  });

  await tasksPage.openList();
  await tasksPage.expectTaskVisible(taskTitle);

  await tasksPage.openTaskForEdit(taskTitle);

  await tasksPage.deleteCurrentTask();

  await tasksPage.openList();
  await tasksPage.expectTaskNotVisible(taskTitle);
});
