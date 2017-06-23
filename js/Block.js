'use strict';

class Block {
	constructor(blockState, x = Infinity, y = Infinity) {
		this.blockState = blockState;
		this.x = x;
		this.y = y;
		this.ignitionTime = 0;
		this.entitysOnBlock = [];
	}

	hasBombOnBlock() {
		for (let entity of this.entitysOnBlock) {
			if (entity instanceof  Bomb) {
				return true;
			}
		}
		return false;
	}

	addEntity(entity) {
		this.entitysOnBlock.push(entity)
	}

	removeEntity(entity) {
		this.entitysOnBlock.splice(this.entitysOnBlock.indexOf(entity), 1);
	}
}