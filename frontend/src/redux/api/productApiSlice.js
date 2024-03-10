import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOADS_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/all`,
        method: "GET",
        providesTags: ["Product"],
      }),
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}/detail`,
        method: "GET",
        providesTags: ["Product"],
      }),
    }),

    getRandomProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/random`,
        method: "GET",
        providesTags: ["Product"],
      }),
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
        method: "GET",
        providesTags: ["Product"],
      }),
    }),

    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/new`,
        method: "GET",
        providesTags: ["Product"],
      }),
    }),

    getRelativeProducts: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}/relative`,
        method: "GET",
        providesTags: ["Product"],
      }),
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}/update`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}/delete`,
        method: "DELETE",
      }),
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}/review`,
        method: "POST",
        body: data,
      }),
    }),

    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    searchProducts: builder.query({
      query: (data) => ({
        url: `${PRODUCTS_URL}/search`,
        method: "GET",
        body: data,
      }),
    }),

    getRandomReviews: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/random10`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetRandomProductsQuery,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useGetRelativeProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useUploadImageMutation,
  useSearchProductsQuery,
  useGetRandomReviewsQuery,
} = productApiSlice;
