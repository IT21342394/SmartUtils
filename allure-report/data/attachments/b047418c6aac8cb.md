# Test info

- Name: Unit Converter Tests >> 11. Should filter history by category
- Location: C:\Users\Imesh\OneDrive\Documents\GitHub\SmartUtils\tests\smart-unit-converter.spec.js:210:7

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
> 210 |   test('11. Should filter history by category', async ({ page }) => {
      |       ^ Error: browserType.launch: Executable doesn't exist at C:\Users\Imesh\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
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
  294 |   test('15. Should perform conversion when Enter key is pressed', async ({ page }) => {
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
```