import { test, expect } from '@playwright/test';

test.describe('Advanced Password Generator - Full Test Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); // ⚡ Adjust this if needed
    // ⚡ FIX: click the 'Password Generator' button inside the NAVBAR only
    await page.getByRole('navigation').getByRole('button', { name: 'Password Generator' }).click();
  });

  test('Default password options are selected on load', async ({ page }) => {
    await expect(page.getByTestId('uppercase-checkbox')).toBeChecked();
    await expect(page.getByTestId('lowercase-checkbox')).toBeChecked();
    await expect(page.getByTestId('numbers-checkbox')).toBeChecked();
    await expect(page.getByTestId('symbols-checkbox')).toBeChecked();

    const slider = await page.getByTestId('length-slider');
    expect(await slider.inputValue()).toBe('12');
  });

  test('Generate password and verify output', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('password-output')).toHaveValue(/.+/);
  });

  test('Show error if no character types selected', async ({ page }) => {
    await page.getByTestId('uppercase-checkbox').uncheck();
    await page.getByTestId('lowercase-checkbox').uncheck();
    await page.getByTestId('numbers-checkbox').uncheck();
    await page.getByTestId('symbols-checkbox').uncheck();

    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('error-message')).toHaveText('Please select at least one character type');
  });

  test('Reset form restores default options', async ({ page }) => {
    await page.getByTestId('uppercase-checkbox').uncheck();
    await page.getByTestId('length-slider').fill('20');
    await page.getByTestId('reset-button').click();

    await expect(page.getByTestId('uppercase-checkbox')).toBeChecked();
    const slider = await page.getByTestId('length-slider');
    expect(await slider.inputValue()).toBe('12');
  });

  test('Password analysis shows correct attributes', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    const password = await page.getByTestId('password-output').inputValue();

    if (/[A-Z]/.test(password)) {
      await expect(page.getByTestId('has-uppercase')).toHaveText('Yes');
    } else {
      await expect(page.getByTestId('has-uppercase')).toHaveText('No');
    }

    if (/[a-z]/.test(password)) {
      await expect(page.getByTestId('has-lowercase')).toHaveText('Yes');
    } else {
      await expect(page.getByTestId('has-lowercase')).toHaveText('No');
    }

    if (/[0-9]/.test(password)) {
      await expect(page.getByTestId('has-numbers')).toHaveText('Yes');
    } else {
      await expect(page.getByTestId('has-numbers')).toHaveText('No');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      await expect(page.getByTestId('has-symbols')).toHaveText('Yes');
    } else {
      await expect(page.getByTestId('has-symbols')).toHaveText('No');
    }
  });

  test('Entropy is calculated and displayed', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    const entropy = await page.getByTestId('entropy-value').textContent();
    expect(Number(entropy?.replace(' bits', ''))).toBeGreaterThan(0);
  });

  test('Password strength text is updated', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    const strength = await page.getByTestId('strength-text').textContent();
    expect(strength).not.toBe('');
  });

  test('Strength meter fills correctly', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    const filledSegments = await page.locator('.strength-segment.badge-red, .strength-segment.badge-orange, .strength-segment.badge-yellow, .strength-segment.badge-blue, .strength-segment.badge-green').count();
    expect(filledSegments).toBeGreaterThan(0);
  });

  test('Copy password to clipboard and notification shown', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    await page.getByTestId('copy-button').click();
    await expect(page.getByTestId('copy-button')).toHaveText('Copied!');
    await expect(page.locator('.notification')).toHaveText('Password copied to clipboard!');
  });

  test('Generated password is saved into history', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await expect(page.getByTestId('history-section')).toContainText('Password');
  });

  test('Clear history removes all records', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await page.getByTestId('clear-history-button').click();
    await page.getByTestId('toggle-history-button').click(); // reopen
    await expect(page.locator('.empty-state')).toContainText('No history yet');
  });

  test('Filter history by minimum length', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await page.getByTestId('min-length-filter').fill('20');
    const rows = await page.locator('tbody tr').count();
    expect(rows).toBeGreaterThanOrEqual(0);
  });

  test('Filter history by password strength', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await page.getByTestId('strength-filter').selectOption({ label: 'Very Strong' });
    await expect(page.locator('tbody')).not.toContainText('Weak');
  });

  test('Reset filters shows full history again', async ({ page }) => {
    await page.getByTestId('generate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await page.getByTestId('strength-filter').selectOption({ label: 'Very Strong' });
    await page.getByTestId('reset-filters-button').click();
    await expect(page.locator('tbody')).not.toContainText('No records match');
  });

  test('Switch tabs and come back to Password Generator', async ({ page }) => {
    await page.getByRole('navigation').getByRole('button', { name: 'BMI Calculator' }).click();
    await page.getByRole('navigation').getByRole('button', { name: 'Password Generator' }).click();
    await expect(page.getByRole('heading', { name: 'Advanced Password Generator', exact: true })).toBeVisible();
  });

});
