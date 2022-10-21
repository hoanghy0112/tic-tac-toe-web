import { createSlice } from '@reduxjs/toolkit';

import * as GAME_MODE from 'renderer/constants/configuration/gameMode';
import * as BOARD_SIZE from 'renderer/constants/configuration/boardSize';

const configurationSlice = createSlice({
	name: 'configuration',
	initialState: {
		gameMode: GAME_MODE.OFFLINE,
		boardSize: BOARD_SIZE.MAP_3,
	},
	reducers: {
		setGameMode: (state, action) => {
			state.gameMode = action.payload;
		},
		setBoardSize: (state, action) => {
			state.boardSize = action.payload;
		},
	},
});

export const { setGameMode, setBoardSize } = configurationSlice.actions;

export const gameModeSelector = (state) => state.configuration.gameMode;
export const boardSizeSelector = (state) => state.configuration.boardSize;
export const configurationSelector = (state) => state.configuration;

export default configurationSlice.reducer;
