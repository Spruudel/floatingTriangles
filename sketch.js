let debugging = false;

let particles = [];

let maxDistance = 78;

let grid;

let gridWidth;
let gridHeight;


function setup() {
    createCanvas(windowWidth, windowHeight);

    var number = 150; // Generated by using (1920*1200) / x = 70, as this seemed to be okay
    for (let i = 0; i < number; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

	gridWidth = ceil(windowWidth / maxDistance);
	gridHeight = ceil(windowHeight / maxDistance);



	updateGrid();

	//console.table(grid);

	//console.log(gridWidth);console.log(gridHeight);
}



function draw() {
    background(51);

	updateGrid();

	for (let i = 0; i < gridWidth; i++) {
		line(i * maxDistance, 0, i * maxDistance, windowHeight);

	}

	for (let i = 0; i < gridHeight; i++) {
		line(0, i * maxDistance, windowWidth, i * maxDistance);
	}


	for (let x = 0; x < gridWidth; x++) {
		for (let y = 0; y < gridHeight; y++) {
			text(grid[x][y].length, x * maxDistance + 10, y * maxDistance + 20);
		}
	}



	for (var i = 0; i < particles.length; i++) {
		if (particles[i].offScreen()) {
			particles.splice(i, 1);
			newParticle();
		}
	}

    for (var i = 0; i < particles.length; i++) {
        particles[i].move();
        noStroke();
        particles[i].show();
    }



    stroke(115, 100);
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

function updateGrid() {
	grid = [];

	for (let i = 0; i < gridWidth; i++) {
		grid.push([]);
		for (let k = 0; k < gridHeight; k++) {
			grid[i].push([]);
		}
	}

	for (let i = 0; i < particles.length; i++) {
		gridPos = particles[i].gridPos();

		grid[gridPos[0]][gridPos[1]].push(i);
	}
}
