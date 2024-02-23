// Initialize empty arrays to store idle, transition 1, transition 2, transition 3, transition 4, and transition 6 animation frames
let idle = [];
let screamIdle = []
let trans = []; // Array to store transition animation frames
let transIndex = []; // Array to store indexes for transition animations
let transTotalFrames = [22, 3, 3, 15, 9, 6]; // Array to store the total number of frames for each transition

// Initialize variables to keep track of the current frame and image index
let iil1 = 0;
let iil2 = 0;
let iil3 = 0;
let iil4 = 0;
let iil5 = 0;
let iil6 = 0;
let iil7 = 0;
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
    idle.push(loaded_image); // Add the loaded image to the idle array
  }

  // Preload transition animation frames
  for (let j = 1; j <= 6; j++) {
    let frames = []; // Create an empty array to store frames for each transition
    for (let i = 0; i < transTotalFrames[j - 1]; i++) {
      let path = 'Assets/Trans' + j + '/' + (i + 1) + '.PNG';
      let loaded_image = loadImage(path);
      frames.push(loaded_image); // Add the loaded image to the frames array
    }
    trans.push(frames); // Add the frames array to the trans array
    transIndex.push(0); // Initialize index for each transition
  }

  let idleScreamImages = 6;
for (let i = 0; i < idleScreamImages; i++) {
  let path = 'Assets/screamIdle/' + (i + 1) + '.PNG';
  let loaded_image = loadImage(path);
  screamIdle.push(loaded_image); // Add the loaded image to the idle2 array
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
    AnimationIdle();
  } else if (m == 7) {
    AnimationScreamIdle()
  } else if (m >= 1 && m <= 6) {
    AnimationTransition(m);
  } else{
    return
  }
  console.log(m)
}

function windowResized() {
  // Resize the canvas to match the window size
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  // Increment the animation mode when the mouse is clicked
  m = (m + 1 ) % 8; // Wrap around animation mode

  // Reset transition indexes when transitioning back to idle animation
  if (m == 1) {
    for (let i = 0; i < transIndex.length; i++) {
      transIndex[i] = 0;
    }
  }
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

function AnimationScreamIdle(){
  // Set the background color
  background(220);

  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight+20;

  // Draw the current idle animation frame
  image(screamIdle[iil7], x, y, imgWidth, imgHeight);

  // Increment the current frame and reset to 0 when it reaches the end
  iil7++;
  if (iil7 == screamIdle.length) {
    iil7 = 0;
  }
}

// Animation function for transition animations
function AnimationTransition(index){
  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight+20;

  let frames = trans[index - 1];
  let frameIndex = transIndex[index - 1];

  // Increment the current frame and reset to 0 when it reaches the end
  if (frameIndex < frames.length) {
    background(220);
    // Draw the current transition animation frame
    image(frames[frameIndex], x, y, imgWidth, imgHeight);
    transIndex[index - 1]++; // Increment the frame index
    console.log(transIndex[index - 1]);
  }
}