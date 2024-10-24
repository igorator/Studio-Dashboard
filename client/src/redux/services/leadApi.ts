import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const leadApi = createApi({
  reducerPath: 'leadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getLeadById: builder.query({
      query: (id) => `leads/${id}`,
    }),
    getLeads: builder.query({
      query: () => 'leads',
    }),
    addLead: builder.mutation({
      query: (newLead) => ({
        url: 'leads',
        method: 'POST',
        body: newLead,
      }),
    }),
    checkLeadById: builder.mutation({
      query: ({ id, is_checked }) => ({
        url: `leads/${id}`,
        method: 'PATCH',
        body: { is_checked: is_checked },
      }),
    }),
    deleteLead: builder.mutation({
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
  useDeleteLeadMutation,
  useCheckLeadByIdMutation,
} = leadApi;
