'use strict';

class Player {
	get x() {
		return Math.floor(this.xCord / this.world.blockSize);
	}
	set x(value) { this.xCord = this.world.blockSize * value + this.world.blockSize / 2; }

	get y() { return Math.floor(this.yCord / this.world.blockSize); }
	set y(value) { this.yCord = this.world.blockSize * value + this.world.blockSize / 2; }

	get xCord() { return this._xCord; }
	set xCord(value) {
		if (Math.floor(value / this.world.blockSize) !== this.x) {
			this.world.getBlockAt(this.x, this.y).removeEntity(this);
			this.world.getBlockAt(Math.floor(value / this.world.blockSize), this.y).addEntity(this)
		}
		this._xCord = value;
	}

	get yCord() { return this._yCord; }
	set yCord(value) {
		if (Math.floor(value / this.world.blockSize) !== this.y) {
			this.world.getBlockAt(this.x, this.y).removeEntity(this);
			this.world.getBlockAt(this.x, Math.floor(value / this.world.blockSize)).addEntity(this)
		}
		this._yCord = value;
	}

	get ownBlock() {
		return this.world.getBlockAt(this.x, this.y);
	}

	constructor(world, playerNum) {
		this._xCord = Infinity;
		this._yCord = Infinity;

		this.world = world;
		this.playerNum = playerNum;
		this.size = this.world.blockSize / 2;
		this.speed = 10;
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
				if(block.hasBombOnBlock() && this.ownBlock !== block) {
					if (this.x - block.x < 0 && this.xSpeed === 1) { // true  bombe rechts von spieler Rechts
						this.xSpeed = 0;
						this.ySpeed = 0;
						return;
					} else if (this.x - block.x > 0 && this.xSpeed === -1) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						return;
					}
					if (this.y - block.y < 0 && this.ySpeed === 1) { // true  bombe Oben von spieler Rechts
						this.xSpeed = 0;
						this.ySpeed = 0;
						return;
					} else if (this.y - block.y > 0 && this.ySpeed === -1) {
						this.xSpeed = 0;
						this.ySpeed = 0;
						return;
					}
				}

				if (block.blockState === BLOCKSTATE.FIRE) {
					console.log('Player ' + this.playerNum + ' Died');
					return;
				}

				if (
					block.blockState === BLOCKSTATE.INDESTRUCTIBLE ||
					block.blockState === BLOCKSTATE.DESTRUCTIBLE ||
					block.blockState === BLOCKSTATE.OUTOFGAME
					) {
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
			console.log('Player: ' + this.playerNum + ' dropped a Bomb');
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
