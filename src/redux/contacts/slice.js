import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts, updateContact } from "./operations";
import { userLogout } from "../auth/operations";

const slice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.items = action.payload
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(addContact.pending, (state) => {
                state.loading = true
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload)
                state.error = null
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteContact.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(contact => contact.id !== action.payload.id)
                state.error = null
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.items.findIndex(contact => contact.id === action.payload.id) // returns -1, if not found
                if (index !== -1) {
                    state.items[index] = action.payload
                }
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.items = []
            })
    }
})

export const contactsReducer = slice.reducer

