const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://avito-tech-internship-psi.vercel.app';

test.describe('Таск-трекер — пользовательские сценарии', () => {

  test('Создание задачи', async ({ page }) => {
    await page.getByRole('button', { name: 'Создать задачу' }).click();

    await page.getByLabel('Название').fill('бэм бэм бэм');
    await page.getByLabel('Описание').fill('быстрее');

    await page.getByLabel('Проект').click();
    await page.getByRole('option', { name: 'Миграция на новую БД' }).click();

    await page.getByLabel('Приоритет').click();
    await page.getByRole('option', { name: 'High' }).click();

    await page.getByLabel('Исполнитель').click();
    await page.getByRole('option', { name: 'Максим Орлов' }).click();

    await page.getByRole('button', { name: 'Создать' }).click();

    await expect(page).toHaveURL(/issues\/\d+$/);

    await expect(page.getByRole('heading')).toHaveText('бэм бэм бэм');
    await expect(page.getByText('Backlog')).toBeVisible();
  });

  test('Открытие карточки задачи', async ({ page }) => {
    await page.goto(`${BASE_URL}/issues`);

    const row = page.locator('text=бэм бэм бэм');
    await expect(row).toBeVisible();

    await row.click();

    await expect(page.getByRole('heading')).toHaveText('бэм бэм бэм');
    await expect(page.getByText('Проект')).toBeVisible();
    await expect(page.getByText('Приоритет')).toBeVisible();
    await expect(page.getByText('Исполнитель')).toBeVisible();
    await expect(page.getByText('Backlog')).toBeVisible();
  });

  test('Поиск существующей задачи', async ({ page }) => {
    await page.goto(`${BASE_URL}/issues`);

    await page.getByPlaceholder('Поиск').fill('бэм бэм бэм');
    await page.keyboard.press('Enter');

    await expect(page.locator('text=бэм бэм бэм')).toBeVisible();

    const rows = page.locator('.IssueRow');
    await expect(rows).toHaveCount(1);
  });

  test('Поиск несуществующей задачи', async ({ page }) => {
    await page.goto(`${BASE_URL}/issues`);

    await page.getByPlaceholder('Поиск').fill('qwerty123');
    await page.keyboard.press('Enter');

    const rows = page.locator('.IssueRow');
    await expect(rows).toHaveCount(0);

    await expect(page.getByText(/не найден/i)).toBeVisible();
  });

  test('Переход на доску проекта', async ({ page }) => {
    await page.goto(`${BASE_URL}/issues`);

    await page.getByRole('link', { name: 'Проекты' }).click();

    await expect(page).toHaveURL(`${BASE_URL}/boards`);

    const project = page.locator('text=Миграция на новую БД');
    await expect(project).toBeVisible();

    const button = project.locator('xpath=../..').getByRole('link', { name: 'Перейти к доске' });
    await button.click();

    await expect(page).toHaveURL(/boards\/\d+$/);
    await expect(page.getByText('Миграция на новую БД')).toBeVisible();
    await expect(page.getByText('Backlog')).toBeVisible();
    await expect(page.getByText('In Progress')).toBeVisible();
    await expect(page.getByText('Done')).toBeVisible();
  });

});