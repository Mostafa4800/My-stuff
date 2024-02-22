// Initialize empty arrays to store idle, transition 1, transition 2, transition 3, and transition 4 animation frames
let idle = [];
let trans1 = [];
let trans2 = [];
let trans3 = [];
let trans4 = [];
let trans5 = [];

// Initialize variables to keep track of the current frame and image index
let iil1 = 0;
let iil2 = 0;
let iil3 = 0;
let iil4 = 0;
let iil5 = 0;
let currentFrame = 0;

// Set the width and height of the images
let imgWidth = 480;
let imgHeight = 640;

// Initialize a variable to keep track of the current animation mode
let m = 0;

function preload() {
  // Preload idle animation frames
  let idleImages = 25;
  for (let i = 0; i < idleImages; i++) {
    let path = 'Assets/Idle/idle' + (i + 1) + '.PNG';
    let loaded_image = loadImage(path);
    idle.push(loaded_image);
  }

  // Preload transition 1 animation frames
  let trans1Images = 22;
  for (let i = 0; i < trans1Images; i++) {
    let path = 'Assets/Trans1/' + (i + 1) + '.PNG';
    let loaded_image = loadImage(path);
    trans1.push(loaded_image);
  }

  // Preload transition 2 animation frames
  let trans2Images = 3;
  for (let i = 0; i < trans2Images; i++) {
    let path = 'Assets/Trans2/' + (i + 1) + '.PNG';
    let loaded_image = loadImage(path);
    trans2.push(loaded_image);
  }

  // Preload transition 3 animation frames
  let trans3Images = 3;
  for (let i = 0; i < trans3Images; i++) {
    let path = 'Assets/Trans3/' + (i + 1) + '.PNG';
    let loaded_image = loadImage(path);
    trans3.push(loaded_image);
  }

  // Preload transition 4 animation frames
  let trans4Images = 15;
  for (let i = 0; i < trans4Images; i++) {
    let path = 'Assets/Trans4/' + (i + 1) + '.PNG';
    let loaded_image = loadImage(path);
    trans4.push(loaded_image);
  }

  // Preload transition 5 animation frames
let trans5Images = 9; // replace with the actual number of images
for (let i = 0; i < trans5Images; i++) {
  let path = 'Assets/Trans5/' + (i + 1) + '.PNG';
  let loaded_image = loadImage(path);
  trans5.push(loaded_image);
}
}

function setup() {
  // Create the canvas with the size of the window
  createCanvas(windowWidth, windowHeight);

  // Set the frame rate to 20 frames per second
  frameRate(20);
}

function draw() {
  // Call the appropriate animation function based on the current animation mode
  if (m == 0){
    AnimationIdle()
  } else if (m == 1) {
    AnimationTrans1()
  } else if (m == 2) {
    AnimationTrans2()
  } else if (m == 3) {
    AnimationTrans3()
  } else if (m == 4) {
    AnimationTrans4()
  } else if (m == 5) {
    AnimationTrans5();
  }
}

function windowResized() {
  // Resize the canvas to match the window size
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  // Increment the animation mode when the mouse is clicked
  m += 1;
}

// Animation function for idle animation
function AnimationIdle(){
  // Set the background color
  background(220);

  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight+20;

  // Draw the current idle animation frame
  image(idle[currentFrame], x, y, imgWidth, imgHeight);

  // Increment the current frame and reset to 0 when it reaches the end
  currentFrame++;
  if (currentFrame == idle.length) {
    currentFrame = 0;
  }
}

// Animation function for transition 1 animation
function AnimationTrans1(){
  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight+20;



  // Increment the current frame and reset to 0 when it reaches the end
  if (iil1 < trans1.length) {
    background(220);
      // Draw the current transition animation frame
  image(trans1[iil1], x, y, imgWidth, imgHeight);
    iil1++;
    console.log(iil1);
  }
}

// Animation function for transition 2 animation
function AnimationTrans2(){
  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight+20;



  // Increment the current frame and reset to 0 when it reaches the end
  if (iil2 < trans2.length) {
    background(220);
      // Draw the current transition animation frame
  image(trans2[iil2], x, y, imgWidth, imgHeight);
    iil2++;
    console.log(iil2);
  }
}

// Animation function for transition 3 animation
function AnimationTrans3(){
  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight+20;



  // Increment the current frame and reset to 0 when it reaches the end
  if (iil3 < trans3.length) {
    background(220);
      // Draw the current transition animation frame
  image(trans3[iil3], x, y, imgWidth, imgHeight);
    iil3++;
    console.log(iil3);
  }
}

// Animation function for transition 4 animation
function AnimationTrans4(){
  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight+20;



  // Increment the current frame and reset to 0 when it reaches the end
  if (iil4 < trans4.length) {
    background(220);
      // Draw the current transition animation frame
  image(trans4[iil4], x, y, imgWidth, imgHeight);
    iil4++;
    console.log(iil4);
  }
  
}

function AnimationTrans5(){
  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight+20;

  // Increment the current frame and reset to 0 when it reaches the end
  if (iil5 < trans5.length) {
    background(220);
    // Draw the current transition animation frame
    image(trans5[iil5], x, y, imgWidth, imgHeight);
    iil5++;
    console.log(iil5);
  }
}