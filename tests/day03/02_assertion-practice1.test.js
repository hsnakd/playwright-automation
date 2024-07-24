
import { test, expect } from "@playwright/test";

test.describe("Assertion Practice in UI testing", async () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
  });

  test("Verify the page title is 'Practice'", async ({page}) => {
    const title = await page.title();
    expect(title).toEqual("Practice");
    // await expect(page).toHaveTitle("Practice");
    const url = await page.url();
    expect(url).toContain("practice");

  });

  test("Verify the text 'Automation' is included the header element", async ({page}) => {
    const header = "//h1[@class='h1']";
    const headerElement = await page.locator(header);
    const headerText = await headerElement.textContent();
    expect(headerText).toContain("Automation");  
  });

  test("Verify the element 'A/B Testing' is clickable", async ({page}) => {
    const abTest = "//a[@href='/abtest']";
    const abTestElement = await page.locator(abTest);
    await expect(abTestElement).toBeEnabled();
    expect(await abTestElement.isEnabled()).toBeTruthy();
  }); 

  test("Verify the element 'Autocomplete' href is '/autocomplete' ", async ({page}) => {
    const autocompleteLink = page.locator('a[href="/autocomplete"]');
    const href = await autocompleteLink.getAttribute('href');
    expect(href).toBe("/autocomplete");
    await expect(autocompleteLink).toHaveAttribute("href", "/autocomplete");
  });

});


