// projectSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjectById } from '../../api/projects/getProjectById';
import { ProjectState } from '../../data/types';

const initialState: ProjectState = {
  project: null,
  status: 'idle',
  error: null,
};

export const fetchProjectById = createAsyncThunk(
  'project/fetchProjectById',
  async (id: string) => {
    const response = await getProjectById(id);
    return response;
  },
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.project = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch project';
      });
  },
});

export default projectSlice.reducer;
