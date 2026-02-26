import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    tagTypes: ['Overview'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://expense-tracker-backend-mu-five.vercel.app/api/v1/dashboard',
        credentials: 'include'
    }),

    endpoints: (builder)=>({

        getOverview: builder.query({
            query: ()=>({
                url: '/overview',
            }),
            providesTags: ['Overview']
        })

    })
})

export default dashboardApi;
export const { useGetOverviewQuery } = dashboardApi;