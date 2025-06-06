# Test info

- Name: Unit Converter Tests >> 15. Should perform conversion when Enter key is pressed
- Location: C:\Users\Imesh\OneDrive\Documents\GitHub\SmartUtils\tests\smart-unit-converter.spec.js:294:7

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
  246 |     await page.locator('[data-testid="toggle-history-button"]').click();
  247 |     
  248 |     // Verify history exists
  249 |     await expect(page.locator('.history-table tbody tr')).toBeVisible();
  250 |     
  251 |     // Clear history
  252 |     await page.locator('[data-testid="clear-history-button"]').click();
  253 |     
  254 |     // Verify history is cleared and section is hidden
  255 |     await expect(page.locator('[data-testid="history-section"]')).not.toBeVisible();
  256 |   });
  257 |
  258 |   test('13. Should validate input and show error for empty value', async ({ page }) => {
  259 |     // Select category
  260 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
  261 |     
  262 |     // Click convert without entering a value
  263 |     await page.locator('[data-testid="convert-button"]').click();
  264 |     
  265 |     // Check for error message
  266 |     await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  267 |     await expect(page.locator('[data-testid="error-message"]')).toContainText('Please enter a value');
  268 |   });
  269 |
  270 |
  271 |   test('14. Should reset filters in history section', async ({ page }) => {
  272 |     // Perform a conversion
  273 | await page.locator('[data-testid="category-select"]').selectOption('Length');
  274 | await page.locator('[data-testid="from-unit-select"]').selectOption('m');
  275 | await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
  276 | await page.locator('[data-testid="value-input"]').fill('5');
  277 | await page.locator('[data-testid="convert-button"]').click();
  278 |
  279 | // Show history
  280 | await page.locator('[data-testid="toggle-history-button"]').click();
  281 |
  282 | // Now apply filter
  283 | await page.locator('[data-testid="category-filter"]').selectOption('Length');
  284 |
  285 |     // Reset filters
  286 |     await page.locator('[data-testid="reset-filters-button"]').click();
  287 |     
  288 |     // Verify filters are reset
  289 |     await expect(page.locator('[data-testid="category-filter"]')).toHaveValue('');
  290 |     await expect(page.locator('[data-testid="from-filter"]')).toHaveValue('');
  291 |     await expect(page.locator('[data-testid="to-filter"]')).toHaveValue('');
  292 |   });
  293 |
> 294 |   test('15. Should perform conversion when Enter key is pressed', async ({ page }) => {
      |       ^ Error: browserType.launch: Executable doesn't exist at C:\Users\Imesh\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
  295 |     // Select category and units
  296 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
  297 |     await page.locator('[data-testid="from-unit-select"]').selectOption('m');
  298 |     await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
  299 |     
  300 |     // Enter value and press Enter
  301 |     await page.locator('[data-testid="value-input"]').fill('10');
  302 |     await page.locator('[data-testid="value-input"]').press('Enter');
  303 |     
  304 |     // Check result
  305 |     await expect(page.locator('[data-testid="result-value"]')).toBeVisible();
  306 |     await expect(page.locator('[data-testid="result-value"]')).toHaveText('32.8084');
  307 |   });
  308 |
  309 |   test('16. Should apply correct styling class based on category', async ({ page }) => {
  310 |     // Test with Length category
  311 |     await page.locator('[data-testid="category-select"]').selectOption('Length');
  312 |     await page.locator('[data-testid="value-input"]').fill('1');
  313 |     await page.locator('[data-testid="convert-button"]').click();
  314 |   
  315 |     // Check that category-purple1 class is applied to result
  316 |     await expect(page.locator('.result-box.category-purple1')).toBeVisible();
  317 |   
  318 |     // Test with Weight category
  319 |     await page.locator('[data-testid="category-select"]').selectOption('Weight');
  320 |     await page.locator('[data-testid="value-input"]').fill('1');
  321 |     await page.locator('[data-testid="convert-button"]').click();
  322 |   
  323 |     // Check that category-green1 class is applied to result
  324 |     await expect(page.locator('.result-box.category-green1')).toBeVisible();
  325 |   });
  326 |   
  327 |   
  328 |   test('17. Should navigate back to homepage and return to converter', async ({ page }) => {
  329 |     // First verify we're on the converter page
  330 |     await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
  331 |     
  332 |     // Click on the logo to go back to homepage
  333 |     await page.click('.logo-section');
  334 |     
  335 |     // Verify we're on the homepage
  336 |     await expect(page.locator('.homepage-title')).toBeVisible();
  337 |     
  338 |     // Navigate back to the converter via the homepage card
  339 |     await page.click('.tool-card:has-text("Smart Unit Converter") .tool-button');
  340 |     
  341 |     // Verify we're back on the converter page
  342 |     await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
  343 |   });
  344 | });
```