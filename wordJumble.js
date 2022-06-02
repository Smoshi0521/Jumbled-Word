const startBox = document.getElementsByClassName("startbox_container");
const startbtn = document.getElementById("start_jumble");
const timerSection = document.getElementsByClassName("timer_section");
const gameSection = document.getElementsByClassName("game_section");
const timer = document.getElementById("timer");
const timeIsUp_container = document.getElementsByClassName("timeIsUp_container");
const timeIsUp =  document.getElementById("timeIsUp");
const homeButton = document.getElementById("homeBtn");

console.log(homeButton);
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
    if(fiveTime < 10){
      timer.style.animation = "blinkingBackground 2s infinite";
    }
    if(fiveTime < 0){
      timer.innerHTML = `0:00`;
      gameSection[0].style.opacity = 0.5; 
      timeIsUp_container[0].style.display = "flex";
      gameSection[0].style.animation = "fadeOut 4s";
    }
    if(fiveTime <= -5){
      fiveTime = 0;
      timeIsUp.style.top ="50px";
      timeIsUp.innerHTML = "Great Work!"
      homeButton.style.display = "block";
      gameSection[0].style.display = "none";
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
    if(tenTime < 10){
      timer.style.animation = "blinkingBackground 2s infinite";
    }
    if(tenTime < 0){
      timer.innerHTML = `0:00`;
      gameSection[0].style.opacity = 0.5; 
      timeIsUp_container[0].style.display = "flex";
      gameSection[0].style.animation = "fadeOut 4s";
    }
    if(tenTime <= -5){
      tenTime = 0;
      timeIsUp.style.top ="50px";
      timeIsUp.innerHTML = "Great Work!"
      homeButton.style.display = "block";
      gameSection[0].style.display = "none";
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
    if(fifteenTime < 10){
      timer.style.animation = "blinkingBackground 2s infinite";
    }
    if(fifteenTime < 0){
      timer.innerHTML = `0:00`;
      gameSection[0].style.opacity = 0.5; 
      timeIsUp_container[0].style.display = "flex";
      gameSection[0].style.animation = "fadeOut 4s";
    }
    if(fifteenTime <= -5){
      fifteenTime = 0;
      timeIsUp.style.top ="50px";
      timeIsUp.innerHTML = "Great Work!"
      homeButton.style.display = "block";
      gameSection[0].style.display = "none";
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

http.loadTextFile('6 character of words.txt', function(response){
//GamePage
  const sixWords = response.split(" ");
  var getRandomWords = sixWords[Math.floor(Math.random() * sixWords.length)];

  console.log(getRandomWords); // check for for correct answer
  var correctWord = [];
  var jumbledWord = [];
  var jbWordLastElement = 0;
  correctWord.push(getRandomWords);

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

  var jumbledWords = getJumbledWords(getRandomWords);
  var challenge = jumbledWords;
  var copyChallenge = challenge;
  var answerContainer = "      ";
  var index = 0;
  var goHere = false;

  function showChallenge(){
    document.getElementById("chg-a").innerHTML = challenge[0];
    document.getElementById("chg-b").innerHTML = challenge[1];
    document.getElementById("chg-c").innerHTML = challenge[2];
    document.getElementById("chg-d").innerHTML = challenge[3];
    document.getElementById("chg-e").innerHTML = challenge[4];
    document.getElementById("chg-f").innerHTML = challenge[5];
  }
  
  function showAnswer(){
    document.getElementById("ans-a").innerHTML = answerContainer[0];
    document.getElementById("ans-b").innerHTML = answerContainer[1];
    document.getElementById("ans-c").innerHTML = answerContainer[2];
    document.getElementById("ans-d").innerHTML = answerContainer[3];
    document.getElementById("ans-e").innerHTML = answerContainer[4];
    document.getElementById("ans-f").innerHTML = answerContainer[5];
  }
  showChallenge();
  document.addEventListener('keydown', logkey);

  function logkey(e){
    var score = document.getElementById("numOfScore");
    var guessWords = document.getElementById("numOfGuess");
    // var alrt = document.getElementById("alert");
    var numOfGuess = 0;
    var numOfScores = 0;
    const  {key}  = e;
    let letter = key.toLowerCase();

    if (letter === 'enter') {
      var realAnswer = "";
      for(let i = 0; i < answerContainer.length; i++){
        if(answerContainer[i] !== " "){
          realAnswer += answerContainer[i];
        }
      }

      if(correctWord.includes(realAnswer)){
        alert(`The word "${realAnswer}" is correct`);
        for(let i = 0; i <= correctWord.length-1; i++){ //Count for the scores and correct guess words
          let scoreToStr;
          let guessToStr;
          numOfScores = numOfScores + 150;
          numOfGuess = numOfGuess + 1;
          if(i === correctWord.length-1){
            scoreToStr = numOfScores.toString();
            guessToStr = numOfGuess.toString();
            score.innerHTML = scoreToStr;
            guessWords.innerHTML = guessToStr;
            break;
          }
        }
        
        getRandomWords = sixWords[Math.floor(Math.random() * sixWords.length)];
        console.log(getRandomWords);
        correctWord.push(getRandomWords);
        challenge = getJumbledWords(getRandomWords);
        jumbledWord.push(challenge);
        copyChallenge = challenge;
        answerContainer = "      ";
        index = 0;  
        jbWordLastElement++;
        goHere = true;
      }
      else if(realAnswer.length !== 6 && goHere === true){
        alert(`You need 6 character of word`);
        challenge = jumbledWord[jbWordLastElement-1];
        copyChallenge = challenge;
        answerContainer = "      ";
        index = 0;
      }
      else if(correctWord.includes(realAnswer) === false && goHere === true){
        alert(`"${realAnswer}" is not a word`);
        challenge = jumbledWord[jbWordLastElement-1];
        copyChallenge = challenge;
        answerContainer = "      ";
        index = 0;
      }
      else if(realAnswer.length !== 6 && goHere === false){
        alert(`You need 6 character of word`);
        challenge = jumbledWords;
        copyChallenge = challenge;
        answerContainer = "      ";
        index = 0;
      }
      else if(correctWord.includes(realAnswer) === false && goHere === false){
        alert(`"${realAnswer}" is not a word`);
        challenge = jumbledWords;
        copyChallenge = challenge;
        answerContainer = "      ";
        index = 0;
      }   
    }

    else if (challenge.includes(letter)) {
      let i = challenge.indexOf(letter);
      answerContainer = answerContainer.replace(answerContainer[index], challenge[i]);
      challenge = challenge.replace(challenge[i], " ");
      index++;
    }

    else if (letter === 'backspace' && answerContainer !== "      "){
      let numIndex;
      let indexArr = [];
      index--;
  
      String.prototype.replaceAt = function(ndex, replacement) {
        if (ndex >= challenge.length) {
          return this.valueOf();
        }
        return this.substring(0, ndex) + replacement + this.substring(ndex + 1);
      }

      for(let i = 0; i < answerContainer.length; i++){
        for(let j = answerContainer.length-1; j>-1 ;j--){
          if(answerContainer[i] === copyChallenge[j]){
            if(indexArr.includes(copyChallenge.indexOf(answerContainer[i]))){
              numIndex = copyChallenge.lastIndexOf(answerContainer[i]);
              break;
            }
            else{
              indexArr.push(copyChallenge.indexOf(answerContainer[i]));
              numIndex = copyChallenge.indexOf(answerContainer[i]);
              break;
            }
          }
        }
      }

      challenge = challenge.replaceAt(numIndex,answerContainer[index]);
      answerContainer = answerContainer.replaceAt(index," ");
      if(indexArr.length >= 6){
        indexArr = [];
      }  
   }

    showAnswer();
    showChallenge();
  }
});

