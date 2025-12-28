import { NONE } from '@/lib/constants/cellType';

/**
 * Bot move decision interface
 */
export interface BotMove {
  x: number;
  y: number;
}

/**
 * Board data interface for bot decision making
 */
export interface BoardData {
  boardMap: string[][];
  currentMove: {
    x: number;
    y: number;
    type: string;
  };
  boardSize: number;
}

/**
 * Get all empty cells on the board
 */
const getEmptyCells = (boardMap: string[][]): BotMove[] => {
  const emptyCells: BotMove[] = [];
  
  for (let x = 0; x < boardMap.length; x++) {
    for (let y = 0; y < boardMap[x].length; y++) {
      if (boardMap[x][y] === NONE) {
        emptyCells.push({ x, y });
      }
    }
  }
  
  return emptyCells;
};

/**
 * Get the bot's next move based on the current board state.
 * 
 * Currently implements a random move strategy.
 * You can replace this implementation with a more sophisticated algorithm
 * (e.g., Minimax, Alpha-Beta pruning, or ML-based) later.
 * 
 * @param boardData - The current state of the board including:
 *   - boardMap: 2D array representing the board
 *   - currentMove: The last move made (with x, y, and type)
 *   - boardSize: The size of the board
 * @returns The bot's chosen move (x, y coordinates), or null if no valid move exists
 */
export const getBotMove = (boardData: BoardData): BotMove | null => {
  const { boardMap } = boardData;
  
  // Get all available empty cells
  const emptyCells = getEmptyCells(boardMap);
  
  // If no empty cells, return null
  if (emptyCells.length === 0) {
    return null;
  }
  
  // Random strategy: pick a random empty cell
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};
