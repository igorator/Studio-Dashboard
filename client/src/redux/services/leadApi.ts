import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Lead } from '../../data/types';

export const leadApi = createApi({
  reducerPath: 'leadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getLeadById: builder.query<Lead, string>({
      query: (id) => `leads/${id}`,
    }),
    getLeads: builder.query<Lead[], void>({
      query: () => 'leads',
    }),
    addLead: builder.mutation<Lead, Partial<Lead>>({
      query: (newLead) => ({
        url: 'leads',
        method: 'POST',
        body: newLead,
      }),
    }),
    editLead: builder.mutation<Lead, { id: string; updates: Partial<Lead> }>({
      query: ({ id, updates }) => ({
        url: `leads/${id}`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteLead: builder.mutation<void, string>({
      query: (id) => ({
        url: `leads/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetLeadByIdQuery,
  useGetLeadsQuery,
  useAddLeadMutation,
  useEditLeadMutation,
  useDeleteLeadMutation,
} = leadApi;
