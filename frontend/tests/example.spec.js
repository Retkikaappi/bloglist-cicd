// @ts-check
import { test, expect } from '@playwright/test'
import { beforeEach, describe } from 'node:test'

describe('Basic e2e tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'click here to login' }).click()
    await page.getByRole('textbox', { name: 'username' }).fill('admin')
    await page.getByRole('textbox', { name: 'password' }).fill('admin')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('button', { name: 'logout' }).waitFor()
  })

  test('Creating and deleting a blog works', async ({ page }) => {
    await page.goto('/blogs')
    await page.waitForLoadState('networkidle')
    const blogsBefore = await page.getByTestId('bloglink').all()
    await page
      .getByRole('button', { name: 'click here to add a new blog' })
      .click()
    await page.getByRole('textbox', { name: 'title' }).fill('title')
    await page.getByRole('textbox', { name: 'author' }).fill('author')
    await page.getByRole('textbox', { name: 'url' }).fill('url.com')
    await page.getByRole('button', { name: 'add blog' }).click()
    await expect(
      page.getByText('blog created with title: title, author: author')
    ).toBeVisible()
    const blogsAfter = await page.getByTestId('bloglink').all()
    expect(blogsAfter.length).toBeGreaterThan(blogsBefore.length)

    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })

    await page.getByText('title - author').last().click()
    await expect(page.getByText('likes')).toBeVisible()
    await page.getByRole('button', { name: 'remove' }).click()

    await expect(page.getByText('you deleted title!')).toBeVisible()
  })
})

