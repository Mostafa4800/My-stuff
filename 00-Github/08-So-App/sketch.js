// Initialize empty arrays to store idle, screamIdle, transition animations
let idle = [];
let screamIdle = [];
let trans = [];
let transIndex = [];
let currentFrame = 0;
let animationIndexes = {
  idle: 0,
  screamIdle: 0,
  transitions: Array(7).fill(0)
};
let animationMode = 0;
const transTotalFrames = [22, 3, 3, 15, 9, 6, 117];

// Set image width and height
let imgWidth = 480;
let imgHeight = 640;

// Initialize variables for font, buttons, navigation, sensor data, time, and cooldown duration
let balo;
let homeMenu = true;
let navShowing = false;
let startButton;
let navButton;
let sensorData;
let time = 0;
const cooldownDuration = 2000;

// Navigation options
let homeDataOptions = ["Home", "Data"];

// Define total number of stages in the game
const totalStages = 8;
let progressBarWidth;

let pv = false;
// Initialize frequency count object
let frequencyCounts = {
  "500": 0,
  "600": 0,
  "700": 0,
  "800": 0,
  "900": 0,
  "1000+": 0
};

// Preload function
function preload() {
  balo = loadFont("Assets/BalooBhaina-Regular.ttf");

  let idleImages = 25;
  for (let i = 0; i < idleImages; i++) {
    let path = 'Assets/Idle/idle' + (i + 1) + '.PNG';
    idle.push(loadImage(path));
  }

  for (let j = 1; j <= 7; j++) {
    let frames = [];
    for (let i = 0; i < transTotalFrames[j - 1]; i++) {
      let path = 'Assets/Trans' + j + '/' + (i + 1) + '.PNG';
      frames.push(loadImage(path));
    }
    trans.push(frames);
    transIndex.push(0);
  }

  let idleScreamImages = 6;
  for (let i = 0; i < idleScreamImages; i++) {
    let path = 'Assets/screamIdle/' + (i + 1) + '.PNG';
    screamIdle.push(loadImage(path));
  }

  navImg = loadImage("Assets/list.png");

  let testFrequency = 650;
  updateFrequencyCounts(testFrequency);
}

// Setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20);

// MQTT connection setup
// Establish a connection to the MQTT broker using a secure WebSocket (WSS) connection
connection = mqtt.connect("wss://mqtt.nextservices.dk")

// Event listener for when the connection is successfully established
connection.on("connect", () => {
  console.log("Er nu forbundet til Next's MQTT server")  // Log a message indicating successful connection to the console
})

// Subscribe to the 'iHateLife' topic to receive messages published on this topic
connection.subscribe('iHateLife')

// Event listener for when a message is received on any subscribed topic
connection.on("message", (topic, ms) => {
  console.log("Modtager data: " + ms + " - på emnet: " + topic)  // Log the received message and topic to the console
  
  // Convert the message payload to a string and assign it to the variable 'sensorData'
  sensorData = ms.toString()
  
  // Check if the value of 'sensorData' is greater than 600
  if(sensorData > 600){
    // If the condition is met, call the 'cooldown' function
    cooldown()
  }
})


  // Start button setup
  startButton = createButton("START GAME");
  startButton.size(220, 65);
  startButton.style("color:black");
  startButton.style("border-width:4px");
  startButton.style("font-family", "Baloo Bhaina");
  startButton.style("font-size", "30px");
  startButton.style("border-radius", "27px");
  startButton.hide();

  // Navigation button setup
  navButton = createImg("Assets/list.png");
  navButton.size(40, 40);
  navButton.position(10, 10);
  navButton.mousePressed(toggleNav);

  // Calculate width of progress bar segment
  progressBarWidth = windowWidth / totalStages;
}

// Draw function
function draw() {
  if (!homeMenu || navShowing) {
    switch (animationMode) {
      case 0:
        AnimationIdle();
        break;
      case 7:
        AnimationScreamIdle();
        break;
      case 8:
        AnimationTransition(animationMode);
        if (animationIndexes.transitions[6] >= transTotalFrames[6]) {
          displayGameFinishedScreen();
        }
        break;
      default:
        if (animationMode >= 1 && animationMode <= 6) {
          AnimationTransition(animationMode);
        }
        break;
    }
  }

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

  if (navShowing && !homeMenu) {
    displayNavOptions();
  }
  applyButtonStyling();

  // Draw progress bar only when not in home menu and game is ongoing
  if (!homeMenu && animationMode !== 0 && animationMode !== 8) {
    drawProgressBar();
  }

  // Draw the pie chart if data is available

  updateFrequencyCounts(sensorData)

  if (Object.values(frequencyCounts).reduce((a, b) => a + b, 0) > 0) {
    drawPieChart();
  }

}

