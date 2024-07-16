
import test from '@playwright/test';

test('Search for Playwright on Google', async ({page}) => { 
    await page.goto("https://www.google.com");

    await page.waitForTimeout(1000);

    const searchBox = await page.locator('//textarea[@class="gLFyf"]');
    await searchBox.type("Playwright Automation");

    await page.waitForTimeout(1000);

    await searchBox.clear();

    await page.waitForTimeout(1000);

    await searchBox.fill("Playwright Automation");

    await page.waitForTimeout(1000);

    await searchBox.press('Enter');

    await page.waitForTimeout(1000);


});