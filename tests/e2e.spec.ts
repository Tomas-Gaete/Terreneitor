import { test, expect } from '@playwright/test';

test('Landing Visible', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  await expect(page.getByText('TERRENEITORSign InEspañol')).toBeVisible();
  await expect(page.getByRole('img', { name: 'HERO IMAGE' })).toBeVisible();
  await expect(page.getByText('Leaders in community management softwareUncompromised SecurityPrioritizes the')).toBeVisible();
  await expect(page.getByText('Our ServicesPackage')).toBeVisible();
  await expect(page.getByText('Get started with Terreneitor today!Sign up for our services and start managing')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  await page.getByRole('button', { name: 'Español CL' }).click();

});


test('Log In', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('test@test.test');
  await page.getByLabel('Password *').click();
  await page.getByLabel('Password *').fill('testteststerwsst');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('form')).toContainText('Wrong email or password.');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('test@test.testasdasdasd');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('form')).toContainText('User not found. Please sign up.');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('tes');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('form')).toContainText('Invalid credentials.');
  await page.getByLabel('Password *').click();
  await page.getByLabel('Password *').fill('asd');
  await page.getByLabel('Email Address *').click();
  await page.getByLabel('Email Address *').fill('test@test.test');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('form')).toContainText('Invalid credentials.');
  await page.getByLabel('Password *').click();
  await page.getByLabel('Password *').fill('testtest');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('header').getByText('HomeVisitorsPackage')).toBeVisible();
});

