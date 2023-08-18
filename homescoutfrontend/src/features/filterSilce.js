import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        type: undefined,
        bhk: undefined,
        bathrooms: undefined,
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
        setBathroomsFilter: (state, action) => {
            state.bathrooms = action.payload;
        },
        setBudgetFilter: (state, action) => {
            state.budget = action.payload;
        },
        setCarpetAreaFilter: (state, action) => {
            state.carpetArea = action.payload;
        },
    }
})

export const { setTypeFilter, setBhkFilter, setBudgetFilter, setCarpetAreaFilter, setBathroomsFilter } = filterSlice.actions;

export default filterSlice.reducer;

export const selectType = (state) => state.filter.type;
export const selectBhk = (state) => state.filter.bhk;
export const selectBathrooms = (state) => state.filter.bathrooms;