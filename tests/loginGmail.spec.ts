import{test,expect} from '@playwright/test';

test('Login Gmail', async({page})=>{

    await page.goto('https://gmail.com/');
    await page.getByLabel('Email or phone').fill('rahulrvk87@gmail.com');
    await page.waitForTimeout(1000);
    await page.locator('button').filter({hasText:'Next'}).click();
    await page.getByLabel('Enter your password',{exact:true}).fill('downtimeshuu');
    //#passwordNext > div > button > span
    await page.locator('button').filter({hasText:'Next'}).click();
})