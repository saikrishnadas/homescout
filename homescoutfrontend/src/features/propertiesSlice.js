import { apiSlice } from "../app/api/apiSlice";
import { createSlice } from "@reduxjs/toolkit"

const propertySlice = createSlice({
    name: 'properties',
    initialState: { properties: [] },
    reducers: {
        setProperties: (state, action) => {
            state.properties = action.payload;
        }
    }
})

export const { setProperties } = propertySlice.actions;

export default propertySlice.reducer;

export const selectProperties = (state) => state.properties.properties;

//Adding to the endpoints
export const propertiesSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProperties: builder.query({
            query: () => "/api/properties"
        })
    })
})

export const { useGetPropertiesQuery } = propertiesSlice;