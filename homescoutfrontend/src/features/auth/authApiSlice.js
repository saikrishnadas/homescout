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
    })
});

export const { useLoginMutation } = authApiSlice;