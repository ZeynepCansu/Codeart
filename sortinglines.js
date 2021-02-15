// Variable for canvas
let canvas, height, width;

// RGB variables
let red, green, blue, xPos, yPos;

// Number of lines
let numLines = 10;

// Array for ordered x positions (eg. 100, 200, 300...)
let xPoses = [];

// Array for ordered blue amount in RGB, determining the yellow hue (eg. 26, 52, etc)
let colourArr = [];
let colourArrSorting = [];


// Array for lines
let lines = [];

// Control for randomising colours & sorting lines
let shuffle = 0;

let d;
let indexes = [];
let indexCount;

// Buttons x and y positions
let randButtonX, randButtonY, randButtonW, randButtonH;
let sortButtonX, sortButtonY, sortButtonW, sortButtonH;


function setup() {

 // Create canvas
width = 660;
 height = 600;
 canvas =  createCanvas(width, height);
canvas.parent('#body');
 // Set background colour 
 background(0);

 yPos = 75;


 
 // Populate xPoses for lines
 for (let x = 0; x < 10; x++) {
  xPoses[x] = x*60 + 60;
 }
 console.log(xPoses);

   // Populate colour array for the yellow in lines
 for (let y = 0; y < 10; y++) {
  colourArr.push(y*26);
 }
 console.log(colourArr);
 
    // Populate copy colour array for the yellow in lines
 for (let y = 0; y < 10; y++) {
  colourArrSorting.push(y*26);
 }
console.log(colourArrSorting);
 
}



function draw() {
displayButtons();

    

  // Populate and display ordered line array
if (shuffle != 2) {
  displayButtons();
 for (let z = 0; z < 11; z++) {
 lines[z] = new Line(xPoses[z], colourArr[z]);
 lines[z].display();
  }
 }
 
 if (shuffle == 2) {
   console.log(indexes);
   background(0, 50);
   displayButtons();
   
   for (let t = 0; t  < 11; t++) {
     
     
    if (indexes[t] < 0) {
     
     if (lines[t].xPos > xPoses[t+indexes[t]]) {
      lines[t].xPos -= 3; 
    } }
      
     else if (indexes[t] > 0) {
    
       if (lines[t].xPos < xPoses[t+indexes[t]]) {
      lines[t].xPos += 3; } 
  
    }
     

 lines[t].display();
 }
 }
}
 
class Line {
  
constructor(xPos, blue) {
  this.xPos = xPos;
  this.blue = blue;
 }
 
 display() {
   this.red = 190;
   this.green = 95;
   strokeWeight(4);
   stroke(this.red, this.green, this.blue);
   line(this.xPos, yPos, this.xPos, height);
}

}

function shuffleArray(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

 function colourShuffle() {
  console.log("pressed shuffle");
 shuffleArray(colourArr);
  console.log(colourArr);
  indexes = [];
  shuffle = 1;
}

function colourSort() {
 background(0);
// Calculate distance between the current position of the coloured line in relation to where it needs to be in the sorted order. Get the difference of indexes and save it in an array.
if (indexes.length < 10 && shuffle != 2) {
for (let m = 0; m < 11; m++) {
  d = colourArr[m] - colourArrSorting[m];
  indexCount = floor((d/26));
  indexes.push(indexCount);
}
// Execute sorting inside draw function
  shuffle = 2;
}

}


function mousePressed() {
  
// Check mouse position to determine if randomise button is pressed
 if (mouseX >= randButtonX && mouseX < randButtonX + randButtonW) {
   if (mouseY >= randButtonY && mouseY < randButtonY + randButtonH) {
 colourShuffle();
 shuffle = 1;
 }
 }
 
 // Check mouse position to determine if sort button is pressed
 if (mouseX >= sortButtonX && mouseX < sortButtonX + sortButtonW) {
   if (mouseY >= sortButtonY && mouseY < sortButtonY + sortButtonH) {
colourSort();


   }
}

 }


 
 // Display buttons and set cursor rule
 
function displayButtons() {
 // Section for buttons
 fill(0);
 noStroke();
 rect(0, 0, width-20, 70); 

// randomise button
randButtonX = width/4+60; randButtonY = 20; randButtonW = 80; randButtonH = 30;
fill(80);
stroke(170);
strokeWeight(2);
rect(randButtonX, randButtonY, randButtonW, randButtonH);
noStroke();
textSize(14);
fill(200);
text("Randomise", randButtonX+5, randButtonY+20);

// sort button
sortButtonX = width/2+20; sortButtonY = 20; sortButtonW = 80; sortButtonH = 30;
fill(80);
stroke(170);
strokeWeight(2);
rect(sortButtonX, sortButtonY, sortButtonW, sortButtonH);
noStroke();
textSize(17);
fill(200);
text("Sort!", sortButtonX+18, sortButtonY+22);

 // Button cursor change

if (mouseX >= randButtonX && mouseX < randButtonX + randButtonW && mouseY >= randButtonY && mouseY < randButtonY + randButtonH) {
  cursor(HAND);
   } else if (mouseX >= sortButtonX && mouseX < sortButtonX + sortButtonW && mouseY >= sortButtonY && mouseY < sortButtonY + sortButtonH) {
     cursor(HAND); }
       else {
   cursor(ARROW);
   }
}
