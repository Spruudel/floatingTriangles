function AnimParticle(pPos, pRadius, pAnimSpeed, color, pAlpha, angle, offset) {
	this.color = color;

	this.pPos = pPos;
	this.pRadius = pRadius;

	this.animSpeed = pAnimSpeed;

	//initial values
	this.steps = 0 + offset;

	this.init_angle = angle; // >> angle + 100°
	this.init_size = 4; // >> 0
	this.init_r = 0; // >> pRadius * 3
	this.init_alpha = pAlpha; // >> 0

	// plan: vortex-like animation of many particles, which is one motion in a circle overlayed with r increasing. furthermore the size / alpha value decrease
	this.max_angle = angle + 150;
	this.max_r = this.pRadius * 3;

	this.angle;
	this.r;
	this.size;
	this.updateVars();

	this.pos = getCartPos(this.r, this.angle, this.size, this.pPos, this.pRadius);
}

AnimParticle.prototype.step = function() {
	this.updateVars();
	this.calcPos();
	this.steps = (this.steps + this.animSpeed) % 1;
}

AnimParticle.prototype.updateVars = function() {
	this.angle = lerp(this.init_angle, this.max_angle, this.steps) % 360;
	this.r = lerp(this.init_r, this.max_r, this.steps);
	this.size = lerp(this.init_size, 0, this.steps);
	this.color.setAlpha(lerp(this.init_alpha, 0, this.steps));
}

AnimParticle.prototype.calcPos = function() {
	this.pos.set(getCartPos(this.r, this.angle, this.size, this.pPos, this.pRadius));
}

AnimParticle.prototype.show = function(ct) {
	ct.noStroke();
	ct.fill(this.color);
	ct.ellipse(this.pos.x, this.pos.y, this.size, this.size);
}

function getCartPos(r, angle, size, pPos, pR) {
	let v = polarToCartDEG((pR + r) / 2 - size / 2, angle);
	v.add(pPos.x, pPos.y);
	return v;
}