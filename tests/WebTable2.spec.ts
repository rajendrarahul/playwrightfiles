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

    //4) Content from a entire table excluding the header

    const allData = await row.all(); //Get all row locators // all() returns array of locators
    for(let data of allData.slice(1)){ // --> skip the header
        const cellData:string[] = await data.locator('td').allInnerTexts();
        console.log(cellData.join('\t'));
    }

    //5) Content from a entire table  
    const allData1 = await row.allInnerTexts();

    for(let data1 of allData1){
        //const cellData1:string[] = await data1.allInnerTexts();
        console.log(data1);
    }

    //6) Print book names where author is Mukesh

    const bookName = [];
    for(let data2 of allData.slice(1)){ // --> skip the header
        const cellData2 = await data2.locator('td').allInnerTexts();
        const author = cellData2[1];
        const book = cellData2[0];

        if(author === 'Mukesh'){
            console.log(`${author} ---> ${book}`)
            bookName.push(book);
        }
    }
    console.log(bookName);
    expect(bookName).toHaveLength(2); //Assertion

    //7) Calculate the total price of all books
    let totalPrice:number = 0; //Initializing totalPrice
    for(let data2 of allData.slice(1)){ // --> skip the header
        const cellData2 = await data2.locator('td').allInnerTexts();
        const bookPrice = cellData2[3];
        totalPrice+=parseInt(bookPrice);
    }
    console.log(`The total price of all books are ${totalPrice} `);
    expect(totalPrice).toBe(7100);

    


})