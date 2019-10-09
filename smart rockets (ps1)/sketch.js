// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g
var generation;
var population;
var crashed,completed;
// Each rocket is alive till 400 frames
var lifespan = 210;
// Made to display count on screen
var lifeP;
// Keeps track of frames
var count = 0;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 0.5;

//some more DOM elements
var generation_sp1,generation_sp2;
var lifespan_sp1,lifespan_sp2;
var crashed_sp1,crashed_sp2;
var completed_sp1,completed_sp2;
var population_sp;


// Dimensions of barrier
var rx,ry;//top-left coordinates
var rw = 200;
var rh = 10;

function setup() {
  createCanvas(windowWidth*0.95,windowHeight*0.8);
  population = new Population();

  generation=1;
  crashed=0;
  completed=0;
  target = createVector(width / 2, 50);

  //updating dimensions
  rx = width/2 - rw/2;
  ry = height - 200;

  //creating dom elements
  lifespan_sp1 = createSpan("Lifespan : ");
  lifespan_sp2 = createSpan();
  createDiv();
  population_sp = createSpan("Population : "+population.popsize);
  createDiv();
  generation_sp1 = createSpan("Generation : ");
  generation_sp2 = createSpan("");
  createDiv();
  crashed_sp1 = createSpan(" No. of rockets crashed : ");
  crashed_sp2 = createSpan("");
  createDiv();
  completed_sp1 = createSpan(" No. of rockets reached : ");
  completed_sp2 = createSpan("");
}

function draw() {
  background(51);
  population.run();

  //DOM related code starts here

  // Displays count to window
  lifespan_sp2.html(count);

  //Displays Gen number
  generation_sp2.html(generation);

  //crashed
  crashed_sp2.html(crashed);

  //completed
  completed_sp2.html(completed);

  //DOM related code ends here

  if(generation<=100){

    // console.log(count);
    count++;
    if (count == lifespan) {
      console.log(generation+","+completed+","+crashed+","+(population.popsize-crashed-completed));

      //if all the rockets complete without crashing => evolved
      if(completed==population.popsize){
        console.log("evolved !!!");
        return;
      }

      generation++;
      population.evaluate();
      population.selection();
      // Population = new Population();
      count = 0;
  
      // console.log("Completed = "+completed+"\nCrashed = "+crashed+"\nRemaning = "+(population.popsize-crashed-completed)+"\nTotal = "+((population.popsize-crashed-completed)+crashed+completed));
      crashed = 0;
      completed = 0;
  
    }
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

  //render name of pool selection algorithm
  fill(255);
  textSize(width*0.0125);
  text("Mating Pool",10,10,150,150);


}
