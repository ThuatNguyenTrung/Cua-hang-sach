import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/all`,
        method: "GET",
        providesTags: ["Order"],
      }),
    }),

    getOrderByIdUser: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        method: "GET",
        providesTags: ["Order"],
      }),
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/detail`,
        method: "GET",
      }),
    }),

    markOrderAsDelivered: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: "PUT",
        providesTags: ["Order"],
      }),
    }),

    markOrderAsPaid: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/paid`,
        method: "PUT",
        providesTags: ["Order"],
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdUserQuery,
  useGetOrderByIdQuery,
  useMarkOrderAsDeliveredMutation,
  useMarkOrderAsPaidMutation,
} = orderApiSlice;

export const orderEndpoints = orderApiSlice.endpoints;
