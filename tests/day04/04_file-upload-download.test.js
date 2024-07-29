
import { test, expect } from "@playwright/test";
import path from "path";
const fs = require('fs');


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
    // Create a download directory if it doesn't exist
    const uploadDir = path.join(__dirname, 'upload');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // // Create a "Upload File.txt" file in the upload directory if it doesn't exist
    // const uploadFilePath = path.join(uploadDir, 'Upload File.txt');
    // if (!fs.existsSync(uploadFilePath)) {
    //   fs.writeFileSync(uploadFilePath, ''); // Create an empty file or add content here
    // }


    // Create a "Upload File.txt" file in the upload directory if it doesn't exist
    const uploadFilePath = path.join(uploadDir, 'Upload File.txt');
    if (!fs.existsSync(uploadFilePath)) {
      // Create an empty file or add content here
      fs.writeFileSync(uploadFilePath, 'This file generated automatically1');
    } else {
      // Update the file with the specified content
      // fs.writeFileSync(uploadFilePath, 'This file generated automatically2');
    }


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
    const downloadPromise = page.waitForEvent("download"); // promise is created: pending promise

    await page.click("text='File Download'");
    expect(page.url()).toBe("https://practice.cydeo.com/download");

    page.click("//a[@href='download/Sesson3.txt']");

    const download = await downloadPromise; // promise is either full filled or rejected
    expect(download.suggestedFilename()).toBe("Sesson3.txt");

  });

  test("Save the file that's downloaded", async ({ page }) => {

    const downloadPromise = page.waitForEvent("download"); // promise is created: pending promise

    await page.click("text='File Download'"); 

    expect(page.url()).toBe("https://practice.cydeo.com/download");

    page.click("//a[@href='download/Sesson3.txt']"); // click the file to download

    const download = await downloadPromise; // promise is either full filled or rejected

    expect(download.suggestedFilename()).toBe("Sesson3.txt");


    //   save the  downloaded file: 
    const downloadPath= path.join(__dirname, "download", download.suggestedFilename() );
    await download.saveAs(downloadPath);


  });

  test("Save the file that's downloaded 2", async ({ page }) => {
    // Create a download directory if it doesn't exist
    const downloadDir = path.join(__dirname, 'download');
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir);
    }

    // Set listener for download event
    const downloadPromise = page.waitForEvent('download');

    // Trigger file download
    await page.click('text="File Download"');
    expect(page.url()).toBe('https://practice.cydeo.com/download');

    await page.click("//a[@href='download/Sesson3.txt']");

    // Wait for the download to complete
    const download = await downloadPromise;

    // Get the suggested filename
    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toBe('Sesson3.txt');

    // Save the file to the downloads folder
    const downloadPath = path.join(downloadDir, suggestedFilename);
    await download.saveAs(downloadPath);

    // Optionally, you can add further assertions or checks here
    expect(fs.existsSync(downloadPath)).toBe(true);
  });

  
});
