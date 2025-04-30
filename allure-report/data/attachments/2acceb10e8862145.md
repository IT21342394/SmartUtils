# Test info

- Name: Advanced Password Generator - Full Test Suite >> Switch tabs and come back to Password Generator
- Location: C:\Users\Imesh\OneDrive\Documents\GitHub\SmartUtils\tests\PasswordTest.spec.js:135:7

# Error details

```
Error: expect.toHaveText: Error: strict mode violation: locator('h1') resolved to 2 elements:
    1) <h1 class="app-title">SmartUtils</h1> aka getByRole('heading', { name: 'SmartUtils', exact: true })
    2) <h1>Advanced Password Generator</h1> aka getByRole('heading', { name: 'Advanced Password Generator' })

Call log:
  - expect.toHaveText with timeout 10000ms
  - waiting for locator('h1')

    at C:\Users\Imesh\OneDrive\Documents\GitHub\SmartUtils\tests\PasswordTest.spec.js:138:38
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
  - heading "Advanced Password Generator" [level=1]
  - heading "Password Options" [level=2]
  - text: "Password Length: 12"
  - 'slider "Password Length: 12"': "12"
  - text: 8 30 Character Types
  - checkbox "Uppercase (A-Z)" [checked]
  - text: Uppercase (A-Z)
  - checkbox "Lowercase (a-z)" [checked]
  - text: Lowercase (a-z)
  - checkbox "Numbers (0-9)" [checked]
  - text: Numbers (0-9)
  - checkbox "Symbols (!@#$%)" [checked]
  - text: Symbols (!@#$%)
  - button "Generate Password"
  - button "Reset"
  - heading "Generated Password" [level=2]
  - textbox: .j[W6K:P2OR/
  - button "Copy"
  - text: "Strength: Very Strong"
  - heading "Password Analysis" [level=3]
  - text: Length 12 characters Uppercase Yes Lowercase Yes Numbers Yes Symbols Yes Entropy 79 bits
  - heading "Password History" [level=2]
  - button "Show History"
  - button "Clear History"
  - heading "Password Strength Categories" [level=2]
  - text: Very Weak Weak Moderate Strong Very Strong
  - paragraph: "Note: A strong password uses a mix of character types and sufficient length. For sensitive accounts, use at least 14 characters with a mix of uppercase, lowercase, numbers, and symbols."
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
   38 |     await page.getByTestId('length-slider').fill('20');
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
  108 |     await page.getByTestId('toggle-history-button').click();
  109 |     await page.getByTestId('clear-history-button').click();
  110 |     await expect(page.locator('.empty-state')).toContainText('No history yet');
  111 |   });
  112 |
  113 |   test('Filter history by minimum length', async ({ page }) => {
  114 |     await page.getByTestId('generate-button').click();
  115 |     await page.getByTestId('toggle-history-button').click();
  116 |     await page.getByTestId('min-length-filter').fill('10');
  117 |     await expect(page.locator('tbody')).toContainText('10');
  118 |   });
  119 |
  120 |   test('Filter history by password strength', async ({ page }) => {
  121 |     await page.getByTestId('generate-button').click();
  122 |     await page.getByTestId('toggle-history-button').click();
  123 |     await page.getByTestId('strength-filter').selectOption({ label: 'Very Strong' });
  124 |     await expect(page.locator('tbody')).not.toContainText('Weak');
  125 |   });
  126 |
  127 |   test('Reset filters shows full history again', async ({ page }) => {
  128 |     await page.getByTestId('generate-button').click();
  129 |     await page.getByTestId('toggle-history-button').click();
  130 |     await page.getByTestId('strength-filter').selectOption({ label: 'Very Strong' });
  131 |     await page.getByTestId('reset-filters-button').click();
  132 |     await expect(page.locator('tbody')).not.toContainText('No records match');
  133 |   });
  134 |
  135 |   test('Switch tabs and come back to Password Generator', async ({ page }) => {
  136 |     await page.getByRole('navigation').getByRole('button', { name: 'BMI Calculator' }).click();
  137 |     await page.getByRole('navigation').getByRole('button', { name: 'Password Generator' }).click();
> 138 |     await expect(page.locator('h1')).toHaveText('Advanced Password Generator');
      |                                      ^ Error: expect.toHaveText: Error: strict mode violation: locator('h1') resolved to 2 elements:
  139 |   });
  140 |
  141 | });
  142 |
```