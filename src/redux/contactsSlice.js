import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

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
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload)
                state.error = null
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(contact => contact.id !== action.payload.id)
                state.error = null
            })
    }
})

export default slice.reducer

export const selectContacts = (state) => state.contacts.items
export const selectLoading = (state) => state.contacts.loading
export const selectError = (state) => state.contacts.error

export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, filter) => {
        if (!filter) return contacts
        const lowercased = filter.toLowerCase()
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(lowercased) ||
            contact.number.includes(filter)
        )
    }
)