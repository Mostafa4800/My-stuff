let apiKey = 'AIzaSyAF2z2DthVDBVU9RUueYdQQdCUkmtY-wVs';
let ellipseStartR = 1920;
let ellipseEndR = 0;
let backButton;
let videoElement;
let backgroundImg;
let speed = 20;
let startVideoFrame;
let videoId = 'bikjZBdfDZY';

function preload() {
    loadJSON(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`,
        gotVideoData
    );
}

function gotVideoData(data) {
    let videoUrl = `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1`;
    videoElement = createDiv(`<iframe id="youtubeVideo" width="${windowWidth}" height="${windowHeight}" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    backgroundImg = loadImage("assets/beeMovie.png");

    backButton = createButton("Go back");
    backButton.position(20, 20);
    backButton.mousePressed(goBack);
}

function goBack() {
    backButton.hide();
    if (ellipseEndR < 1920) {
        noStroke();
        fill("red");
        ellipse(width / 2, height / 2, ellipseEndR);
        ellipseEndR += speed;
        if (frameCount > startVideoFrame) {
            // Video should start playing automatically
        }
        requestAnimationFrame(goBack);
    } else {
        window.location.href = "../../index.html";
    }
}

function draw() {
    image(backgroundImg, 0, 0, width, height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    //fuck me i cant make it resize fuck that
    /* // Update the dimensions of the iframe when the window is resized
    videoElement.child().attribute('width', windowWidth);
    videoElement.child().attribute('height', windowHeight);*/
}