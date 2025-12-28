import { configureStore } from '@reduxjs/toolkit';
import configurationSlice from './slices/configurationSlice';
import boardMapSlice from './slices/boardMapSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      configuration: configurationSlice,
      board: boardMapSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
