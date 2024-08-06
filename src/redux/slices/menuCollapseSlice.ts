import { createSlice } from '@reduxjs/toolkit';

type CollapseState = {
  collapsed: boolean;
};

const initialState: CollapseState = {
  collapsed: false,
};

const collapseSlice = createSlice({
  name: 'collapse',
  initialState,
  reducers: {
    toggleCollapse: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { toggleCollapse } = collapseSlice.actions;

export default collapseSlice.reducer;
