# Test info

- Name: has title
- Location: C:\Users\Imesh\OneDrive\Documents\GitHub\SmartUtils\tests\example.spec.js:4:5

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
   1 | // @ts-check
   2 | import { test, expect } from '@playwright/test';
   3 |
>  4 | test('has title', async ({ page }) => {
     |     ^ Error: browserType.launch: Executable doesn't exist at C:\Users\Imesh\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
   5 |   await page.goto('https://playwright.dev/');
   6 |
   7 |   // Expect a title "to contain" a substring.
   8 |   await expect(page).toHaveTitle(/Playwright/);
   9 | });
  10 |
  11 | test('get started link', async ({ page }) => {
  12 |   await page.goto('https://playwright.dev/');
  13 |
  14 |   // Click the get started link.
  15 |   await page.getByRole('link', { name: 'Get started' }).click();
  16 |
  17 |   // Expects page to have a heading with the name of Installation.
  18 |   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  19 | });
  20 |
```