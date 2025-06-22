import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // 💥 Import logger

import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware, logger), // 💥 Added redux-logger here
});
