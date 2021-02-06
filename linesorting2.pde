// RGB variables
int red, green, blue;

// Number of lines
int numLines = 10;

// Array for ordered x positions (eg. 100, 200, 300...)
int[] xPoses = new int[numLines + 1];

// Int list for ordered blue amount in RGB, determining the yellow hue (eg. 26, 52, etc)
IntList colourArr = new IntList();
IntList colourArrSorting = new IntList();


// Array for lines
Line[] lines;

// Control for randomising colours & sorting lines
int shuffle = 0;

int d;
IntList indexes = new IntList();
int indexCount;

// Buttons x and y positions
int randButtonX, randButtonY, randButtonW, randButtonH;
int sortButtonX, sortButtonY, sortButtonW, sortButtonH;


void setup() {
 // Set background colour 
 background(0);
 // Set canvas size
 size(1200, 1600);
 
 // Section for buttons
 fill(50);
 rect(0, 0, width, 200); 
 
 // Populate xPoses for lines
 for (int x = 0; x < 11; x++) {
  xPoses[x] = x*100 + 100;
 }
 println(xPoses);

 // Initialise lines array
 lines = new Line[11];
 
   // Populate colour array for the yellow in lines
 for (int y = 0; y < 11; y++) {
  colourArr.append(y*26);
 }
 println(colourArr);
 
    // Populate copy colour array for the yellow in lines
 for (int y = 0; y < 11; y++) {
  colourArrSorting.append(y*26);
 }
 println(colourArrSorting);
 
}



void draw() {
displayButtons();


    

  // Populate and display ordered line array
if (shuffle != 2) {
 for (int z = 0; z < 11; z++) {
 lines[z] = new Line(xPoses[z], colourArr.get(z));
 lines[z].display();
  }
 }
 
 if (shuffle == 2) {
   println(indexes);
   background(0);
   displayButtons();
   
   for (int t = 0; t  < 11; t++) {
     
     
    if (indexes.get(t) < 0) {
     
     if (lines[t].xPos > xPoses[t+indexes.get(t)]) {
      lines[t].xPos -= 3; 
    } }
      
     else if (indexes.get(t) > 0) {
    
       if (lines[t].xPos < xPoses[t+indexes.get(t)]) {
      lines[t].xPos += 3; } 
  
    }
     

 lines[t].display();
 }
 }
}
 
class Line {
  
 int xPos, yPos, blue, red, green;
 
 Line (int x, int b) {
  this.xPos = x;
  this.blue = b;
 }
 
 void display() {
   this.red = 190;
   this.green = 95;
   strokeWeight(5);
   stroke(this.red, this.green, this.blue);
   line(xPos, yPos+200, xPos, height);
}

}

 void colourShuffle() {
  println("pressed shuffle");
 
  colourArr.shuffle();
  println(colourArr);
  indexes.clear();
  shuffle = 1;
}

void colourSort() {
 background(0);
// Calculate distance between the current position of the coloured line in relation to where it needs to be in the sorted order. Get the difference of indexes and save it in an int list.
if (indexes.size() < 10 && shuffle != 2) {
for (int m = 0; m < 11; m++) {
  d = colourArr.get(m) - colourArrSorting.get(m);
  indexCount = floor((d/26));
  indexes.append(indexCount);
}
// Execute sorting inside draw function
  shuffle = 2;
}

}


void mousePressed() {
  
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
 
void displayButtons() {
// randomise button
randButtonX = 260; randButtonY = 70; randButtonW = 250; randButtonH = 90;
fill(80);
stroke(255);
strokeWeight(3);
rect(randButtonX, randButtonY, randButtonW, randButtonH);
textSize(35);
fill(255);
text("Randomise", randButtonX+30, randButtonY+55);

// sort button
sortButtonX = 690; sortButtonY = 70; sortButtonW = 250; sortButtonH = 90;
fill(80);
rect(sortButtonX, sortButtonY, sortButtonW, sortButtonH);
textSize(35);
fill(255);
text("Sort!", sortButtonX+80, sortButtonY+55);

 // Button cursor change

if (mouseX >= randButtonX && mouseX < randButtonX + randButtonW && mouseY >= randButtonY && mouseY < randButtonY + randButtonH) {
  cursor(HAND);
   } else if (mouseX >= sortButtonX && mouseX < sortButtonX + sortButtonW && mouseY >= sortButtonY && mouseY < sortButtonY + sortButtonH) {
     cursor(HAND); }
       else {
   cursor(ARROW);
   }
}
