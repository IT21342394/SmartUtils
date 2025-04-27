# Test info

- Name: BMI Calculator Tests >> 13. Should clear history when clear button clicked
- Location: D:\4Y2S\SQA\SmartUtils\tests\BMI.spec.js:100:7

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).not.toContainText(expected)

Locator: getByTestId('history-section')
Expected string: not "BMI"
Received: <element(s) not found>
Call log:
  - expect.not.toContainText with timeout 10000ms
  - waiting for getByTestId('history-section')

    at D:\4Y2S\SQA\SmartUtils\tests\BMI.spec.js:107:59
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
  - spinbutton "Weight (kg)": "70"
  - text: Height (cm)
  - spinbutton "Height (cm)": "175"
  - text: Age (years)
  - spinbutton "Age (years)": "25"
  - text: Gender
  - radio "Male" [checked]
  - text: Male
  - radio "Female"
  - text: Female
  - button "Calculate"
  - button "Reset"
  - heading "Results" [level=2]
  - text: 22.86 Normal 15 18.5 25 30 35 40+ BMI Prime 0.91 Body Fat % 16.98% Ideal Weight 72 kg Health Risk Low Est. Daily Calories (BMR × 1.2) 2069 kcal
  - paragraph: BMI = Body Mass Index
  - paragraph: BMI Prime = BMI / 25 (1.0 = optimal)
  - paragraph: Body fat percentage is estimated using a formula based on BMI and age
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
   41 |     await page.getByTestId('height-input').fill('170');
   42 |     await page.getByTestId('age-input').fill('25');
   43 |     await page.getByTestId('calculate-button').click();
   44 |     await expect(page.getByTestId('error-message')).toContainText('Please enter valid positive numbers');
   45 |   });
   46 |
   47 |   test('7. Should calculate BMI with valid inputs', async ({ page }) => {
   48 |     await page.getByTestId('weight-input').fill('70');
   49 |     await page.getByTestId('height-input').fill('175');
   50 |     await page.getByTestId('age-input').fill('25');
   51 |     await page.getByTestId('calculate-button').click();
   52 |     await expect(page.getByTestId('result-section')).toBeVisible();
   53 |     await expect(page.getByTestId('bmi-value')).not.toBeEmpty();
   54 |   });
   55 |
   56 |   test('8. Should display correct BMI category', async ({ page }) => {
   57 |     await page.getByTestId('weight-input').fill('70');
   58 |     await page.getByTestId('height-input').fill('175');
   59 |     await page.getByTestId('age-input').fill('25');
   60 |     await page.getByTestId('calculate-button').click();
   61 |     await expect(page.getByTestId('bmi-category')).toBeVisible();
   62 |   });
   63 |
   64 |   test('9. Should reset fields when reset button is clicked', async ({ page }) => {
   65 |     await page.getByTestId('weight-input').fill('70');
   66 |     await page.getByTestId('reset-button').click();
   67 |     await expect(page.getByTestId('weight-input')).toHaveValue('');
   68 |   });
   69 |
   70 |   test('10. Should show history after calculation', async ({ page }) => {
   71 |     await page.getByTestId('weight-input').fill('70');
   72 |     await page.getByTestId('height-input').fill('175');
   73 |     await page.getByTestId('age-input').fill('25');
   74 |     await page.getByTestId('calculate-button').click();
   75 |     await page.getByTestId('toggle-history-button').click();
   76 |     await expect(page.getByTestId('history-section')).toBeVisible();
   77 |   });
   78 |
   79 |   test('11. Should filter history by age range', async ({ page }) => {
   80 |     await page.getByTestId('weight-input').fill('70');
   81 |     await page.getByTestId('height-input').fill('175');
   82 |     await page.getByTestId('age-input').fill('25');
   83 |     await page.getByTestId('calculate-button').click();
   84 |     await page.getByTestId('toggle-history-button').click();
   85 |     await page.getByTestId('min-age-filter').fill('20');
   86 |     await page.getByTestId('max-age-filter').fill('30');
   87 |     await expect(page.getByTestId('history-section')).toBeVisible();
   88 |   });
   89 |
   90 |   test('12. Should filter history by BMI category', async ({ page }) => {
   91 |     await page.getByTestId('weight-input').fill('70');
   92 |     await page.getByTestId('height-input').fill('175');
   93 |     await page.getByTestId('age-input').fill('25');
   94 |     await page.getByTestId('calculate-button').click();
   95 |     await page.getByTestId('toggle-history-button').click();
   96 |     await page.getByTestId('category-filter').selectOption({ label: 'Normal' });
   97 |     await expect(page.getByTestId('history-section')).toBeVisible();
   98 |   });
   99 |
  100 |   test('13. Should clear history when clear button clicked', async ({ page }) => {
  101 |     await page.getByTestId('weight-input').fill('70');
  102 |     await page.getByTestId('height-input').fill('175');
  103 |     await page.getByTestId('age-input').fill('25');
  104 |     await page.getByTestId('calculate-button').click();
  105 |     await page.getByTestId('toggle-history-button').click();
  106 |     await page.getByTestId('clear-history-button').click();
> 107 |     await expect(page.getByTestId('history-section')).not.toContainText('BMI');
      |                                                           ^ Error: Timed out 10000ms waiting for expect(locator).not.toContainText(expected)
  108 |   });
  109 |
  110 |   test('14. Should switch between metric and imperial units', async ({ page }) => {
  111 |     await page.getByTestId('imperial-radio').check();
  112 |     await expect(page.getByTestId('imperial-radio')).toBeChecked();
  113 |   });
  114 |
  115 |   test('15. Should reset filters in history section', async ({ page }) => {
  116 |     await page.getByTestId('weight-input').fill('70');
  117 |     await page.getByTestId('height-input').fill('175');
  118 |     await page.getByTestId('age-input').fill('25');
  119 |     await page.getByTestId('calculate-button').click();
  120 |     await page.getByTestId('toggle-history-button').click();
  121 |     await page.getByTestId('min-age-filter').fill('20');
  122 |     await page.getByTestId('reset-filters-button').click();
  123 |     await expect(page.getByTestId('min-age-filter')).toHaveValue('');
  124 |     await expect(page.getByTestId('max-age-filter')).toHaveValue('');
  125 |     await expect(page.getByTestId('category-filter')).toHaveValue('');
  126 |     await expect(page.getByTestId('gender-filter')).toHaveValue('');
  127 |   });
  128 |
  129 | });
  130 |
```