'use strict';

class Player {
	get x() { return Math.floor(this.xCord / this.world.blockSize); }
	set x(value) { this.xCord = this.world.blockSize * value + this.world.blockSize / 2; }

	get y() { return Math.floor(this.yCord / this.world.blockSize); }
	set y(value) { this.yCord = this.world.blockSize * value + this.world.blockSize / 2; }


	constructor(world, playerNum) {
		this.world = world;
		this.playerNum = playerNum;
		this.size = this.world.blockSize / 2;
		this.speed = 10;
		this.yCord = 100;
		this.xCord = 100;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.bombs = [];
		this.bombColldownTime = 3000;
		this.lastBombDrop = 0;
		this.gotoStartCoordinate();

		setInterval(() => {
			let xCord = this.xCord + this.xSpeed;
			let yCord = this.yCord + this.ySpeed;

			let touchingBlocks = [];

			touchingBlocks.push(this.world.getBlockAt(
				Math.floor((xCord - this.size / 2) / this.world.blockSize),
				Math.floor((yCord - this.size / 2) / this.world.blockSize)
			));
			touchingBlocks.push(this.world.getBlockAt(
				Math.floor((xCord + this.size / 2) / this.world.blockSize),
				Math.floor((yCord - this.size / 2) / this.world.blockSize),
			));
			touchingBlocks.push(this.world.getBlockAt(
				Math.floor((xCord - this.size / 2) / this.world.blockSize),
				Math.floor((yCord + this.size / 2) / this.world.blockSize),
			));
			touchingBlocks.push(this.world.getBlockAt(
				Math.floor((xCord + this.size / 2) / this.world.blockSize),
				Math.floor((yCord + this.size / 2) / this.world.blockSize),
			));

			for (let block of touchingBlocks) {
				if (block.blockState === BLOCKSTATE.BOMB) {
					if (!(block.x === this.x && block.y === this.y)) {
						if (this.x - block.x < 0) { // true  bombe rechts von spieler Rechts
							if (this.xSpeed === 1) {
								this.xSpeed = 0;
								this.ySpeed = 0;
								return;
							}
						} else {
							if (this.xSpeed === -1) {
								this.xSpeed = 0;
								this.ySpeed = 0;
								return;
							}
						}
						if (this.y - block.y < 0) { // true  bombe rechts von spieler Rechts
							if (this.ySpeed === 1) {
								this.xSpeed = 0;
								this.ySpeed = 0;
								return;
							}
						} else {
							if (this.ySpeed === -1) {
								this.xSpeed = 0;
								this.ySpeed = 0;
								return;
							}
						}
					}
				} else if (block.blockState === BLOCKSTATE.FIRE) {
					console.log('you die');
					return;
				} else if (block.blockState !== BLOCKSTATE.EMPTY) {
					this.xSpeed = 0;
					this.ySpeed = 0;
				    return;
				}
			}

			this.yCord = yCord;
			this.xCord = xCord;
		}, this.speed)

	}

	dropBomb() {
		if (Date.now() < this.lastBombDrop + this.bombColldownTime) {
		    return;
		}
		if (this.world.getBlockAt(this.x, this.y).blockState === BLOCKSTATE.EMPTY) {
			this.lastBombDrop = Date.now();
			this.bombs.push(new Bomb(this.x, this.y, this, this.world));
			console.log('droppig');
		}
	}


	gotoStartCoordinate() {
		if (this.playerNum === 1) {
			this.yCord = this.world.blockSize / 2;
			this.xCord = this.world.blockSize / 2;
		} else {
			this.yCord = this.world.blockSize * (this.world.rowCount - 1) + this.world.blockSize / 2;
			this.xCord = this.world.blockSize * (this.world.rowCount - 1) + this.world.blockSize / 2;
		}
	}
}