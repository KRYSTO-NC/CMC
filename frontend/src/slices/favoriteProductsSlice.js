import { FAVORITE_PRODUCTS_URL } from '../constants' // Assurez-vous d'avoir la bonne URL pour les produits favoris
import { apiSlice } from './apiSlice'

export const favoriteProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavoriteProducts: builder.query({
      query: () => ({
        url: FAVORITE_PRODUCTS_URL,
      }),
      providesTags: ['FavoriteProduct'],
      keepUnusedDataFor: 5,
    }),

    getFavoriteProductDetails: builder.query({
      query: (id) => ({
        url: `${FAVORITE_PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createFavoriteProduct: builder.mutation({
      query: (data) => ({
        url: FAVORITE_PRODUCTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FavoriteProduct'],
    }),

    updateFavoriteProduct: builder.mutation({
      query: (data) => ({
        url: `${FAVORITE_PRODUCTS_URL}/${data.favoriteProductId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FavoriteProduct'],
    }),

    deleteFavoriteProduct: builder.mutation({
      query: (favoriteProductId) => ({
        url: `${FAVORITE_PRODUCTS_URL}/${favoriteProductId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetFavoriteProductsQuery,
  useGetFavoriteProductDetailsQuery,
  useCreateFavoriteProductMutation,
  useUpdateFavoriteProductMutation,
  useDeleteFavoriteProductMutation,
} = favoriteProductsApiSlice