// Window resize function
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
/*
// Mouse pressed function
function mousePressed() {
  if (!homeMenu || !navShowing) {
    animationMode = (animationMode + 1) % 9;
    if (animationMode == 1) {
      for (let i = 0; i < transIndex.length; i++) {
        transIndex[i] = 0;
      }
    }
  }
}
*/

// Function to draw the progress bar
function drawProgressBar() {
  // Calculate current progress based on animationMode
  let currentProgress = map(animationMode, 1, totalStages, 0, windowWidth);
  
  // Draw background of progress bar
  fill(200);
  rect(0, 0, windowWidth, 20);

  // Draw filled portion of progress bar
  fill(0, 255, 0);
  rect(0, 0, currentProgress, 20);

  // Draw outline of progress bar
  noFill();
  stroke(0);
  rect(0, 0, windowWidth, 20);
}

// AnimationIdle function
function AnimationIdle() {
  background(220);
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight + 20;
  image(idle[currentFrame], x, y, imgWidth, imgHeight);
  currentFrame++;
  if (currentFrame == idle.length) {
    currentFrame = 0;
  }
}

// AnimationScreamIdle function
function AnimationScreamIdle() {
  background(220);
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight + 20;
  image(screamIdle[animationIndexes.screamIdle], x, y, imgWidth, imgHeight);
  animationIndexes.screamIdle++;
  if (animationIndexes.screamIdle == screamIdle.length) {
    animationIndexes.screamIdle = 0;
  }
}

// AnimationTransition function
function AnimationTransition(index) {
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight + 20;
  if (index === 8) {
    let frames = trans[6];
    let frameIndex = animationIndexes.transitions[6];
    if (frameIndex < frames.length) {
      background(220);
      image(frames[frameIndex], x, y, imgWidth, imgHeight);
      animationIndexes.transitions[6]++;
    }
  } else {
    let frames = trans[index - 1];
    let frameIndex = animationIndexes.transitions[index - 1];
    if (frameIndex < frames.length) {
      background(220);
      image(frames[frameIndex], x, y, imgWidth, imgHeight);
      animationIndexes.transitions[index - 1]++;
    }
  }
}

// Toggle navigation function
function toggleNav() {
  if (!navShowing) {
    navShowing = !navShowing;
    if (navShowing && homeMenu) {
      homeMenu = false;
      startButton.hide();
    }
  }
}



// Display navigation options function
function displayNavOptions() {
  clearCanvas(); // Clear the canvas
  fill("black");
  textSize(30);
  textAlign(CENTER);
  textFont(balo);

  for (let i = 0; i < homeDataOptions.length; i++) {
    let option = homeDataOptions[i];
    let button = createButton(option);
    text("Navigation Options", windowWidth / 2, windowHeight * 0.1);
    button.size(150, 50);
    button.position(windowWidth / 2 - 110, (windowHeight * 0.2) + (i * 70) + 20);
    button.mousePressed(() => {
      background(220);

      if (option === "Home") {
        homeMenu = true;
        navShowing = false;
        animationMode = 0;
        // Hide navigation buttons and show start button again when returning to home screen
        toggleNavButtons(true); // Change to true to show buttons
        startButton.show();
      } else if (option === "Data") {
        pv = !pv;
      }
    });
  }
}


// Function to toggle navigation buttons visibility
function toggleNavButtons(visible) {
  let navButtons = selectAll("button");
  for (let i = 0; i < navButtons.length; i++) {
    if (navButtons[i] !== startButton.elt) {
      if (visible) {
        navButtons[i].show();
      } else {
        navButtons[i].hide();
      }
    }
  }
}

