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
  const journeyName = 'hakdoganCardReactivationAutomation';
  await page.locator("//input[@placeholder='Enter journey name here' and @type='text']").fill(journeyName);

  // Click Create journey button
  await page.locator("//p[@class='intempt-text--b1 intempt-text--white ma-0']").click();

  // await page.waitForTimeout(2000);

  

  /** Drag and drop elements */ 
    // "On condition" drag and drop 
  await page.waitForSelector("(//p[normalize-space()='On condition'])[1]");

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

  // /** Configure the Journeys blocks */
    
  //   // Configure the ON CONDITION block 
  // await page.locator("(//div[@class='align-stretch d-flex flex-column flex-grow-1 justify-start pa-4']//p[contains(text(),'ON CONDITION')])[1]").dblclick();
  // const onConditionExplaination = 'This block will trigger the workflow when card is due for reactivation';
  // await page.locator("(//*[@type='text'])[2]").fill(onConditionExplaination);
  // await page.locator("//input[starts-with(@id, 'input-') and @placeholder='Select an attribute']").click();
  // await page.locator("//p[@class='intempt-font-p2'][normalize-space()='Email']").click();
  // await page.locator("//input[starts-with(@id, 'input-') and @placeholder='Select an operator']").click();
  // await page.locator("//div[starts-with(@id, 'list-item-') and @role='menuitem' and text()=' has any value ']").click();
  // await page.locator("//p[@class='intempt-color-black intempt-font-h5' and text()=' Include users that already matched the conditions ']/ancestor::div[contains(@class, 'v-sheet') and contains(@class, 'rounded-lg')]").click();
  // await page.locator("//div[contains(@class, 'v-sheet') and contains(@class, 'rounded-lg')]//p[@class='intempt-color-black intempt-font-h5' and text()=' Multiple ']/ancestor::div[contains(@class, 'v-radio')]").click();
  // await page.locator("//button[.//p[text()=' Save ']]").click();

  //   // Configure the SEND EMAIL block 
  //   await page.locator("(//p[contains(@class, 'intempt-color-black') and contains(text(), 'Send email')])[1]").dblclick();
  //   const sendEmailExplaination = 'This block will trigger the workflow when card is due for reactivation';
  //   await page.locator("//*[@type='text' and @placeholder='Enter a name']").fill(sendEmailExplaination);
  //   await page.locator("//*[.=' testhop@mailinator.com ']").click();
  //   await page.locator("//*[@class='v-input__append-inner']").click();
  //   await page.locator("//*[contains(@class, 'listItem__primary') and . = ' hakdogan ']").click();
  //   await page.locator(`//input[@role='radio' and @type='radio' and @value='new-thread']`).click();
  //   await page.locator("//button[.//p[text()=' Save ']][1]").click();
  
  //   // Configure the DELAY block 
  //   await page.locator("(//p[contains(@class, 'intempt-color-black') and contains(text(), 'Delay')])[1]").dblclick();
  //   const delayExplaination = 'This block will provide a waiting period to give the user 7 days from the initial email to reactivate their card';
  //   await page.locator("//*[@type='text' and @placeholder='Enter a name']").fill(delayExplaination);
  //   await page.locator("//*[@type='text' and @placeholder='Set value']").fill("1");
  //   await page.locator("//*[@type='text' and @placeholder='Select an interval']").click();
  //   await page.locator("//p[text()=' Minutes ']").click();
  //   await page.locator("//p[text()=' Save ']").click();

  //   // Configure the SEND SLACK NOTIFICATION block 
  //   await page.locator("(//p[contains(@class, 'intempt-color-black') and contains(text(), 'Send Slack notification')])[1]").dblclick();    
  //   const sendSlackNotificationExplaination = 'Send a Slack notification to the support team if the card is reactivated within the waiting period';
  //   await page.locator("//*[@type='text' and @placeholder='Enter a name']").fill(sendSlackNotificationExplaination);
  //   await page.locator("(//*[@role='list' and contains(@class, 'v-list align-stretch')])[3]").click();
  //   await page.locator("//*[@type='text' and @placeholder='Select the @user or channel']").click();
  //   await page.locator("//div[p[text()=' Hasan Akdogan ']]").click();
  //   await page.locator("//*[@placeholder='Create your message']").fill("Card Reactivation");
  //   await page.locator("//button[.//p[text()=' Save ']]").click();

    /** Combine the BLOCKS */
    // Combine the ON CONDITION - SEND EMAIL blocks
                        
    await page.locator("(//*[@data-cell-id='onCondition-trigger-rwQf8GAHPJqzaq_Brxrfw' and @data-shape='vue-shape'])[1]").hover();
    

    await page.locator("(//*[@class='x6-port x6-port-trigger_output'])[2]").dragTo("(//*[@class='x6-port x6-port-action_input'])[2]");
    

  // Delete journey
  deleteJourney(journeyName);
































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

  await page.locator("//*[.='hakdoganCardReactivationAutomation']").hover();

  // Locate the row containing 'hakdoganCardReactivationAutomation'
  const row = await page.waitForSelector('//td[contains(text(), "hakdoganCardReactivationAutomation")]/parent::tr');

  // Find the button within the row using XPath
  const button = await row.$x('.//button[@type="button" and @aria-haspopup="true" and @aria-expanded="false"]');
  if (button.length > 0) {
      await button[0].click();
      console.log('Button clicked successfully.');
  } else {
      console.log('Button not found.');
  }


  await page.getByText('Delete').click();
  await page.getByPlaceholder('Enter journey name here').fill(journeyName);
  await page.locator(".intempt-text--b1.intempt-text--white.ma-0").click();


  //await page.getByRole('cell', { name: 'icon' }).getByRole('button').click();  // 3dot

  //await page.getByRole('button', { name: 'Delete journey' }).click(); // delete
}

  



});