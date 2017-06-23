'use strict';

class Bomb {
	// The block the bomb is on
	get block() {
		return this.world.getBlockAt(this.x, this.y);
	}

	constructor(x, y, player, world) {
		this.x = x;
		this.y = y;
		this.range = 4;
		this.player = player;
		this.world = world;
		this.radious = this.world.blockSize / 1.7 / 2;
		this.block.addEntity(this);
		this.ignitionTime = 0;
		this.power = 2;

		this.fireBlocks = [];

		this.wasDestroied = false;
		this.updateInterval = setInterval(() => {
			if (this.block.blockState === BLOCKSTATE.FIRE) {
			    this.wasDestroied = true;
				this.block.removeEntity(this);
				this.player.bombs.splice(this.player.bombs.indexOf(this), 1);
			}
		},30);


		setTimeout(() => {
			clearInterval(this.updateInterval);
			if (this.wasDestroied) {
			    return;
			}
			this.ignitionTime = Date.now();
			this.player.bombs.splice(this.player.bombs.indexOf(this), 1);
			this.searchBlocks(DIRECTION.UP);
			this.searchBlocks(DIRECTION.DOWN);
			this.searchBlocks(DIRECTION.LEFT);
			this.searchBlocks(DIRECTION.RIGHT);
			this.block.blockState = BLOCKSTATE.FIRE;
			this.block.ignitionTime = this.ignitionTime;
			this.fireBlocks.push(this.block);
			this.block.removeEntity(this);
			setTimeout(()=>{this.extinguishFire()},1000);
		}, (Math.floor(Math.random() * 5) + 3) * 1000)
	}


	extinguishFire() {
		for (let block of this.fireBlocks)
		{
			if (block.ignitionTime === this.ignitionTime) {
				block.blockState = BLOCKSTATE.EMPTY;
			}
		}
	}

	searchBlocks(direction) {
		let brokenBlocks = 0;
		for (let i = 1; i <= this.range; i++) {
			let block;
			if (direction === DIRECTION.UP) {
				block = this.world.getBlockAt(this.x, this.y - i);
			} else if (direction === DIRECTION.DOWN) {
				block = this.world.getBlockAt(this.x, this.y + i);
			} else if (direction === DIRECTION.LEFT) {
				block = this.world.getBlockAt(this.x - i, this.y);
			} else if (direction === DIRECTION.RIGHT) {
				block = this.world.getBlockAt(this.x + i, this.y);
			}

			if (block.blockState === BLOCKSTATE.OUTOFGAME ||
				block.blockState === BLOCKSTATE.INDESTRUCTIBLE) {
				return;
			} else if(block.blockState === BLOCKSTATE.DESTRUCTIBLE) {
				block.blockState = BLOCKSTATE.FIRE;
				block.ignitionTime = this.ignitionTime;
				this.fireBlocks.push(block);
				brokenBlocks++;
				if (brokenBlocks >= this.power) {
				    return;
				}
			} else {
				block.blockState = BLOCKSTATE.FIRE;
				block.ignitionTime = this.ignitionTime;
				this.fireBlocks.push(block);
			}
		}
	}

}