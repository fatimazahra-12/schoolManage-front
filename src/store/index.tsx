import { configureStore } from '@reduxjs/toolkit';
import salleReducer from './slices/salleslice';

export const store = configureStore({
  reducer: {
    salle: salleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
