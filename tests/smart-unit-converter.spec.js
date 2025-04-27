import { test, expect } from '@playwright/test';

// Define the URL
const url = 'http://localhost:3000';

test.describe('Unit Converter Tests', () => {
  // Navigate to the Unit Converter before each test
  test.beforeEach(async ({ page }) => {
    // 1. Mock API calls
    await page.route('**/api/converter/categories', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(['Length', 'Weight']),
      })
    );
  
    await page.route('**/api/converter/units/Length', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(['cm', 'm', 'ft']),
      })
    );
  
    await page.route('**/api/converter/units/Weight', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(['g', 'kg', 'lb']),
      })
    );
  
    await page.route('**/api/converter/convert', async route => {
      const request = await route.request().postDataJSON();
      let result = 0;
      if (request.from === 'm' && request.to === 'ft') result = request.value * 3.28084;
      if (request.from === 'kg' && request.to === 'lb') result = request.value * 2.20462;
      if (request.from === 'm' && request.to === 'cm') result = request.value * 100;
      if (request.from === 'cm' && request.to === 'm') result = request.value / 100;
      if (request.from === 'lb' && request.to === 'kg') result = request.value / 2.20462;
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ result }),
      });
    });
  
    // 2. Go to your app
    await page.goto(url);
    
    // 3. Click "Unit Converter" button
    await page.click('button.nav-item:has-text("Unit Converter")');
    
    // 4. Wait for unit converter to be ready
    await page.waitForSelector('[data-testid="category-select"]');
  });
  

  test('1. Should display unit converter component', async ({ page }) => {
    await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
  
    // Select a category (example: Length)
    await page.locator('[data-testid="category-select"]').selectOption('Length');
  
    // Now the convert button should be visible
    await expect(page.locator('[data-testid="convert-button"]')).toBeVisible();
  });
  

  test('2. Should display categories dropdown with correct options', async ({ page }) => {
    const categorySelect = page.locator('[data-testid="category-select"]');
    await expect(categorySelect).toBeVisible();
    
    // Check if categories are loaded
    const options = await categorySelect.locator('option').count();
    expect(options).toBeGreaterThan(1); // At least "Select Category" and one real option
    
    // Verify specific categories
    await expect(categorySelect.locator('option')).toContainText(['Length', 'Weight']);
  });

  test('3. Should load units when a category is selected', async ({ page }) => {
    // Select Length category
    await page.locator('[data-testid="category-select"]').selectOption('Length');
    
    // Check if from and to unit selects are populated
    const fromUnitSelect = page.locator('[data-testid="from-unit-select"]');
    const toUnitSelect = page.locator('[data-testid="to-unit-select"]');
    
    await expect(fromUnitSelect).toBeVisible();
    await expect(toUnitSelect).toBeVisible();
    
    // Verify units contain expected options
    await expect(fromUnitSelect.locator('option')).toContainText(['cm', 'm', 'ft']);
    await expect(toUnitSelect.locator('option')).toContainText(['cm', 'm', 'ft']);
  });

  test('4. Should not allow negative values in the input field', async ({ page }) => {
    await page.locator('[data-testid="category-select"]').selectOption('Length');
  
    const inputField = page.locator('[data-testid="value-input"]');
    await expect(inputField).toBeVisible();
  
    await inputField.fill('-5');
  
    await page.locator('[data-testid="convert-button"]').click();
  
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Please enter a positive value');
  });
  
  test('5. Should not allow zero as a value in the input field', async ({ page }) => {
    await page.locator('[data-testid="category-select"]').selectOption('Length');
  
    const inputField = page.locator('[data-testid="value-input"]');
    await expect(inputField).toBeVisible();
  
    await inputField.fill('0');  // fill zero
  
    await page.locator('[data-testid="convert-button"]').click();
  
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Please enter a positive value greater than zero');
  });
  

  test('6. Should convert Length units correctly', async ({ page }) => {
    // Select Length category
    await page.locator('[data-testid="category-select"]').selectOption('Length');
    
    // Configure conversion
    await page.locator('[data-testid="from-unit-select"]').selectOption('m');
    await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
    await page.locator('[data-testid="value-input"]').fill('1');
    
    // Trigger conversion
    await page.locator('[data-testid="convert-button"]').click();
    
    // Check result
    await expect(page.locator('[data-testid="result-value"]')).toHaveText('3.2808');
    await expect(page.locator('[data-testid="result-unit"]')).toHaveText('ft');
  });

  test('7. Should convert Weight units correctly', async ({ page }) => {
    // Select Weight category
    await page.locator('[data-testid="category-select"]').selectOption('Weight');
    
    // Configure conversion
    await page.locator('[data-testid="from-unit-select"]').selectOption('kg');
    await page.locator('[data-testid="to-unit-select"]').selectOption('lb');
    await page.locator('[data-testid="value-input"]').fill('1');
    
    // Trigger conversion
    await page.locator('[data-testid="convert-button"]').click();
    
    // Check result
    await expect(page.locator('[data-testid="result-value"]')).toHaveText('2.2046');
    await expect(page.locator('[data-testid="result-unit"]')).toHaveText('lb');
  });

  test('8. Should swap units when swap button is clicked', async ({ page }) => {
    // Select Weight category
    await page.locator('[data-testid="category-select"]').selectOption('Weight');
    
    // Set initial units
    await page.locator('[data-testid="from-unit-select"]').selectOption('kg');
    await page.locator('[data-testid="to-unit-select"]').selectOption('lb');
    
    // Click swap button
    await page.locator('[data-testid="swap-button"]').click();
    
    // Verify units are swapped
    await expect(page.locator('[data-testid="from-unit-select"]')).toHaveValue('lb');
    await expect(page.locator('[data-testid="to-unit-select"]')).toHaveValue('kg');
  });

  test('9. Should show history when toggle button is clicked', async ({ page }) => {
    // Initially history should be hidden
    await expect(page.locator('[data-testid="history-section"]')).not.toBeVisible();
    
    // Click toggle history button
    await page.locator('[data-testid="toggle-history-button"]').click();
    
    // Verify history section is visible
    await expect(page.locator('[data-testid="history-section"]')).toBeVisible();
  });

  test('10. Should add conversion to history after conversion', async ({ page }) => {
    // Toggle history section
    await page.locator('[data-testid="toggle-history-button"]').click();
    
    // Perform a conversion
    await page.locator('[data-testid="category-select"]').selectOption('Length');
    await page.locator('[data-testid="from-unit-select"]').selectOption('m');
    await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
    await page.locator('[data-testid="value-input"]').fill('10');
    await page.locator('[data-testid="convert-button"]').click();
    
    // Check if conversion is added to history
    const historyTable = page.locator('.history-table tbody tr');
    await expect(historyTable).toBeVisible();
    await expect(historyTable.first()).toContainText('Length');
await expect(historyTable.first()).toContainText('m');
await expect(historyTable.first()).toContainText('ft');
await expect(historyTable.first()).toContainText('10');

  });

  test('11. Should filter history by category', async ({ page }) => {
    // Create two different conversions
    // First conversion (Length)
    await page.locator('[data-testid="category-select"]').selectOption('Length');
    await page.locator('[data-testid="from-unit-select"]').selectOption('m');
    await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
    await page.locator('[data-testid="value-input"]').fill('1');
    await page.locator('[data-testid="convert-button"]').click();
    
    // Second conversion (Weight)
    await page.locator('[data-testid="category-select"]').selectOption('Weight');
    await page.locator('[data-testid="from-unit-select"]').selectOption('kg');
    await page.locator('[data-testid="to-unit-select"]').selectOption('lb');
    await page.locator('[data-testid="value-input"]').fill('1');
    await page.locator('[data-testid="convert-button"]').click();
    
    // Show history
    await page.locator('[data-testid="toggle-history-button"]').click();
    
    // Apply filter for Length category
    await page.locator('[data-testid="category-filter"]').selectOption('Length');
    
    // Verify only Length conversion is visible
    const rows = page.locator('.history-table tbody tr');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Length');
    await expect(rows.first()).not.toContainText('Weight');
  });

  test('12. Should clear history when clear button is clicked', async ({ page }) => {
    // Perform a conversion
    await page.locator('[data-testid="category-select"]').selectOption('Length');
    await page.locator('[data-testid="value-input"]').fill('1');
    await page.locator('[data-testid="convert-button"]').click();
    
    // Show history
    await page.locator('[data-testid="toggle-history-button"]').click();
    
    // Verify history exists
    await expect(page.locator('.history-table tbody tr')).toBeVisible();
    
    // Clear history
    await page.locator('[data-testid="clear-history-button"]').click();
    
    // Verify history is cleared and section is hidden
    await expect(page.locator('[data-testid="history-section"]')).not.toBeVisible();
  });

  test('13. Should validate input and show error for empty value', async ({ page }) => {
    // Select category
    await page.locator('[data-testid="category-select"]').selectOption('Length');
    
    // Click convert without entering a value
    await page.locator('[data-testid="convert-button"]').click();
    
    // Check for error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Please enter a value');
  });


  test('14. Should reset filters in history section', async ({ page }) => {
    // Perform a conversion
await page.locator('[data-testid="category-select"]').selectOption('Length');
await page.locator('[data-testid="from-unit-select"]').selectOption('m');
await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
await page.locator('[data-testid="value-input"]').fill('5');
await page.locator('[data-testid="convert-button"]').click();

// Show history
await page.locator('[data-testid="toggle-history-button"]').click();

// Now apply filter
await page.locator('[data-testid="category-filter"]').selectOption('Length');

    // Reset filters
    await page.locator('[data-testid="reset-filters-button"]').click();
    
    // Verify filters are reset
    await expect(page.locator('[data-testid="category-filter"]')).toHaveValue('');
    await expect(page.locator('[data-testid="from-filter"]')).toHaveValue('');
    await expect(page.locator('[data-testid="to-filter"]')).toHaveValue('');
  });

  test('15. Should perform conversion when Enter key is pressed', async ({ page }) => {
    // Select category and units
    await page.locator('[data-testid="category-select"]').selectOption('Length');
    await page.locator('[data-testid="from-unit-select"]').selectOption('m');
    await page.locator('[data-testid="to-unit-select"]').selectOption('ft');
    
    // Enter value and press Enter
    await page.locator('[data-testid="value-input"]').fill('10');
    await page.locator('[data-testid="value-input"]').press('Enter');
    
    // Check result
    await expect(page.locator('[data-testid="result-value"]')).toBeVisible();
    await expect(page.locator('[data-testid="result-value"]')).toHaveText('32.8084');
  });

  test('16. Should apply correct styling class based on category', async ({ page }) => {
    // Test with Length category
    await page.locator('[data-testid="category-select"]').selectOption('Length');
    await page.locator('[data-testid="value-input"]').fill('1');
    await page.locator('[data-testid="convert-button"]').click();
  
    // Check that category-purple1 class is applied to result
    await expect(page.locator('.result-box.category-purple1')).toBeVisible();
  
    // Test with Weight category
    await page.locator('[data-testid="category-select"]').selectOption('Weight');
    await page.locator('[data-testid="value-input"]').fill('1');
    await page.locator('[data-testid="convert-button"]').click();
  
    // Check that category-green1 class is applied to result
    await expect(page.locator('.result-box.category-green1')).toBeVisible();
  });
  
  
  test('17. Should navigate back to homepage and return to converter', async ({ page }) => {
    // First verify we're on the converter page
    await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
    
    // Click on the logo to go back to homepage
    await page.click('.logo-section');
    
    // Verify we're on the homepage
    await expect(page.locator('.homepage-title')).toBeVisible();
    
    // Navigate back to the converter via the homepage card
    await page.click('.tool-card:has-text("Smart Unit Converter") .tool-button');
    
    // Verify we're back on the converter page
    await expect(page.locator('[data-testid="category-select"]')).toBeVisible();
  });
});