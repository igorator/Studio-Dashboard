import { configureStore } from '@reduxjs/toolkit';
import collapseReducer from './slices/menuCollapseSlice';
import themeReducer from './slices/themeSlice';
import projectReducer from './slices/projectSlice';

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
    theme: themeReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
