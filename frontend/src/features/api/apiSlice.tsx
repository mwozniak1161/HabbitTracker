import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const BACKEND = process.env.REACT_APP_BACKEND;

export const apiSlice = createApi({
  reducerPath: "habbitApi",
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND, prepareHeaders(headers) {
    return headers
  },}),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser : builder.query({
      query: () =>({url:`/users/`, credentials:"include"}),
      providesTags:["User"],
    }),
    signIn : builder.mutation({
      query: (body)=>({
        url: `/users/signIn`,
        method: 'POST',
        body,
        credentials: "include"
      }),
      invalidatesTags:["User"]
    }),
    signUp : builder.mutation({
      query: (body)=>({
        url: `/users/signUp`,
        method: 'POST',
        body
      }),
      invalidatesTags:["User"],
    }),
    addHabbit : builder.mutation({
      query: ({name, info}) =>({
       url:`/users/addHabbit`,
       method: 'PATCH',
       body: {
          name,
          started: Date.now(),
          info,
          done:false
       },
       credentials: "include"
      }),
      invalidatesTags:["User"]
    }),
    logoutUser : builder.mutation({
      query : ()=>({
        url: `/users/logout`,
        method: 'POST',
        credentials:"include"
      }),
      invalidatesTags:["User"]
    }),
    changeHabbitName : builder.mutation({
      query: ({_id, name}) =>({
       url:`/users/${_id}/changeHabbitName`,
       method: 'PATCH',
       body: {
          name
       },
       credentials: "include"
      }),
      invalidatesTags:["User"]
    }),
    changeDefaultHabbitInfo : builder.mutation({
      query: ({_id, info}) =>({
       url:`/users/${_id}/changeDefaultHabbitInfo`,
       method: 'PATCH',
       body: {
          info,
       },
       credentials: "include"
      }),
      invalidatesTags:["User"]
    }),
    changeTodayHabbitInfo : builder.mutation({
      query: ({_id, info}) =>({
       url:`/users/${_id}/changeTodayHabbitInfo`,
       method: 'PATCH',
       body: {
          info,
       },
       credentials: "include"
      }),
      invalidatesTags:["User"]
    }),
    deleteHabbit : builder.mutation({
      query: (_id) =>({
       url:`/users/${_id}/deleteHabbit`,
       method: 'PATCH',
       credentials: "include"
      }),
      invalidatesTags:["User"]
    }),
    doneHabbit : builder.mutation({
      query: (_id) =>({
       url:`/users/${_id}/doneHabbit`,
       method: 'PATCH',
       credentials: "include"
      }),
      invalidatesTags:["User"]
    }),
    addToday : builder.mutation({
      query:()=>({
        url:`/users/addToday`,
        method: 'PATCH',
        credentials:"include"
      }),
      invalidatesTags:["User"]
    })
  }),
});

export const { useDoneHabbitMutation, useGetUserQuery, useSignInMutation, useSignUpMutation, useAddHabbitMutation, useLogoutUserMutation, useChangeHabbitNameMutation, useChangeDefaultHabbitInfoMutation, useChangeTodayHabbitInfoMutation, useDeleteHabbitMutation, useAddTodayMutation } = apiSlice