'use strict';

class Bomb {
	constructor(x, y, player, world) {
		this.x = x;
		this.y = y;
		this.range = 4;
		this.player = player;
		this.world = world;
		this.radious = this.world.blockSize / 1.7 / 2;
		this.world.gameField[this.x][this.y].blockState = BLOCKSTATE.BOMB;
		this.ignitionTime = 0;
		this.power = 2;

		this.fireBlocks = [];


		setTimeout(() => {
			this.ignitionTime = Date.now();
			this.player.bombs.splice(this.player.bombs.indexOf(this), 1);
			this.searchBlocks(DIRECTION.UP);
			this.searchBlocks(DIRECTION.DOWN);
			this.searchBlocks(DIRECTION.LEFT);
			this.searchBlocks(DIRECTION.RIGHT);
			this.world.getBlockAt(this.x, this.y).blockState = BLOCKSTATE.FIRE;
			this.world.getBlockAt(this.x, this.y).ignitionTime = this.ignitionTime;
			this.fireBlocks.push(this.world.getBlockAt(this.x, this.y));
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