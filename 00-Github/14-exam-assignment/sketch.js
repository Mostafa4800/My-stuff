let lyric =  ["Lille", "Peter", "Abraham", "Edderkop", "kravlede", "op", "af"];
let pButton
let sButton

let pInput
let sInput

let pValue
let sValue

function setup() {
  createCanvas(windowWidth, windowHeight);
  pButton = createButton("Push");
  pButton.position(0, 150);
  pButton.mousePressed(function() {
    pButton.mousePressed(function() {
      if (lyric.includes(pValue)) {
        console.log(pValue+" er allerede i arrayet");
      } else {
        lyric.push(pValue);
        console.log(lyric);
      }
    });
  });

  pInput = createInput();
  pInput.position(50, 150);
  pInput.value("muren");




  sButton = createButton("Splice");
  sButton.position(0, 100);
  sButton.mousePressed(function() {
    for (let i = 0; i < lyric.length; i++) {
      if (lyric[i] == sValue) {
        lyric.splice(i, 1);
        console.log(lyric);
        break;
      }
    }
  });
  sInput = createInput();
  sInput.position(50, 100);
  sInput.value("Abraham");


/*
  lyric.splice(2, 1);
  lyric.push("muren");
  console.log(lyric);
  */
}

function draw() {
  background(220);
  for (let i = 0; i < lyric.length; i++) {
    text(lyric[i], 50+i*70, 50);
  }

  pValue = pInput.value();
  sValue = sInput.value();

}
