import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://680b31d7d5075a76d98a28cd.mockapi.io"

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts")
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
            const response = await axios.post('/contacts', contact)
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
            const response = await axios.delete(`/contacts/${contactId}`)
            console.log("Deleted from API:", response.data)
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
