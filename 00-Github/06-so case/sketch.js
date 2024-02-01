//connection variablen bruges til at 
//forbinde til MQTT serveren 
let connection
    //info er en tekst variabel til at vise info på skærmen
let info = "String som bruges til at vise info på skærmen"
    //sensorData indeholder de data vi får fra M5'eren

//osc variables
let sensorData = 20

let osc, playing, freq, amp;

function setup() {
    //sæt info tekstboksen ind i HTML
    let cnv = createCanvas(400, 400);
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator('sine');

    //lav en div til infoteksten
    infoDiv = createDiv(info)
        //sæt den nederst på canvas
    infoDiv.position(20, height - 40)
        //Opret forbindelse til MQTT serveren (den der står i USA)
    connection = mqtt.connect("wss://mqtt.nextservices.dk")
        //Når serveren kommer tilbage til os og siger KLAR
    connection.on("connect", (m) => {
        //vis i inforteksten at der er forbindelse 
        infoDiv.html("Er nu forbundet til Next's MQTT server")

    })

    //vi abonnerer på et emne - her "current"
    connection.subscribe('so-case-2t')
        //hver gang vi får en besked på emnet "current"  
    connection.on("message", (topic, ms) => {
        infoDiv.html("Modtager data: " + ms + " - på emne: " + topic)
        sensorData = ms.toString()
        freq = map(sensorData, -180, 180, 0, 24000)
    })
}

function draw() {
    background(220)
    fill("black")
    background(220)
    ellipse(width / 2, height / 2, sensorData)
}

function playOscillator() {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();
    osc.start();
    osc.amp(amp, 0.1)
    osc.freq(freq, freq)
    playing = true;
}