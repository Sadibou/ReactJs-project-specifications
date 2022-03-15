import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHODS } from 'http';
import { User } from '../models/user.model';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    users: builder.query<User[], void>({
        query: () => `/users`,
        providesTags: ["User"]
    }),

    addUser: builder.mutation<{}, User>({
      query: (user) => ({
          url: `/user`,
          method: "POST",
          body: user,
      }),
      invalidatesTags: ["User"],
  }),
  deleteUser: builder.mutation<void, string>({
    query: (id) => ({
        url: `/user/${id}`,
        method: "POST",
    }),
    invalidatesTags: ["User"],
  }),

  }),
})


export const { useUsersQuery, useAddUserMutation, useDeleteUserMutation } = userApi