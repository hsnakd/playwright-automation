import { test } from '@playwright/test';
import dotenv from "dotenv";
dotenv.config("./.env");

test('Library Login', async ({ page }) => {
  // go to the "https://library2.cydeo.com"
  await page.goto(process.env.LIBRARY_URL);

  // create locator variable named usernameInput and use this xpath // //input[@id='inputEmail']
  const usernameInput = await page.locator("//input[@id='inputEmail']");

  // create locator variable named passwordInput and use this xpath //input[@id='inputPassword'] to locate
  const passwordInput = await page.locator("//input[@id='inputPassword']");

  // create locator variable named signinButton and use this xpath //button[@type='submit'] to locate
  const signinButton = await page.locator("//button[@type='submit']");

  // pause the automation for 2 seconds
  await page.waitForTimeout(2000);  

  // type 'admin' into the usernameInput
  await usernameInput.fill(process.env.LIBRARY_STUDENT_USERNAME);

  // type 'password' into the passwordInput
  await passwordInput.fill(process.env.LIBRARY_STUDENT_PASSWORD);

  // click on the signinButton
  await signinButton.click();

  // wait for 2 seconds
  await page.waitForTimeout(2000);




  
});