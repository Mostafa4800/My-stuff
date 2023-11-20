let ellipseStartR = 1920;
let ellipseEndR = 0;
let backButton;
let videoElement;
let backgroundImg;

function setup() {
    createCanvas(windowWidth, windowHeight);

    videoElement = createVideo(["itsTime.mp4"]), onVideoLoad;
    videoElement.show();

    backgroundImg = loadImage("itsTime.png");

    // Create the button but initially hide it
    backButton = createButton("Go back");
    backButton.position(20, 20);
    backButton.hide();

    // Set up mousePressed event for the button
    backButton.mousePressed(goBack);
}

function onVideoLoad() {
    // The media will not play until some explicitly triggered.
    videoElement.autoplay(false);
    videoElement.volume(0);
    videoElement.size(100, 100);
}


function goBack() {
    backButton.hide();
    if (ellipseEndR < 1920) {
        fill("red");
        ellipse(width / 2, height / 2, ellipseEndR);
        ellipseEndR += 10;
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
        fill("red");
        ellipse(width / 2, height / 2, ellipseStartR);
        ellipseStartR -= 10;
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