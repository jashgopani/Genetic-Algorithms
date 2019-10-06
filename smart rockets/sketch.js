// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g
var generation;
var population;
// Each rocket is alive till 400 frames
var lifespan = 300;
// Made to display count on screen
var lifeP;
// Keeps track of frames
var count = 0;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 0.3;


// Dimensions of barrier
var rx,ry;//top-left coordinates
var rw = 200;
var rh = 10;

function setup() {
  createCanvas(windowWidth*0.95,windowHeight*0.8);
  population = new Population();
  // lifeP = createP('');
  generation=1;
  target = createVector(width / 2, 50);

  //updating dimensions
  rx = width/2 - 90;
  ry = height - 200;
}

function draw() {
  background(51);
  population.run();
  // Displays count to window
  // lifeP.html(count);
  // console.log(count);
  count++;
  if (count == lifespan) {
  	generation++;
	console.log(generation);
    population.evaluate();
    population.selection();
    // Population = new Population();
    count = 0;
  }
  // Renders barrier for rockets
  fill(255);
  strokeWeight(1.5);
  stroke('red');
  rect(rx, ry, rw, rh);

  // Renders target
  ellipse(target.x, target.y, 16, 16);

  //range circles
  noFill();
  strokeWeight(1);
  stroke('rgba(0,255,0,0.3)');
  ellipse(target.x, target.y, 16+30, 16+30);
  stroke(255, 204, 0,60);
  ellipse(target.x, target.y, 16+400, 16+400);

}
