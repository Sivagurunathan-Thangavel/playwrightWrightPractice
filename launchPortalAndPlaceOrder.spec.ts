import { expect,test } from '@playwright/test'

test('launch browser and place the order', async ({ page }) => {

    const productName = 'ADIDAS ORIGINAL';
    const email = 'sg.nathi08@gmail.com';
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('sg.nathi08@gmail.com');
    await page.locator('#userPassword').fill('Test@123');
    await expect(page.locator('.blink_me')).toContainText('Register to sign in with your personal account');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.locator("div[class='card-body']").first().waitFor();
    const products = page.locator("div[class='card-body']");
    const productCount = await products.count();
    console.log(`The product count is ${productCount}`);


    for (let product = 0; product < productCount; product++) {
        if (await products.nth(product).locator('b').textContent() === productName) {
            await products.nth(product).locator("//button[normalize-space()='Add To Cart']").click();
            break;
        }
    }

    //await expect(page.locator('.ng-tns-c4-4.ng-star-inserted.ng-trigger.ng-trigger-flyInOut.ngx-toastr.toast-success')).toBeVisible();
    await page.locator('button[routerlink="/dashboard/cart"]').click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("//button[normalize-space()='Checkout']").click();
    await expect(page.locator("[class*='user__name'] label[type='text']")).toHaveText(email);
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();

    for (let i = 0; i < optionsCount; ++i) {
        const country = await dropdown.locator('button').nth(i).textContent();
        if (country?.trim() === 'India') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    await page.locator(".action__submit").click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    console.log(await page.locator(".em-spacer-1 [class='ng-star-inserted']").textContent());



    //    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    //    console.log(orderId);
    //    await page.locator("button[routerlink*='myorders']").click();
    //    await page.locator("tbody").waitFor();
    //    const rows = await page.locator("tbody tr");


    //    for (let i = 0; i < await rows.count(); ++i) {
    //       const rowOrderId = await rows.nth(i).locator("th").textContent();
    //       if (orderId?.includes(rowOrderId)) {
    //          await rows.nth(i).locator("button").first().click();
    //          break;
    //       }
    //    }
    //    const orderIdDetails = await page.locator(".col-text").textContent();
    //    expect(orderId.includes(orderIdDetails)).toBeTruthy();



    // const dropdownOptions = dropdown.locator('button');
    // for (const dropdownOption in dropdownOptions) {
    //     const country = await dropdownOptions[dropdownOption].textContent();
    //     if (country?.trim() === 'India') {
    //         await dropdownOptions[dropdownOption].click();
    //         break;
    //     }
    // }

})

test('Calender automation', async ({ page }) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();
    const inputs = page.locator(".react-date-picker__inputGroup input");
    const inputsCount = await inputs.count();
    for (let index = 0; index < inputsCount; index++) {
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
})