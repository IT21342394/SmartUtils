# Test info

- Name: BMI Calculator Tests >> 6. Should show error on invalid input
- Location: D:\4Y2S\SQA\SmartUtils\tests\BMI.spec.js:39:7

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toContainText(expected)

Locator: getByTestId('error-message')
Expected string: "Please enter valid positive numbers"
Received string: "Please enter weight, height, and age"
Call log:
  - expect.toContainText with timeout 10000ms
  - waiting for getByTestId('error-message')
    13 × locator resolved to <div data-testid="error-message" class="text-red-500 text-sm mt-4">Please enter weight, height, and age</div>
       - unexpected value "Please enter weight, height, and age"

    at D:\4Y2S\SQA\SmartUtils\tests\BMI.spec.js:42:53
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
  - heading "Advanced BMI Calculator" [level=1]
  - heading "Measurements" [level=2]
  - text: Unit System
  - radio "Metric (kg/cm)" [checked]
  - text: Metric (kg/cm)
  - radio "Imperial (lb/in)"
  - text: Imperial (lb/in) Weight (kg)
  - spinbutton "Weight (kg)": "-5"
  - text: Height (cm)
  - spinbutton "Height (cm)"
  - text: Age (years)
  - spinbutton "Age (years)"
  - text: Gender
  - radio "Male" [checked]
  - text: Male
  - radio "Female"
  - text: Female
  - button "Calculate"
  - button "Reset"
  - text: Please enter weight, height, and age
  - heading "Results" [level=2]
  - text: Enter your measurements and click calculate to see your results.
  - heading "Measurement History" [level=2]
  - button "Show History"
  - heading "BMI Categories" [level=2]
  - text: "< 18.5: Underweight 18.5 - 24.9: Normal 25 - 29.9: Overweight ≥ 30: Obese"
  - paragraph: "Note: BMI is a screening tool, but it does not diagnose body fatness or health. BMI calculations may be less accurate for athletes, elderly people, and pregnant women."
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
   3 | // Define the URL
   4 | const url = 'http://localhost:3000';
   5 |
   6 | test.describe('BMI Calculator Tests', () => {
   7 |   
   8 |   // Navigate to BMI Calculator before each test
   9 |   test.beforeEach(async ({ page }) => {
   10 |     await page.goto(url);
   11 |     await page.click('button.nav-item:has-text("BMI Calculator")');
   12 |     await expect(page.getByRole('heading', { name: /Advanced BMI Calculator/i })).toBeVisible();
   13 |   });
   14 |
   15 |   test('1. Should navigate to BMI Calculator', async ({ page }) => {
   16 |     await expect(page.getByRole('heading', { name: /Advanced BMI Calculator/i })).toBeVisible();
   17 |   });
   18 |
   19 |   test('2. Should input weight value', async ({ page }) => {
   20 |     await page.getByTestId('weight-input').fill('70');
   21 |     await expect(page.getByTestId('weight-input')).toHaveValue('70');
   22 |   });
   23 |
   24 |   test('3. Should input height value', async ({ page }) => {
   25 |     await page.getByTestId('height-input').fill('175');
   26 |     await expect(page.getByTestId('height-input')).toHaveValue('175');
   27 |   });
   28 |
   29 |   test('4. Should input age value', async ({ page }) => {
   30 |     await page.getByTestId('age-input').fill('25');
   31 |     await expect(page.getByTestId('age-input')).toHaveValue('25');
   32 |   });
   33 |
   34 |   test('5. Should select gender as Female', async ({ page }) => {
   35 |     await page.getByTestId('female-radio').check();
   36 |     await expect(page.getByTestId('female-radio')).toBeChecked();
   37 |   });
   38 |
   39 |   test('6. Should show error on invalid input', async ({ page }) => {
   40 |     await page.getByTestId('weight-input').fill('-5');
   41 |     await page.getByTestId('calculate-button').click();
>  42 |     await expect(page.getByTestId('error-message')).toContainText('Please enter valid positive numbers');
      |                                                     ^ Error: Timed out 10000ms waiting for expect(locator).toContainText(expected)
   43 |   });
   44 |
   45 |   test('7. Should calculate BMI with valid inputs', async ({ page }) => {
   46 |     await page.getByTestId('weight-input').fill('70');
   47 |     await page.getByTestId('height-input').fill('175');
   48 |     await page.getByTestId('age-input').fill('25');
   49 |     await page.getByTestId('calculate-button').click();
   50 |     await expect(page.getByTestId('result-section')).toBeVisible();
   51 |     await expect(page.getByTestId('bmi-value')).not.toBeEmpty();
   52 |   });
   53 |
   54 |   test('8. Should display correct BMI category', async ({ page }) => {
   55 |     await page.getByTestId('weight-input').fill('70');
   56 |     await page.getByTestId('height-input').fill('175');
   57 |     await page.getByTestId('age-input').fill('25');
   58 |     await page.getByTestId('calculate-button').click();
   59 |     await expect(page.getByTestId('bmi-category')).toBeVisible();
   60 |   });
   61 |
   62 |   test('9. Should reset fields when reset button is clicked', async ({ page }) => {
   63 |     await page.getByTestId('weight-input').fill('70');
   64 |     await page.getByTestId('reset-button').click();
   65 |     await expect(page.getByTestId('weight-input')).toHaveValue('');
   66 |   });
   67 |
   68 |   test('10. Should show history after calculation', async ({ page }) => {
   69 |     await page.getByTestId('weight-input').fill('70');
   70 |     await page.getByTestId('height-input').fill('175');
   71 |     await page.getByTestId('age-input').fill('25');
   72 |     await page.getByTestId('calculate-button').click();
   73 |     await page.getByTestId('toggle-history-button').click();
   74 |     await expect(page.getByTestId('history-section')).toBeVisible();
   75 |   });
   76 |
   77 |   test('11. Should filter history by age range', async ({ page }) => {
   78 |     await page.getByTestId('toggle-history-button').click();
   79 |     await page.getByTestId('min-age-filter').fill('20');
   80 |     await page.getByTestId('max-age-filter').fill('30');
   81 |     await expect(page.getByTestId('history-section')).toBeVisible();
   82 |   });
   83 |
   84 |   test('12. Should filter history by BMI category', async ({ page }) => {
   85 |     await page.getByTestId('toggle-history-button').click();
   86 |     await page.getByTestId('category-filter').selectOption({ label: 'Normal' });
   87 |     await expect(page.getByTestId('history-section')).toBeVisible();
   88 |   });
   89 |
   90 |   test('13. Should clear history when clear button clicked', async ({ page }) => {
   91 |     await page.getByTestId('toggle-history-button').click();
   92 |     await page.getByTestId('clear-history-button').click();
   93 |     await expect(page.getByTestId('history-section')).not.toContainText('BMI');
   94 |   });
   95 |
   96 |   test('14. Should switch between metric and imperial units', async ({ page }) => {
   97 |     await page.getByTestId('imperial-radio').check();
   98 |     await expect(page.getByTestId('imperial-radio')).toBeChecked();
   99 |   });
  100 |
  101 |   test('15. Should reset filters in history section', async ({ page }) => {
  102 |     await page.getByTestId('toggle-history-button').click();
  103 |     await page.getByTestId('min-age-filter').fill('20');
  104 |     await page.getByTestId('reset-filters-button').click();
  105 |     await expect(page.getByTestId('min-age-filter')).toHaveValue('');
  106 |     await expect(page.getByTestId('max-age-filter')).toHaveValue('');
  107 |     await expect(page.getByTestId('category-filter')).toHaveValue('');
  108 |     await expect(page.getByTestId('gender-filter')).toHaveValue('');
  109 |   });
  110 |
  111 | });
  112 |
```