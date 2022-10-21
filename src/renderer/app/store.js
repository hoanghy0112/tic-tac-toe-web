import { configureStore } from '@reduxjs/toolkit';
import configurationSlice from 'renderer/features/configuration';
import boardMapSlice from 'renderer/features/boardMap';

export default configureStore({
	reducer: {
		configuration: configurationSlice,
		board: boardMapSlice,
	},
});
