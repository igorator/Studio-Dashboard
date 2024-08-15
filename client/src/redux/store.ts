import { configureStore } from '@reduxjs/toolkit';
import collapseReducer from './slices/menuCollapseSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
