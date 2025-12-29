import{test,expect} from '@playwright/test'

test('CheckBox Handling', async({page}) =>{

    await page.setViewportSize({width:1920,height:1080});
    await page.goto('http://www.tizag.com/htmlT/htmlcheckboxes.php');
    const block1 = page.locator('//tbody//tr//div[4]');
    const checkBoxes = await block1.locator('//input[@name="sports"]');
    const checkBoxCount = await checkBoxes.count();
    console.log(checkBoxCount);
    for(let i=0;i<checkBoxCount;i++){
        await checkBoxes.nth(i).click();
        const label = await checkBoxes.nth(i).getAttribute('value');
        console.log(`${i}. checkbox label ----> ${label}`);

    }
   /*console.log(checkBoxes.length);
   for(const checkBox of checkBoxes) {
    await checkBox.click();
    const text = await checkBox.innerText();
    console.log(`The text of the check is ${text}`)

   }*/

})