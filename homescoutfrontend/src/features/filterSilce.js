import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        type: undefined,
        bhk: undefined,
        budget: { min: "", max: "" },
        carpetArea: { min: "", max: "" }
    },
    reducers: {
        setTypeFilter: (state, action) => {
            state.type = action.payload;
        },
        setBhkFilter: (state, action) => {
            state.bhk = action.payload;
        },
        setBudgetFilter: (state, action) => {
            state.budget = action.payload;
        },
        setCarpetAreaFilter: (state, action) => {
            state.carpetArea = action.payload;
        },
    }
})

export const { setTypeFilter, setBhkFilter, setBudgetFilter, setCarpetAreaFilter } = filterSlice.actions;

export default filterSlice.reducer;

export const selectBhk = (state) => state.filter.bhk;