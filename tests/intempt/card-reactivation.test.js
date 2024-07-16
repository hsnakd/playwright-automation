import { test } from '@playwright/test';

test('Card Reactivation', async ({ page }) => {
  // Go to website
  await page.goto('https://app.intempt.com/');

  // Login
  await page.locator('#email1').fill('bolam74153@apn7.com');
  await page.locator('#password').fill('Welcome$1234');
  await page.locator('#login').click();


  // Click Journeys
  await page.locator("a[href='/journeys']").click();


  // Click create journey
  await page.locator("//p[@class='intempt-color-white intempt-font-b1' and contains(., 'Create journey')]").click();


  // Click create a journey
  await page.locator(".intempt-text--b1.intempt-text--primary-blue.ma-0").click();


  // Enter journey name here
  const journeyName = 'hakdogan - Card Reactivation Automation';
  await page.locator("//input[@placeholder='Enter journey name here' and @type='text']").fill(journeyName);

  // Click Create journey button
  await page.locator("//p[@class='intempt-text--b1 intempt-text--white ma-0']").click();

  await page.waitForTimeout(5000);


  
  // Get the page dimensions
  const { width, height } = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
  
  // Calculate the target coordinates
  const targetX = width / 3;
  const targetY = height / 3;
  
  // Get the element to be dragged
  const dragElement = await page.$("(//p[normalize-space()='On condition'])[1]");

  // Perform the drag and drop action
  await dragElement.hover();
  await page.mouse.down();
  await page.mouse.move(targetX, targetY);
  await page.mouse.up();


  // Birinci drag and drop işlemi
await performDragAndDrop(page, "(//p[normalize-space()='Send email'])[1]", 33, 25);

// İkinci drag and drop işlemi
await performDragAndDrop(page, "(//div[@class='transformersDrawer__body__transformerType__transformer'])[13]", 66, 75);

// İkinci drag and drop işlemi
await performDragAndDrop(page, "(//p[normalize-space()='Send Slack notification'])[1]", 70, 80);
  await page.waitForTimeout(5000);




  // // Delete journey
  // await page.goto('https://app.intempt.com/journeys');
  // await page.locator(`//td[@class='text-start tableCellClass' and contains(., '${journeyName}')]`).click();
  // await page.locator("(//p[@class='intempt-color-red intempt-font-b1'])[1]").click;
  // await page.locator("//input[@id='input-1701']").fill(journeyName);
  // await page.locator("//p[@class='intempt-text--b1 intempt-text--white ma-0']").click();

  async function performDragAndDrop(page, sourceSelector, targetX, targetY) {
    // Get the source element
    const sourceElement = await page.$(sourceSelector);
  
    // Get the page dimensions
    const { width, height } = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  
    // Calculate the target coordinates
    const targetXCoord = (targetX / 100) * width;
    const targetYCoord = (targetY / 100) * height;
  
    // Perform the drag and drop action
    await sourceElement.hover();
    await page.mouse.down();
    await page.mouse.move(targetXCoord, targetYCoord);
    await page.mouse.up();
  }
});