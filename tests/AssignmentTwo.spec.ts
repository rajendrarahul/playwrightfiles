//Got to https://www.makemytrip.com/
//Click on from field and fill the values from dropdwon.

import{test,expect} from '@playwright/test'

test ('Make My Trip', async({page})=> {
    await page.goto('https://www.makemytrip.global/?cc=uk');
    await page.setViewportSize({'width':1920,'height':1080});
    const acceptBtn = page.locator('//button[@class="cookiesModal__acceptCookiesBtn buttonCls btn__primary uppercase"]')
    if(await acceptBtn.isVisible()){
        await acceptBtn.click();
    }
    await page.locator('//span[normalize-space()="From"]').click();
    await page.waitForTimeout(2000);
    await page.locator('//input[@placeholder="From"]').click();
    await page.locator('//input[@placeholder="From"]').fill('Dubai');
    await page.waitForTimeout(2000);
    await page.locator('//p[normalize-space()="Dubai International"]').click();
    await page.waitForTimeout(2000);
})