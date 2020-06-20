function enterDetails(i) {
  var flag = true;
  if(flag==false){
    document.write('<script type="text/undefined">');
  }
  else{
    var url = "./data.json";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      // var temp = xhr.responseText;
      // temp = temp.replace(/},/,"} ");
  
      // temp = temp.slice(1,-1)
      // var arr = temp.split(" ");
    
      const val = JSON.parse(xhr.responseText)
      const values = val[i]
      const keys = Object.keys(values)
      const length = keys.length
  
      for(let j = 0; j < length; j++){
          const key = keys[j]
          document.getElementsByName(key)[0].value = values[key]
      }
    }
    xhr.send();
  }
	
}