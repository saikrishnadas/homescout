import { createSlice } from "@reduxjs/toolkit"

const postPropertySlice = createSlice({
    name: 'postProperty',
    initialState: {
        isOpen: false
    },
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        }
    }
})

export const { setIsOpen } = postPropertySlice.actions;

export default postPropertySlice.reducer;