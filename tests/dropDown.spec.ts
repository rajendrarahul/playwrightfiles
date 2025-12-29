import{test,expect} from '@playwright/test'

test('Dropdown',async({page}) => {

    await page.goto('https://www.wikipedia.org/');
    await page.setViewportSize({width:1920,height:1080});
    await page.selectOption('#searchLanguage',{value:'sq'});
    await page.waitForTimeout(2000);
    await page.selectOption('#searchLanguage',{label:'Afrikaans'});
    await page.waitForTimeout(2000);
    await page.selectOption('#searchLanguage',{index:5});
    await page.waitForTimeout(2000);
    //Return all the values in the dropdown and its count.

    const drpOptions = await page.locator('option').all();
    console.log('The total number of options in the dropdown: '+drpOptions.length);
    //const options = await page.locator('option').allTextContents();
    //console.log(options);
    for(const option of drpOptions){
        const text = await option.innerText();
        const language = await option.getAttribute('lang');
        console.log(`${text} --------- ${language}`);
    }
})

test('Links In Block', async({page})=>{
    await page.goto('https://www.wikipedia.org/');
    await page.setViewportSize({width:1920,height:1080});
    await page.selectOption('#searchLanguage',{value:'sq'});
    await page.waitForTimeout(2000);
    const block = await page.locator('//*[@id="www-wikipedia-org"]/footer/nav');
    const links = await block.locator('a').all();
    for(const link of links){
        const text = await link.innerText();
        const url = await link.getAttribute('href');
        console.log(`${text} ----> ${url}`); 
    }
})