import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: 'authApi',
    

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://expense-tracker-backend-mu-five.vercel.app/api/v1/auth',
        credentials: 'include'
    }),

    endpoints: (builder) => ({

        signup: builder.mutation({
            query: (credentials) => ({
                url: '/signup',
                body: credentials,
                method: 'POST'
            }),
            keepUnusedDataFor: 0,
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                body: credentials,
                method: 'POST'
            }),
            keepUnusedDataFor: 0,
        }),

        getVerificationEmail: builder.mutation({
            query: () => ({
                url: '/getVerificationEmail',
                method: 'PUT',
            }),
            keepUnusedDataFor: 0,
        }),

        isLogin: builder.query({
            query: ()=>({
                url: '/isLogin',
            }),
            keepUnusedDataFor: 0,
        }),

        logout: builder.mutation({
            query: ()=>({
                url: '/logout',
                method: 'PUT'
            }),
            keepUnusedDataFor: 0,
        })

    })
})

export default authApi;
export const {
    useGetVerificationEmailMutation,
    useLoginMutation,
    useSignupMutation,
    useIsLoginQuery,
    useLogoutMutation
} = authApi;