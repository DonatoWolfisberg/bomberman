'use strict';

class Painter {
	constructor(ctx, world, players) {
		this.ctx = ctx;
		this.world = world;
		this.players = players;


		setInterval(() => {
			for (let coll of this.world.gameField) {
				for (let block of coll) {
					if (block.blockState === BLOCKSTATE.EMPTY) {
						this.ctx.fillStyle="#bbffba";
					} else if (block.blockState === BLOCKSTATE.DESTRUCTIBLE) {
						this.ctx.fillStyle="#86b8ff";
					} else if (block.blockState === BLOCKSTATE.INDESTRUCTIBLE) {
						this.ctx.fillStyle="#011833";
					} else if (block.blockState === BLOCKSTATE.BOMB) {
						this.ctx.fillStyle="#bbffba";
					} else if (block.blockState === BLOCKSTATE.FIRE) {
						this.ctx.fillStyle="#fffd2b";
					}
					ctx.fillRect(block.x * this.world.blockSize, block.y * this.world.blockSize, this.world.blockSize, this.world.blockSize);
				}
			}

			for (let player of this.players) {
				this.ctx.fillStyle="#ff0000";
				ctx.fillRect(player.xCord - player.size / 2, player.yCord - player.size / 2, player.size, player.size);
				for (let bomb of player.bombs) {
					ctx.beginPath();
					this.ctx.fillStyle="#000000";
					ctx.arc(
						bomb.x * this.world.blockSize + this.world.blockSize / 2,
						bomb.y * this.world.blockSize + this.world.blockSize / 2,
						bomb.radious,
						0, 2*Math.PI);
					ctx.fill();
				}
			}
		}, 32);
	}
}