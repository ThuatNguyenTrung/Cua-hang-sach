import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: USERS_URL,
        method: "POST",
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/all`,
        method: "GET",
        provideTags: ["User"],
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),

    getProfileById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/profile/${id}`,
        method: "GET",
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetAllUsersQuery,
  useGetProfileQuery,
  useGetProfileByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
