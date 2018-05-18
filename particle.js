function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.1, 0.6));
    this.r = 3;
    this.alpha = 150;

	this.gridPos = function() {
		let pX = floor(this.pos.x / maxDistance);
		let pY = floor(this.pos.y / maxDistance);

		if (pX < 0) pX = 0;
		if (pY < 0) pY = 0;

		return [pX, pY];
	}

    this.move = function() {
        this.pos.add(this.vel);
    }

    this.show = function() {
        fill(255, this.alpha);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    this.offScreen = function() {
		let nextPos = this.pos.add(this.vel);

        if (nextPos.x <= 0 || nextPos.x >= width || nextPos.y <= 0 || nextPos.y >= height) {
            return true;
        } else {
            return false;
        }
    }

    this.checkDist = function() {
        let neighbours = [];
		let [gX, gY] = this.gridPos();
		let toCheck = [];

        for (let i of [-1, 0, 1])
            for (let j of [-1, 0, 1])
                if (inGrid(gX+i, gY+j)) {
                    let toPush = grid[gX + i][gY + j];
                    if (toPush != undefined)
                        toCheck = toCheck.concat(toPush);
                }

        for (i = 0; i < toCheck.length; i++) {
            var distance = dist(this.pos.x, this.pos.y, particles[toCheck[i]].pos.x, particles[toCheck[i]].pos.y);
            if (distance < maxDistance && distance > 0.01) {
                neighbours.push(toCheck[i]);
            }
        }

        return neighbours;
    }
}

function inGrid(x, y) {
    return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
}
