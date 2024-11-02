import { configureStore } from '@reduxjs/toolkit';
import collapseReducer from './slices/menuCollapseSlice';
import themeReducer from './slices/themeSlice';
import { projectApi } from './services/projectApi';
import { leadApi } from './services/leadApi';
import { offerApi } from './services/offerApi';
import { teamMemberApi } from './services/teamApi';
import { userApi } from './services/userApi';

export const store = configureStore({
  reducer: {
    collapse: collapseReducer,
    theme: themeReducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer,
    [teamMemberApi.reducerPath]: teamMemberApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectApi.middleware)
      .concat(leadApi.middleware)
      .concat(offerApi.middleware)
      .concat(teamMemberApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
