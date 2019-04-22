Array.prototype.flatten = function() {
	var ret = [];
	for (var i = 0; i < this.length; i++) {
		if (Array.isArray(this[i])) {
			ret = ret.concat(this[i].flatten());
		} else {
			if (typeof this[i] != 'undefined') {
				ret.push(this[i]);
			}
		}
	}
	return ret;
};

function polarToCartDEG(r, phi) {
	let rad = map(phi, 0, 360, 0, TWO_PI);
	return createVector(r * Math.sin(rad), r * Math.cos(rad));
}