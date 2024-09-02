import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Offer } from '../../data/types';

export const offerApi = createApi({
  reducerPath: 'offerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getOfferById: builder.query<Offer, string>({
      query: (id) => `offers/${id}`,
    }),
    getOffers: builder.query<Offer[], void>({
      query: () => 'offers',
    }),
    addOffer: builder.mutation<Offer, Partial<Offer>>({
      query: (newOffer) => ({
        url: 'offers',
        method: 'POST',
        body: newOffer,
      }),
    }),
    editOffer: builder.mutation<Offer, { id: string; updates: Partial<Offer> }>(
      {
        query: ({ id, updates }) => ({
          url: `offers/${id}`,
          method: 'PUT',
          body: updates,
        }),
      },
    ),
    deleteOffer: builder.mutation<void, string>({
      query: (id) => ({
        url: `offers/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetOfferByIdQuery,
  useGetOffersQuery,
  useAddOfferMutation,
  useEditOfferMutation,
  useDeleteOfferMutation,
} = offerApi;
