# Test info

- Name: Interest Calculator Tests >> 3. Should calculate compound interest correctly
- Location: C:\Users\Rusith\Desktop\SmartUtils\tests\interestcalculator.spec.js:32:7

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toContainText(expected)

Locator: getByTestId('compound-interest')
Expected string: "$102.50"
Received string: "$102.5"
Call log:
  - expect.toContainText with timeout 10000ms
  - waiting for getByTestId('compound-interest')
    13 × locator resolved to <div class="result-value" data-testid="compound-interest">$102.5</div>
       - unexpected value "$102.5"

    at C:\Users\Rusith\Desktop\SmartUtils\tests\interestcalculator.spec.js:44:57
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
  - heading "Interest Calculator" [level=1]
  - heading "Loan Details" [level=2]
  - text: Calculation Type
  - radio "Simple"
  - text: Simple
  - radio "Compound" [checked]
  - text: Compound Principal Amount ($)
  - spinbutton "Principal Amount ($)": "1000"
  - text: Interest Rate (% per year)
  - spinbutton "Interest Rate (% per year)": "5"
  - text: Time Period (years)
  - spinbutton "Time Period (years)": "2"
  - text: Compounding Frequency
  - combobox "Compounding Frequency":
    - option "Annually" [selected]
    - option "Semi-annually"
    - option "Quarterly"
    - option "Monthly"
    - option "Daily"
  - button "Calculate"
  - button "Reset"
  - heading "Results" [level=2]
  - text: $1102.5 5% Rate 0% 5% 10% 15% 20% 25%+ Principal Amount $1000 Compound Interest $102.5 Total Amount $1102.5 Effective Annual Rate 5% Estimated Monthly Payment (Amortized) $43.87
  - paragraph: "Interest Calculation: Compound"
  - paragraph: "Compounding Frequency: Annually"
  - paragraph: "Time Period: 2 years"
  - heading "Calculation History" [level=2]
  - button "Show History"
  - button "Clear History"
  - heading "Interest Rate Categories" [level=2]
  - text: "< 5%: Very Low 5% - 9.9%: Low 10% - 14.9%: Moderate 15% - 19.9%: High ≥ 20%: Very High"
  - paragraph: "Note: Interest rates vary by loan type, credit score, economic conditions, and lending institution. The monthly payment calculation assumes a standard amortized loan with equal payments."
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
   1 | // InterestCalculator.spec.js
   2 | import { test, expect } from '@playwright/test';
   3 |
   4 | test.describe('Interest Calculator Tests', () => {
   5 |   test.beforeEach(async ({ page }) => {
   6 |     // Navigate to the app
   7 |     await page.goto('http://localhost:3000/');
   8 |     // Click on Interest Calculator from the homepage
   9 |     await page.getByRole('button', { name: 'Interest Calculator' }).click();
   10 |   });
   11 |
   12 |   test('1. Should display the Interest Calculator title', async ({ page }) => {
   13 |     // Verify the title is displayed
   14 |     await expect(page.getByRole('heading', { name: 'Interest Calculator' })).toBeVisible();
   15 |   });
   16 |
   17 |   test('2. Should calculate simple interest correctly', async ({ page }) => {
   18 |     // Enter loan details for simple interest
   19 |     await page.getByTestId('simple-radio').check();
   20 |     await page.getByTestId('principal-input').fill('1000');
   21 |     await page.getByTestId('rate-input').fill('5');
   22 |     await page.getByTestId('time-input').fill('2');
   23 |     
   24 |     // Click calculate button
   25 |     await page.getByTestId('calculate-button').click();
   26 |     
   27 |     // Verify results
   28 |     await expect(page.getByTestId('simple-interest')).toContainText('$100');
   29 |     await expect(page.getByTestId('total-amount')).toContainText('$1100');
   30 |   });
   31 |
   32 |   test('3. Should calculate compound interest correctly', async ({ page }) => {
   33 |     // Enter loan details for compound interest
   34 |     await page.getByTestId('compound-radio').check();
   35 |     await page.getByTestId('principal-input').fill('1000');
   36 |     await page.getByTestId('rate-input').fill('5');
   37 |     await page.getByTestId('time-input').fill('2');
   38 |     await page.getByTestId('frequency-select').selectOption('annually');
   39 |     
   40 |     // Click calculate button
   41 |     await page.getByTestId('calculate-button').click();
   42 |     
   43 |     // Verify results
>  44 |     await expect(page.getByTestId('compound-interest')).toContainText('$102.50');
      |                                                         ^ Error: Timed out 10000ms waiting for expect(locator).toContainText(expected)
   45 |     await expect(page.getByTestId('total-amount')).toContainText('$1102.50');
   46 |   });
   47 |
   48 |   test('4. Should show error message for missing input fields', async ({ page }) => {
   49 |     // Leave fields empty and click calculate
   50 |     await page.getByTestId('calculate-button').click();
   51 |     
   52 |     // Verify error message
   53 |     await expect(page.getByTestId('error-message')).toContainText('Please enter principal amount, interest rate, and time period');
   54 |   });
   55 |
   56 |   test('5. Should show error message for invalid input values', async ({ page }) => {
   57 |     // Enter negative values
   58 |     await page.getByTestId('principal-input').fill('-1000');
   59 |     await page.getByTestId('rate-input').fill('5');
   60 |     await page.getByTestId('time-input').fill('2');
   61 |     
   62 |     // Click calculate button
   63 |     await page.getByTestId('calculate-button').click();
   64 |     
   65 |     // Verify error message
   66 |     await expect(page.getByTestId('error-message')).toContainText('Please enter valid positive numbers');
   67 |   });
   68 |
   69 |   test('6. Should reset form when reset button is clicked', async ({ page }) => {
   70 |     // Enter values
   71 |     await page.getByTestId('principal-input').fill('1000');
   72 |     await page.getByTestId('rate-input').fill('5');
   73 |     await page.getByTestId('time-input').fill('2');
   74 |     
   75 |     // Click reset button
   76 |     await page.getByTestId('reset-button').click();
   77 |     
   78 |     // Verify fields are empty
   79 |     await expect(page.getByTestId('principal-input')).toHaveValue('');
   80 |     await expect(page.getByTestId('rate-input')).toHaveValue('');
   81 |     await expect(page.getByTestId('time-input')).toHaveValue('');
   82 |   });
   83 |
   84 |   test('7. Should toggle between simple and compound interest calculation types', async ({ page }) => {
   85 |     // Verify compounding frequency selector is not visible for simple interest
   86 |     await page.getByTestId('simple-radio').check();
   87 |     await expect(page.getByTestId('frequency-select')).not.toBeVisible();
   88 |     
   89 |     // Check compound radio and verify frequency selector appears
   90 |     await page.getByTestId('compound-radio').check();
   91 |     await expect(page.getByTestId('frequency-select')).toBeVisible();
   92 |   });
   93 |
   94 |   test('8. Should calculate different results for different compounding frequencies', async ({ page }) => {
   95 |     // Enter values for compound interest
   96 |     await page.getByTestId('compound-radio').check();
   97 |     await page.getByTestId('principal-input').fill('1000');
   98 |     await page.getByTestId('rate-input').fill('5');
   99 |     await page.getByTestId('time-input').fill('2');
  100 |     
  101 |     // Calculate with annual compounding
  102 |     await page.getByTestId('frequency-select').selectOption('annually');
  103 |     await page.getByTestId('calculate-button').click();
  104 |     const annualTotal = await page.getByTestId('total-amount').textContent();
  105 |     
  106 |     // Calculate with monthly compounding
  107 |     await page.getByTestId('frequency-select').selectOption('monthly');
  108 |     await page.getByTestId('calculate-button').click();
  109 |     const monthlyTotal = await page.getByTestId('total-amount').textContent();
  110 |     
  111 |     // Verify monthly compounding results in higher total
  112 |     expect(parseFloat(monthlyTotal.replace('$', ''))).toBeGreaterThan(parseFloat(annualTotal.replace('$', '')));
  113 |   });
  114 |
  115 |   test('9. Should display and hide calculation history', async ({ page }) => {
  116 |     // Make a calculation
  117 |     await page.getByTestId('principal-input').fill('1000');
  118 |     await page.getByTestId('rate-input').fill('5');
  119 |     await page.getByTestId('time-input').fill('2');
  120 |     await page.getByTestId('calculate-button').click();
  121 |     
  122 |     // Show history
  123 |     await page.getByTestId('toggle-history-button').click();
  124 |     await expect(page.getByTestId('history-section')).toBeVisible();
  125 |     
  126 |     // Hide history
  127 |     await page.getByTestId('toggle-history-button').click();
  128 |     await expect(page.getByTestId('history-section')).not.toBeVisible();
  129 |   });
  130 |
  131 |   test('10. Should add new calculations to history', async ({ page }) => {
  132 |     // Make first calculation
  133 |     await page.getByTestId('principal-input').fill('1000');
  134 |     await page.getByTestId('rate-input').fill('5');
  135 |     await page.getByTestId('time-input').fill('2');
  136 |     await page.getByTestId('calculate-button').click();
  137 |     
  138 |     // Make second calculation
  139 |     await page.getByTestId('principal-input').fill('2000');
  140 |     await page.getByTestId('rate-input').fill('6');
  141 |     await page.getByTestId('time-input').fill('3');
  142 |     await page.getByTestId('calculate-button').click();
  143 |     
  144 |     // Show history
```