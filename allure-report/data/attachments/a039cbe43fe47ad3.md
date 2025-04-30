# Test info

- Name: Unit Converter Tests >> 7. Should convert Weight units correctly
- Location: C:\Users\Imesh\OneDrive\Documents\GitHub\SmartUtils\tests\smart-unit-converter.spec.js:145:7

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
   60 |   test('1. Should display unit converter component', async ({ page }) => {
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
> 145 |   test('7. Should convert Weight units correctly', async ({ page }) => {
      |       ^ Error: browserType.launch: Executable doesn't exist at C:\Users\Imesh\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
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
  161 |
  162 |   test('8. Should swap units when swap button is clicked', async ({ page }) => {
  163 |     // Select Weight category
  164 |     await page.locator('[data-testid="category-select"]').selectOption('Weight');
  165 |     
  166 |     // Set initial units
  167 |     await page.locator('[data-testid="from-unit-select"]').selectOption('kg');
  168 |     await page.locator('[data-testid="to-unit-select"]').selectOption('lb');
  169 |     
  170 |     // Click swap button
  171 |     await page.locator('[data-testid="swap-button"]').click();
  172 |     
  173 |     // Verify units are swapped
  174 |     await expect(page.locator('[data-testid="from-unit-select"]')).toHaveValue('lb');
  175 |     await expect(page.locator('[data-testid="to-unit-select"]')).toHaveValue('kg');
  176 |   });
  177 |
  178 |   test('9. Should show history when toggle button is clicked', async ({ page }) => {
  179 |     // Initially history should be hidden
  180 |     await expect(page.locator('[data-testid="history-section"]')).not.toBeVisible();
  181 |     
  182 |     // Click toggle history button
  183 |     await page.locator('[data-testid="toggle-history-button"]').click();
  184 |     
  185 |     // Verify history section is visible
  186 |     await expect(page.locator('[data-testid="history-section"]')).toBeVisible();
  187 |   });
  188 |
  189 |   test('10. Should add conversion to history after conversion', async ({ page }) => {
  190 |     // Toggle history section
  191 |     await page.locator('[data-testid="toggle-history-button"]').click();
  192 |     
  193 |     // Perform a conversion
  194 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
  195 |     await page.locator('[data-testid="from-unit-select"]').selectOption('m');
  196 |     await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
  197 |     await page.locator('[data-testid="value-input"]').fill('10');
  198 |     await page.locator('[data-testid="convert-button"]').click();
  199 |     
  200 |     // Check if conversion is added to history
  201 |     const historyTable = page.locator('.history-table tbody tr');
  202 |     await expect(historyTable).toBeVisible();
  203 |     await expect(historyTable.first()).toContainText('Length');
  204 | await expect(historyTable.first()).toContainText('m');
  205 | await expect(historyTable.first()).toContainText('ft');
  206 | await expect(historyTable.first()).toContainText('10');
  207 |
  208 |   });
  209 |
  210 |   test('11. Should filter history by category', async ({ page }) => {
  211 |     // Create two different conversions
  212 |     // First conversion (Length)
  213 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
  214 |     await page.locator('[data-testid="from-unit-select"]').selectOption('m');
  215 |     await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
  216 |     await page.locator('[data-testid="value-input"]').fill('1');
  217 |     await page.locator('[data-testid="convert-button"]').click();
  218 |     
  219 |     // Second conversion (Weight)
  220 |     await page.locator('[data-testid="category-select"]').selectOption('Weight');
  221 |     await page.locator('[data-testid="from-unit-select"]').selectOption('kg');
  222 |     await page.locator('[data-testid="to-unit-select"]').selectOption('lb');
  223 |     await page.locator('[data-testid="value-input"]').fill('1');
  224 |     await page.locator('[data-testid="convert-button"]').click();
  225 |     
  226 |     // Show history
  227 |     await page.locator('[data-testid="toggle-history-button"]').click();
  228 |     
  229 |     // Apply filter for Length category
  230 |     await page.locator('[data-testid="category-filter"]').selectOption('Length');
  231 |     
  232 |     // Verify only Length conversion is visible
  233 |     const rows = page.locator('.history-table tbody tr');
  234 |     await expect(rows).toHaveCount(1);
  235 |     await expect(rows.first()).toContainText('Length');
  236 |     await expect(rows.first()).not.toContainText('Weight');
  237 |   });
  238 |
  239 |   test('12. Should clear history when clear button is clicked', async ({ page }) => {
  240 |     // Perform a conversion
  241 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
  242 |     await page.locator('[data-testid="value-input"]').fill('1');
  243 |     await page.locator('[data-testid="convert-button"]').click();
  244 |     
  245 |     // Show history
```