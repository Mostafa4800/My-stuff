let idle = [];
let iid = 0;
let currentFrame = 0;
let imgWidth = 480; // Set the image width
let imgHeight = 640; // Set the image height

function preload() {
  let idleImages = 25;
  for (let i = 0; i < idleImages; i++) {
    let path = 'Assets/Idle/idle' + str(i + 1) + '.PNG';
    let loaded_image = loadImage(path);
    idle.push(loaded_image);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // set the framerate to 20
  frameRate(20); // because we reduce the images, it will become faster, I reduce the frame rate to slow it down
}

function draw() {
  background(220);
  AnimationIdle()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function AnimationIdle(){
  // Draw the image at the center of the canvas
  let x = (windowWidth - imgWidth) / 2;
  let y = windowHeight - imgHeight+20;
  image(idle[currentFrame], x, y, imgWidth, imgHeight);
  
  // Increment the current frame only when the image is being displayed
  currentFrame++;
  if (currentFrame == idle.length) {
    currentFrame = 0;
  }
}