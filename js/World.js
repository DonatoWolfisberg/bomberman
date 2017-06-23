'use strict';

class World {
	constructor(size) {
		this.size = size;
		this.rowCount = 13;
		this.blockSize = this.size / this.rowCount;
		this.gameField = this.generateGameField();
	}

	generateGameField() {
		let gameField = [];
		for (let x = 0; x < this.rowCount; x++) {
			gameField[x] = [];
			for (let y = 0; y < this.rowCount; y++) {
				if (y % 2 !== 0 && x % 2 !== 0) {
					gameField[x][y] = new Block(BLOCKSTATE.INDESTRUCTIBLE, x, y);
				} else {
					gameField[x][y] = new Block(BLOCKSTATE.DESTRUCTIBLE, x, y);
				}
			}
		}


		gameField[0][0] = new Block(BLOCKSTATE.EMPTY, 0, 0);
		gameField[1][0] = new Block(BLOCKSTATE.EMPTY, 1, 0);
		gameField[0][1] = new Block(BLOCKSTATE.EMPTY, 0, 1);

		gameField[this.rowCount - 1][this.rowCount - 1] = new Block(BLOCKSTATE.EMPTY, this.rowCount - 1, this.rowCount - 1);
		gameField[this.rowCount - 2][this.rowCount - 1] = new Block(BLOCKSTATE.EMPTY, this.rowCount - 2, this.rowCount - 1);
		gameField[this.rowCount - 1][this.rowCount - 2] = new Block(BLOCKSTATE.EMPTY, this.rowCount - 1, this.rowCount - 2);

		return gameField;
	}

	getBlockAt(x, y) {
		if (this.rowCount - 1 < x || this.rowCount - 1 < y ||
			x < 0 || y < 0 ) {
			return new Block(BLOCKSTATE.OUTOFGAME)
		} else {
			return this.gameField[x][y];
		}
	}
}