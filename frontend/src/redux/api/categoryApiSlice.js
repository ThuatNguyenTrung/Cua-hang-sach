import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}/all`,
        method: "GET",
        providesTags: ["Category"],
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    getCategory: builder.query({
      query: (id) => ({
        url: `${CATEGORIES_URL}/get/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoryApiSlice;
