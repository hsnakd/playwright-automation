import { test, expect } from "@playwright/test";

test.describe("Mouse Actions", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
  });

  // after each, pause the automation for 2 seconds
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test("Left click test", async ({ page }) => {
    await page.click("//a[@href='/inputs']");
    expect(await page.title()).toBe("Inputs");
  });

  test("Right click test", async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.click("//a[@href='/inputs']", { button: "right" });
  });

  test("Double click test", async ({ page }) => {
    await page.dblclick("text='A/B Testing'");
    expect(page.url()).toBe("https://practice.cydeo.com/abtest");
  });

  test("Double Click Practice-2", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/add_remove_elements/");
    //button[contains(text(),'Add Element')]
    await page.dblclick("//button[text()='Add Element']");
    await expect(
      page.locator("//button[contains(text(),'Delete')]")
    ).toHaveCount(2);
  });

  test("Mouse Hover Test", async ({ page }) => {
    await page.click("text='Hovers'");
    await page.waitForTimeout(2000);
    await page.hover("(//img[@src='/img/avatar-blank.jpg' and @alt='User Avatar'])[2]");
    await expect(page.locator("text='name: user2'")).toBeVisible();
    expect(await page.locator("text='name: user2'").innerText()).toBe("name: user2");
  });

  test("Hover to Multiple Test", async ({ page }) => {
    await page.click("text='Hovers'");

    const elements = page.locator(
      "//img[@src='/img/avatar-blank.jpg' and @alt='User Avatar']"
    );

    const invisibleElements = page.locator("//h5");

    // create a for of loop that can iterate each element of the elements
    for (const each_element of await elements.all()) {
      await page.waitForTimeout(2000);
      await each_element.hover();
    }
  });

  test("Drag and Drop test", async ({ page }) => {
    await page.click("text='Drag and Drop'");


    const draggableElement0 = page.locator("//div[@class='column' and @draggable='true']");
    for (let i = 0; i < await draggableElement0.count(); i++) {
      const text = await draggableElement0.nth(i).innerText();
      console.log(text);
    }

    await page.waitForTimeout(1000);

    // dragAndDrop
    // simulating mouse action: drag and drop
    page.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']");

    await page.waitForTimeout(1000);

    const draggableElement1 = page.locator("//div[@class='column' and @draggable='true']");
    for (let i = 0; i < await draggableElement1.count(); i++) {
      const text = await draggableElement1.nth(i).innerText();
      console.log(text);
    }


    // dragTo
    // drag and drop is performed on web elements directly
    const source_element = page.locator("//div[@id='column-a']");
    const target_element = page.locator("//div[@id='column-b']");
    await source_element.dragTo(target_element);
    await page.waitForTimeout(1000);

    const draggableElement = page.locator("//div[@class='column' and @draggable='true']");

    for (let i = 0; i < await draggableElement.count(); i++) {
      const text = await draggableElement.nth(i).innerText();
      console.log(text);
    }
  });


  test("Mouse Wheel Scrolling Test", async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.mouse.wheel(0, 500);
  
    await page.waitForTimeout(1000);
    await page.mouse.wheel(0, -500);
  });
  
  test("Different Scrolling Test", async ({ page }) => {
    await page.waitForTimeout(1000);
    const inputLink = page.locator("text='Inputs'");
    await inputLink.scrollIntoViewIfNeeded(true);

    await page.waitForTimeout(1000);
  });



});