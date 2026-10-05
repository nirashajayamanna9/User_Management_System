import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi=createApi({
    reducerPath:"authApi",

    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3005',
    }),

    endpoints:(builder)=>({
        login:builder.mutation({
            query:(loginData)=>({
                url:"/auth/login",
                method:"POST",
                body:loginData,
            })
        })
    })
})
export const { useLoginMutation } = authApi;