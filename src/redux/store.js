import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./contactsSlice";
import filtersSlice from "./filtersSlice";

export const store = configureStore({
    reducer: {
        contacts: contactSlice,
        filters: filtersSlice,
    },
});
