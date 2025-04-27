// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 10000, // Increase timeout for assertions
  },
  fullyParallel: false, // Run tests one at a time for easier debugging
  workers: 1, // Use a single worker
  reporter: [
    ['list'], // simple console output
    ['allure-playwright'], // generate allure-results folder
  ],
  
  use: {
    browserName: 'chromium', // Force Chrome/Chromium
    headless: false, // Run with head (visible browser) for debugging
    viewport: { width: 1366, height: 768 },
    actionTimeout: 15000, // Increase timeout for actions
    navigationTimeout: 15000, // Increase navigation timeout
    trace: 'on-first-retry', // Record trace on first retry of failed tests
    screenshot: 'on', // Take screenshots for all tests
    video: 'on-first-retry', // Record video for failing tests
  },
});