import { SUBCATEGORIES_URL } from '../constants'; // Assurez-vous d'ajuster l'URL en fonction de votre application
import { apiSlice } from './apiSlice';

export const subcategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: () => ({
        url: SUBCATEGORIES_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['SubCategory'],
    }),
    getSubCategoryDetails: builder.query({
      query: (subCategoryId) => ({
        url: `${SUBCATEGORIES_URL}/${subCategoryId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getSubCategoriesByCategory: builder.query({
      query: (categoryId) => ({
        url: `${SUBCATEGORIES_URL}/category/${categoryId}`,
      }),
      providesTags: (result, error, categoryId) => [
        { type: 'SubCategory', id: categoryId },
      ],
    }),

    createSubCategory: builder.mutation({
      query: (newSubCategory) => ({
        url: SUBCATEGORIES_URL,
        method: 'POST',
        body: newSubCategory, // Envoyer les données dans le corps de la requête
      }),
      invalidatesTags: ['SubCategory'],
    }),
    updateSubCategory: builder.mutation({
      query: (data) => ({
        url: `${SUBCATEGORIES_URL}/${data.subCategoryId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SubCategory'],
    }),
    deleteSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `${SUBCATEGORIES_URL}/${subCategoryId}`,
        method: 'DELETE',
      }),
      providesTags: ['SubCategory'],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoryDetailsQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesByCategoryQuery,
} = subcategoriesApiSlice;
