function myFunction() {
  var obj = {};
  var fName = document.getElementById("id1").value;
  var lName = document.getElementById("id2").value;
  var email = document.getElementById("id3").value;
  var pass = document.getElementById("id4").value;
  
  var valname = /^[a-zA-Z]+$/;
  var valemail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  var valpass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  var valmessage = "Please enter data in required/requested format!";

  if(fName==""||!valname.test(fName)){
    document.getElementById("d1").innerHTML = valmessage;
    document.getElementById("id1").style.borderColor = "red";
    obj["fName"] = valmessage;
  }
  if(lName==""||!valname.test(lName)){
    document.getElementById("d2").innerHTML = valmessage;
    document.getElementById("id2").style.borderColor = "red";
    obj["lName"] = valmessage;
  }
  if(email==""||!valemail.test(email)){
    document.getElementById("d3").innerHTML = valmessage;
    document.getElementById("id3").style.borderColor = "red";
    obj["Email"] = valmessage;
  }
  if(pass==""||!valpass.test(pass)){
    document.getElementById("d4").innerHTML = valmessage;
    document.getElementById("id4").style.borderColor = "red";
    obj["Password"] = valmessage;
  }
  // expect(element(by.id('d1')).getText()).toEqual("Please enter ata in required/requested format!");
  if(Object.keys(obj).length!=0){
    event.preventDefault();
    JSONToCSVConvertor(obj,"FormValidations",true); 
    return false;
  }
  else{
    JSONToCSVConvertor({"Pass":"All test cases are passed"},"FormValidations",true); 
  }
  }


// export {myFunction,enterDetails};
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  data[element.name] = element.value;
  return data;
}, {});
const handleFormSubmit = event => {
  // Stop the form from submitting since we’re handling that with AJAX.
  // event.preventDefault();
  var form = document.getElementById("form");
  // Call our function to get the form data.
  const data = formToJSON(form.elements);
  // console.log(JSON.stringify(data));
  
  // Demo only: print the form data onscreen as a formatted JSON object.
  // const dataContainer = document.getElementsByClassName('results__display')[0];
  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  // dataContainer.textContent = JSON.stringify(data, null, "  ");
  // ...this is where we’d actually do something with the form data...

};





function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
  //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  
  var CSV = '';    
  //Set Report title in first row or line
  
  CSV += ReportTitle + '\r\n\n';
  var res = [];
  res.push(arrData);
  
  //This condition will generate the Label/Header
  if (ShowLabel) {
      var row = "";
      
      //This loop will extract the label from 1st index of on array
      for (var index in res[0]) {
          //Now convert each value to string and comma-seprated
          row += index + ',';
      }
      
      row = row.slice(0, -1);  
      //append Label row with line break
      CSV += row + '\r\n';
  }
 
  
  //1st loop is to extract each row
  for (var i = 0; i < res.length; i++) {
      var row = "";
      
      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in res[i]) {
        
          row += '"' + res[i][index] + '",';
      }

      row.slice(0, row.length - 1);
      
      //add a line break after each row
      CSV += row + '\r\n';
  }

  if (CSV == '') {        
      alert("Invalid data");
      return;
  }   
  
  //Generate a file name
  var fileName = "./FormValidations";
  //this will remove the blank-spaces from the title and replace it with an underscore
  // fileName += ReportTitle.replace(/ /g,"_");   
  
  //Initialize file format you want csv or xls
  var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
  
  // Now the little tricky part.
  // you can use either>> window.open(uri);
  // but this will not work in some browsers
  // or you will not get the correct file extension    
  
  //this trick will generate a temp <a /> tag
  var link = document.createElement("a");    
  link.href = uri;
  
  //set the visibility hidden so it will not effect on your web-layout
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";
  
  //this part will append the anchor tag and remove it after automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}