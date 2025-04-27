# Test info

- Name: Advanced Password Generator - Full Test Suite >> Password analysis shows correct attributes
- Location: C:\Users\Imesh\OneDrive\Documents\GitHub\SmartUtils\tests\PasswordTest.spec.js:46:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Password Generator' }) resolved to 2 elements:
    1) <button class="nav-item ">Password Generator</button> aka getByRole('navigation').getByRole('button', { name: 'Password Generator' })
    2) <button class="footer-link">Password Generator</button> aka getByRole('contentinfo').getByRole('button', { name: 'Password Generator' })

Call log:
  - waiting for getByRole('button', { name: 'Password Generator' })

    at C:\Users\Imesh\OneDrive\Documents\GitHub\SmartUtils\tests\PasswordTest.spec.js:7:68
```

# Page snapshot

```yaml
- banner:
  - img
  - heading "SmartUtils" [level=1]
  - navigation:
    - button "BMI Calculator"
    - button "Unit Converter"
    - button "Interest Calculator"
    - button "Password Generator"
- main:
  - heading "Welcome to SmartUtils" [level=1]
  - paragraph: "Your all-in-one toolkit for everyday calculations and utilities. Choose from our selection of tools below:"
  - img
  - heading "BMI & Health Indicator" [level=2]
  - paragraph: Calculate your BMI and get personalized health recommendations based on your age and gender.
  - button "Open Tool"
  - img
  - heading "Smart Unit Converter" [level=2]
  - paragraph: Convert between different units of measurement including length and weight
  - button "Open Tool"
  - img
  - heading "Interest & Loan Calculator" [level=2]
  - paragraph: Calculate simple and compound interest, or determine monthly EMI payments for your loans.
  - button "Open Tool"
  - img
  - heading "Password Generator" [level=2]
  - paragraph: Generate strong passwords and evaluate the strength of existing ones to enhance your online security.
  - button "Open Tool"
