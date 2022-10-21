import { createSlice } from '@reduxjs/toolkit';

import * as BOARD_SIZE from 'renderer/constants/configuration/boardSize';
import * as CELL_TYPE from 'renderer/constants/board/cellType';

import { isValid, isEmpty, getWinningState } from '../boardMap/utils';

const boardMapSlice = createSlice({
	name: 'board',
	initialState: {
		previousMove: [],
		boardMap: [],
		currentMove: {
			x: -1,
			y: -1,
			type: CELL_TYPE.X,
		},
		isWin: false,
	},
	reducers: {
		initializeMap: (state, action) => {
			const size = action.payload;
			state.boardMap = [
				...Array(size).fill([...Array(size).fill(CELL_TYPE.NONE)]),
			];
			state.currentMove = {
				x: -1,
				y: -1,
				type: CELL_TYPE.X,
			};
			state.isNew = false;
			state.previousMove = [];
		},
		makeNewMove: (state, action) => {
			const [x, y] = action.payload;
			const type =
				state.currentMove.type == CELL_TYPE.X ? CELL_TYPE.O : CELL_TYPE.X;
			if (isValid(x, y, state.boardSize) && isEmpty(x, y, state.boardMap)) {
				state.previousMove.push({
					boardMap: JSON.parse(JSON.stringify(state.boardMap)),
					currentMove: state.currentMove,
				});
				state.boardMap[x][y] = type;
				state.currentMove = { x, y, type };
			}
		},
		moveBack: (state, action) => {
			const {boardMap, currentMove} = state.previousMove.pop();
			state.boardMap = boardMap;
			state.currentMove = currentMove;
		}
	},
});

export const { initializeMap, makeNewMove, moveBack } = boardMapSlice.actions;

export const boardMapSelector = (state) => state.board.boardMap;
export const currentMoveSelector = state => state.board.currentMove;
export const previousMoveSelector = state => {
	console.log(JSON.stringify(state.board.previousMove) == JSON.stringify([]));
	return (JSON.stringify(state.board.previousMove) != JSON.stringify([]));
}
export const winningStateSelector = (state) => {
	const { boardMap, currentMove } = state.board;

	const boardSize = boardMap.length;
	const winPoint = (() => {
		switch (boardSize) {
			case BOARD_SIZE.MAP_3:
				return 3;
			case BOARD_SIZE.MAP_10, BOARD_SIZE.MAP_13:
				return 5;
		}
	})();
	const winningState = getWinningState(boardMap, currentMove, winPoint);
	if (!winningState.isWin) {
		if (currentMove.x == undefined) return {
			isWin: false
		}

		let isEmpty = true;
		boardMap.forEach(row => row.forEach(cell => { if (cell == CELL_TYPE.NONE) { isEmpty = false } }));
		if (isEmpty) {
			return {
				isWin: true,
				isDraw: true
			}
		}
	}

	return winningState;
}
export const cellSelector = (x, y) => (state) => {
	if (isValid(x, y, state.board.boardSize)) return state.board.boardMap[x][y];
	return CELL_TYPE.INVALID;
};

export default boardMapSlice.reducer;
