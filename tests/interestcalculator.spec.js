// InterestCalculator.spec.js - With fixes for decimal formatting
import { test, expect } from '@playwright/test';

test.describe('Interest Calculator Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000/');
    // Click on Interest Calculator from the homepage
    await page.getByRole('button', { name: 'Interest Calculator' }).click();
  });

  test('1. Should display the Interest Calculator title', async ({ page }) => {
    // Verify the title is displayed
    await expect(page.getByRole('heading', { name: 'Interest Calculator' })).toBeVisible();
  });

  test('2. Should calculate simple interest correctly', async ({ page }) => {
    // Enter loan details for simple interest
    await page.getByTestId('simple-radio').check();
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    
    // Click calculate button
    await page.getByTestId('calculate-button').click();
    
    // Verify results
    await expect(page.getByTestId('simple-interest')).toContainText('$100');
    await expect(page.getByTestId('total-amount')).toContainText('$1100');
  });

  test('3. Should calculate compound interest correctly', async ({ page }) => {
    // Enter loan details for compound interest
    await page.getByTestId('compound-radio').check();
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('frequency-select').selectOption('annually');
    
    // Click calculate button
    await page.getByTestId('calculate-button').click();
    
    // Verify results - using regular expression to handle decimal format variations
    const compoundInterestElement = page.getByTestId('compound-interest');
    await expect(compoundInterestElement).toBeVisible();
    const compoundInterestText = await compoundInterestElement.innerText();
    expect(parseFloat(compoundInterestText.replace('$', ''))).toBeCloseTo(102.5, 1);
    
    const totalAmountElement = page.getByTestId('total-amount');
    await expect(totalAmountElement).toBeVisible();
    const totalAmountText = await totalAmountElement.innerText();
    expect(parseFloat(totalAmountText.replace('$', ''))).toBeCloseTo(1102.5, 1);
  });

  test('4. Should show error message for missing input fields', async ({ page }) => {
    // Leave fields empty and click calculate
    await page.getByTestId('calculate-button').click();
    
    // Verify error message
    await expect(page.getByTestId('error-message')).toContainText('Please enter principal amount, interest rate, and time period');
  });

  test('5. Should show error message for invalid input values', async ({ page }) => {
    // Enter negative values
    await page.getByTestId('principal-input').fill('-1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    
    // Click calculate button
    await page.getByTestId('calculate-button').click();
    
    // Verify error message
    await expect(page.getByTestId('error-message')).toContainText('Please enter valid positive numbers');
  });

  test('6. Should reset form when reset button is clicked', async ({ page }) => {
    // Enter values
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    
    // Click reset button
    await page.getByTestId('reset-button').click();
    
    // Verify fields are empty
    await expect(page.getByTestId('principal-input')).toHaveValue('');
    await expect(page.getByTestId('rate-input')).toHaveValue('');
    await expect(page.getByTestId('time-input')).toHaveValue('');
  });

  test('7. Should toggle between simple and compound interest calculation types', async ({ page }) => {
    // Verify compounding frequency selector is not visible for simple interest
    await page.getByTestId('simple-radio').check();
    await expect(page.getByTestId('frequency-select')).not.toBeVisible();
    
    // Check compound radio and verify frequency selector appears
    await page.getByTestId('compound-radio').check();
    await expect(page.getByTestId('frequency-select')).toBeVisible();
  });

  test('8. Should calculate different results for different compounding frequencies', async ({ page }) => {
    // Enter values for compound interest
    await page.getByTestId('compound-radio').check();
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    
    // Calculate with annual compounding
    await page.getByTestId('frequency-select').selectOption('annually');
    await page.getByTestId('calculate-button').click();
    const annualTotalElement = await page.getByTestId('total-amount');
    const annualTotal = await annualTotalElement.innerText();
    
    // Calculate with monthly compounding
    await page.getByTestId('frequency-select').selectOption('monthly');
    await page.getByTestId('calculate-button').click();
    const monthlyTotalElement = await page.getByTestId('total-amount');
    const monthlyTotal = await monthlyTotalElement.innerText();
    
    // Verify monthly compounding results in higher total
    expect(parseFloat(monthlyTotal.replace('$', ''))).toBeGreaterThan(parseFloat(annualTotal.replace('$', '')));
  });

  test('9. Should display and hide calculation history', async ({ page }) => {
    // Make a calculation
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    // Show history
    await page.getByTestId('toggle-history-button').click();
    await expect(page.getByTestId('history-section')).toBeVisible();
    
    // Hide history
    await page.getByTestId('toggle-history-button').click();
    await expect(page.getByTestId('history-section')).not.toBeVisible();
  });

  test('10. Should add new calculations to history', async ({ page }) => {
    // Make first calculation
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    // Make second calculation
    await page.getByTestId('principal-input').fill('2000');
    await page.getByTestId('rate-input').fill('6');
    await page.getByTestId('time-input').fill('3');
    await page.getByTestId('calculate-button').click();
    
    // Show history
    await page.getByTestId('toggle-history-button').click();
    
    // Verify history includes both calculations
    await expect(page.locator('table tbody tr')).toHaveCount(2);
  });

  test('11. Should clear history when clear button is clicked', async ({ page }) => {
    // Make a calculation
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    // Show history
    await page.getByTestId('toggle-history-button').click();
    
    // Clear history
    await page.getByTestId('clear-history-button').click();
    
    // Verify history is empty (history section should be hidden)
    await expect(page.getByTestId('history-section')).not.toBeVisible();
  });

  test('12. Should filter history by principal amount', async ({ page }) => {
    // Make calculations with different principal amounts
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    await page.getByTestId('principal-input').fill('2000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    // Show history
    await page.getByTestId('toggle-history-button').click();
    
    // Filter by min principal
    await page.getByTestId('min-principal-filter').fill('1500');
    
    // Verify only one record is shown
    await expect(page.locator('table tbody tr')).toHaveCount(1);
    await expect(page.locator('table tbody tr td:nth-child(2)')).toContainText('$2000');
  });

  test('13. Should filter history by interest rate', async ({ page }) => {
    // Make calculations with different rates
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('3');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('7');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    // Show history
    await page.getByTestId('toggle-history-button').click();
    
    // Filter by min rate
    await page.getByTestId('min-rate-filter').fill('5');
    
    // Verify only one record is shown
    await expect(page.locator('table tbody tr')).toHaveCount(1);
    await expect(page.locator('table tbody tr td:nth-child(3)')).toContainText('7%');
  });

  test('14. Should filter history by calculation type', async ({ page }) => {
    // Make a simple interest calculation
    await page.getByTestId('simple-radio').check();
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    // Make a compound interest calculation
    await page.getByTestId('compound-radio').check();
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    // Show history
    await page.getByTestId('toggle-history-button').click();
    
    // Filter by calculation type
    await page.getByTestId('calculation-type-filter').selectOption('simple');
    
    // Verify only simple interest calculation is shown
    await expect(page.locator('table tbody tr')).toHaveCount(1);
    await expect(page.locator('table tbody tr td:nth-child(5)')).toContainText('Simple');
  });

  test('15. Should reset filters when reset filters button is clicked', async ({ page }) => {
    // Make multiple calculations
    await page.getByTestId('principal-input').fill('1000');
    await page.getByTestId('rate-input').fill('5');
    await page.getByTestId('time-input').fill('2');
    await page.getByTestId('calculate-button').click();
    
    await page.getByTestId('principal-input').fill('2000');
    await page.getByTestId('rate-input').fill('7');
    await page.getByTestId('time-input').fill('3');
    await page.getByTestId('calculate-button').click();
    
    // Show history
    await page.getByTestId('toggle-history-button').click();
    
    // Apply filters
    await page.getByTestId('min-principal-filter').fill('1500');
    
    // Verify only one record is shown
    await expect(page.locator('table tbody tr')).toHaveCount(1);
    
    // Reset filters
    await page.getByTestId('reset-filters-button').click();
    
    // Verify all records are shown
    await expect(page.locator('table tbody tr')).toHaveCount(2);
    await expect(page.getByTestId('min-principal-filter')).toHaveValue('');
  });
});