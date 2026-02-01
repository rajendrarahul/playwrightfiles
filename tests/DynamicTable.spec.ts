import{test,expect,Locator} from '@playwright/test'

test('Dynamic Table',async({page}) =>{

    await page.setViewportSize({height:1080,width:1920})
    await page.goto('https://practice.expandtesting.com/dynamic-table');

    //Find all the rows and number of rows

    const table:Locator = page.locator('//*[@class="table table-striped"]/tbody');
    expect(table).toBeVisible(); //Assertion for the table

    const rows:Locator[] = await table.locator('tr').all();
    console.log('The number of rows in the table is ', rows.length);
    expect(rows).toHaveLength(4) //Assertion for the number of rows.

    //Step 1: For chrome process get the value of CPU load
    
    //Read each row and check for the presence of chrome.

    let cpuload = ''; //Creating the variable here inorder to access this outside the for loop also. 
    // The variable created inside the for loop can be accessed inside the for loop only.
    for(let row of rows){
        const processName:string = await row.locator('td').nth(0).innerText();
        if(processName === 'Chrome'){

            cpuload = await row.locator("td",{hasText:'%'}).innerText(); // const cpuLoad:string = await row.locator('td:has-text("%")').innerText()
            console.log('CPU Load of the chrome is ', cpuload); 
            break;   // As soon as we got the cpuload value break the loop. 
        }
    }

    //Step2: Compare the CPU load value with the value in the Yellow box

    let yellowBoxValue:string = await page.locator("#chrome-cpu").innerText(); //Getting the text in the yellow box
    console.log('The yellow box description is ', yellowBoxValue);
    if(yellowBoxValue.includes(cpuload)){       // Checking whether the cpuLoad percentage is present in the text got from yellowbox. For that used 'includes()'
        console.log('The value in CPU load value in yellow box is equal to chrome cpu load.');
    }
    else{
        console.log('The value in CPU load value in yellow box is not equal to chrome cpu load.');
    }

    await page.waitForTimeout(5000);
})