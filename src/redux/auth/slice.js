import { createSlice } from '@reduxjs/toolkit';
import { userRegister, userLogin, userLogout, userRefresh } from './operations';

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: null,
            email: null,
        },
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.user = { name: null, email: null };
                state.token = null;
                state.isLoggedIn = false;
            })
            .addCase(userRefresh.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(userRefresh.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(userRefresh.rejected, (state) => {
                state.isRefreshing = false;
            });
    },
});

export const authReducer = slice.reducer;