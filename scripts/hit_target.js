/*
**  Author: Wenjeng Ko
**  Copyright: 2018
**  ToDo:
**      1) In animation case, image and graphics cannot be shown together.
**      2) mouse event cannot work yet. 
*/

// Define loc class
let Location = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var c;
var lenX = 20;
var lenY = 20;
var radius = 10;                    // Happy face radius
var centerX;                        // center-X of the canvas
var centerY;                        // center-Y of the canvas
var imgHappyFace;
var soundOuch;
var playAudio = false;
var loc = new Array();
var ttlLocations = 10;
var faceCtrX = faceCtrY = -1;
var numShown = -1;
var numHit = 0;
var oldNumLoc = -1;


function init() {
    window.requestAnimationFrame(draw);

    loc.push(new Location(27, 221));
    loc.push(new Location(91, 237));
    loc.push(new Location(369, 295));
    loc.push(new Location(189, 259));
    loc.push(new Location(87, 279));
    loc.push(new Location(160, 283));
    loc.push(new Location(245, 292));
    loc.push(new Location(405, 306));
    loc.push(new Location(25, 208));
    loc.push(new Location(268, 274));

    imgHappyFace = new Image();
    imgHappyFace.src = "images/happy_face.png";
    soundOuch = new Audio("sound/ouch.m4a");
}

// Compose a random location
function randomLoc(max) { 
    return(Math.floor(Math.random()*max));
}

function doMouseDown(event) {
    let ex = event.pageX;
    let ey = event.pageY;
    
    // calculate the distance from the mouse event location to the center
    let dx = ex - faceCtrX;
    let dy = ey - faceCtrY;
    let distanceToCenter = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    // Check if the mouse event location is inside or outside of the face
    if (distanceToCenter <= radius) {
        soundOuch.play();
        numHit++;
    }
}

// Animation - draw
function draw() {
    // var c = document.querySelector('canvas');
    c = document.getElementById("myCanvas");
    c.width = window.innerWidth;        // canvas width
    c.height = window.innerHeight/2;    // canvas height
    centerX = c.width/2;                // center-X of the canvas
    centerY = c.height/2;               // center-Y of the canvas
    var ctx = c.getContext('2d');

    // compose the image and graphics together in the canvas
    ctx.clearRect(0, 0, c.width, c.height); // clear canvas
    ctx.globalCompositeOperation='destination-over';
    
    // Add a mouse down event listener
    c.addEventListener("mousedown", doMouseDown, false);
    
    // Draw number of scans at the top-right corner
    numShown++;
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = 'yellow';
    ctx.textAlign = "right";
    let scoreStr = numHit + "/" + numShown;
    ctx.fillText(scoreStr, c.width - 15, 25);

    // Draw the happy face image, do not repeat at the same location
    var numLoc = randomLoc(ttlLocations);
    while (numLoc == oldNumLoc) {
        numLoc = randomLoc(ttlLocations);
    }
    oldNumLoc = numLoc;
    ctx.drawImage(imgHappyFace, 
                    loc[numLoc].x, loc[numLoc].y, lenX, lenY);
    faceCtrX = loc[numLoc].x + lenX/2;
    faceCtrY = loc[numLoc].y + lenY/2;

    // Draw text at the bottom of the canvas
    ctx.font = "24px Comic Sans MS";
    ctx.fillStyle = 'green';
    ctx.textAlign = "center";
    ctx.fillText("JavaScript 研習營 - Project 2", centerX, c.height - 10);

    // wait for a little time before continue
    setTimeout(function () {
        window.requestAnimationFrame(draw);
    }, 1500);
}

init();

/* --------------------- The end of this file -----------------------*/