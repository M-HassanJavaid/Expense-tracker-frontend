import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://expense-tracker-backend-mu-five.vercel.app/api/v1/transaction',
        credentials: 'include'
    }),
    tagTypes: ['Transactions'],
    endpoints: (builder)=>({

        getTransactions: builder.query({
            query: ({action , limit})=>({
                url: `/get/all`,
                params: {action , limit}
            }),
            providesTags: ['Transactions']
        }),

        addTransaction: builder.mutation({
            query: (details)=>({
                url: '/add',
                method: 'POST',
                body: details
            }),
            invalidatesTags: ['Transactions']
        }),

    })
})

export default transactionApi;
export const { 
    useGetTransactionsQuery,
    useAddTransactionMutation,
    useDeleteTransactionMutation
} = transactionApi;