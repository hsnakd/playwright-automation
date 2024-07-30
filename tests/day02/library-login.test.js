import { test } from '@playwright/test';

test('Library Login', async ({ page }) => {
  // go to the "https://library2.cydeo.com"
  await page.goto("https://library2.cydeo.com");

  // create locator variable named usernameInput and use this xpath // //input[@id='inputEmail']
  const usernameInput = await page.locator("//input[@id='inputEmail']");

  // create locator variable named passwordInput and use this xpath //input[@id='inputPassword'] to locate
  const passwordInput = await page.locator("//input[@id='inputPassword']");

  // create locator variable named signInButton and use this xpath //button[@type='submit'] to locate
  const signInButton = await page.locator("//button[@type='submit']");

  // pause the automation for 2 seconds
  await page.waitForTimeout(2000);  

  // type 'admin' into the usernameInput
  await usernameInput.fill("librarian10@library");

  // type 'password' into the passwordInput
  await passwordInput.fill("libraryUser");

  // click on the signInButton
  await signInButton.click();

  // wait for 2 seconds
  await page.waitForTimeout(2000);




  
});
