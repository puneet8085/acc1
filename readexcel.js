// var json2xlsx = require('json2xlsx');
const xlsx=require("xlsx");
const fs = require("fs");
const { browser } = require("protractor");
var jsonarray;
var workbook;
var sheet;
var specificdataofrow;

describe('read data from excel', function(){
    it('should read the data', function () { 
        // always declare file location to below variable.
        var fileaddress="./userData.xlsx";
        //method to convert excel data into JSon and return that json 
        function exceltojson(filepath)
        {
         workbook=xlsx.readFile(filepath)
         sheet= workbook.Sheets["Sheet1"];
        // convert data into json object
        var data=xlsx.utils.sheet_to_json(sheet);
        return data;
        }
        //method to return json object having data of a particular row of excel
        function ReturnSpecificRowDataInJsonFormat(rowno,addressOfFile)
        {   addressOfFile=fileaddress;
        //calling method which convert excel data into Json  by passing excel path and storing in a variable
         jsonarray = exceltojson(addressOfFile)
         var index = [];
         for (var x in jsonarray) {
            index.push(x);
         }
             return jsonarray[index[rowno]]
         }
         
         
         //return json object of given row. Note : row index start from 0 inplace of 1 
         //so if you want to print 6th row data in json format then in below line you need to pass row no as 5
         specificdataofrow= ReturnSpecificRowDataInJsonFormat(0)
            
            browser.sleep(2000);
            element(by.id('id1')).sendKeys(specificdataofrow["fName"]);
            element(by.id('id2')).sendKeys(specificdataofrow["lName"]);
            element(by.id('id3')).sendKeys(specificdataofrow["Email"]);
            element(by.id('id4')).sendKeys(specificdataofrow["Password"]);
            browser.sleep(1000);
            element(by.className('btn btn-primary btn-block')).click();

            browser.sleep(9000)


  element(by.id('d1')).isDisplayed().then(function(flag)
            {
                if(flag==true)
                {
                         
                   expect(element(by.id('d1')).getText()).toEqual("Please enter data in required/requested format!");
                 
                   specificdataofrow.error1="fName-Please enter data in required/requested format!"
                  }
                 
                  
    console.log(specificdataofrow)

                          
            })

            element(by.id('d2')).isDisplayed().then(function(flag)
            {
                if(flag==true)
                {
                         
                   expect(element(by.id('d2')).getText()).toEqual("Please enter data in required/requested format!");
                 
                   specificdataofrow.error2="lName-Please enter data in required/requested format!"
                  }
                  
                  
    console.log(specificdataofrow)
    
   
              //code to write back json array into new worksheet

//calling method which write back into same excel after appending a new sheet
var writetoexcel=jsonToExcel()

//method to write back into same excel.
function jsonToExcel()
{
   let  number=    Math.floor((Math.random() * 100000) + 10000);

 //pass your json object in "json to sheet method" as i pass data to log error in sheet
 sheet=xlsx.utils.json_to_sheet(jsonarray)


 xlsx.utils.book_append_sheet(workbook,sheet,`StatusSheet${number}`);


//sheet in which you want to write
xlsx.writeFile(workbook,fileaddress)

}
            
            })




}) 
     
}) 
