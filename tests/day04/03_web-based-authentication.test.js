import { test, expect } from "@playwright/test";
require('dotenv').config();

//create a test group with 3 tests in it
test.describe("Web Based Authentication", async () => {
  // after reach, pause the automation for 2 seconds
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test("By embedding the credentials in the URL", async ({ page }) => {
    //await page.goto("https://practice.cydeo.com/basic_auth");

    //https://username:password@address

    //https://admin:admin@practice.cydeo.com/basic_auth

    await page.goto("https://admin:admin@practice.cydeo.com/basic_auth");

    await expect(
      page.getByText("Congratulations! You must have the proper credentials.")
    ).toBeVisible();

    // Not recommended to use this method because it is not secure
  });
  

  test("By encoding the credentials", async ({ page }) => {
    // Encode the credentials in Base64 format
    const code = Buffer.from("admin:admin").toString("base64");
    console.log(code);
  
    // Set the Authorization header
    await page.setExtraHTTPHeaders({ Authorization: `Basic ${code}` });
  
    // Navigate to the target page
    await page.goto("https://practice.cydeo.com/basic_auth");
  
    // Assert the success message is visible
    await expect(
      page.getByText("Congratulations! You must have the proper credentials.")
    ).toBeVisible();

    /*  
       const code = Buffer.from("username:password").toString("base64");
       await page.setExtraHTTPHeaders({Authorization: `Basic ${code}`,});
    */
  });

  test("By encoding the credentials with .env file", async ({ page }) => {
    // Encode the credentials in Base64 format
    const code = Buffer.from(`${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}`).toString("base64");
    console.log(code);
  
    // Set the Authorization header
    await page.setExtraHTTPHeaders({ Authorization: `Basic ${code}` });
  
    // Navigate to the target page
    await page.goto("https://practice.cydeo.com/basic_auth");
  
    // Assert the success message is visible
    await expect(
      page.getByText("Congratulations! You must have the proper credentials.")
    ).toBeVisible();
  });

});