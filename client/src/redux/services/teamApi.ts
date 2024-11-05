import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teamMemberApi = createApi({
  reducerPath: 'teamMemberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['TeamMemberList'],
  endpoints: (builder) => ({
    getTeamMemberById: builder.query({
      query: (id) => `team/${id}`,
    }),
    getTeamMembers: builder.query({
      query: () => 'team',
      providesTags: ['TeamMemberList'],
    }),
    addTeamMember: builder.mutation({
      query: (newMember) => ({
        url: 'team',
        method: 'POST',
        body: newMember,
      }),
      invalidatesTags: ['TeamMemberList'],
    }),
    editTeamMember: builder.mutation({
      query: ({ id, updates }) => ({
        url: `team/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['TeamMemberList'],
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `team/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TeamMemberList'],
    }),
    reorderTeamMembers: builder.mutation({
      query: (order) => ({
        url: 'team/reorder',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['TeamMemberList'],
    }),
  }),
});

export const {
  useGetTeamMemberByIdQuery,
  useGetTeamMembersQuery,
  useAddTeamMemberMutation,
  useEditTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useReorderTeamMembersMutation,
} = teamMemberApi;
