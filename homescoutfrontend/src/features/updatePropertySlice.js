import { createSlice } from "@reduxjs/toolkit"

const updatePropertySlice = createSlice({
    name: 'updateProperty',
    initialState: {
        isOpenUpdate: false
    },
    reducers: {
        setIsOpenUpdate: (state, action) => {
            state.isOpenUpdate = action.payload;
        }
    }
})

export const { setIsOpenUpdate } = updatePropertySlice.actions;

export default updatePropertySlice.reducer;