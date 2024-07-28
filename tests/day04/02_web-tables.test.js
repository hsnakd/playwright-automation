import { test, expect } from "@playwright/test";

//create a test group with 3 tests in it
test.describe("Web Tables", async () => {
  let table, rows, columns, headers;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/web-tables");
    table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");


    rows = table.locator("//tr");
    columns = table.locator("//th");
  });

  // after reach, pause the automation for 2 seconds
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test("Verify rows and columns in the web table", async ({ page }) => {
    expect(await rows.count()).toEqual(9);
    expect(await columns.count()).toEqual(13);
  });



  test('Read all data from the web table', async ({ page }) => {
    // create a for loop to iterate each row only
    for (let i = 1; i < await rows.count(); i++) {
        const eachRow = rows.nth(i);
        const cells = eachRow.locator("td");
        
    // create a for loop to iterate each cell only
        for (let j = 0; j < await cells.count()-1; j++) {
            const eachCell = cells.nth(j);
            const cellText = await eachCell.innerText();
            console.log(cellText);
        }
        console.log("-------------------------------------");

    }
  });

  test("Read all data from the web table AI version", async ({ page }) => {
    // display data from each cell of the table
    for (let i = 1; i < (await rows.count()); i++) {
      for (let j = 0; j < (await columns.count()) - 1; j++) {
        const cell = table.locator(`//tr[${i + 1}]/td[${j + 1}]`);
        console.log(await cell.innerText());
      }
      console.log("-------------------------------------");
    }

  });


  test("Verify that check boxes of the web table can be checked", async ({ page }) => {
    const checkBoxes = table.locator("//input[@type='checkbox']");

    // verify that there are 8 check boxes
    expect(await checkBoxes.count()).toEqual(8);

    // use for of loop to access each checkbox
    for (const checkbox of await checkBoxes.all()) {
        await page.waitForTimeout(2000);
        expect(await checkbox.isChecked()).toBeFalsy();  // verify that checkbox is unchecked
        await checkbox.check();
        expect(await checkbox.isChecked()).toBeTruthy(); // verify that checkbox is checked
    }

  });


  test('Click the checkboxes of the specific name', async ({ page }) => {
    // Define the specific name
    const specificName = 'Ned Stark';

    // Locate the row containing the specific name
    const rowLocator = page.locator(`//tr[td[text()='${specificName}']]`);

    // Locate the checkbox within the specific row
    const checkboxLocator = rowLocator.locator("input[type='checkbox']");

    // Click the checkbox
    await checkboxLocator.check();

    // Verify that the checkbox has been checked
    const isChecked = await checkboxLocator.isChecked();
    expect(isChecked).toBe(true);
  });


  test('Click the edit button for the specific name', async ({ page }) => {

    // Define the specific name
    const specificName = 'Ned Stark';
  
    // Locate the row containing the specific name
    const rowLocator = page.locator(`//tr[td[contains(text(), '${specificName}')]]`);
  
    // Locate the "Edit" button within the specific row
    const editButtonLocator = rowLocator.locator('a:has-text("Edit")');
  
    // Click the "Edit" button
    await editButtonLocator.click();
  
    // You can add additional assertions or actions here if needed
    await page.waitForTimeout(5000);

  });

  test('Print all info of the specific name dynamically', async ({ page }) => {
    const specificName = 'Ned Stark';

    // Locate the row containing the specific name
    const rowLocator = page.locator(`//tr[td[contains(text(), '${specificName}')]]`);
    const cells = rowLocator.locator('td');

    // Start from the second cell because the first cell is for checkboxes
    for (let i = 1; i < await cells.count(); i++) {
      const cellText = await cells.nth(i).innerText();
      console.log(cellText);
    }
  });

  test('Print all info of the specific name dynamically with headers', async ({ page }) => {


    // Get headers from the table
    headers = [];
    const headerCells = table.locator('th');
    for (let i = 1; i < await headerCells.count(); i++) {
      headers.push(await headerCells.nth(i).innerText());
    }

    const specificName = 'Ned Stark';

    // Locate the row containing the specific name
    const rowLocator = page.locator(`//tr[td[contains(text(), '${specificName}')]]`);
    const cells = rowLocator.locator('td');

    // Start from the second cell because the first cell is for checkboxes
    for (let i = 1; i < headers.length + 1; i++) {
      const cellText = await cells.nth(i).innerText();
      console.log(`${headers[i - 1]}: ${cellText}`);
    }
  });
});