- contentinfo:
  - heading "About SmartUtils" [level=3]
  - paragraph: SmartUtils offers a collection of useful calculators and tools to help with everyday tasks. From health monitoring to unit conversion, financial planning, and security, we've got you covered.
  - heading "Quick Links" [level=3]
  - button "BMI & Health Indicator"
  - button "Smart Unit Converter"
  - button "Interest & Loan Calculator"
  - button "Password Generator"
  - heading "Contact Us" [level=3]
  - paragraph: Have suggestions or feedback? We'd love to hear from you!
  - paragraph: "Email: support@smartutils.com"
  - text: © 2025 SmartUtils. All rights reserved.
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Advanced Password Generator - Full Test Suite', () => {
   4 |   
   5 |   test.beforeEach(async ({ page }) => {
   6 |     await page.goto('http://localhost:3000'); // ⚡ Change if your localhost runs on another port
>  7 |     await page.getByRole('button', { name: 'Password Generator' }).click();
     |                                                                    ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Password Generator' }) resolved to 2 elements:
   8 |   });
   9 |
   10 |   test('Default password options are selected on load', async ({ page }) => {
   11 |     await expect(page.getByTestId('uppercase-checkbox')).toBeChecked();
   12 |     await expect(page.getByTestId('lowercase-checkbox')).toBeChecked();
   13 |     await expect(page.getByTestId('numbers-checkbox')).toBeChecked();
   14 |     await expect(page.getByTestId('symbols-checkbox')).toBeChecked();
   15 |
   16 |     const slider = await page.getByTestId('length-slider');
   17 |     expect(await slider.inputValue()).toBe('12');
   18 |   });
   19 |
   20 |   test('Generate password and verify output', async ({ page }) => {
   21 |     await page.getByTestId('generate-button').click();
   22 |     await expect(page.getByTestId('password-output')).toHaveValue(/.+/);
   23 |   });
   24 |
   25 |   test('Show error if no character types selected', async ({ page }) => {
   26 |     await page.getByTestId('uppercase-checkbox').uncheck();
   27 |     await page.getByTestId('lowercase-checkbox').uncheck();
   28 |     await page.getByTestId('numbers-checkbox').uncheck();
   29 |     await page.getByTestId('symbols-checkbox').uncheck();
   30 |
   31 |     await page.getByTestId('generate-button').click();
   32 |     await expect(page.getByTestId('error-message')).toHaveText('Please select at least one character type');
   33 |   });
   34 |
   35 |   test('Reset form restores default options', async ({ page }) => {
   36 |     await page.getByTestId('uppercase-checkbox').uncheck();
   37 |     await page.getByTestId('length-slider').fill('20');
   38 |
   39 |     await page.getByTestId('reset-button').click();
   40 |
   41 |     await expect(page.getByTestId('uppercase-checkbox')).toBeChecked();
   42 |     const slider = await page.getByTestId('length-slider');
   43 |     expect(await slider.inputValue()).toBe('12');
   44 |   });
   45 |
   46 |   test('Password analysis shows correct attributes', async ({ page }) => {
   47 |     await page.getByTestId('generate-button').click();
   48 |     const password = await page.getByTestId('password-output').inputValue();
   49 |
   50 |     if (/[A-Z]/.test(password)) {
   51 |       await expect(page.getByTestId('has-uppercase')).toHaveText('Yes');
   52 |     } else {
   53 |       await expect(page.getByTestId('has-uppercase')).toHaveText('No');
   54 |     }
   55 |
   56 |     if (/[a-z]/.test(password)) {
   57 |       await expect(page.getByTestId('has-lowercase')).toHaveText('Yes');
   58 |     } else {
   59 |       await expect(page.getByTestId('has-lowercase')).toHaveText('No');
   60 |     }
   61 |
   62 |     if (/[0-9]/.test(password)) {
   63 |       await expect(page.getByTestId('has-numbers')).toHaveText('Yes');
   64 |     } else {
   65 |       await expect(page.getByTestId('has-numbers')).toHaveText('No');
   66 |     }
   67 |
   68 |     if (/[^A-Za-z0-9]/.test(password)) {
   69 |       await expect(page.getByTestId('has-symbols')).toHaveText('Yes');
   70 |     } else {
   71 |       await expect(page.getByTestId('has-symbols')).toHaveText('No');
   72 |     }
   73 |   });
   74 |
   75 |   test('Entropy is calculated and displayed', async ({ page }) => {
   76 |     await page.getByTestId('generate-button').click();
   77 |     const entropy = await page.getByTestId('entropy-value').textContent();
   78 |     expect(Number(entropy?.replace(' bits', ''))).toBeGreaterThan(0);
   79 |   });
   80 |
   81 |   test('Password strength text is updated', async ({ page }) => {
   82 |     await page.getByTestId('generate-button').click();
   83 |     const strength = await page.getByTestId('strength-text').textContent();
   84 |     expect(strength).not.toBe('');
   85 |   });
   86 |
   87 |   test('Strength meter fills correctly', async ({ page }) => {
   88 |     await page.getByTestId('generate-button').click();
   89 |     const filledSegments = await page.locator('.strength-segment.badge-red, .strength-segment.badge-orange, .strength-segment.badge-yellow, .strength-segment.badge-blue, .strength-segment.badge-green').count();
   90 |     expect(filledSegments).toBeGreaterThan(0);
   91 |   });
   92 |
   93 |   test('Copy password to clipboard and notification shown', async ({ page }) => {
   94 |     await page.getByTestId('generate-button').click();
   95 |     await page.getByTestId('copy-button').click();
   96 |     await expect(page.getByTestId('copy-button')).toHaveText('Copied!');
   97 |     await expect(page.locator('.notification')).toHaveText('Password copied to clipboard!');
   98 |   });
   99 |
  100 |   test('Generated password is saved into history', async ({ page }) => {
  101 |     await page.getByTestId('generate-button').click();
  102 |     await page.getByTestId('toggle-history-button').click();
  103 |     await expect(page.getByTestId('history-section')).toContainText('Password');
  104 |   });
  105 |
  106 |   test('Clear history removes all records', async ({ page }) => {
  107 |     await page.getByTestId('generate-button').click();
```