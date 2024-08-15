import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  darkMode: JSON.parse(sessionStorage.getItem('darkMode') || 'true'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      sessionStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload;
      sessionStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.darkMode;

export default themeSlice.reducer;
