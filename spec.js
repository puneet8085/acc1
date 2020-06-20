const { element } = require("protractor");

describe("verify user data", function(){
  it('must run',function(){
    browser.sleep(8000);
    const val = {"fName":"1","lName":"2","Email":"sid@gmail.com","Password":"A@1212@2"};
    // var data = "./data.json";
    // var val = JSON.parse(data);
    val.then(function(text){
      console.log(text);
      
    })
    
    element(by.id('fName')).sendKeys("sid");
    element(by.id('lName')).sendKeys(val[0][key]);
    element(by.id('Email')).sendKeys(val[0][key]);
    element(by.id('Password')).sendKeys(val[0][key]);
    browser.sleep(2000);
    // element(by.tagName('button')).click();
    browser.sleep(1000);
  })
    
    it('validation should be equal', function(){
      expect(element(by.id('d1')).getText()).toEqual("Please enter data in required/requested format!");
      expect(element(by.id('d2')).getText()).toEqual("Please enter data in required/requested format!");
      expect(element(by.id('d3')).getText()).toEqual("Please enter data in required/requested format!");
      expect(element(by.id('d4')).getText()).toEqual("Please enter data in required/requested format!");
    })
  })