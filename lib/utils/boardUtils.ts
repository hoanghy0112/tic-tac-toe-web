import { NONE } from '@/lib/constants/cellType';

export const isValid = (x: number, y: number, size: number): boolean => {
  if (x < 0 || y < 0) return false;
  if (x >= size || y >= size) return false;
  return true;
};

export const isEmpty = (x: number, y: number, boardMap: string[][]): boolean => {
  if (isValid(x, y, boardMap.length) && boardMap[x][y] === NONE) return true;
  else return false;
};

export const getValueOf = (x: number, y: number, boardMap: string[][]): string | number => {
  if (isValid(x, y, boardMap.length)) {
    return boardMap[x][y];
  } else return -1;
};

interface WinningState {
  isWin: boolean;
  isDraw?: boolean;
  winCells?: { x: number; y: number }[];
}

interface CurrentMove {
  x: number;
  y: number;
  type: string;
}

export const getWinningState = (
  boardMap: string[][],
  currentMove: CurrentMove,
  winPoint: number = 5
): WinningState => {
  if (currentMove.x === -1 || currentMove.y === -1) {
    return { isWin: false };
  }

  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];
  const reverses = [1, -1];

  const type = currentMove.type;

  for (const direction of directions) {
    let point = 1;
    const winCells: { x: number; y: number }[] = [];

    winCells.push({
      x: currentMove.x,
      y: currentMove.y,
    });

    for (const reverse of reverses) {
      let nextX = currentMove.x + reverse * direction[0];
      let nextY = currentMove.y + reverse * direction[1];

      while (getValueOf(nextX, nextY, boardMap) === type) {
        winCells.push({
          x: nextX,
          y: nextY,
        });

        nextX += reverse * direction[0];
        nextY += reverse * direction[1];

        point++;
      }
    }
    if (point >= winPoint) {
      return {
        isWin: true,
        winCells,
      };
    }
  }

  return { isWin: false };
};
