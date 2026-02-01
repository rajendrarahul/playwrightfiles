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