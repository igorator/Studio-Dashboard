import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '../../data/types';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getProjectById: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
    }),
    getProjects: builder.query<Project[], void>({
      query: () => 'projects',
    }),
    addProject: builder.mutation<Project, Partial<Project>>({
      query: (newProject) => ({
        url: 'projects',
        method: 'POST',
        body: newProject,
      }),
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
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
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
