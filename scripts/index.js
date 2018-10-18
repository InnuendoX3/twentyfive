const chooseOne      = document.getElementById('choose-one');
const chooseThree    = document.getElementById('choose-three');
const chooseFive     = document.getElementById('choose-five');
const tablaCompleta  = document.getElementById('tabla-completa');
const askGames       = document.getElementById('ask-boards-div');
const siguiente = document.getElementById('siguiente');
const roundResult          = document.getElementById('round-result');
const totalResult          = document.getElementById('total-result');
const resultDiv            = document.getElementById('result-div');
const startGameDiv         = document.getElementById('start-game-div');
const startButton          = document.getElementById('start-button');
const pieTabla             = document.getElementById('pie-tabla');
const indicadorTablaActual = document.getElementById('tabla-actual');
const playAgainButton      = document.getElementById('again-button');

chooseOne.addEventListener('click', oneGame);
chooseThree.addEventListener('click', threeGames);
chooseFive.addEventListener('click', fiveGames);
startButton.addEventListener('click', inicializador);
startButton.addEventListener('click', hideStartGameDiv);
playAgainButton.addEventListener('click', showAskGames);
playAgainButton.addEventListener('click', initValues);



//startButton.addEventListener('click', showPieTabla);

var counter;
var timer;
var totalGames;
var actualGame;
var isIntervalRunning;
var lastTimes;
var timePerTable = [];

window.onload = function() {
   initValues();
}

function initValues() {
   counter = 1;
   lastTimes = 0;
   siguiente.innerHTML = 'Next: ' + counter;
   //Reset Times values
   perTable = 0;
   perTableString = '';
   timePerTable = [];

   hideTable();
   hideResults();
   hideStartGameDiv();
   hidePieTabla();
   hidePlayAgainButton();
   hideResults();
}

/*
   Click Listener for each button of the table
   Kind of copy from a video https://www.youtube.com/watch?v=ZniVgo8U7ek
*/
const buttonsList = document.querySelectorAll('.button-table');
for(var i of buttonsList){
   i.addEventListener('click', playing);
}

function oneGame() {
   //initValues();
   showTable();
   hideAskGames();
   totalGames = 1;
   actualGame = 1;
   resetTimer();
   isIntervalRunning = false;
   showStartGameDiv();
}

function threeGames() {
   //initValues();
   showTable();
   hideAskGames();
   totalGames = 3;
   actualGame = 1;
   resetTimer();
   isIntervalRunning = false;
   showStartGameDiv();
}

function fiveGames() {
   //initValues();
   showTable();
   hideAskGames();
   totalGames = 5;
   actualGame = 1;
   resetTimer();
   isIntervalRunning = false;
   showStartGameDiv();
}

function inicializador() {
   showPieTabla();
   counter = 1;
   siguiente.innerHTML = 'Next: ' + counter;
   indicadorTablaActual.innerHTML = 'Board No. ' + actualGame + ' of ' + totalGames;
   putNumbers();
   if(!isIntervalRunning){
      timer = setInterval(setTime, 100);
      isIntervalRunning = true;
   }
}


/*Put random numbers on table*/
function putNumbers(){
   var buttonsST =  ['b01','b02','b03','b04','b05',
                     'b06','b07','b08','b09','b10',
                     'b11','b12','b13','b14','b15',
                     'b16','b17','b18','b19','b20',
                     'b21','b22','b23','b24','b25'];
   var random25 = getRandom25();
   for(var i=0; i<25; i++){
      document.getElementById(buttonsST[i]).innerHTML = random25[i];
      document.getElementById(buttonsST[i]).value = random25[i];
   }
}

function getRandom25() {
   var nums = [ 1, 2, 3, 4, 5,
                6, 7, 8, 9,10,
               11,12,13,14,15,
               16,17,18,19,20,
               21,22,23,24,25];
   var azar = 0;
   var temp = 0;
   /*Mix 5 times the regular mix*/
   for(var i=0; i<5; i++){
      for(var j=0; j<25; j++){
         azar = Math.floor(Math.random() * 25); /*1-25*/
         temp = nums[j];
         nums[j] = nums[azar];
         nums[azar] = temp;
      }
   }
   return nums;
}

