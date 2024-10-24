import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const offerApi = createApi({
  reducerPath: 'offerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['OfferList'],
  endpoints: (builder) => ({
    getOfferById: builder.query({
      query: (id) => `offers/${id}`,
    }),
    getOffers: builder.query({
      query: () => 'offers',
      providesTags: ['OfferList'],
    }),
    addOffer: builder.mutation({
      query: (newOffer) => ({
        url: 'offers',
        method: 'POST',
        body: newOffer,
      }),
      invalidatesTags: ['OfferList'],
    }),
    editOffer: builder.mutation({
      query: ({ id, updates }) => ({
        url: `offers/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['OfferList'],
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `offers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OfferList'],
    }),
    updateOfferOrder: builder.mutation({
      query: (offers) => ({
        url: 'offers/reorder',
        method: 'POST',
        body: offers,
      }),
      invalidatesTags: ['OfferList'],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useGetOfferByIdQuery,
  useAddOfferMutation,
  useEditOfferMutation,
  useDeleteOfferMutation,
  useUpdateOfferOrderMutation, // Хук для обновления порядка
} = offerApi;
