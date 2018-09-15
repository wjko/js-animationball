// var c = document.querySelector('canvas');
var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight/2;
var ctx = c.getContext('2d');

ctx.globalCompositeOperation='destination-over';

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

// Declare the variables
var radius = 100;
var startAngle = 1;
var endAngle = 2;
var incrementAngle = 0.1;
var centerX = c.width/2;
var centerY = c.height/2;

// Draw the center point
ctx.fillRect(centerX, centerY, 1, 1);

// Draw arc
ctx.beginPath();
ctx.arc(centerX, centerY, radius, startAngle*Math.PI, endAngle*Math.PI);

// Draw lines
for (let angle = startAngle; angle < endAngle; angle += incrementAngle) {
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX+radius*Math.cos(angle*Math.PI), centerY+radius*Math.sin(angle*Math.PI));
}

// Draw top part circles
var startAngle = 0;
var endAngle = 1;
var incrementRadius = 20;
for (let r = radius; r >= 20; r -= incrementRadius) {
    ctx.arc(centerX, centerY, r, startAngle*Math.PI, endAngle*Math.PI);
}

ctx.stroke();

// Draw text at the bottom of the canvas
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = 'yellow';
ctx.textAlign = "center";
ctx.fillText("JavaScript 研習營", centerX, c.height - 10);
