function Sun(x, y) {
	this.pos = createVector(x, y);
	this.r = 20;
	this.alpha = 225;

	this.angleDistance = 40;
	this.nAnimParticles = floor(360 / this.angleDistance);
	this.nAnimParticleWaves = 20;
	this.animParticles = [];

	this.animSpeed = 0.007;

	this.createParticles = function(offset) {
		for (let i = 0; i < this.nAnimParticles; i++) {
			let curAngle = (this.angleDistance * i) % 360;
			this.animParticles.push(new SunAnimParticle(this, curAngle, offset));
		}
	}

	this.gridPos = function() {
		let pX = floor(this.pos.x / maxDistance);
		let pY = floor(this.pos.y / maxDistance);

		if (pX < 0) pX = 0;
		if (pY < 0) pY = 0;

		return [pX, pY];
	}

	this.show = function() {
		push();
		let sunyellow = color('#FFCC00');
		fill(sunyellow, this.alpha);
		ellipse(this.pos.x, this.pos.y, this.r);

		for (let i = 0; i < this.animParticles.length; i++) {
			this.animParticles[i].step();
			// noStroke();
			this.animParticles[i].show();
		}
		pop();
	}

	// is only checking for particles in surrounding 3x3 square
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
			if (distance < maxDistance && distance > 0.01) {
				neighbours.push(toCheck[i]);
			}
		}

		return neighbours;
	}


	// actual stuff being done

	// assuming 60 FPS
	let animTime = 60 * this.animSpeed * 1000;

	for (let i = 0; i < this.nAnimParticleWaves; i++) {
		this.createParticles((1 / this.nAnimParticleWaves) * i);
	}
}

function SunAnimParticle(parent, angle, offset) {
	this.parent = parent;

	this.animSpeed = this.parent.animSpeed;

	//initial values
	this.steps = 0 + offset;

	this.init_angle = angle; // >> angle + 100°
	this.init_size = 4; // >> 0
	this.init_r = 0; // >> this.parent.r * 2
	this.init_alpha = this.parent.alpha; // >> 0

	// plan: vortex-like animation of many particles, which is one motion in a circle overlayed with r increasing. furthermore the size / alpha value decrease
	this.max_angle = angle + 150;
	this.max_r = this.parent.r * 3;

	// variables that are to be changed
	this.angle = this.init_angle;
	this.r = this.init_r;
	this.size = this.init_size;
	this.alpha = this.init_alpha;

	this.pos = createVector(this.parent.pos.x + ((this.parent.r + this.r) / 2 - this.size / 2) * cos(this.angle), this.parent.pos.y + ((this.parent.r + this.r) / 2 - this.size / 2) * sin(this.angle));

	this.calcPos = function() {
		this.pos.set(this.parent.pos.x + ((this.parent.r + this.r) / 2 - this.size / 2) * cos(this.angle), this.parent.pos.y + ((this.parent.r + this.r) / 2 - this.size / 2) * sin(this.angle));
	}

	this.step = function() {
		this.angle = lerp(this.init_angle, this.max_angle, this.steps) % 360;
		this.r = lerp(this.init_r, this.max_r, this.steps);
		this.size = lerp(this.init_size, 0, this.steps);
		this.alpha = lerp(this.init_alpha, 0, this.steps);


		this.calcPos();
		this.steps = this.steps + this.animSpeed >= 1 ? 0 : this.steps + this.animSpeed;
	}

	this.show = function() {
		push();
		noStroke();
		fill(255, 204, 0, this.alpha);
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
		pop();
	}
}