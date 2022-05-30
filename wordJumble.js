const startBox = document.getElementsByClassName("startbox_container");
const startbtn = document.getElementById("start_jumble");
const timerSection = document.getElementsByClassName("timer_section");
const gameSection = document.getElementsByClassName("game_section");
var timer = document.getElementById("timer");
// FrontPage
function hideStartBox(){
    startBox[0].style.display = "none";
    timerSection[0].style.display = "block";  
}
function fiveMinsButton(){
  timerSection[0].style.display = "none";
  gameSection[0].style.display = "block"; 
  //timer
  let fiveMinutes = 5; 
  let fiveTime = fiveMinutes * 60;
  function fiveMinsCountdown (){  
    const minutes = Math.floor(fiveTime/60);
    let seconds = fiveTime % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timer.innerHTML = `${minutes}:${seconds}`;
    fiveTime--;
    if(fiveTime < 0){
      fiveTime = 0;
    }
  }
  setInterval(fiveMinsCountdown,1000);
  fiveMinsCountdown();
}
function tenMinsButton(){
  timerSection[0].style.display = "none";
  gameSection[0].style.display = "block"; 
   //timer
  let tenMinutes = 10; 
  let tenTime = tenMinutes * 60;
  function tenMinsCountdown (){  
    const minutes = Math.floor(tenTime/60);
    let seconds = tenTime % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timer.innerHTML = `${minutes}:${seconds}`;
    tenTime--;
    if(tenTime < 0){
      tenTime = 0;
    }
  }
  setInterval(tenMinsCountdown,1000);
  tenMinsCountdown();
}
function fifteenMinsButton(){
  timerSection[0].style.display = "none";
  gameSection[0].style.display = "block";  
   //timer
  let fifteenMinutes = 15; 
  let fifteenTime = fifteenMinutes * 60;
  function fifteenMinsCountdown (){  
    const minutes = Math.floor(fifteenTime/60);
    let seconds = fifteenTime % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timer.innerHTML = `${minutes}:${seconds}`;
    fifteenTime--;
    if(fifteenTime < 0){
      fifteenTime = 0;
    }
  }
  setInterval(fifteenMinsCountdown,1000);
  fifteenMinsCountdown();
}
//Read Text File
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

http.loadTextFile('6 words.txt', function(response){
//GamePage
  const sixWords = response.split(" ");
  const getRandomWords = sixWords[Math.floor(Math.random() * sixWords.length)];
  function getJumbledWords(randomWords){
    let arrayWords = randomWords.split("");
    let lastIndex = arrayWords.length-1;
    for(var i = lastIndex; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = arrayWords[i];
        arrayWords[i] = arrayWords[j];
        arrayWords[j] = tmp;
    }
    return arrayWords.join("");
  }
  console.log(getRandomWords);
  var jumbleWords = getJumbledWords(getRandomWords);
  var challenge = jumbleWords;
  var sameStr = challenge;
  var answer = "      ";
  var index = 0;

  function showChallenge(){
    document.getElementById("chg-a").innerHTML = challenge[0];
    document.getElementById("chg-b").innerHTML = challenge[1];
    document.getElementById("chg-c").innerHTML = challenge[2];
    document.getElementById("chg-d").innerHTML = challenge[3];
    document.getElementById("chg-e").innerHTML = challenge[4];
    document.getElementById("chg-f").innerHTML = challenge[5];
  }
  
  function showAnswer(){
    document.getElementById("ans-a").innerHTML = answer[0];
    document.getElementById("ans-b").innerHTML = answer[1];
    document.getElementById("ans-c").innerHTML = answer[2];
    document.getElementById("ans-d").innerHTML = answer[3];
    document.getElementById("ans-e").innerHTML = answer[4];
    document.getElementById("ans-f").innerHTML = answer[5];
  }
  showChallenge();
  document.addEventListener('keydown', logkey);
  
  function logkey(e){
    const  {key}  = e;
    let letter = key.toLowerCase();
    if (letter === 'enter') {
      var realAnswer = "";
      for(let i = 0; i < answer.length; i++){
        if(answer[i] !== " "){
          realAnswer += answer[i];
        }
      }
      if(sixWords.includes(realAnswer)){
          alert(`The word ${realAnswer} is correct!`);
      }
      else{
        alert(`The word ${realAnswer} is not a word`);
      }  
    }
    else if (challenge.includes(letter)) {
      let i = challenge.indexOf(letter);
      answer = answer.replace(answer[index], challenge[i]);
      challenge = challenge.replace(challenge[i], " ");
      index++;
    }
    else if (letter === 'backspace' && answer !== "      "){
      let ansIndex;
      let chgIndex;
      let numIndex;
      let arrLength;
      let indexArr = [];
      index--;
  
      String.prototype.replaceAt = function(ndex, replacement) {
        if (ndex >= challenge.length) {
          return this.valueOf();
        }
        return this.substring(0, ndex) + replacement + this.substring(ndex + 1);
      }
        for(let i = 0; i < answer.length; i++){
          for(let j = answer.length-1; j>-1 ;j--){
             if(answer[i] === sameStr[j]){
               if(indexArr.includes(sameStr.indexOf(answer[i]))){
                  numIndex = sameStr.lastIndexOf(answer[i]);
                  break;
               }
               else{
                indexArr.push(sameStr.indexOf(answer[i]));
                numIndex = sameStr.indexOf(answer[i]);
                break;
              }
            }
          }
        }
        challenge = challenge.replaceAt(numIndex,answer[index]);
        answer = answer.replaceAt(index," ");
        if(indexArr.length >= 6){
          indexArr = [];
        }  
   }
    showAnswer();
    showChallenge();
  }
  
});

