var particles = [];

function setup() {
    var number = Math.floor((windowWidth * windowHeight) / 32914);  // Generated by (1920*1200) / x = 70, as this seemed to be okay

    createCanvas(windowWidth, windowHeight);

    noStroke();
    for (var i = 0; i < number; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
      background(235);

      for (var i = 0; i < particles.length; i++) {
          noStroke();
          particles[i].move();
          particles[i].show();
      }

      for (var i = 0; i < particles.length; i++) {
          if (particles[i].offScreen()) {
              particles.splice(i, 1);
              newParticle();
          }
      }

      stroke(100, 100);
      for (var i = 0; i < particles.length; i++) {
          var neighbours = particles[i].checkDist();
          if (neighbours.length > 0) {
              for (var j = 0; j < neighbours.length; j++) {
                  line(particles[i].pos.x, particles[i].pos.y, particles[neighbours[j]].pos.x, particles[neighbours[j]].pos.y);
              }
          }
      }
}

function newParticle() {
    particles.push(new Particle(random(width), random(height)));
}