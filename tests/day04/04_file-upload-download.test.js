import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("File upload and download", () => {
    const uploadDir = path.join(__dirname, "upload");
    const downloadDir = path.join(__dirname, "download");

    test.beforeEach(async ({ page }) => {
        await page.goto("https://practice.cydeo.com/");
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(2000);
    });

    test("File Upload Test", async ({ page }) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const uploadFilePath = path.join(uploadDir, "Upload File.txt");
        if (!fs.existsSync(uploadFilePath)) {
            fs.writeFileSync(uploadFilePath, "Generated by Playwright.");
        }

        await page.click("text='File Upload'");
        await expect(page).toHaveURL("https://practice.cydeo.com/upload");

        await page.setInputFiles("//input[@id='file-upload']", uploadFilePath);
        await page.click("//input[@id='file-submit']");
        await expect(page.getByText("Upload File.txt")).toBeVisible();
    });

    test("File Download Test - file.txt", async ({ page }) => {
        await page.click("text='File Download'");
        await expect(page).toHaveURL("https://practice.cydeo.com/download");

        await page.waitForSelector("a[href='download/file.txt']");

        const downloadPromise = page.waitForEvent("download");
        await page.click("a[href='download/file.txt']");
        const download = await downloadPromise;

        expect(download.suggestedFilename()).toBe("file.txt");
    });

    test("Save Downloaded File - file.txt", async ({ page }) => {
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
        }

        await page.click("text='File Download'");
        await expect(page).toHaveURL("https://practice.cydeo.com/download");
        await page.waitForSelector("a[href='download/file.txt']");

        const downloadPromise = page.waitForEvent("download");
        await page.click("a[href='download/file.txt']");
        const download = await downloadPromise;

        const filename = download.suggestedFilename();
        const filePath = path.join(downloadDir, filename);
        await download.saveAs(filePath);

        expect(fs.existsSync(filePath)).toBe(true);
    });
});