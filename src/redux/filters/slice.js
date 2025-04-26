import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "filters",
    initialState: {
        status: "",
    },
    reducers: {
        changeFilter(state, action) {
            state.status = action.payload
        }
    }
})

export const { changeFilter } = slice.actions
export const filterReducer = slice.reducer
