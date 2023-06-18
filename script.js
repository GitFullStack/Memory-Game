const gameContainer = document.getElementById("game");
let childrenArr = [];
let prev2ColorsArr = [];
let score = 0;
let currentObj;
let curObj_Index
let match = 0;
// const COLORS = [
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];

let COLORS = [];
function randomColorGenerator(){  
  let symbols = "0123456789ABCDE"; 
  let colorCode = '#';
  
  //A color consists of 6 symbols
  for(let i = 0; i< 6; i++){
    colorCode = colorCode + symbols[Math.floor(Math.random()*15)] //There are 15 symbols    
  }
  return colorCode; 
}
function randomQuantity(min, max){
   const radomNum = Math.random();
   const diff = max - min;
   const randomDiff = Math.round(radomNum*diff);
   const randomRange = randomDiff + min;
   return randomRange;
} 
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use clickedObj to see which element was clicked
  event.preventDefault();
  //console.log("you just clicked", clickedObj);
  currentObj = event.target;
  curObj_Index = childrenArr.indexOf(currentObj);
  currentObj.style.background = currentObj.className;

  if (prev2ColorsArr.length === 0 ) {
    prev2ColorsArr.push(currentObj);    
  } else if (prev2ColorsArr.length === 1) {
    if (curObj_Index !== childrenArr.indexOf(prev2ColorsArr[0])) {    
      if (currentObj.style.background === prev2ColorsArr[0].style.background) {         
        currentObj.removeEventListener("click", handleCardClick);
        prev2ColorsArr[0].removeEventListener("click", handleCardClick);
        prev2ColorsArr = []; 
        match++;    
        lowestScore.innerHTML = "Best-Time: " + match;
        if(match === COLORS.length/2){
          if(window.localStorage.length === 0 || score < localStorage.getItem("lowestScore") ){      
            window.localStorage.setItem("lowestScore", score);
          }
        }   
      }else {
        prev2ColorsArr.push(currentObj);   
        score++;    
        currentScore.innerHTML = "  SCORE:  " + score;
      }
    }
  } else if (prev2ColorsArr.length === 2) {
    if (curObj_Index !== childrenArr.indexOf(prev2ColorsArr[0]) && curObj_Index !== childrenArr.indexOf(prev2ColorsArr[1])) {
      prev2ColorsArr[0].style.background = 'white';      
      if (currentObj.style.background === prev2ColorsArr[1].style.background) {        
        currentObj.removeEventListener("click", handleCardClick);
        prev2ColorsArr[1].removeEventListener("click", handleCardClick);
        prev2ColorsArr = [];   
        match++;
        lowestScore.innerHTML = "Best-Time: " + match;
        if(match === COLORS.length/2){
          if(window.localStorage.length ===0 || score < localStorage.getItem("lowestScore") ){      
            window.localStorage.setItem("lowestScore", score);
          }
        }
       } else {  
        setTimeout(function(){
          prev2ColorsArr.shift();                
      }, 1000); 
        
        prev2ColorsArr.push(currentObj);  
        score++;  
        currentScore.innerHTML = "  SCORE:  " + score;    
      }
    }
  }
  
}

let record = window.localStorage.getItem('lowestScore');

const isInStorage = str => localStorage.getItem(str) !== null;

let lowestScore = document.querySelector('#lowestScore');
let currentScore = document.querySelector('#currentScore');

document.querySelector('body').addEventListener('click', function (e) { 
  if (e.target.id === 'start') {
    if(COLORS.length>0){      
      location.reload();
    }
    let halfOfArray = 0;
    let cardNum = randomQuantity(4,7);
    for(let i = 0; i< cardNum; i++){
      COLORS.push(randomColorGenerator());
    }
    halfOfArray = COLORS.length; 
    for (let i = 0; i< halfOfArray; i++){
      COLORS.push(COLORS[i]);
    }

    gameContainer.innerHTML = '';
    currentScore.innerHTML = '';
    createDivsForColors(shuffledColors);
    childrenArr = Array.from(gameContainer.children);    
    
  } else if (e.target.id === 'reStart') {    
     if(COLORS.length>0){      
      location.reload();
    }
    let halfOfArray = 0;
    let cardNum = randomQuantity(4,7);
    for(let i = 0; i< cardNum; i++){
      COLORS.push(randomColorGenerator());
    }
    halfOfArray = COLORS.length; 
    for (let i = 0; i< halfOfArray; i++){
      COLORS.push(COLORS[i]);
    }

    gameContainer.innerHTML = '';
    currentScore.innerHTML = '';
    createDivsForColors(shuffledColors);
    childrenArr = Array.from(gameContainer.children);    
  
  }
})
if(isInStorage('lowestScore')){
  lowestScore.innerHTML = "Best-Time: " + record;
}

// when the DOM loads
//createDivsForColors(shuffledColors);

