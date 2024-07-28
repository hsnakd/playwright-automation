
import { test, expect } from "@playwright/test";
import path from "path";

//create a test group with 3 tests in it
test.describe("File upload and download", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
  });

  // after reach, pause the automation for 2 seconds
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test("File upload test", async ({ page }) => {
    await page.click("text='File Upload'");

    expect(page.url()).toBe("https://practice.cydeo.com/upload");

    // file path:
    const filePath = path.join(__dirname, "upload", "Upload File.txt");
    console.log(filePath); // /Users/HSN/Desktop/VS Code Projects/playwright-automation/tests/day04/upload/Upload File.txt

    // await page.waitForTimeout(1000);
    page.setInputFiles("//input[@id='file-upload' and @type='file']", filePath);
    // await page.waitForTimeout(1000);

    // Click on upload button
    page.click("//input[@id='file-submit' and @type='submit']");

    // wait for the success message to be visible
    await expect(page.getByText("Upload File.txt")).toBeVisible();

  });


  test("File Download Test", async ({ page }) => {
    // setting listener for download event
    await page.click("text='File Download'");

    expect(page.url()).toBe("https://practice.cydeo.com/download");

  });

  
  
  test("Save the file that's downloaded", async ({ page }) => {

  


  });


});
