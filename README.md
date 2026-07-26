# Kanban Board — Playwright E2E Tests

Автоматизированные end-to-end тесты для веб-приложения управления задачами «Канбан-доска».

Проект выполнен в рамках обучения на курсе Hexlet по автоматизированному тестированию на JavaScript.

## Описание

Тестируемое приложение позволяет управлять пользователями, статусами задач, метками и задачами на Канбан-доске.

Автотесты написаны на JavaScript с использованием Playwright и паттерна Page Object Model.

## Покрытые сценарии

### Авторизация

- успешный вход пользователя;
- выход из системы.

### Пользователи

- отображение списка пользователей;
- создание пользователя;
- редактирование пользователя;
- удаление одного пользователя;
- массовое удаление пользователей.

### Статусы задач

- создание статуса;
- редактирование статуса;
- удаление одного статуса;
- массовое удаление статусов.

### Метки

- создание метки;
- редактирование метки;
- удаление одной метки;
- массовое удаление меток.

### Задачи и Канбан-доска

- создание задачи;
- редактирование задачи;
- удаление задачи;
- фильтрация задач;
- перемещение карточки задачи между колонками.

## Технологии

- JavaScript;
- [Playwright](https://playwright.dev/);
- React;
- Vite;
- ESLint;
- GitHub Actions.

## Требования

Для работы с проектом необходимы:

- Node.js;
- npm;
- браузеры Playwright.

## Установка

Клонируйте репозиторий:

```
git clone https://github.com/Michael57e/qa-auto-engineer-javascript-project-90.git
cd qa-auto-engineer-javascript-project-90
```

Установите зависимости:

```
npm install
```

Установите браузеры Playwright:

```
npx playwright install
```

Для Linux/CI с системными зависимостями браузеров:

```
npx playwright install --with-deps
```

## Запуск приложения

Запуск development-сервера Vite:

```
npm run dev
```

После запуска приложение доступно по адресу:

```text
http://localhost:5173
```

> При запуске Playwright сервер стартует автоматически согласно настройке `webServer` в `playwright.config.js`. Поэтому вручную запускать `npm run dev` перед тестами необязательно.

## Запуск тестов

Запустить все E2E-тесты:

```
npx playwright test
```

Запустить тесты в Chromium:

```
npx playwright test --project=chromium
```

Запустить тесты в Firefox:

```
npx playwright test --project=firefox
```

Запустить тесты в WebKit:

```
npx playwright test --project=webkit
```

Запуск с отображением браузера:

```
npx playwright test --headed
```

Пошаговая отладка:

```
npx playwright test --debug
```

## Запуск тестов по разделам

Пользователи:

```
npx playwright test tests/users/
```

Статусы задач:

```
npx playwright test tests/task-statuses/
```

Метки:

```
npx playwright test tests/labels/
```

Задачи и Канбан-доска:

```
npx playwright test tests/tasks/
```

Пример запуска одного теста в WebKit:

```
npx playwright test tests/tasks/edit-task.spec.js --project=webkit
```

## Отчёты Playwright

После запуска тестов HTML-отчёт можно открыть командой:

```
npx playwright show-report
```

При повторной попытке упавшего теста Playwright сохраняет trace-файл. Его можно открыть так:

```
npx playwright show-trace path/to/trace.zip
```

## Проверка кода

Запуск ESLint:

```
npm run lint
```

## CI

В репозитории настроен GitHub Actions workflow:

```text
.github/workflows/playwright.yml
```

Workflow запускается при `push` и `pull request` в ветки `main` и `master`.

В CI выполняются:

1. установка зависимостей через `npm ci`;
2. установка браузеров Playwright;
3. запуск E2E-тестов;
4. сохранение HTML-отчёта Playwright как артефакта.

## Структура проекта

```text
.
├── src/                         # Исходный код React/Vite-приложения
├── tests/
│   ├── pages/                   # Page Object классы
│   │   ├── LabelsPage.js
│   │   ├── LoginPage.js
│   │   ├── MainPage.js
│   │   ├── TasksPage.js
│   │   ├── TaskStatusesPage.js
│   │   └── UsersPage.js
│   ├── labels/                  # Тесты меток
│   ├── task-statuses/           # Тесты статусов задач
│   ├── tasks/                   # Тесты Канбан-доски
│   ├── users/                   # Тесты пользователей
│   ├── auth.spec.js             # Тесты авторизации
│   └── rendering.spec.js        # Smoke-тест рендеринга приложения
├── .github/workflows/           # GitHub Actions workflows
├── playwright.config.js         # Конфигурация Playwright
├── package.json
└── README.md
```

## Автор

Проект выполнен в рамках курса Hexlet по автотестированию на JavaScript.
[Michael Emtsev](https://github.com/Michael57e)

### Hexlet tests and linter status:

[![Actions Status](https://github.com/Michael57e/qa-auto-engineer-javascript-project-90/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Michael57e/qa-auto-engineer-javascript-project-90/actions)