function eraseBoard(){
   var buttonsST =  ['b01','b02','b03','b04','b05',
                     'b06','b07','b08','b09','b10',
                     'b11','b12','b13','b14','b15',
                     'b16','b17','b18','b19','b20',
                     'b21','b22','b23','b24','b25'];
   for(var i=0; i<25; i++){
      document.getElementById(buttonsST[i]).innerHTML = '';
      document.getElementById(buttonsST[i]).value = 0;
   }
}

function playing(){
   //alert('Counter: ' + counter);
   var actualButton = this;
   var numberCliked = actualButton.value;
   siguiente.classList.remove('blinkito');
   //Numero correcto
   if(numberCliked == counter){
      counter++;
      //Ask if table not complete and add to counter
      if(counter <= 25) {
         siguiente.innerHTML = 'Next: ' + counter;
      }
      else {
         saveTimePerTable();
         //Ultima tabla?
         if(isLastGame()){
            gameFinished();
         }
         //Nueva Tabla
         else {
            actualGame++;
            inicializador();
         }
      }
   }
   //Numero incorrecto y evita blinkito despues del terminado
   else if(counter <= 25){
      siguiente.classList.add('blinkito');
   }
}

function isLastGame() {
   return actualGame == totalGames;
}


var minutesLabel = document.getElementById('minutes');
var secondsLabel = document.getElementById('seconds');
var decisecondsLabel = document.getElementById('deciseconds');
var totalDeciSeconds = 0;

function setTime() {
  ++totalDeciSeconds;
  decisecondsLabel.innerHTML = totalDeciSeconds % 10;
  secondsLabel.innerHTML = pad(parseInt(totalDeciSeconds / 10) % 60);
  minutesLabel.innerHTML = pad(parseInt(totalDeciSeconds / 600));
}

//Ambiguo --- borrar?
/*function getTime(dec) {
   totalDeciSeconds;
   var dSec = totalDeciSeconds % 10;
   var sec = pad(parseInt(totalDeciSeconds / 10) % 60);
   var min = pad(parseInt(totalDeciSeconds / 600));
   return min + ":" + sec + "." + dSec;
}*/

//Convert deciseconds to time format
function convertToTime(toConvert) {
   var dSec = toConvert % 10;
   var sec = pad(parseInt(toConvert / 10) % 60);
   var min = pad(parseInt(toConvert / 600));
   var timeFormat = min + ':' + sec + '.' + dSec;
   return timeFormat;
}

function pad(val) {
  var valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  } else {
    return valString;
  }
}

function clearIntervalTimer() {
   clearInterval(timer);
}

function resetTimer() {
   clearIntervalTimer();
   decisecondsLabel.innerHTML = 0;
   secondsLabel.innerHTML = pad(0);
   minutesLabel.innerHTML = pad(0);
   totalDeciSeconds = 0;
}

function showTable() {
   tablaCompleta.style.display = 'block';
}

function hideTable() {
   tablaCompleta.style.display = 'none';
}

function showAskGames() {
   askGames.style.display = 'block';
}

function hideAskGames() {
   askGames.style.display = 'none';
}

function showResults() {
   resultDiv.style.display = 'block';
}

function hideResults() {
   resultDiv.style.display = 'none';
}

function showStartGameDiv() {
   startGameDiv.style.display = 'block';
}

function hideStartGameDiv() {
   startGameDiv.style.display = 'none';
}

function showPieTabla() {
   pieTabla.style.display = 'block';
}

function hidePieTabla() {
   pieTabla.style.display = 'none';
}

function showPlayAgainButton() {
   playAgainButton.style.display = 'inline';
}

function hidePlayAgainButton() {
   playAgainButton.style.display = 'none';
}

var perTable = 0;

function saveTimePerTable() {
   perTable = totalDeciSeconds - lastTimes;
   timePerTable.push(perTable);
   lastTimes += perTable; //Tiempos de tablas anteriores
   RoundResults();
}

var perTableString = '';
function RoundResults() {
   perTableString += 'Board No.' + actualGame + ' time: '  + convertToTime(timePerTable[actualGame - 1]) + '<br>';
   roundResult.innerHTML = perTableString;
}

function TotalResult() {
   totalResult.innerHTML = 'Total Time: ' + convertToTime(totalDeciSeconds);
}
function gameFinished() {
   siguiente.classList.remove('blinkito'); //Borrar...mirar
   clearIntervalTimer();
   TotalResult();
   hideTable();
   showResults();
   showPlayAgainButton();
   eraseBoard();
}
