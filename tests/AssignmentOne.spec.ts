//Go to google.com, type way2automation, hit google search. 
//Get the total number of links in the page and print them

import {test,expect} from '@playwright/test'

test('Google Search', async({page}) => {

    await page.goto('https://www.google.com/ncr');
    await page.setViewportSize({width:1920,height:1080});
    const rejectbtn = await page.locator('#W0wltc')
    if(await rejectbtn.isVisible()){
        await rejectbtn.click();
    }
    await page.locator('#APjFqb').fill('way2automation');
    await page.waitForTimeout(5000);
    await page.locator('(//input[@name="btnK"])[1]').click();
    //await page.waitForTimeout(23000);
    //await page.locator('/html/body').click();
    const links = await page.locator('a').all();
    console.log('The total count of the links in the page is '+links.length)
    for(const link of links){
        const text = await link.innerText();
        const url = await link.getAttribute('href');
        console.log(`${text} -----------------> ${url}`);
    }

})