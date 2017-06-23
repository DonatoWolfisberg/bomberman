'use strict';

class Block {
	constructor(blockState, x = Infinity, y = Infinity) {
		this.blockState = blockState;
		this.x = x;
		this.y = y;
		this.ignitionTime = 0;
	}
}