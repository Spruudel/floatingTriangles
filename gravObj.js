function GravObj(pos, radius, color, alpha, angleDist, animSpeed) {
    this.pos = pos;
    this.r = radius;

    this.color = color;
    this.color.setAlpha(alpha);

    this.angleDistance = angleDist;
    this.nAnimParticles = floor(360 / this.angleDistance);
    this.animParticles = [];

    this.animSpeed = animSpeed;

    // assuming 60 FPS
    let animTime = 60 * this.animSpeed * 1000;
}

GravObj.prototype.gridPos = function() {
	let pX = floor(this.pos.x / MAX_DISTANCE);
	let pY = floor(this.pos.y / MAX_DISTANCE);

	if (pX < 0) pX = 0;
	if (pY < 0) pY = 0;

	return [pX, pY];
}

GravObj.prototype.show = function() {
	push();
	fill(this.color);
	ellipse(this.pos.x, this.pos.y, this.r);

	// for (let i = 0; i < this.animParticles.length; i++) {
	// 	this.animParticles[i].step();
	// 	// noStroke();
	// 	this.animParticles[i].show();
	// }
	pop();
}

// is only checking for particles in surrounding 3x3 square
GravObj.prototype.checkDist = function() {
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
