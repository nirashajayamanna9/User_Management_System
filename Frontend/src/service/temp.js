import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/users',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['Users'],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '',
      providesTags: ['Users'],
    }),

    getUserById: builder.query({
      query: (id) => `/${id}`,
    }),

    addUser: builder.mutation({
      query: (newUser) => ({
        url: '',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: updatedUser,
      }),
      invalidatesTags: ['Users'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;