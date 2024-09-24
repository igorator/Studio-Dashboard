import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '../../data/types';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['ProjectList'],
  endpoints: (builder) => ({
    getProjectById: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
    }),
    getProjects: builder.query<Project[], void>({
      query: () => 'projects',
      providesTags: ['ProjectList'],
    }),
    addProject: builder.mutation<Project, Partial<Project>>({
      query: (newProject) => ({
        url: 'projects',
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['ProjectList'],
    }),
    editProject: builder.mutation<
      Project,
      { id: string; updates: Partial<Project> }
    >({
      query: ({ id, updates }) => ({
        url: `projects/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['ProjectList'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProjectList'],
    }),
  }),
});

export const {
  useGetProjectByIdQuery,
  useGetProjectsQuery,
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
