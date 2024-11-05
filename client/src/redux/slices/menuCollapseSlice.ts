import { createSlice } from '@reduxjs/toolkit';

type CollapseState = {
  collapsed: boolean;
};

const initialState: CollapseState = {
  collapsed: JSON.parse(sessionStorage.getItem('collapsed') || 'false'),
};

const collapseSlice = createSlice({
  name: 'collapse',
  initialState,
  reducers: {
    toggleCollapse: (state) => {
      state.collapsed = !state.collapsed;
      sessionStorage.setItem('collapsed', JSON.stringify(state.collapsed));
    },
    setCollapse: (state, action) => {
      state.collapsed = action.payload;
      sessionStorage.setItem('collapsed', JSON.stringify(state.collapsed));
    },
  },
});

export const { toggleCollapse, setCollapse } = collapseSlice.actions;

export default collapseSlice.reducer;
