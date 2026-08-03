import { test } from '../fixtures.js';

test('user can filter tasks by assignee', async ({ tasksPage }) => {
  const firstTaskTitle = `Assignee Filter A ${Date.now()}`;
  const secondTaskTitle = `Assignee Filter B ${Date.now()}`;

  const firstTask = await tasksPage.createTask({
    title: firstTaskTitle,
    assigneeIndex: 0,
    status: 'Draft',
  });

  await tasksPage.createTask({
    title: secondTaskTitle,
    assigneeIndex: 1,
    status: 'Draft',
  });

  await tasksPage.openList();

  await tasksPage.filterByAssignee(firstTask.assignee);

  await tasksPage.expectTaskVisible(firstTaskTitle);
  await tasksPage.expectTaskNotVisible(secondTaskTitle);
});

test('user can filter tasks by status', async ({ tasksPage }) => {
  const draftTaskTitle = `Status Filter Draft ${Date.now()}`;
  const publishedTaskTitle = `Status Filter Published ${Date.now()}`;

  await tasksPage.createTask({
    title: draftTaskTitle,
    status: 'Draft',
  });

  await tasksPage.createTask({
    title: publishedTaskTitle,
    status: 'Published',
  });

  await tasksPage.openList();

  await tasksPage.filterByStatus('Draft');

  await tasksPage.expectTaskVisible(draftTaskTitle);
  await tasksPage.expectTaskNotVisible(publishedTaskTitle);
});

test('user can filter tasks by label', async ({ tasksPage }) => {
  const bugTaskTitle = `Label Filter Bug ${Date.now()}`;
  const criticalTaskTitle = `Label Filter Critical ${Date.now()}`;

  await tasksPage.createTask({
    title: bugTaskTitle,
    status: 'Draft',
    label: 'bug',
  });

  await tasksPage.createTask({
    title: criticalTaskTitle,
    status: 'Draft',
    label: 'critical',
  });

  await tasksPage.openList();

  await tasksPage.filterByLabel('bug');

  await tasksPage.expectTaskVisible(bugTaskTitle);
  await tasksPage.expectTaskNotVisible(criticalTaskTitle);
});
