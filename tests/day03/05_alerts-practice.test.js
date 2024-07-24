import { test, expect } from "@playwright/test";

// Define the test group
test.describe("Test Group", () => {
  // create a beforeEach that navigates to https://practice.cydeo.com/javascript_alerts
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/javascript_alerts");
  });

  test("Handling JS Alerts", async ({ page }) => {
    let alertMessage;

    page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        alertMessage = dialog.message();
      //  await page.waitForTimeout(3000); 
        dialog.accept();
    });

    const clickForJsAlert = page.locator("//button[@onclick='jsAlert()']");

    await clickForJsAlert.click();

    await expect(page.locator("text='You successfully clicked an alert'")).toBeVisible();
    expect(alertMessage).toBe("I am a JS Alert");

  });

  test("Handling JS Confirm Accept", async ({ page }) => {
      let confirmMessage;

    page.on('dialog', async (dialog) => {
        confirmMessage = dialog.message();
        console.log(`Dialog message: ${dialog.message()}`);
        //await page.waitForTimeout(3000);
        dialog.accept();
    });

    const clickForJsConfirm = page.locator("//button[contains(@class, 'btn-primary') and @onclick='jsConfirm()']");
    await clickForJsConfirm.click();

    await expect(page.locator("text='You clicked: Ok'")).toBeVisible();
    expect(confirmMessage).toBe("I am a JS Confirm");

  });

  test("Handling JS Confirm Reject", async ({ page }) => {
    let confirmMessage;

  page.on('dialog', async (dialog) => {
      confirmMessage = dialog.message();
      console.log(`Dialog message: ${dialog.message()}`);
      //await page.waitForTimeout(3000);
      dialog.dismiss();
  });

  const clickForJsConfirm = page.locator("//button[contains(@class, 'btn-primary') and @onclick='jsConfirm()']");
  await clickForJsConfirm.click();

  await expect(page.locator("text='You clicked: Cancel'")).toBeVisible();
  expect(confirmMessage).toBe("I am a JS Confirm");

});

  test("Handling JS Prompt Accept", async ({ page }) => {

    let promptMessage;

    page.on('dialog', async (dialog) => {
        promptMessage =dialog.message();
        dialog.accept("CYDEO");
        console.log(`Dialog message: ${dialog.message()}`);

    });

    const clickForJsPrompt = page.locator("//button[@onclick='jsPrompt()']");
    await clickForJsPrompt.click();

    await expect(page.locator("text='You entered: CYDEO'")).toBeVisible();

  });


  test("Handling JS Prompt Reject", async ({ page }) => {

    let promptMessage;

    page.on('dialog', async (dialog) => {
        promptMessage =dialog.message();
        dialog.dismiss();
        console.log(`Dialog message: ${dialog.message()}`);

    });

    const clickForJsPrompt = page.locator("//button[@onclick='jsPrompt()']");
    await clickForJsPrompt.click();

    await expect(page.locator("text='You entered: null'")).toBeVisible();

  });


});