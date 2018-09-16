/*
**  Author: Wenjeng Ko
**  Copyright: 2018
**  ToDo:
**      1) In animation case, image and graphics cannot be shown together.
**      2) mouse event cannot work yet. 
*/

var c;
var radius = 100;                   // circle radius
var centerX;                        // center-X of the canvas
var centerY;                        // center-Y of the canvas
var r = radius;
var r_delta = -1;
var pinAngleDelta = 0.01;
var pinStartAngle = Math.PI;
var pinStopAngle = 2 * Math.PI;
var a = 1;
var color = "black";
var heartbeat = 0;
var happyFaceJumpHeight = 0;
var jumpVelocity = 2;
var hitHappyFace = false;
var imgHappyFace;
var soundOuch;
var playAudio = false;


function init() {
    window.requestAnimationFrame(draw);

    imgHappyFace = new Image();
    imgHappyFace.src = "images/happy_face.png";
    soundOuch = new Audio("sound/ouch.m4a");
}

function doTopHemisphereAction() {
    // ............................................................
    // Students fill their code here
    // write to console the index (1 .. 10) from left to right.
    // ............................................................
    console.log("TOP hemisphere");
}

function doBottomHemisphereAction(dist) {
    playAudio = !playAudio;
}

function doMouseDown(event) {
    let ex = event.pageX;
    let ey = event.pageY;
    
    // calculate the distance from the mouse event location to the center
    let dx = ex - centerX;
    let dy = ey - centerY;
    let distanceToCenter = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    
    // Check if the mouse event location is inside or outside of the circle
    if (distanceToCenter <= radius) {
        if (ey <= centerY) {
            doTopHemisphereAction();
        }
        else {
            doBottomHemisphereAction(distanceToCenter);
        }
    }
    else {
        console.log("Outside: Do Nothing!");
    }
}

// Compose a random color value
function randomColor() { 
    return('#' + Math.floor(Math.random()*16777215).toString(16));
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

    // The variables for the bottom hemisphere
    var incrementAngle = 0.1;

    // compose the image and graphics together in the canvas
    ctx.clearRect(0, 0, c.width, c.height); // clear canvas
    ctx.globalCompositeOperation='destination-over';

    // Add a mouse down event listener
    c.addEventListener("mousedown", doMouseDown, false);

    ctx.strokeStyle = "blue";

    // Draw the center point
    ctx.fillRect(centerX-1, centerY-1, 3, 3);

    // Draw the big circle with blue color
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0*Math.PI, 2*Math.PI);

    // Draw the top hemisphere
    var startAngle = 1;
    var endAngle = 2;
    for (let angle = startAngle; angle < endAngle + 0.001; angle += incrementAngle) {
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX+radius*Math.cos(angle*Math.PI), centerY+radius*Math.sin(angle*Math.PI));
    }
    ctx.closePath();
    ctx.stroke();

    // draw the rotating pin in the top hemisphere
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    a += pinAngleDelta;
    if (a <= 1 || a >= 2) {
        pinAngleDelta = -pinAngleDelta;
    }
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX+radius*Math.cos((a)*Math.PI), 
                centerY+radius*Math.sin((a)*Math.PI));
    ctx.closePath();
    ctx.stroke();

    if ((1.49 < a && a < 1.51) && !hitHappyFace) {
        hitHappyFace = true;
        if (playAudio) {
            soundOuch.play();
        }
    }
    // Draw Happy Face image on top of the circle
    if (hitHappyFace) {
        happyFaceJumpHeight += jumpVelocity;
        if (happyFaceJumpHeight > 40) {
            jumpVelocity = -jumpVelocity;
        }
        else if (happyFaceJumpHeight < 0) {
            happyFaceJumpHeight = 0;
            jumpVelocity = 2;
            hitHappyFace = false;
        }
    }

    // Draw the happy face image at the top of the big circle
    ctx.drawImage(imgHappyFace,
                    centerX-15, centerY-radius-30-happyFaceJumpHeight, 
                    30, 30);

    // Draw the bottom hemisphere
    var startAngle = 0;
    var endAngle = 1;

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;

    r += r_delta;
    if (r <= 0 || r >= radius) {
        r_delta = -r_delta;
        heartbeat++;
    }
    ctx.arc(centerX, centerY, r, startAngle*Math.PI, endAngle*Math.PI);
    
    ctx.closePath();
    ctx.stroke();
    
    // Fill the bottom half circle
    if (r <= 0 || r >= radius) {
        color = randomColor();
    }
    ctx.fillStyle = color;
    ctx.fill();

    // Draw text at the bottom of the canvas
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'red';
    ctx.textAlign = "center";
    ctx.fillText("JavaScript 研習營", centerX, c.height - 10);

    ctx.font = "10px Comic Sans MS";
    ctx.fillStyle = 'blue';
    ctx.textAlign = "center";
    ctx.fillText("Click the bottom hemisphere to toggle sound.", 
                    centerX, c.height - 50);

    // Draw number of scans at the top-right corner
    ctx.font = "20px Comic Sans MS";
    ctx.textAlign = "right";
    ctx.fillText(heartbeat, c.width - 15, 25);

    window.requestAnimationFrame(draw);
}

init();

/* --------------------- The end of this file -----------------------*/