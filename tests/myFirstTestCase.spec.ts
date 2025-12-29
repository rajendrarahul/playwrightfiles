import{test,expect} from '@playwright/test';

test('My First Test',async({page})=>{
    await page.goto('http://way2Automation.com');
    await page.setViewportSize({width:1920,height:1080});
    const title = await page.title();
    console.log(title);
    await expect(title.toLowerCase()).toContain('way2automatio');

    await page.goto('https://gmail.com/');
    await page.getByLabel('Email or phone').fill('rahulrvk87@gmail.com');
    await page.waitForTimeout(1000);
    await page.locator('#identifierNext > div > button > span').click();
    await page.waitForTimeout(1000);
    await page.goBack();
    await page.waitForTimeout(2000);
    await page.goForward();
    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(2000);
    const url = await page.url();
    console.log(url);
    await page.waitForTimeout(2000);

}) 