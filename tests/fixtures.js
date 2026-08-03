import { test as base, expect } from '@playwright/test';
import { CREDENTIALS } from './testData.js';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { UsersPage } from './pages/UsersPage';
import { TaskStatusesPage } from './pages/TaskStatusesPage';
import { LabelsPage } from './pages/LabelsPage';
import { TasksPage } from './pages/TasksPage';

export const test = base.extend({
  loggedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.username, CREDENTIALS.password);
    await mainPage.expectMainPage();

    await use(page);

    await context.close();
  },

  usersPage: async ({ loggedPage }, use) => {
    await use(new UsersPage(loggedPage));
  },

  labelsPage: async ({ loggedPage }, use) => {
    await use(new LabelsPage(loggedPage));
  },

  taskStatusesPage: async ({ loggedPage }, use) => {
    await use(new TaskStatusesPage(loggedPage));
  },

  tasksPage: async ({ loggedPage }, use) => {
    await use(new TasksPage(loggedPage));
  },
});

export { expect };
