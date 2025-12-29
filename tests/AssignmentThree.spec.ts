import{test,expect} from '@playwright/test'

test('CheckBox Assignment', async({page}) =>{

    //Maximize the Window
    await page.setViewportSize({width:1920,height:1080});
    //Open the webpage in the browser
    await page.goto('http://www.tizag.com/htmlT/htmlcheckboxes.php');
    await page.waitForTimeout(3000);
    //1. Check all the checkboxes in the 'HTML Pre-selected Checkboxes' section.
    const block1 = page.locator('(//div[@class="display"])[2]');
    const checkBoxes1 = await block1.locator('//input[@name="sports"]');
    const checkBoxCount1 = await checkBoxes1.count();
    console.log(checkBoxCount1);
    for(let i=0;i<checkBoxCount1;i++){
        //Before selecting each checkbox, checking they are already checked or not.
        if(!(await checkBoxes1.nth(i).isChecked())){
            await checkBoxes1.nth(i).click();
        }   
        await page.waitForTimeout(1000);
        //Fetching the label text for each checkboxes.
        const label = await checkBoxes1.nth(i).getAttribute('value');
        console.log(`${i}. checkbox label ----> ${label}`);

    }

    //2. Check any two random checkboxes in the 'HTML Checkbox form' section.

    const block2 = page.locator('//tbody//tr//div[4]');
    const checkBoxes2 = await block2.locator('//input[@name="sports"]');
    const checkBoxCount2 = await checkBoxes2.count();

    //Use a Set to store unique random indexes
    const randomIndexes = new Set<number>();
    //Generating random indexes and adding it in the Set.
    while(randomIndexes.size < 2){
        const randomIndex = Math.floor(Math.random()*checkBoxCount2);
        randomIndexes.add(randomIndex);
    }
    //Checking 2 random checkboxes
    for(const index of randomIndexes){
        await checkBoxes2.nth(index).check();
        await page.waitForTimeout(1000);
    }
    //Fetching the label text for each checkboxes.
    for(let j=0;j<checkBoxCount2;j++){
        const label2 = await checkBoxes2.nth(j).getAttribute('value');
        console.log(`${j}. checkbox label ----> ${label2}`);

    }

}
)