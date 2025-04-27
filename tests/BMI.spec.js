import { test, expect } from '@playwright/test';

// Define the URL
const url = 'http://localhost:3000';

test.describe('BMI Calculator Tests', () => {

  // Navigate to BMI Calculator before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.click('button.nav-item:has-text("BMI Calculator")');
    await expect(page.getByRole('heading', { name: /Advanced BMI Calculator/i })).toBeVisible();
  });

  test('1. Should navigate to BMI Calculator', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Advanced BMI Calculator/i })).toBeVisible();
  });

  test('2. Should input weight value', async ({ page }) => {
    await page.getByTestId('weight-input').fill('70');
    await expect(page.getByTestId('weight-input')).toHaveValue('70');
  });

  test('3. Should input height value', async ({ page }) => {
    await page.getByTestId('height-input').fill('175');
    await expect(page.getByTestId('height-input')).toHaveValue('175');
  });

  test('4. Should input age value', async ({ page }) => {
    await page.getByTestId('age-input').fill('25');
    await expect(page.getByTestId('age-input')).toHaveValue('25');
  });

  test('5. Should select gender as Female', async ({ page }) => {
    await page.getByTestId('female-radio').check();
    await expect(page.getByTestId('female-radio')).toBeChecked();
  });

  test('6. Should show error on invalid input', async ({ page }) => {
    await page.getByTestId('weight-input').fill('-5');
    await page.getByTestId('height-input').fill('170');
    await page.getByTestId('age-input').fill('25');
    await page.getByTestId('calculate-button').click();
    await expect(page.getByTestId('error-message')).toContainText('Please enter valid positive numbers');
  });

  test('7. Should calculate BMI with valid inputs', async ({ page }) => {
    await page.getByTestId('weight-input').fill('70');
    await page.getByTestId('height-input').fill('175');
    await page.getByTestId('age-input').fill('25');
    await page.getByTestId('calculate-button').click();
    await expect(page.getByTestId('result-section')).toBeVisible();
    await expect(page.getByTestId('bmi-value')).not.toBeEmpty();
  });

  test('8. Should display correct BMI category', async ({ page }) => {
    await page.getByTestId('weight-input').fill('70');
    await page.getByTestId('height-input').fill('175');
    await page.getByTestId('age-input').fill('25');
    await page.getByTestId('calculate-button').click();
    await expect(page.getByTestId('bmi-category')).toBeVisible();
  });

  test('9. Should reset fields when reset button is clicked', async ({ page }) => {
    await page.getByTestId('weight-input').fill('70');
    await page.getByTestId('reset-button').click();
    await expect(page.getByTestId('weight-input')).toHaveValue('');
  });

  test('10. Should show history after calculation', async ({ page }) => {
    await page.getByTestId('weight-input').fill('70');
    await page.getByTestId('height-input').fill('175');
    await page.getByTestId('age-input').fill('25');
    await page.getByTestId('calculate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await expect(page.getByTestId('history-section')).toBeVisible();
  });

  test('11. Should filter history by age range', async ({ page }) => {
    await page.getByTestId('weight-input').fill('70');
    await page.getByTestId('height-input').fill('175');
    await page.getByTestId('age-input').fill('25');
    await page.getByTestId('calculate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await page.getByTestId('min-age-filter').fill('20');
    await page.getByTestId('max-age-filter').fill('30');
    await expect(page.getByTestId('history-section')).toBeVisible();
  });

  test('12. Should filter history by BMI category', async ({ page }) => {
    await page.getByTestId('weight-input').fill('70');
    await page.getByTestId('height-input').fill('175');
    await page.getByTestId('age-input').fill('25');
    await page.getByTestId('calculate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await page.getByTestId('category-filter').selectOption({ label: 'Normal' });
    await expect(page.getByTestId('history-section')).toBeVisible();
  });

  test('13. Should clear history when clear button clicked', async ({ page }) => {
    await page.getByTestId('weight-input').fill('70');
    await page.getByTestId('height-input').fill('175');
    await page.getByTestId('age-input').fill('25');
    await page.getByTestId('calculate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await page.getByTestId('clear-history-button').click();
    await expect(page.getByTestId('history-section')).not.toBeVisible();
  });
  

  test('14. Should switch between metric and imperial units', async ({ page }) => {
    await page.getByTestId('imperial-radio').check();
    await expect(page.getByTestId('imperial-radio')).toBeChecked();
  });

  test('15. Should reset filters in history section', async ({ page }) => {
    await page.getByTestId('weight-input').fill('70');
    await page.getByTestId('height-input').fill('175');
    await page.getByTestId('age-input').fill('25');
    await page.getByTestId('calculate-button').click();
    await page.getByTestId('toggle-history-button').click();
    await page.getByTestId('min-age-filter').fill('20');
    await page.getByTestId('reset-filters-button').click();
    await expect(page.getByTestId('min-age-filter')).toHaveValue('');
    await expect(page.getByTestId('max-age-filter')).toHaveValue('');
    await expect(page.getByTestId('category-filter')).toHaveValue('');
    await expect(page.getByTestId('gender-filter')).toHaveValue('');
  });

});
