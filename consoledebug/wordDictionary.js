var http = {
  loadTextFile: function(path, callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("text");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
  }
};
http.loadTextFile('6 character of words.txt', function(response){
  let words = response.split("\n");
  var wordArray = [];
  var empty = " ";
  var getWord =  document.getElementById("arr").innerHTML = " ";
  for(let i = 0; i < words.length-1;i++){ 
    empty += words[i].toLowerCase();
  }
  document.getElementById("arr").innerHTML = empty;
});


