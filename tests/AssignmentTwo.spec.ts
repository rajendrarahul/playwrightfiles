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
    await page.waitForTimeout(2000);
    await page.locator('//*[@id="fromCity"]').click();
    await page.waitForTimeout(2000);
    //await page.locator('//input[@placeholder="From"]').click();
    await page.locator('//*[@id="top-banner"]/div[2]/div/div/div/div/div/div[2]/div[1]/div[1]/div[1]/div/div/div/input').click();
    await page.waitForTimeout(2000);
    /*await page.locator('//p[normalize-space()="Dubai International"]').click();
    await page.waitForTimeout(2000);*/
})