// Display game finished screen function
function displayGameFinishedScreen() {
  background(220);
  fill("black");
  textSize(30);
  textAlign(CENTER);
  textFont(balo);
  text("Game Finished", windowWidth / 2, windowHeight * 0.1);
  let playAgainButton = createButton("Play Again");
  playAgainButton.size(150, 50);
  playAgainButton.position(windowWidth / 2 - 110, windowHeight * 0.4);
  playAgainButton.mousePressed(() => {
    resetGame();
    playAgainButton.hide();
    homeButton.hide();
    background(220)
  });
  let homeButton = createButton("Home");
  homeButton.size(150, 50);
  homeButton.position(windowWidth / 2 - 110, windowHeight * 0.5);
  homeButton.mousePressed(() => {
    let gameFinishedElements = selectAll("button");
    for (let i = 0; i < gameFinishedElements.length; i++) {
      gameFinishedElements[i].hide();
    }
    homeMenu = true;
    navShowing = false;
    animationMode = 0;
  });
  background(220)
}

// Reset game function
function resetGame() {
  for (let i = 0; i < transIndex.length; i++) {
    transIndex[i] = 0;
  }
  currentFrame = 0;
  animationIndexes.screamIdle = 0;
  animationMode = 0;
  let gameFinishedElements = selectAll("button");
  for (let i = 0; i < gameFinishedElements.length; i++) {
    gameFinishedElements[i].remove();
  }
}

// Cooldown function
function cooldown() {
  const currentTime = Date.now();
  if (currentTime - time >= cooldownDuration && animationMode < 9) {
    animationMode++;
    time = currentTime;
  } else {
    console.log("Cooldown in progress");
  }
}

// Apply styling to all buttons on the page
function applyButtonStyling() {
  let buttons = selectAll("button");
  for (let i = 0; i < buttons.length; i++) {
    styleButton(buttons[i]);
  }
}

// Function to style buttons
function styleButton(button) {
  button.size(220, 65);
  button.style("color:black");
  button.style("border-width:4px");
  button.style("font-family", "Baloo Bhaina");
  button.style("font-size", "30px");
  button.style("border-radius", "27px");
}

// Function to update frequency counts
// This function takes in a frequency value as an argument
// and updates the frequency counts object accordingly.
function updateFrequencyCounts(frequency) {
 
  // Check if the frequency is between 500 and 900 (inclusive)
  if (frequency >= 500 && frequency <= 900) {
    // If so, calculate the key for the frequencyCounts object
    // by dividing the frequency by 100, rounding down to the nearest integer,
    // multiplying it by 100 again, and converting the result to a string.
    let key = Math.floor(frequency / 100) * 100 + "";
    
    // Increment the corresponding frequency count in the frequencyCounts object
    frequencyCounts[key]++;
  } else if (frequency > 900) {
    // If the frequency is greater than 900, increment the frequencyCounts object's
    // "1000+" key, indicating that the frequency is above 900.
    frequencyCounts["1000+"]++;
  }
 }

// Function to draw the pie chart
function drawPieChart() {
  // Calculate the total value of all frequency counts
  let total = Object.values(frequencyCounts).reduce((a, b) => a + b, 0);

  // Initialize arrays for angles, colors, and labels
  let angles = [];
  let colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];
  let labels = Object.keys(frequencyCounts);

  // Calculate angles for each frequency category
  for (let i = 0; i < labels.length; i++) {
    // Use the 'map' function to normalize the frequency count between 0 and total
    // and map it to the corresponding angle between 0 and 2PI (TWO_PI)
    angles.push(map(frequencyCounts[labels[i]], 0, total, 0, TWO_PI));
  }

  if (pv){
    // Check if pv is truthy (non-empty, non-zero, non-null, etc.)
    
    // Draw the pie chart
    let lastAngle = 0; // Initialize the last angle to 0
    for (let i = 0; i < angles.length; i++) {
      fill(colors[i]); // Set the fill color based on the color array
      stroke(0); // Set the stroke color to black
      strokeWeight(1); // Set the stroke weight to 1
      arc(windowWidth / 2, windowHeight / 2, 300, 300, lastAngle, lastAngle + angles[i]); // Draw a section of the pie chart
      lastAngle += angles[i]; // Update the last angle to the new ending angle for the next iteration
    }
  }

  // Add legend
  textSize(20);
  textAlign(LEFT);
  for (let i = 0; i < labels.length; i++) {
    fill(colors[i]);
    rect(windowWidth - 150, 50 + i * 30, 20, 20);
    fill(0);
    text(labels[i] + ": " + frequencyCounts[labels[i]], windowWidth - 120, 65 + i * 30);
  }
}

function clearCanvas(){
  background(220)
}