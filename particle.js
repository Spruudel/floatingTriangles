function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.1, 0.6));
    this.r = 3;
    this.alpha = 150;

    this.move = function() {
        this.pos.add(this.vel);
    }

    this.show = function() {
        fill(0, 0, 0, this.alpha);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    this.offScreen = function() {
        if (this.pos.x + this.r < 0 || this.pos.x - this.r > width || this.pos.y + this.r < 0 || this.pos.y - this.r > height) {
            return true;
        } else {
            return false;
        }
    }

    this.checkDist = function() {
        var neighbours = [];

        for (i = 0; i < particles.length; i++) {
            var distance = dist(this.pos.x, this.pos.y, particles[i].pos.x, particles[i].pos.y);
            if (distance < maxDistance && distance > 0) {
                neighbours.push(i);
            }
        }

        return neighbours;
    }
}
