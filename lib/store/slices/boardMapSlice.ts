'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as BOARD_SIZE from '@/lib/constants/boardSize';
import * as CELL_TYPE from '@/lib/constants/cellType';
import { isValid, isEmpty, getWinningState } from '@/lib/utils/boardUtils';

interface CurrentMove {
  x: number;
  y: number;
  type: string;
}

interface PreviousState {
  boardMap: string[][];
  currentMove: CurrentMove;
}

interface BoardState {
  previousMove: PreviousState[];
  boardMap: string[][];
  currentMove: CurrentMove;
  isWin: boolean;
}

const initialState: BoardState = {
  previousMove: [],
  boardMap: [],
  currentMove: {
    x: -1,
    y: -1,
    type: CELL_TYPE.X,
  },
  isWin: false,
};

const boardMapSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initializeMap: (state, action: PayloadAction<number>) => {
      const size = action.payload;
      state.boardMap = Array(size)
        .fill(null)
        .map(() => Array(size).fill(CELL_TYPE.NONE));
      state.currentMove = {
        x: -1,
        y: -1,
        type: CELL_TYPE.X,
      };
      state.isWin = false;
      state.previousMove = [];
    },
    makeNewMove: (state, action: PayloadAction<[number, number]>) => {
      const [x, y] = action.payload;
      const type = state.currentMove.type === CELL_TYPE.X ? CELL_TYPE.O : CELL_TYPE.X;
      if (isValid(x, y, state.boardMap.length) && isEmpty(x, y, state.boardMap)) {
        state.previousMove.push({
          boardMap: JSON.parse(JSON.stringify(state.boardMap)),
          currentMove: state.currentMove,
        });
        state.boardMap[x][y] = type;
        state.currentMove = { x, y, type };
      }
    },
    moveBack: (state) => {
      const previous = state.previousMove.pop();
      if (previous) {
        state.boardMap = previous.boardMap;
        state.currentMove = previous.currentMove;
      }
    },
  },
});

export const { initializeMap, makeNewMove, moveBack } = boardMapSlice.actions;

export const boardMapSelector = (state: { board: BoardState }) => state.board.boardMap;
export const currentMoveSelector = (state: { board: BoardState }) => state.board.currentMove;
export const previousMoveSelector = (state: { board: BoardState }) => {
  return state.board.previousMove.length > 0;
};
export const winningStateSelector = (state: { board: BoardState }) => {
  const { boardMap, currentMove } = state.board;

  const boardSize = boardMap.length;
  const winPoint = (() => {
    switch (boardSize) {
      case BOARD_SIZE.MAP_3:
        return 3;
      case BOARD_SIZE.MAP_10:
      case BOARD_SIZE.MAP_13:
        return 5;
      default:
        return 5;
    }
  })();
  
  const winningState = getWinningState(boardMap, currentMove, winPoint);
  if (!winningState.isWin) {
    if (currentMove.x === undefined || currentMove.x === -1) {
      return { isWin: false };
    }

    let hasEmpty = false;
    boardMap.forEach((row) =>
      row.forEach((cell) => {
        if (cell === CELL_TYPE.NONE) {
          hasEmpty = true;
        }
      })
    );
    if (!hasEmpty) {
      return {
        isWin: true,
        isDraw: true,
      };
    }
  }

  return winningState;
};

export default boardMapSlice.reducer;
