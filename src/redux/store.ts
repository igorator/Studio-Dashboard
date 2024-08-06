import { configureStore } from '@reduxjs/toolkit';
import collapseReducer from './slices/menuCollapseSlice';

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
