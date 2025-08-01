import { test } from '@playwright/test';

test("InnerText Method Test", async ({ page }) => {
  // go to https://practice.cydeo.com/
  await page.goto("https://practice.cydeo.com/");

  const abTesting = await page.locator("text='A/B Testing'");
  //const abTesting = await page.getByText("text='A/B Testing'");

  await abTesting.click();

  await page.waitForTimeout(1000);

  const paragraph = await page.locator("//p[contains(text(), 'Also known as split testing')]");

  const innerText = await paragraph.innerText();

  console.log(innerText);

});



test('inputValue method test: only works with <input> or <textarea> or <select>', async ({ page }) => {
    
  // go to https://practice.cydeo.com/inputs   
  await page.goto('https://practice.cydeo.com/inputs');

  // create a locator variable named inputBox with the xpath //input[@type='number']
  const inputBox = await page.locator("//input[@type='number']");

  await inputBox.fill("1200");

  await page.waitForTimeout(3000);

  const inputValue = await inputBox.inputValue();

  console.log(inputValue);


});


test('getAttribute method test: can get the value of an attribute of the element', async ({ page }) => {
  await page.goto('https://practice.cydeo.com/inputs');

  const cydeo = await page.locator("text='CYDEO'");

  const elementLink = await cydeo.getAttribute("href");
  console.log(`Element's link:  ${elementLink}`);

  const target = await cydeo.getAttribute("target");
  console.log(`Target:  ${target}`);

  const text = await cydeo.innerText();
  console.log(`Text:  ${text}`);

});


/*
<a target="_blank" href="https://cydeo.com/">CYDEO</a>
*/