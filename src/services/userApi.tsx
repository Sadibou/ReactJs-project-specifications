import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHODS } from 'http';
import { User } from '../models/user.model';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ["User"],
  endpoints: (builder) => ({

      users: builder.query<User[], void>({
        query: () => `/user`,
        providesTags: ["User"]
      }),

      user: builder.query<User, string>({
        query: (id) => `/user/${id}`,
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
            method: "DELETE",
        }),
        invalidatesTags: ["User"],
      }),

      updateUser: builder.mutation<void, User>({
        query: ({id, ...rest}) => ({
            url: `/user/${id}`,
            method: "PUT",
            body: rest,
        }),
        invalidatesTags: ["User"],
    }),

  }),
})


export const { useUsersQuery, useAddUserMutation, useDeleteUserMutation, useUserQuery, useUpdateUserMutation } = userApi