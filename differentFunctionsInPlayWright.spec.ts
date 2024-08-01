import { expect, test } from '@playwright/test';

test('Select dropdwon, radiobuttons, Checkbox, Assert attribute', async ({ page }) => {
    await page.goto(`https://rahulshettyacademy.com/loginpagePractise/`);
    const documentLink = page.locator("a[href*='documents-request']");
    await page.locator('#username').fill('sg.nathi08@gmail.com');
    await page.fill('#password', 'Test@123');
    await page.locator('select.form-control').selectOption('Teacher');
    await page.locator('.radiotextsty').last().click(); //click last element from list of element
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck(); //to uncheck the checkbox
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
})

test.only('Handle child windows, tabs', async ({ browser }) => {
const context = await browser.newContext();
const page = await context.newPage();

    await page.goto(`https://rahulshettyacademy.com/loginpagePractise/`);
    const documentLink = page.locator("a[href*='documents-request']");
    await page.locator('#username').fill('sg.nathi08@gmail.com');

    const [childPage]=await Promise.all(  //return type will be array
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ]
    )

    const text =await childPage.locator('.red').textContent();
    console.log(text);
    const arrayText = text?.split('@');
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').textContent());
})



test('Playwright special locators', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click(); // this will clicks the button or checkbox near to label but input the data is not recommended
    await page.getByLabel('Employed').check(); // check perfoms same function as click in chebox or radiobutton
    await page.getByLabel('Gender').selectOption('Male'); //select option can be used only if select tag presents
    await page.getByPlaceholder('Password').fill('Test@123');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('The Form has been submitted successfully!').click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click();

    /**
     * Playwright npx test Ui helps in debugging. command : npx playwright test --ui
     */
})

test('Pratice forward, backward, hidden functions', async ({ page }) => {
    page.goto(`https://rahulshettyacademy.com/AutomationPractice/`);
    page.goto('www.google.com');
    page.goBack();
    page.goForward();

    //hidden
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
})

test('Automate Java/Javascript Alert popups, Mouse hover', async ({ page }) => {

    await page.goto(`https://rahulshettyacademy.com/AutomationPractice/`);

    //'on' method will help us to listen for events so it will emit when that even occured
    //accept

    /**will wait for event to occur (i.e dialog) and perform immediately. so here accepst is written in first line and click in next line */
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();


    //dismiss --> page.on('dialog', dialog => dialog.dismiss());
    // await page.locator('#confirmbtn').click();

    await page.locator('#mousehover').hover();
})

test('Automate iframes', async ({ page }) => {

    await page.goto(`https://rahulshettyacademy.com/AutomationPractice/`);

    //if tag name has frame or iframe or frameset. frame name or frame id is perfect to choose
    const framePages = page.frameLocator('#courses-iframe'); //returns framelocator
    await framePages.locator('li a[href*="lifetime-access"]:visible').click() //':visible' is used to excelude hidden element and returns only visible element
    const textCheck = await framePages.locator('.text h2').textContent();
    console.log(textCheck?.split(" ")[1]);
})