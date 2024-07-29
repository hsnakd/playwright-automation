import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { request } from 'https';

test.describe('PDF Download Test', () => {
  test('Save the PDF file that\'s downloaded', async ({ page }) => {
    // Create a download directory if it doesn't exist
    const downloadDir = path.join(__dirname, 'downloads');
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir);
    }

    const url = 'https://www.hakdogan.com/doc/HASAN_AKDOGAN_RESUME.pdf';
    const downloadPath = path.join(downloadDir, 'HASAN_AKDOGAN_RESUME.pdf');

    // Make HTTP request to download the PDF file
    const file = fs.createWriteStream(downloadPath);
    const response = await new Promise((resolve, reject) => {
      request(url, response => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(response);
        });
      }).on('error', reject).end();
    });

    // Validate the response
    expect(response.statusCode).toBe(200);
    expect(fs.existsSync(downloadPath)).toBe(true);
  });
});
