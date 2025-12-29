import{test,expect} from '@playwright/test'

test('WebTable',async({page})=>{

    //Maximize the Window
    await page.setViewportSize({width:1920,height:1080});
    //Open the webpage in the browser
    await page.goto('https://www.leafground.com/table.xhtml');
    
    //Extracting the rows (<tr>) and getting its count. 
    const rowCount = await page.locator('//*[@id="form:j_idt89_data"]/tr').count();
    console.log('The number of rows in the webtable is '+rowCount);
    //Extracting the columns (<td>) and getting its count.
    const colCount = await page.locator('//*[@id="form:j_idt89_data"]/tr[1]/td').count();
    console.log('The number of columns in the webtables is '+colCount);
    //Getting the single cell value- first cell value.
    const text = await page.locator('//*[@id="form:j_idt89_data"]/tr[1]/td[1]').innerText();
    console.log(text);
    //Getting all table rows at once.
    const allTexts = await page.locator('//*[@id="form:j_idt89_data"]/tr').allInnerTexts();
    //Printing each row.
    for(const textcon of allTexts){
        console.log(textcon);
    }

})