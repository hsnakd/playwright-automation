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

  /** Drag and drop elements */ 
    // "On condition" drag and drop 
  await performDragAndDrop(page, "(//p[normalize-space()='On condition'])[1]", 25, 15);
  await page.waitForTimeout(1000);

    // "Send email" drag and drop 
  await performDragAndDrop(page, "(//p[normalize-space()='Send email'])[1]", 35, 25);
  await page.waitForTimeout(1000);

    // "Delay" drag and drop 
  await performDragAndDrop(page, "(//div[@class='transformersDrawer__body__transformerType__transformer'])[13]", 45, 35);
  await page.waitForTimeout(1000);

    // "Send Slack notification" drag and drop 
  await performDragAndDrop(page, "(//p[normalize-space()='Send Slack notification'])[1]", 55, 45);
  await page.waitForTimeout(1000);

  /** Configure the Journeys blocks */
    
    // Configure the ON CONDITION notification 
  await page.locator("(//div[@class='align-stretch d-flex flex-column flex-grow-1 justify-start pa-4']//p[contains(text(),'ON CONDITION')])[1]").dblclick();

  await page.locator("//input[starts-with(@id, 'input-') and @placeholder='Select an attribute']").click();
  await page.locator("//p[@class='intempt-font-p2'][normalize-space()='Email']").click();
  await page.locator("//input[starts-with(@id, 'input-') and @placeholder='Select an operator']").click();
  await page.locator("//div[starts-with(@id, 'list-item-') and @role='menuitem' and text()=' has any value ']").click();
  
  await page.locator("//p[@class='intempt-color-black intempt-font-h5' and text()=' Include users that already matched the conditions ']/ancestor::div[contains(@class, 'v-sheet') and contains(@class, 'rounded-lg')]").click();

  await page.locator("//div[contains(@class, 'v-sheet') and contains(@class, 'rounded-lg')]//p[@class='intempt-color-black intempt-font-h5' and text()=' Multiple ']/ancestor::div[contains(@class, 'v-radio')]").click();

  await page.locator("//button[.//p[text()=' Save ']]").click;
  await page.waitForTimeout(5000);

  // Combine the Jouneys blocks
  

  // Delete journey
  // deleteJourney(journeyName);
































  /** performDragAndDrop function */
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


 



 /** Delete journey function */ 
 async function deleteJourney(journeyName) {
  await page.goto('https://app.intempt.com/journeys');

  await page.locator("//td[@class='text-start tableCellClass' and contains(text(), 'hakdogan - Card Reactivation Automation')]").hover;

  await page.locator("//tr[contains(td[@class='text-start tableCellClass'], 'hakdogan - Card Reactivation Automation')]//button").click();
  await page.getByText('Delete').click();
  await page.getByPlaceholder('Enter journey name here').fill(journeyName);
  await page.locator(".intempt-text--b1.intempt-text--white.ma-0").click();


  //await page.getByRole('cell', { name: 'icon' }).getByRole('button').click();  // 3dot

  //await page.getByRole('button', { name: 'Delete journey' }).click(); // delete
}

  



});