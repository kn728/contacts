import {createSlice} from '@reduxjs/toolkit'


const contactSlice= createSlice({
    name: 'contact',
    initialState: [],
    reducers: {
        storeContacts: (state, action) => { //stores contacts into redux when called
            if(action.payload.length > 0) {                
                return [...action.payload]
            }
        }
        
    }
})

export const {storeContacts} = contactSlice.actions
export default contactSlice.reducer