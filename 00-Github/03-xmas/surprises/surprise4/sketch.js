let ellipseStartR = 1920;
let ellipseEndR = 0;
let backButton;
let CurrentPage = "#page1"
let bgTransparent = 255

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create the button but initially hide it
    backButton = createButton("Go back");
    backButton.position(20, 20);
    backButton.hide();

    // Set up mousePressed event for the button
    backButton.mousePressed(goBack);

    select("#item1").mouseClicked(() => switchPage("#page1"));
    select("#item2").mouseClicked(() => switchPage("#page2"));
    select("#item3").mouseClicked(() => switchPage("#page3"));
}

function switchPage(whichPage) {
    select(CurrentPage).removeClass('show')
    select(whichPage).addClass('show')
    CurrentPage = whichPage
}

function goBack() {
    backButton.hide();
    if (ellipseEndR < 1920) {
        background(220); // Clear the canvas on each frame
        fill("red");
        ellipse(width / 2, height / 2, ellipseEndR);
        ellipseEndR += 10;
        requestAnimationFrame(goBack); // Call the function again on the next frame
    } else {
        window.location.href = "../../index.html";
    }
}

function draw() {
   background(255)
    // This code is just to make it more convenient when switched from page to page
    if (ellipseStartR > 0) {
        fill("red");
        ellipse(width / 2, height / 2, ellipseStartR);
        ellipseStartR -= 10;

        // If the circle is fully drawn, show the button
        if (ellipseStartR <= -1) {
            backButton.show();
          
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}