import { apiSlice } from "../../app/api/apiSlice";

//Adding endpoints to apiSlice
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: userData => ({
                url: '/api/auth/register',
                method: 'POST',
                body: userData
            })
        })
    })
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;