import { createSlice } from "@reduxjs/toolkit"

const countSlice = createSlice({
    name: 'count',
    initialState: {
        propertyCount: 0
    },
    reducers: {
        setPropertyCount: (state, action) => {
            state.propertyCount = action.payload;
        }
    }
})

export const { setPropertyCount } = countSlice.actions;

export default countSlice.reducer;