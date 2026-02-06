import{test,expect,Locator} from '@playwright/test'

test('Read all data from all pages',async({page})=>{

    await page.setViewportSize({width:1920,height:1080});
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

    let hasMorePages = true; //To check whether there are more pages, and can be used as a limit in the while loop.

    // Here using while loop since the limit (no: of pages) is unknown 
    while(hasMorePages){

        const rows= await page.locator('table[id="example"] tbody tr').all(); //Get all the rows
        for(let row of rows){
            let rowData = await row.innerText(); //Read each row data 
            console.log(rowData);
        }

        await page.waitForTimeout(3000);
        const nextButton:Locator = page.locator('button[aria-label="Next"]'); //Locate Next button 
        const isDisabled = await nextButton.getAttribute('class'); //Getting the attribut value inorder to check the presence of the text 'disabled'
        if(isDisabled?.includes('disabled')){ //The variable 'isDisabled' can return the string as well as a null value.(hence used ? mark to indicate the option)
            hasMorePages = false; //change the value as'false' inorder to exit the while loop upon the condition is met.
        }
        else{
            await nextButton.click(); //If Next button enabled, perform the click operation.
        }
    }
})

test('Filter Verification',async({page})=>{

    await page.setViewportSize({width:1920,height:1080});
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

    //Locate the dropdown element and select the filter value by label.
    const dropDown: Locator = await page.locator("#dt-length-0");
    await dropDown.selectOption({label:'50'});

    //Approach1: using .all() method

    const tableRows = await page.locator("#example tbody tr").all()
    expect(tableRows.length).toBe(50);

    //Approach2: without using .all() method, and use toHaveCount() assertion

    const tableRows2 = await page.locator("#example tbody tr")
    expect(tableRows2).toHaveCount(50);
})

test.only('Search Data',async({page})=>{

    await page.setViewportSize({width:1920,height:1080});
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

    //Locate the search box and enter the search text.
    await page.locator('#dt-search-0').fill('Soniya Frost');
    await page.waitForTimeout(5000);

    //After searching get all the rows with the search results.
    const Rows = await page.locator("#example tbody tr");
    const allrows = await Rows.all();
    const rowTexts = await Rows.allInnerTexts();
    //Checking for any empty record message. Better than checking for the number of rows displayed.
    //const isNotFound =  rowTexts.includes('No matching records found')
    const isNotFound = rowTexts.some(text => text.includes('No matching records found'))
    //Condition check for empty message presence.
    if(isNotFound){
        console.log('The record not found');  
    }
    else{
        let matchFound = false;
        for(let ro of allrows){
            const text = await ro.innerText();
            if(text.includes('Soniya Frost')) {
                console.log('The record exists');
                matchFound = true;
                break;
            }
        }
        //expect(matchFound).toBeTruthy(); 
        //expect(matchFound).toBe(true);

        
    }
})