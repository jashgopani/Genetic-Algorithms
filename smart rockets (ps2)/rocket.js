// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

// Constructor function
function Rocket(dna) {
  // Physics of rocket at current instance
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();

  this.crashedAt = 0;
  this.completedAt = 0;

  // Checks if rocket had crashed
  this.crashed = false;
  //if rocket crashed and updated the global value
  this.crashUpdated = false;

  // Checkes rocket has reached target
  this.completed = false;

  //if rocket completed and updated the global value
  this.completeUpdated = false;

  // Gives a rocket dna
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  // Object can recieve force and add to acceleration
  this.applyForce = function(force) {
    this.acc.add(force);
  }


  // Calulates fitness of rocket
  this.calcFitness = function() {
    // Takes distance to target
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    // Maps range of fitness
    this.fitness = map(d, 0, width, width, 0);
    // If rocket gets to target increase fitness of rocket
   
    if (this.completed) {
      this.fitness *= 100;
    }

    // If rocket does not get to target decrease fitness
    if (this.crashed) {
      this.fitness /= 10;
    }

    if(this.crashed && (this.crashedAt>=lifespan*0.5 || this.pos.y>=height-90))
    this.fitness /= 100;

 if(this.crashed && (this.crashedAt>=lifespan*0.8 || this.pos.y==0))
    this.fitness /= 100;
    
    var ab = degrees(this.pos.angleBetween(createVector(target.x,target.y)))%180;
    if(this.completed && this.completedAt >=0.4 && ab<30)
      this.fitness *= this.completedAt;


  }

  // Updates state of rocket
  this.update = function() {
    // Checks distance from rocket to target
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // If distance less than 10 pixels, then it has reached target
    if (d < 10) {
      this.completed = true;
      this.completedAt = this.completedAt>0?this.completedAt:count;
      this.pos = target.copy();
    }
    // Rocket hit the barrier
    if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
      this.crashed = true;
      this.crashedAt = count;
    }
    // Rocket has hit left or right of window
    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
      this.crashedAt = count;

    }
    // Rocket has hit top or bottom of window
    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
      this.crashedAt = count;

    }

    if(this.crashed && !this.crashUpdated){
      crashed+=1;//update the global crashed count defined in sketch.js
      this.crashUpdated=true;
    }

    if(this.completed && !this.completeUpdated){
      completed+=1;//update the global completed count defined in sketch.js
      this.completeUpdated=true;
    }


    //applies the random vectors defined in dna to consecutive frames of rocket
    this.applyForce(this.dna.genes[count]);
    // if rocket has not got to goal and not crashed then update physics engine
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }
  // displays rocket to window
  this.show = function() {
    // push and pop allow's rotating and translation not to affect other objects
    push();
    //color customization of rockets
    noStroke();
    // fill(255, 150);
    this.colorize();
    //translate to the postion of rocket
    translate(this.pos.x, this.pos.y);
    //rotatates to the angle the rocket is pointing
    rotate(this.vel.heading());
    //creates a rectangle shape for rocket
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }


  this.colorize = function(){
    // Checks distance from rocket to target
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    if(!this.crashed){
      if(d<=25 && !this.completed)
        fill('rgb(0,255,0)'); //blue
      else if(d<=25 && !this.completed)
        fill(color(0, 0, 255)); //green
      else if(d>25 && d<=200)
        fill(255, 204, 0) //yellow
      else
        fill(255,150); //white
    }else{
      fill('red');
    }

    if(this.completed)fill(color(0, 0, 255)); 
  }

}