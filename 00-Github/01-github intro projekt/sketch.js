let pageHeader, htmlPageHeader;
let showRedCircle = true;

function setup() {
    createCanvas(windowWidth, windowHeight);

    pageHeader = createElement("h1", "Overskrift med create element")
    pageHeader.position(100, 100)
    htmlPageHeader = select("#htmlPageHeader")
        .html("nu har p5 overtaget overskriften")
        .position(100, 200)
        .mouseClicked(() => showRedCircle = !showRedCircle)

}



function draw() {
    background(220);
    if (showRedCircle) {
        fill("red")
        ellipse(100, 100, 100)
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}