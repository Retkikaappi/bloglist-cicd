import { test, expect } from '@playwright/test'
test('logging in works', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'click here to login' }).click()
  await page.getByRole('textbox', { name: 'username' }).fill('admin')
  await page.getByRole('textbox', { name: 'password' }).fill('admin')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page.getByText('login succesful with admin')).toBeVisible()
})
