import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHODS } from 'http';
import { User } from '../models/user.model';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003/' }),
  endpoints: (builder) => ({
    users: builder.query<User[], void>({
        query: () => "/users",
    }),

    addUser: builder.mutation<{}, User>({
        query: (user) => ({
            url: "/users",
            method: "POST",
            body: user,
        })   
    })

  }),
})


export const { useUsersQuery } = userApi