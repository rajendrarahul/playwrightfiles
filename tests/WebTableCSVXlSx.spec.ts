import{test,expect} from '@playwright/test'
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

test('Extract WebTable CSV XLSX',async({page})=>{

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
    //---------------------Extracting all the table data int array of arrays---------------
    let tableData:string[][] = [];
    for(let r=1;r<=rowCount;r++){
        let rowData:string[] = [];
        for(let c=1;c<=colCount;c++){
            const cell = page.locator(`//*[@id="form:j_idt89_data"]/tr[${r}]/td[${c}]`);
            const cellValue = (await cell.innerText()).trim();
            rowData.push(cellValue);
        }
        tableData.push(rowData);
    }
    console.log('Extracted table data');
    console.table(tableData);

    //--------Save table to CSV---------

    const dir = path.join('data');
    //Ensure the directory exists
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const csvData = tableData.map(row=>row.join(',')).join('\n');
    const csvPath = path.join(dir,'tableData.csv');
    fs.writeFileSync(csvPath,csvData);
    console.log(`CSV saved at ${csvPath}`);

    //--------Save table to XLXS---------

    const sheet = XLSX.utils.aoa_to_sheet(tableData);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book,sheet,'Customers');
    const xlsxPath = path.join(dir,'tableData.xlsx');
    XLSX.writeFile(book,xlsxPath);
    console.log(`Excel is saved at ${xlsxPath} `);

})