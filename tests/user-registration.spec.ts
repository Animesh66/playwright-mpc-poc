// spec: specs/demowebshop.md
// Test scenarios: User Registration and Account Management

import { test, expect } from '@playwright/test';

test.describe('User Registration and Account Management', () => {
  const baseUrl = 'https://demowebshop.tricentis.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('Valid User Registration', async ({ page }) => {
    // Navigate to the homepage (https://demowebshop.tricentis.com/)
    await expect(page).toHaveURL(baseUrl);

    // Click "Register" link in the header
    await page.click('a[href="/register"]');
    await expect(page).toHaveURL(/.*\/register/);

    // Select gender (Male or Female)
    await page.check('input[value="M"]'); // Select Male

    // Enter valid first name "John"
    await page.fill('input[name="FirstName"]', 'John');

    // Enter valid last name "Doe"
    await page.fill('input[name="LastName"]', 'Doe');

    // Enter valid email "john.doe@example.com"
    const timestamp = Date.now();
    const email = `john.doe${timestamp}@example.com`;
    await page.fill('input[name="Email"]', email);

    // Enter valid password "Password123!"
    await page.fill('input[name="Password"]', 'Password123!');

    // Enter matching confirm password "Password123!"
    await page.fill('input[name="ConfirmPassword"]', 'Password123!');

    // Click "Register" button
    await page.click('input[value="Register"]');

    // Expected Results: User is successfully registered
    await expect(page).toHaveURL(/.*\/registerresult/);
    await expect(page.locator('.result')).toContainText('Your registration completed');
  });

  test('Registration with Missing Required Fields', async ({ page }) => {
    // Navigate to registration page
    await page.click('a[href="/register"]');
    
    // Leave first name field empty
    // Enter last name "Doe"
    await page.fill('input[name="LastName"]', 'Doe');

    // Enter email "test@example.com"
    const timestamp = Date.now();
    await page.fill('input[name="Email"]', `test${timestamp}@example.com`);

    // Enter password "Password123!"
    await page.fill('input[name="Password"]', 'Password123!');

    // Enter confirm password "Password123!"
    await page.fill('input[name="ConfirmPassword"]', 'Password123!');

    // Click "Register" button
    await page.click('input[value="Register"]');

    // Expected Results: Registration fails with appropriate error message
    await expect(page.locator('.field-validation-error')).toBeVisible();
    await expect(page.locator('.field-validation-error')).toContainText('First name is required');
    
    // User remains on registration page
    await expect(page).toHaveURL(/.*\/register/);
  });

  test('Registration with Mismatched Passwords', async ({ page }) => {
    // Navigate to registration page
    await page.click('a[href="/register"]');

    // Fill in all required fields correctly
    await page.check('input[value="M"]');
    await page.fill('input[name="FirstName"]', 'John');
    await page.fill('input[name="LastName"]', 'Doe');
    
    const timestamp = Date.now();
    await page.fill('input[name="Email"]', `john.doe${timestamp}@example.com`);

    // Enter password "Password123!"
    await page.fill('input[name="Password"]', 'Password123!');

    // Enter confirm password "DifferentPassword!"
    await page.fill('input[name="ConfirmPassword"]', 'DifferentPassword!');

    // Click "Register" button
    await page.click('input[value="Register"]');

    // Expected Results: Registration fails with password mismatch error
    await expect(page.locator('.field-validation-error')).toBeVisible();
    await expect(page.locator('.field-validation-error')).toContainText(/password/i);
    
    // User remains on registration page
    await expect(page).toHaveURL(/.*\/register/);
  });

  test('Registration with Invalid Email Format', async ({ page }) => {
    // Navigate to registration page
    await page.click('a[href="/register"]');

    // Fill in personal details correctly
    await page.check('input[value="M"]');
    await page.fill('input[name="FirstName"]', 'John');
    await page.fill('input[name="LastName"]', 'Doe');

    // Enter invalid email "invalid-email-format"
    await page.fill('input[name="Email"]', 'invalid-email-format');

    // Enter valid passwords
    await page.fill('input[name="Password"]', 'Password123!');
    await page.fill('input[name="ConfirmPassword"]', 'Password123!');

    // Click "Register" button
    await page.click('input[value="Register"]');

    // Expected Results: Registration fails with email format validation error
    await expect(page.locator('.field-validation-error')).toBeVisible();
    await expect(page.locator('.field-validation-error')).toContainText(/email/i);
    
    // User remains on registration page
    await expect(page).toHaveURL(/.*\/register/);
  });
});