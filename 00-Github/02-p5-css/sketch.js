let CurrentPage = "#page1"

function setup() {
    select("#item1").mouseClicked(() => switchPage("#page1"))
    select("#item2").mouseClicked(() => switchPage("#page2"))
    select("#item3").mouseClicked(() => switchPage("#page3"))
    select("#item4").mouseClicked(() => switchPage("#page4"))

}

function switchPage(whichPage) {
    select(CurrentPage).removeClass('show')
    select(whichPage).addClass('show')
    CurrentPage = whichPage
}


function draw() {
    background(220);


}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}