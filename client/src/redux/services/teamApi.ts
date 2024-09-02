import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TeamMember } from '../../data/types';

export const teamMemberApi = createApi({
  reducerPath: 'teamMemberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getTeamMemberById: builder.query<TeamMember, string>({
      query: (id) => `team/${id}`,
    }),
    getTeamMembers: builder.query<TeamMember[], void>({
      query: () => 'team',
    }),
    addTeamMember: builder.mutation<TeamMember, Partial<TeamMember>>({
      query: (newMember) => ({
        url: 'team',
        method: 'POST',
        body: newMember,
      }),
    }),
    editTeamMember: builder.mutation<
      TeamMember,
      { id: string; updates: Partial<TeamMember> }
    >({
      query: ({ id, updates }) => ({
        url: `team/${id}`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteTeamMember: builder.mutation<void, string>({
      query: (id) => ({
        url: `team/${id}`,
        method: 'DELETE',
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
} = teamMemberApi;
