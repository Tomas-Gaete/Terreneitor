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


test('Register Existing Visitor', async ({ page }) => {
    await page.goto('http://localhost:3000/en');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test@test.test');
    await page.getByLabel('Password *').fill('testtest');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Visitors' }).click();
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill('eve');
    await page.getByRole('option', { name: 'Eve Visitor' }).click();
    await page.getByLabel('Residence').click();
    await page.getByRole('option', { name: 'Main Street, Apt 101' }).click();
    await page.getByLabel('Licence plate').click();
    await page.getByRole('option', { name: 'ABC123' }).click();
    await page.getByLabel('Visit reason (optional)').click();
    await page.getByLabel('Visit reason (optional)').fill('TEst REason');
    await page.getByRole('button', { name: 'Register visit' }).click();
});

test('Register New Visitor', async ({ page }) => {
    await page.goto('http://localhost:3000/en');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test@test.test');
    await page.getByLabel('Password *').fill('testtest');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Visitors' }).click();
    await page.getByLabel('Name').click();
    const name = Math.random().toString(36).substring(7);
    await page.getByLabel('Name').fill(name);
    await page.getByRole('option', { name: `Add: ${name}`}).click();
    await page.getByLabel('Last Name').click();
    await page.getByLabel('Last Name').fill('soto');
    await page.getByRole('textbox', { name: 'RUT' }).click();
    await page.getByRole('textbox', { name: 'RUT' }).fill('20810748-k');
    await page.getByRole('button', { name: 'Register New Visitor' }).click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
});

test('Register New vehicle', async ({ page }) => {
    await page.goto('http://localhost:3000/en');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test@test.test');
    await page.getByLabel('Password *').fill('testtest');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Visitors' }).click();
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill('eve');
    await page.getByRole('option', { name: 'Eve Visitor' }).click();
    await page.getByLabel('Residence').click();
    await page.getByRole('option', { name: 'Main Street, Apt 101' }).click();
    await page.getByLabel('Licence plate').click();
    const plate = Math.random().toString(36).substring(6).toUpperCase();
    await page.getByRole('combobox', { name: 'Licence plate' }).fill(plate);
    await page.getByRole('option', { name: ` Add: ${plate}`  }).click();
    await page.getByLabel('Brand *').click();
    await page.getByLabel('Brand *').fill('FORD');
    await page.getByLabel('Model *').click();
    await page.getByLabel('Model *').fill('F-160');
    await page.getByLabel('Color *').click();
    await page.getByLabel('Color *').fill('ROJO');
    await page.getByRole('button', { name: 'Add vehicle' }).click();
    await page.getByRole('button', { name: 'Register visit' }).click();
});
