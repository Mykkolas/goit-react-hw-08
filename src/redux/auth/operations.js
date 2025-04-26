import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const axiosDefault = axios.create({
    baseURL: 'https://connections-api.goit.global/',
});

export const setAuthHeader = (token) => {
    axiosDefault.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    axiosDefault.defaults.headers.common.Authorization = '';
};

export const userRegister = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            const response = await axiosDefault.post('/users/signup', user)
            setAuthHeader(response.data.token)
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const userLogin = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            const response = await axiosDefault.post('/users/login', user)
            setAuthHeader(response.data.token)
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const userLogout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await axiosDefault.post('/users/logout')
            clearAuthHeader()
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const userRefresh = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;
        if (persistedToken === null) {
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }
        try {
            setAuthHeader(persistedToken)
            const response = await axiosDefault.get(`/users/current`)
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)