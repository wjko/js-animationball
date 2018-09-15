/*
**  Author: Wenjeng Ko
**  Copyright: 2018
*/

// var c = document.querySelector('canvas');
var c = document.getElementById("myCanvas");
c.width = window.innerWidth;        // canvas width
c.height = window.innerHeight/2;    // canvas height
var centerX = c.width/2;            // center-X of the canvas
var centerY = c.height/2;           // center-Y of the canvas
var radius = 100;                   // circle radius

// The variables for the bottom hemisphere
var incrementAngle = 0.1;

// The variables for the top hemisphere
var incrementRadius = 20;

function doTopHemisphereAction() {
    // ............................................................
    // Students fill their code here
    // write to console the index (1 .. 10) from left to right.
    // ............................................................
    console.log("TOP hemisphere");
}

function doBottomHemisphereAction(dist) {
    this.dist = dist;
    let index = Math.floor(this.dist / 20) + 1;
    console.log("BOTTOM hemisphere, index = " + index);
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

// --------------------------------------------------------------
var ctx = c.getContext('2d');

// compose the image and graphics together in the canvas
ctx.globalCompositeOperation='destination-over';

// Add a mouse down event listener
c.addEventListener("mousedown", doMouseDown, false);

// Draw image
// window.onload = function() {
//     var img = document.getElementById("lights");
//     ctx.drawImage(img, 0, 0, c.width, c.height);
// }
var bgImage = new Image();
bgImage.src = "images/img_lights.jpg";
bgImage.onload = function() {
    ctx.drawImage(bgImage, 0, 0, c.width, c.height);
}

ctx.strokeStyle = "white"; // '#bbbbbb';

// Draw the center point
ctx.fillRect(centerX, centerY, 1, 1);

// Draw arc
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0*Math.PI, 2*Math.PI);

// Draw top hemisphere
var startAngle = 0;
var endAngle = 1;
for (let r = radius; r >= 20; r -= incrementRadius) {
    ctx.arc(centerX, centerY, r, startAngle*Math.PI, endAngle*Math.PI);
}

// Draw bottom hemisphere
var startAngle = 1;
var endAngle = 2;
for (let angle = startAngle; angle < endAngle; angle += incrementAngle) {
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX+radius*Math.cos(angle*Math.PI), centerY+radius*Math.sin(angle*Math.PI));
}

ctx.stroke();

// Draw text at the bottom of the canvas
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = 'yellow';
ctx.textAlign = "center";
ctx.fillText("JavaScript 研習營", centerX, c.height - 10);

/* --------------------- The end of this file -----------------------*/