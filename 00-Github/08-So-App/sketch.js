// Initialize empty arrays to store idle, transition 1, transition 2, transition 3, transition 4, transition 6, and transition 7 animation frames
let idle = [];
let screamIdle = [];
let trans = []; // Array to store transition animation frames
let transIndex = []; // Array to store indexes for transition animations
let transTotalFrames = [22, 3, 3, 15, 9, 6, 117]; // Array to store the total number of frames for each transition

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

//balo font
let balo;

let homeMenu = true;
let navShowing = false;

//buttons
let startButton;

let navButton;

// Navigation options
let homeDataOptions = ["Home", "Data"]; // Sample options for home data

function preload() {
  balo = loadFont("Assets/BalooBhaina-Regular.ttf");

  // Preload idle animation frames
  let idleImages = 25;
  for (let i = 0; i < idleImages; i++) {
    let path = 'Assets/Idle/idle' + (i + 1) + '.PNG';
    let loaded_image = loadImage(path);
    idle.push(loaded_image); // Add the loaded image to the idle array
  }

  // Preload transition animation frames
  for (let j = 1; j <= 7; j++) {
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

  navImg = loadImage("Assets/list.png");
}

function setup() {
  // Create the canvas with the size of the window
  createCanvas(windowWidth, windowHeight);
  // Set the frame rate to 20 frames per second
  frameRate(20);

  //Start Button

  startButton = createButton("START GAME");
  startButton.size(220, 65);
  startButton.style("color:black");
  startButton.style("border-width:4px");
  startButton.style("font-family", "Baloo Bhaina");
  startButton.style("font-size", "30px");
  startButton.style("border-radius", "27px");
  startButton.hide();

  // Initialize navigation button
  navButton = createImg("Assets/list.png");
  navButton.size(40, 40);
  navButton.position(10, 10);
  navButton.mousePressed(toggleNav); // Call toggleNav function when clicked
}

function draw() {
  // Call the appropriate animation function based on the current animation mode
  if (m == 0) {
    AnimationIdle();
  } else if (m == 7) {
    AnimationScreamIdle();
  } else if (m >= 1 && m <= 6) {
    AnimationTransition(m);
  } else if (m == 8) {
    AnimationTransition(m);
        // Check if transition 7 has ended
        if (transIndex[6] >= transTotalFrames[6]) {
          displayGameFinishedScreen(); // Display game finished screen
        }
  } else {
    return;
  }

  //if homemenu is true it shows the menu else it show the game
  if (homeMenu) {
    fill("black");
    textSize(30);
    textAlign(CENTER);
    textFont(balo);
    text("MOM", windowWidth / 2, windowHeight * 0.1);
    startButton.show();
    startButton.position(windowWidth / 2 - 110, windowHeight * 0.88);
    startButton.mousePressed(() => {
      homeMenu = !homeMenu;
      startButton.hide();
    });

  }

  // Show navigation options if nav is showing
  if (navShowing && !homeMenu) {
    displayNavOptions();
  }
}

function windowResized() {
  // Resize the canvas to match the window size
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if(!homeMenu || !navShowing){
  // Increment the animation mode when the mouse is clicked
  m = (m + 1) % 9; // Wrap around animation mode

  // Reset transition indexes when transitioning back to idle animation
  if (m == 1) {
    for (let i = 0; i < transIndex.length; i++) {
      transIndex[i] = 0;
    }
  }
}
}

// Animation function for idle animation
function AnimationIdle() {
  // Set the background color
  background(220);

  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight + 20;

  // Draw the current idle animation frame
  image(idle[currentFrame], x, y, imgWidth, imgHeight);

  // Increment the current frame and reset to 0 when it reaches the end
  currentFrame++;
  if (currentFrame == idle.length) {
    currentFrame = 0;
  }
}

function AnimationScreamIdle() {
  // Set the background color
  background(220);

  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight + 20;

  // Draw the current idle animation frame
  image(screamIdle[iil7], x, y, imgWidth, imgHeight);

  // Increment the current frame and reset to 0 when it reaches the end
  iil7++;
  if (iil7 == screamIdle.length) {
    iil7 = 0;
  }
}

// Animation function for transition animations
function AnimationTransition(index) {
  // Calculate the x and y coordinates to center the image on the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight + 20;

  if (index === 8) { // Handle transition 7
    let frames = trans[6]; // Get frames for transition 7 (index 6 in the trans array)
    let frameIndex = transIndex[6]; // Get frame index for transition 7
    if (frameIndex < frames.length) {
      background(220);
      image(frames[frameIndex], x, y, imgWidth, imgHeight);
      transIndex[6]++; // Increment the frame index for transition 7
    }
  } else {
    let frames = trans[index - 1];
    let frameIndex = transIndex[index - 1];

    // Increment the current frame and reset to 0 when it reaches the end
    if (frameIndex < frames.length) {
      background(220);
      // Draw the current transition animation frame
      image(frames[frameIndex], x, y, imgWidth, imgHeight);
      transIndex[index - 1]++; // Increment the frame index
    }
  }
}

function toggleNav() {
  if(!navShowing){
  navShowing = !navShowing;

  // Hide menu and start button if nav is showing
  if (navShowing && homeMenu) {
    homeMenu = false;
    startButton.hide();
  }
}
}

// Function to display navigation options
function displayNavOptions() {
  background(220);
  fill("black");
  textSize(30);
  textAlign(CENTER);
  textFont(balo);
  text("Navigation Options", windowWidth / 2, windowHeight * 0.1);

  // Display options
  for (let i = 0; i < homeDataOptions.length; i++) {
    let option = homeDataOptions[i];
    text(option, windowWidth / 2, (windowHeight * 0.2) + (i * 50));
  }
}

// Function to display the game finished screen with options
function displayGameFinishedScreen() {
  background(220);
  fill("black");
  textSize(30);
  textAlign(CENTER);
  textFont(balo);
  text("Game Finished", windowWidth / 2, windowHeight * 0.1);

  // Display options
  let playAgainButton = createButton("Play Again");
  playAgainButton.size(150, 50);
  playAgainButton.position(windowWidth / 2 - 75, windowHeight * 0.4);
  playAgainButton.mousePressed(() => {
    // Reset game state and start again
    resetGame();
    playAgainButton.hide();
    homeButton.hide();
  });

  let homeButton = createButton("Home");
  homeButton.size(150, 50);
  homeButton.position(windowWidth / 2 - 75, windowHeight * 0.5);
  homeButton.mousePressed(() => {
    // Go back to home menu
    homeMenu = true;
    navShowing = false;
    m = 0; // Reset animation mode
    playAgainButton.hide();
    homeButton.hide();
  });
}

// Function to reset the game state
function resetGame() {
  // Reset variables, animation mode, etc. as needed

  // Reset transition indexes
  for (let i = 0; i < transIndex.length; i++) {
    transIndex[i] = 0;
  }

  // Reset any other variables you need to reset
  currentFrame = 0;
  iil7 = 0;
  m = 0; // Set animation mode to idle

  // Hide the game finished screen elements if any
  let gameFinishedElements = selectAll("button");
  for (let i = 0; i < gameFinishedElements.length; i++) {
    gameFinishedElements[i].remove();
  }
}