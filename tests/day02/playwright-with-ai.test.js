import { test } from '@playwright/test';

test('YouTube Test', async ({ page }) => {
  
  await page.goto('https://www.youtube.com/');

    const searchBox = page.locator('//input[@name="search_query"]');

  // pause the automation for 3 seconds
  await page.waitForTimeout(3000);

  await searchBox.click();
  await searchBox.fill("AI Prompt Engineering");
  await searchBox.press("Enter");

  await page.waitForTimeout(3000);

  const firstVideo = await page.locator("//a[@id='thumbnail' and contains(@href, '/watch?v=_ZvnD73m40o')]");

  await firstVideo.click();

  await page.waitForTimeout(10000);


});