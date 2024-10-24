import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teamMemberApi = createApi({
  reducerPath: 'teamMemberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getTeamMemberById: builder.query({
      query: (id) => `team/${id}`,
    }),
    getTeamMembers: builder.query({
      query: () => 'team',
    }),
    addTeamMember: builder.mutation({
      query: (newMember) => ({
        url: 'team',
        method: 'POST',
        body: newMember,
      }),
    }),
    editTeamMember: builder.mutation({
      query: ({ id, updates }) => ({
        url: `team/${id}`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `team/${id}`,
        method: 'DELETE',
      }),
    }),
    reorderTeamMembers: builder.mutation({
      query: (order) => ({
        url: 'team/reorder',
        method: 'POST',
        body: order,
      }),
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
