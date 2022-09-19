import { configureStore } from "@reduxjs/toolkit";
import contactReducer from './features/contacts.js'
const store = configureStore({
    reducer: {
        contacts: contactReducer
    }
})

export default store