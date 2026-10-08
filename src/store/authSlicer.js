import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: null,
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.status = true;
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.status = false;
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
