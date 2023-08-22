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
        getUserInfo: builder.query({
            query: (email) => `/api/auth/getUserInfo/${email}`,
        }),
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
        }),
        deleteProperty: builder.mutation({
            query: (id) => ({
                url: `/api/properties/delete/${id}`,
                method: 'DELETE'
            })
        }),
        getCityFilter: builder.query({
            query: (city) => `/api/properties/filter?city=${city}`,
            providesTags: (result, error, city) => [{ type: 'CityData', city }]
        }),
        getPropertiesWithTitle: builder.query({
            query: ({ queryCity, queryTitle }) => {
                console.log("queryCity", queryCity)
                console.log("queryTitle", queryTitle)
                let queryString = '/api/properties/filter';
                if (queryCity) {
                    queryString += `?city=${queryCity}`
                    if (queryTitle) {
                        queryString += `&title=${queryTitle}`;
                    }
                } else if (queryTitle) {
                    queryString += `?title=${queryTitle}`
                }
                return queryString;
            },
            providesTags: (result, error, { city, title }) => [{ type: 'CityData', city, title }],
        }),
        getSortedProperties: builder.query({
            query: (sortOption) => ({
                url: '/api/properties/sort',
                method: 'POST',
                body: { sortOption }
            }),
            providesTags: (result, error, { sortOption }) => [{ type: 'PropertyData', sortOption }],
        }),
        getPropertiesByUser: builder.query({
            query: (userId) => ({
                url: '/api/properties/getPropertiesByUser',
                method: 'POST',
                body: { userId }
            })
        }),
        getContact: builder.mutation({
            query: contactData => ({
                url: '/api/contact/getContact',
                method: 'POST',
                body: contactData
            })
        }),
    }),
})

export const { useGetPropertiesQuery, useGetPropertyQuery, useGetFilterPropertiesQuery, useUpdatePropertiesTypeQuery,
    useCreatePropertyMutation, useUpdatePropertyMutation, useDeletePropertyMutation, useGetUserInfoQuery, useGetCityFilterQuery,
    useGetPropertiesWithTitleQuery, useGetSortedPropertiesQuery, useLazyGetPropertiesByUserQuery, useGetContactMutation } = propertiesSlice;