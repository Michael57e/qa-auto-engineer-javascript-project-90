import { test, expect } from '@playwright/test'

test('page contains root element', async ({ page }) => {
  // открываю тестируемую страницу
  await page.goto('http://localhost:5173/')

  // ищу элемент по id
  const root = page.locator('#root')

  await expect(page.locator('#root')).toBeAttached();
})