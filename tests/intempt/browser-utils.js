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




  