import { configureStore } from "@reduxjs/toolkit";
import authApi from "../services/authApi";
import authReducer from '../features/authSlice'
import dashboardApi from "../services/dashboardApi";
import transactionApi from "../services/TransactionApi";

export const store = configureStore({
    reducer:{
        user: authReducer,
        [authApi.reducerPath] : authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware,
            dashboardApi.middleware,
            transactionApi.middleware
        )
});
