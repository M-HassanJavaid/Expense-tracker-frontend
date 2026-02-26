import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState : null,

    reducers: {
        setLogout: (state)=> null,

        setLogin: (state , action)=> action.payload
    }

});

export const { setLogin , setLogout } = authSlice.actions;
export default authSlice.reducer;