import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDefault } from "../auth/operations";


export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axiosDefault.get("/contacts")
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contact, thunkAPI) => {
        try {
            const response = await axiosDefault.post('/contacts', contact)
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
        try {
            const response = await axiosDefault.delete(`/contacts/${contactId}`)
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async ({ id, name, number }, thunkAPI) => {
        try {
            const response = await axiosDefault.patch(`/contacts/${id}`, { name, number })
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
