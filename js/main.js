'use strict';

function main() {
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');

	let CanvasSize = setCanvasSize(canvas);
	let world = new World(CanvasSize);
	let players = [
		new Player(world, 1),
		new Player(world, 2)
	];
	setPlayerKeyBindings(players);
	let painter = new Painter(ctx, world, players);
}

function setPlayerKeyBindings(players) {
	document.onkeypress = (e) => {
		'use strict';
		switch (e.charCode) {
			case 32:
				players[0].dropBomb();
				break;
			case 13:
				players[1].dropBomb();
				break;
		}
	};


	document.onkeydown = (e) => {
		'use strict';
		switch (e.keyCode) {
			case 87:
				players[0].ySpeed = -1;
				break;
			case 83:
				players[0].ySpeed = 1;
				break;
			case 65:
				players[0].xSpeed = -1;
				break;
			case 68:
				players[0].xSpeed = 1;
				break;

			case 38:
				players[1].ySpeed = -1;
				break;
			case 40:
				players[1].ySpeed = 1;
				break;
			case 37:
				players[1].xSpeed = -1;
				break;
			case 39:
				players[1].xSpeed = 1;
				break;
		}
	};

	document.onkeyup = (e) => {
		'use strict';
		switch (e.keyCode) {
			case 87:
				players[0].ySpeed = 0;
				break;
			case 83:
				players[0].ySpeed = 0;
				break;
			case 65:
				players[0].xSpeed = 0;
				break;
			case 68:
				players[0].xSpeed = 0;
				break;

			case 38:
				players[1].ySpeed = 0;
				break;
			case 40:
				players[1].ySpeed = 0;
				break;
			case 37:
				players[1].xSpeed = 0;
				break;
			case 39:
				players[1].xSpeed = 0;
				break;
		}
	};
}


function setCanvasSize(canvas) {
	let width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

	let height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

	let CanvasSize = (width < height)? width: height;

	canvas.width = CanvasSize;
	canvas.height = CanvasSize;
	return CanvasSize;
}