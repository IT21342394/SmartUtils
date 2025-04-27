# Test info

- Name: Unit Converter Tests >> 1. Should display unit converter component
- Location: C:\Users\Imesh\OneDrive\Documents\GitHub\SmartUtils\tests\smart-unit-converter.spec.js:60:7

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\Imesh\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | // Define the URL
   4 | const url = 'http://localhost:3000';
   5 |
   6 | test.describe('Unit Converter Tests', () => {
   7 |   // Navigate to the Unit Converter before each test
   8 |   test.beforeEach(async ({ page }) => {
   9 |     // 1. Mock API calls
   10 |     await page.route('**/api/converter/categories', route =>
   11 |       route.fulfill({
   12 |         status: 200,
   13 |         contentType: 'application/json',
   14 |         body: JSON.stringify(['Length', 'Weight']),
   15 |       })
   16 |     );
   17 |   
   18 |     await page.route('**/api/converter/units/Length', route =>
   19 |       route.fulfill({
   20 |         status: 200,
   21 |         contentType: 'application/json',
   22 |         body: JSON.stringify(['cm', 'm', 'ft']),
   23 |       })
   24 |     );
   25 |   
   26 |     await page.route('**/api/converter/units/Weight', route =>
   27 |       route.fulfill({
   28 |         status: 200,
   29 |         contentType: 'application/json',
   30 |         body: JSON.stringify(['g', 'kg', 'lb']),
   31 |       })
   32 |     );
   33 |   
   34 |     await page.route('**/api/converter/convert', async route => {
   35 |       const request = await route.request().postDataJSON();
   36 |       let result = 0;
   37 |       if (request.from === 'm' && request.to === 'ft') result = request.value * 3.28084;
   38 |       if (request.from === 'kg' && request.to === 'lb') result = request.value * 2.20462;
   39 |       if (request.from === 'm' && request.to === 'cm') result = request.value * 100;
   40 |       if (request.from === 'cm' && request.to === 'm') result = request.value / 100;
   41 |       if (request.from === 'lb' && request.to === 'kg') result = request.value / 2.20462;
   42 |       route.fulfill({
   43 |         status: 200,
   44 |         contentType: 'application/json',
   45 |         body: JSON.stringify({ result }),
   46 |       });
   47 |     });
   48 |   
   49 |     // 2. Go to your app
   50 |     await page.goto(url);
   51 |     
   52 |     // 3. Click "Unit Converter" button
   53 |     await page.click('button.nav-item:has-text("Unit Converter")');
   54 |     
   55 |     // 4. Wait for unit converter to be ready
   56 |     await page.waitForSelector('[data-testid="category-select"]');
   57 |   });
   58 |   
   59 |
>  60 |   test('1. Should display unit converter component', async ({ page }) => {
      |       ^ Error: browserType.launch: Executable doesn't exist at C:\Users\Imesh\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
   61 |     await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
   62 |   
   63 |     // Select a category (example: Length)
   64 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
   65 |   
   66 |     // Now the convert button should be visible
   67 |     await expect(page.locator('[data-testid="convert-button"]')).toBeVisible();
   68 |   });
   69 |   
   70 |
   71 |   test('2. Should display categories dropdown with correct options', async ({ page }) => {
   72 |     const categorySelect = page.locator('[data-testid="category-select"]');
   73 |     await expect(categorySelect).toBeVisible();
   74 |     
   75 |     // Check if categories are loaded
   76 |     const options = await categorySelect.locator('option').count();
   77 |     expect(options).toBeGreaterThan(1); // At least "Select Category" and one real option
   78 |     
   79 |     // Verify specific categories
   80 |     await expect(categorySelect.locator('option')).toContainText(['Length', 'Weight']);
   81 |   });
   82 |
   83 |   test('3. Should load units when a category is selected', async ({ page }) => {
   84 |     // Select Length category
   85 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
   86 |     
   87 |     // Check if from and to unit selects are populated
   88 |     const fromUnitSelect = page.locator('[data-testid="from-unit-select"]');
   89 |     const toUnitSelect = page.locator('[data-testid="to-unit-select"]');
   90 |     
   91 |     await expect(fromUnitSelect).toBeVisible();
   92 |     await expect(toUnitSelect).toBeVisible();
   93 |     
   94 |     // Verify units contain expected options
   95 |     await expect(fromUnitSelect.locator('option')).toContainText(['cm', 'm', 'ft']);
   96 |     await expect(toUnitSelect.locator('option')).toContainText(['cm', 'm', 'ft']);
   97 |   });
   98 |
   99 |   test('4. Should not allow negative values in the input field', async ({ page }) => {
  100 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
  101 |   
  102 |     const inputField = page.locator('[data-testid="value-input"]');
  103 |     await expect(inputField).toBeVisible();
  104 |   
  105 |     await inputField.fill('-5');
  106 |   
  107 |     await page.locator('[data-testid="convert-button"]').click();
  108 |   
  109 |     await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  110 |     await expect(page.locator('[data-testid="error-message"]')).toContainText('Please enter a positive value');
  111 |   });
  112 |   
  113 |   test('5. Should not allow zero as a value in the input field', async ({ page }) => {
  114 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
  115 |   
  116 |     const inputField = page.locator('[data-testid="value-input"]');
  117 |     await expect(inputField).toBeVisible();
  118 |   
  119 |     await inputField.fill('0');  // fill zero
  120 |   
  121 |     await page.locator('[data-testid="convert-button"]').click();
  122 |   
  123 |     await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  124 |     await expect(page.locator('[data-testid="error-message"]')).toContainText('Please enter a positive value greater than zero');
  125 |   });
  126 |   
  127 |
  128 |   test('6. Should convert Length units correctly', async ({ page }) => {
  129 |     // Select Length category
  130 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
  131 |     
  132 |     // Configure conversion
  133 |     await page.locator('[data-testid="from-unit-select"]').selectOption('m');
  134 |     await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
  135 |     await page.locator('[data-testid="value-input"]').fill('1');
  136 |     
  137 |     // Trigger conversion
  138 |     await page.locator('[data-testid="convert-button"]').click();
  139 |     
  140 |     // Check result
  141 |     await expect(page.locator('[data-testid="result-value"]')).toHaveText('3.2808');
  142 |     await expect(page.locator('[data-testid="result-unit"]')).toHaveText('ft');
  143 |   });
  144 |
  145 |   test('7. Should convert Weight units correctly', async ({ page }) => {
  146 |     // Select Weight category
  147 |     await page.locator('[data-testid="category-select"]').selectOption('Weight');
  148 |     
  149 |     // Configure conversion
  150 |     await page.locator('[data-testid="from-unit-select"]').selectOption('kg');
  151 |     await page.locator('[data-testid="to-unit-select"]').selectOption('lb');
  152 |     await page.locator('[data-testid="value-input"]').fill('1');
  153 |     
  154 |     // Trigger conversion
  155 |     await page.locator('[data-testid="convert-button"]').click();
  156 |     
  157 |     // Check result
  158 |     await expect(page.locator('[data-testid="result-value"]')).toHaveText('2.2046');
  159 |     await expect(page.locator('[data-testid="result-unit"]')).toHaveText('lb');
  160 |   });
```