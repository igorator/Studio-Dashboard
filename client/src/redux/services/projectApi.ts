import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['ProjectList'],
  endpoints: (builder) => ({
    getProjectById: builder.query({
      query: (id) => `projects/${id}`,
    }),
    getProjects: builder.query({
      query: () => 'projects',
      providesTags: ['ProjectList'],
    }),
    addProject: builder.mutation({
      query: (newProject) => ({
        url: 'projects',
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['ProjectList'],
    }),
    editProject: builder.mutation({
      query: ({ id, updates }) => ({
        url: `projects/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['ProjectList'],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProjectList'],
    }),
    updateProjectOrder: builder.mutation({
      query: (projects) => ({
        url: 'projects/reorder',
        method: 'POST',
        body: projects,
      }),
      invalidatesTags: ['ProjectList'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectOrderMutation, // Добавляем хук для обновления порядка
} = projectApi;
