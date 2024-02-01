//connection variablen bruges til at 
//forbinde til MQTT serveren 
let connection
    //info er en tekst variabel til at vise info på skærmen
let info = "String som bruges til at vise info på skærmen"
    //sensorData indeholder de data vi får fra M5'eren
let sensorData = 20

function setup() {
    //sæt info tekstboksen ind i HTML
    createCanvas(windowHeight, windowWidth)
    background(220)
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
    connection.subscribe('current')
        //hver gang vi får en besked på emnet "current"  
    connection.on("message", (topic, ms) => {
        infoDiv.html("Modtager data: " + ms + " - på emne: " + topic)
    })
}

function draw() {}