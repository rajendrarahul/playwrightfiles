import{test,expect,Locator} from '@playwright/test'

test('Web Table Static', async({page})=>{
    await page.setViewportSize({width:1920,height:1080});
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator('//*[@name="BookTable"] /tbody')

    //1) Count of the rows in the table.

    const row:Locator= table.locator('tr');
    const rowCount:number = await row.count();
    console.log(`The number of rows is ${rowCount}`);
    expect(rowCount).toBe(7);

    //2) Count of the columns in the table.

    const col:Locator = row.locator('th');
    const colCount:number = await col.count();
    console.log(`The number of columns is ${colCount}`);
    expect(colCount).toBe(4);

    //3) Content from a specific row

    //const rowCells: Locator= row.nth(2).locator('td');
    const rowTexts: string[] = await (row.nth(2).locator('td')).allInnerTexts();
    console.log('The second row text is', rowTexts);

})