
let bird;
let pipes = [];

// Initialize the canvas and create the bird and pipes arrays
function setup() {
  createCanvas(640, 480);
  bird = new Bird(); // Create a new bird object
  pipes.push(new Pipe()); // Add the first pipe object to the pipes array
}

// Main game loop
function draw() {
  background(0); // Set the background color to black
  frameRate(60);

  // Iterate through the pipes array in reverse order
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show(); // Display the current pipe
    pipes[i].update(); // Update the current pipe's position

    // Check if the bird hits the current pipe
    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }

    // Remove the current pipe if it goes offscreen
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  // Update and display the bird
  bird.update();
  bird.show();

  // Add a new pipe every 75 frames
  if (frameCount % 75 === 0) {
    pipes.push(new Pipe());
  }
}

// Event handler for key presses
function keyPressed() {
  if (key === ' ') {
    bird.up(); // Call the bird's up() method when the spacebar is pressed
    //console.log("SPACE");
  }
}
