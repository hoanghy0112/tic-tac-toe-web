'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as GAME_MODE from '@/lib/constants/gameMode';
import * as BOARD_SIZE from '@/lib/constants/boardSize';

interface ConfigurationState {
  gameMode: string;
  boardSize: number;
}

const initialState: ConfigurationState = {
  gameMode: GAME_MODE.OFFLINE,
  boardSize: BOARD_SIZE.MAP_3,
};

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setGameMode: (state, action: PayloadAction<string>) => {
      state.gameMode = action.payload;
    },
    setBoardSize: (state, action: PayloadAction<number>) => {
      state.boardSize = action.payload;
    },
  },
});

export const { setGameMode, setBoardSize } = configurationSlice.actions;

export const gameModeSelector = (state: { configuration: ConfigurationState }) =>
  state.configuration.gameMode;
export const boardSizeSelector = (state: { configuration: ConfigurationState }) =>
  state.configuration.boardSize;
export const configurationSelector = (state: { configuration: ConfigurationState }) =>
  state.configuration;

export default configurationSlice.reducer;
