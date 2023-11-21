let ellipseStartR = 1920;
let ellipseEndR = 0;
let backButton;
let videoElement;
let backgroundImg;
let speed = 20;
let startVideoFrame;
let videoId = 'bikjZBdfDZY'; // YouTube video ID
let apiKey = 'AIzaSyAF2z2DthVDBVU9RUueYdQQdCUkmtY-wVs'; // my api key

function preload() {
    // Use YouTube Data API to get video details, including the video URL
    loadJSON(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`,
        gotVideoData
    );
}


function gotVideoData(data) {
    // Extract video URL from the API response
    let videoUrl = `https://www.youtube.com/embed/${videoId}?controls=0`;
    videoElement = createVideo(videoUrl);
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    videoElement.size(width, height);
    videoElement.hide();

    backgroundImg = loadImage("assets/beeMovie.png");

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
        // Start the video after a certain number of frames
        if (frameCount > startVideoFrame) {
            videoElement.play();
        }
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
            // Set the startVideoFrame to the current frameCount
            startVideoFrame = frameCount;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}