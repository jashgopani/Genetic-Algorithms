// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function Population() {
  // Array of rockets
  this.rockets = [];
  // Amount of rockets
  this.popsize = 200;
 
  // Associates a rocket to an array index
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {

    var maxfit = 0;
    // Iterate through all rockets and calcultes their fitness
    for (var i = 0; i < this.popsize; i++) {
      // Calculates fitness
      this.rockets[i].calcFitness();
      // If current fitness is greater than max, then make max equal to current
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }


    // Normalises fitnesses
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

  }

  this.acceptOrReject = function(){
    var hack = 0;
    //Accept or reject

    while(true){
      hack+=1;

      var index = floor(random(this.popsize));
      var R = random(1);

      if(R < this.rockets[index].fitness){
        // console.log("Parent = "+this.rockets[index].fitness);
        return this.rockets[index];
      }

      if(hack > 10000){
        console.log("Hacked");
        return this.rockets[index];
      }
      // console.log(this.rockets[index]+" , "+index);
    }


  }

  // Selects appropriate genes for child
  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      // Picks random dna
      var parentA = this.acceptOrReject().dna;
      var parentB = this.acceptOrReject().dna;

      // Creates child by using crossover function
      var child = parentA.crossover(parentB);
      child.mutation();
      // Creates new rocket with child dna
      newRockets[i] = new Rocket(child);
    }
    // This instance of rockets are the new rockets
    this.rockets = newRockets;
  }

  // Calls for update and show functions
  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      // Displays rockets to screen
      this.rockets[i].show();
    }
  }
}