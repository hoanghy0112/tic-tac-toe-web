import { NONE } from 'renderer/constants/board/cellType';

export const isValid = (x, y, size) => {
	if (x < 0 || y < 0) return false;
	if (x >= size || y >= size) return false;
	return true;
};

export const isEmpty = (x, y, boardMap) => {
	if (isValid(x, y, boardMap.length) && boardMap[x][y] == NONE) return true;
	else return false;
};

export const getValueOf = (x, y, boardMap) => {
	if (isValid(x, y, boardMap.length)) {
		return boardMap[x][y];
	} else return -1;
}

export const getWinningState = (boardMap, currentMove, winPoint = 5) => {
	if (currentMove.x == -1 || currentMove.y == -1) return {
		isWin: false,
	}

	const directions = [
		[1, 0],
		[1, 1],
		[0, 1],
		[-1, 1],
	];
	const reverses = [1, -1];

	const type = currentMove.type;

	for (let direction of directions) {
		let point = 1;
		let winCells = [];

		winCells.push({
			x: currentMove.x,
			y: currentMove.y,
		})

		for (let reverse of reverses) {
			let nextX = currentMove.x + reverse * direction[0];
			let nextY = currentMove.y + reverse * direction[1];

			while (getValueOf(nextX, nextY, boardMap) == type) {
				winCells.push({
					x: nextX,
					y: nextY,
				})

				nextX += reverse * direction[0];
				nextY += reverse * direction[1];

				point++;
			}
			// point--;
		}
		if (point >= winPoint) {
			return {
				isWin: true,
				winCells,
			}
		}
	}

	return {
		isWin: false
	}
};
