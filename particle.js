function Particle(x, y) {
	this.pos = createVector(x, y);
	this.vel = p5.Vector.random2D();
	this.vel.mult(random(0.1, 0.6));
	this.initR = 1.5;
	this.r = this.initR;
	this.alpha = 150;

	this.dyingRate = 0.1;
	this.dying = 1;

	this.gridPos = function() {
		let pX = floor(this.pos.x / MAX_DISTANCE);
		let pY = floor(this.pos.y / MAX_DISTANCE);

		if (pX < 0) pX = 0;
		if (pY < 0) pY = 0;

		return [pX, pY];
	}

	this.move = function() {
		this.pos.add(this.vel);
	}

	this.show = function() {
		fill(255, this.alpha);
		ellipse(this.pos.x, this.pos.y, this.r * 2);
	}

	this.offScreen = function() {
		let nextPos = this.pos.copy().add(this.vel);

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
				if (inGrid(gX + i, gY + j)) {
					let toPush = grid[0][gX + i][gY + j];
					if (toPush != undefined)
						toCheck = toCheck.concat(toPush);
				}

		for (i = 0; i < toCheck.length; i++) {
			var distance = dist(this.pos.x, this.pos.y, particles[toCheck[i]].pos.x, particles[toCheck[i]].pos.y);
			if (distance < MAX_DISTANCE && distance > 0.01) {
				neighbours.push(toCheck[i]);
			}
		}

		return neighbours;
	}
}

function inGrid(x, y) {
	return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
}