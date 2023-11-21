let ellipseStartR = 1920;
let ellipseEndR = 0;
let backButton;
let videoElement;
let backgroundImg;
let speed = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);

    videoElement = createVideo("assets/itsTime.mp4");
    videoElement.size(width, height);
    videoElement.hide();

    videoElement.onended(() => {
        backButton.show();
    });

    backgroundImg = loadImage("assets/itsTime.png");

    // Create the button but initially hide it
    backButton = createButton("Go back");
    backButton.position(20, 20);
    backButton.hide();

    // Set up mousePressed event for the button
    backButton.mousePressed(goBack);
}

function goBack() {
    backButton.hide();
    if (ellipseEndR < 1920) {
        noStroke();
        fill("red");
        ellipse(width / 2, height / 2, ellipseEndR);
        ellipseEndR += speed;
        requestAnimationFrame(goBack); // Call the function again on the next frame
    } else {
        window.location.href = "../../index.html";
    }
}

function draw() {
    // Draw the background image
    image(backgroundImg, 0, 0, width, height);

    // Draw the video first
    image(videoElement, 0, 0, width, height);

    // This code is just to make it more convenient when switched from page to page
    if (ellipseStartR > 0) {
        noStroke();
        fill("red");
        ellipse(width / 2, height / 2, ellipseStartR);
        ellipseStartR -= speed;
        // If the circle is fully drawn, show the button
        if (ellipseStartR <= 0) {
            backButton.show();
            videoElement.play();
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}