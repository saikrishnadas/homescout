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
        }),
        getProperty: builder.query({
            query: (id) => `/api/properties/${id}`
        }),
        getFilterProperties: builder.query({
            query: queryParams => ({
                url: '/api/properties/filter',
                params: queryParams,
            })
        }),
        updatePropertiesType: builder.query({
            query: () => "/api/properties/updatePropertyType"
        }),
        createProperty: builder.mutation({
            query: propertyData => ({
                url: '/api/properties/create',
                method: 'POST',
                body: propertyData
            })
        }),
        updateProperty: builder.mutation({
            query: (id, updatedData) => ({
                url: `/api/properties/update/${id}`,
                method: 'POST',
                body: updatedData
            })
        })
    })
})

export const { useGetPropertiesQuery, useGetPropertyQuery, useGetFilterPropertiesQuery, useUpdatePropertiesTypeQuery, useCreatePropertyMutation, useUpdatePropertyMutation } = propertiesSlice;