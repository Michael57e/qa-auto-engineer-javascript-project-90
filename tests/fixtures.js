import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { UsersPage } from './pages/UsersPage';
import { TaskStatusesPage } from './pages/TaskStatusesPage';
import { LabelsPage } from './pages/LabelsPage';
import { TasksPage } from './pages/TasksPage';

// Тестовые данные и креденшелы
export const CREDENTIALS = {
  username: 'login',
  password: 'password'
};

// Расширяем стандартный тест Playwright нашими фикстурами
export const test = base.extend({
  // Авторизованная страница. Создается один раз перед каждым тестом.
  page: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.username, CREDENTIALS.password);

    // Передаем уже авторизованную страницу в тест
    await use(page);

    // Очистка после теста
    await context.close();
  },

  // Готовые Page Objects, уже инициализированные авторизованной страницей
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },

  taskStatusesPage: async ({ page }, use) => {
    await use(new TaskStatusesPage(page));
  },

  labelsPage: async ({ page }, use) => {
    await use(new LabelsPage(page));
  },

  tasksPage: async ({ page }, use) => {
    await use(new TasksPage(page));
  },
});

// Реэкспортируем стандартный expect чтобы не импортировать его отдельно
export { expect } from '@playwright/test';