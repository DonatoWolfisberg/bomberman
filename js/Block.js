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
		console.log('remove');
		try {
			this.entitysOnBlock.splice(this.entitysOnBlock.indexOf(entity), 1);
		} catch (e) {
			console.log('failed removing entity');
		}
	}
}